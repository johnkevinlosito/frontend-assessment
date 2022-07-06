import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import InvoicePreview from '../components/InvoicePreview';

const Payment = () => {
    let params = useParams();
    const [selectedInvoice, setSelectedInvoice] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        const getInvoice = async () => {
            try {
                let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/invoices?inv=${params.invoiceId}`)
                const data = await response.json()
                if (data[0]) {
                    setSelectedInvoice(data[0])
                } else {
                    navigate(`/payment`)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getInvoice()
    }, [params.invoiceId, navigate])

    return selectedInvoice ? <InvoicePreview invoice={selectedInvoice} isOpenPreview={true} setIsOpenPreview={() => { }} payment={true} /> : null
}

export default Payment