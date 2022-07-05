import React, { useEffect, useMemo, useState } from 'react'
import InvoiceForm from '../components/InvoiceForm'
import InvoicesTable from '../components/InvoicesTable'
import MainLayout from '../components/MainLayout'

const Invoices = () => {

    const [openInvoiceForm, setOpenInvoiceForm] = useState({ open: false, type: '' })
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        const getInvoices = async () => {
            const invoicesFromServer = await fetchInvoices()
            setInvoices(invoicesFromServer)
        }

        getInvoices()
    }, [])

    const fetchInvoices = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/invoices`)
        const data = await res.json()
        return data
    }

    const renderStatus = status => {
        switch (status) {
            case 'paid':
                return <span className='capitalize py-2 px-4 text-sm bg-primary text-white rounded-full'>{status}</span>
            case 'pending':
                return <span className='capitalize py-2 px-4 text-sm bg-secondary text-white rounded-full'>{status}</span>
            case 'due':
                return <span className='capitalize py-2 px-4 text-sm bg-red-300 text-white rounded-full'>{status}</span>
            default:
                break;
        }
    }
    const columns = useMemo(
        () => [
            {
                Header: 'No.',
                accessor: 'inv',
                Cell: ({ cell: { value } }) => {
                    return `#${value}`
                }
            },
            {
                Header: 'Issued Date',
                accessor: 'issueDate',
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
            },
            {
                Header: 'Client',
                accessor: 'clientName',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
                Cell: ({ cell: { value } }) => {
                    return `$${value}`
                }
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ cell: { value } }) => {
                    return renderStatus(value)
                }
            },
        ],
        []
    )
    return (
        <MainLayout>
            <div className='py-4 px-8'>
                <div className='flex justify-between items-center mb-8'>
                    <div>
                        <h2 className='font-poppins text-xl'>Invoices</h2>
                        <span className='font-light'>List of all your recent transactions</span>
                    </div>
                    <button className='relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary' onClick={() => setOpenInvoiceForm({ open: true, type: 'add' })}>+ New Invoice</button>
                </div>
                <InvoicesTable columns={columns} data={invoices || []} />
            </div>
            {openInvoiceForm.open && <div className='fixed inset-0 bg-slate-300 bg-opacity-30 z-10'>
                <InvoiceForm type={openInvoiceForm.type} setOpenInvoiceForm={setOpenInvoiceForm} />
            </div>}
        </MainLayout>
    )
}

export default Invoices