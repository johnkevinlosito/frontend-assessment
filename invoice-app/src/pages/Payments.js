import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/storia-logo.png'

const Payments = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isErrorInvoice, setIsErrorInvoice] = useState(null)
    const navigate = useNavigate();
    const onSubmit = async invoice => {
        setIsErrorInvoice(null)
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/invoices?inv=${invoice.inv}`)
            const data = await response.json()
            if (data[0]) {
                navigate(`/payment/${invoice.inv}`)
                return
            }
            setIsErrorInvoice("Invoice not found")

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div
                className=" flex items-center justify-center w-screen h-screen bg-primary" >
                <div className="px-20 py-8 bg-white rounded-md shadow-xl">
                    <div className="flex flex-col items-center">
                        <div className='p-4 mb-4'>
                            <img
                                className="mx-auto h-12 object-contain"
                                src={logo}
                                alt="Storia Logo"
                            />
                        </div>
                        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                            {
                                isErrorInvoice ? <p className="text-white bg-red-300 rounded-md p-2 mb-2">{isErrorInvoice}</p> : null
                            }
                            <div className='flex'>
                                <div>
                                    <label htmlFor="inv" className="sr-only">
                                        Invoice No.
                                    </label>
                                    <input
                                        id="inv"
                                        {...register("inv", { required: "Invoice No. is required" })}
                                        type="text"
                                        className={`form-control rounded-l-md ${errors.inv ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                        placeholder="Invoice No."
                                    />
                                </div>
                                <div>
                                    <button className='btn-cta rounded-l-none'>Look up</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Payments