import { format } from 'date-fns'
import React, { useEffect, useMemo, useState } from 'react'
import InvoiceForm from '../components/InvoiceForm'
import InvoicesTable from '../components/InvoicesTable'
import MainLayout from '../components/MainLayout'
import { FaAngleRight } from 'react-icons/fa'
import InvoicePreview from '../components/InvoicePreview'

const Invoices = () => {

    const [openInvoiceForm, setOpenInvoiceForm] = useState(false)
    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const [selectedInvoice, setSelectedInvoice] = useState({})
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        const getInvoices = async () => {
            const invoicesFromServer = await fetchInvoices()
            setInvoices(invoicesFromServer)
        }

        getInvoices()
    }, [])

    const fetchInvoices = async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/invoices?_sort=id&_order=desc`)
        const data = await res.json()
        return data
    }

    const renderStatus = status => {
        switch (status) {
            case 'paid':
                return <span className='capitalize py-2 px-4 text-sm bg-primary text-white rounded-full'>{status}</span>
            case 'pending':
                return <span className='capitalize py-2 px-4 text-sm bg-secondary text-white rounded-full'>{status}</span>
            case 'late':
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
                Cell: ({ cell: { value } }) => {
                    return format(new Date(value), 'MMMM d, yyyy')
                }
            },
            {
                Header: 'Due Date',
                accessor: 'dueDate',
                Cell: ({ cell: { value } }) => {
                    return format(new Date(value), 'MMMM d, yyyy')
                }
            },
            {
                Header: 'Description',
                accessor: 'description',
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
            {
                Header: '',
                accessor: 'id',
                Cell: ({ cell: { row } }) => {
                    return <button className='inline-flex justify-center items-center' onClick={() => {
                        setSelectedInvoice(row.original)
                        setIsOpenPreview(true)
                    }}><FaAngleRight size={20} className="text-slate-500" /></button>
                }
            },

        ],
        []
    )
    return (
        <MainLayout>
            <div className='py-4 px-8'>
                <div className='flex flex-col sm:flex-row justify-between gap-4 sm:items-center mb-8'>
                    <div>
                        <h2 className='font-poppins text-xl'>Invoices</h2>
                        <span className='font-light'>List of all your recent transactions</span>
                    </div>
                    <button className='relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary' onClick={() => setOpenInvoiceForm(true)}>+ New Invoice</button>
                </div>
                <InvoicesTable columns={columns} data={invoices || []} />
            </div>
            {openInvoiceForm && <div className='fixed inset-0 bg-slate-300 bg-opacity-30 z-10'>
                <InvoiceForm setOpenInvoiceForm={setOpenInvoiceForm} setInvoices={setInvoices} invoices={invoices} />
            </div>}
            {isOpenPreview && selectedInvoice ? <InvoicePreview invoice={selectedInvoice} isOpenPreview={isOpenPreview} setIsOpenPreview={setIsOpenPreview} /> : null}
        </MainLayout>
    )
}

export default Invoices