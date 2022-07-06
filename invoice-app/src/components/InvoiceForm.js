import { nanoid } from 'nanoid'
import React, { Fragment, useState } from 'react'
import { Controller, useForm, useFieldArray, useWatch } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { Dialog, Transition } from '@headlessui/react';
import InvoicePreview from './InvoicePreview';

const InvoiceForm = ({ setOpenInvoiceForm, invoices, setInvoices }) => {
    const [invoiceId, setInvoiceId] = useState(nanoid(6))
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenPreview, setIsOpenPreview] = useState(false)
    const { control, register, handleSubmit, getValues, formState: { isDirty, isValid, errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            lineItems: [
                { item: "", qty: 1, price: 0 },
            ]
        }
    });

    function closeModal() {
        setIsOpen(false)
        setOpenInvoiceForm(false)
    }
    const lineItems = useWatch({
        control,
        name: "lineItems",
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "lineItems"
    });
    const onSubmit = async data => {
        setIsLoading(true)
        const invoiceData = {
            ...data,
            issueDate: format(data.issueDate, 'yyyy-MM-dd'),
            dueDate: format(data.dueDate, 'yyyy-MM-dd'),
            status: 'pending',
            amount: totalLineAmount(lineItems)
        }
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/invoices/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData)
            });
            const data = await response.json()
            setInvoices([data, ...invoices])
            setIsLoading(false)
            setIsOpen(true)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    const totalLineAmount = items => {
        let totalValue = 0;

        for (const key in items) {
            const total = items[key]['qty'] * items[key]['price']
            totalValue = totalValue + total
        }
        return totalValue
    }

    return (
        <div className='w-full max-w-xl bg-white shadow-lg fixed right-0'>
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between gap-4 overflow-y-auto h-screen relative p-5 text-black'>
                <button className='absolute right-5 top-5' onClick={() => setOpenInvoiceForm(false)}>x</button>
                <div className='space-y-4'>
                    <h3 className='font-poppins mb-4'>Create new invoice</h3>
                    <span className='text-xl'>#INV-{invoiceId}</span>
                    <input type="hidden" {...register("inv")} id='inv' value={`INV-${invoiceId}`} />
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label htmlFor="clientName" className="label">
                                Client Name
                            </label>
                            <input
                                id="clientName"
                                {...register("clientName", { required: "Name is required" })}
                                type="text"
                                className={`form-control rounded-md ${errors.clientName ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                placeholder="Client Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="clientEmail" className="label">
                                Client Email
                            </label>
                            <input
                                id="clientEmail"
                                {...register("clientEmail", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                                type="email"
                                className={`form-control rounded-md ${errors.clientEmail ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                placeholder="Client Email"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="label">
                            Project/Description
                        </label>
                        <input
                            id="description"
                            {...register("description", { required: "Description is required" })}
                            type="text"
                            className={`form-control rounded-md ${errors.description ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                            placeholder="Project/Description"
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>

                        <div>
                            <label htmlFor="issueDate" className="label">
                                Issued on
                            </label>
                            <Controller
                                control={control}
                                id="issueDate"
                                name='issueDate'
                                rules={{ required: "Date required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        className={`form-control rounded-md ${errors.issueDate ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                        minDate={new Date()}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label htmlFor="dueDate" className="label">
                                Due on
                            </label>
                            <Controller
                                control={control}
                                id="dueDate"
                                name='dueDate'
                                rules={{ required: "Date required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        className={`form-control rounded-md ${errors.dueDate ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`}
                                        minDate={new Date()}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <hr />
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className='label font-normal text-left'>Item</th>
                                <th className='label font-normal w-20'>QTY</th>
                                <th className='label font-normal w-32'>Price</th>
                                <th className='label font-normal'>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((item, index) => (
                                <tr key={item.id} className="">
                                    <td className='pr-2'><input {...register(`lineItems.${index}.item`, { required: "Item is required" })} className={`form-control rounded-md mb-2 mr-2 ${errors.lineItems?.[index].item ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`} /></td>
                                    <td className='pr-2'><input {...register(`lineItems.${index}.qty`, { required: "Qty is required", min: 1 })} type='number' min={1} className={`form-control rounded-md mb-2 mr-2 ${errors.lineItems?.[index].qty ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`} /></td>
                                    <td className='pr-2'><input {...register(`lineItems.${index}.price`, { required: "Price is required", min: 0 })} type='number' min={0} className={`form-control rounded-md mb-2 mr-2 ${errors.lineItems?.[index].price ? 'border-red-300 focus:ring-red-300 focus:border-red-300 ' : ''}`} /></td>
                                    <td><span>${lineItems[index]?.price * lineItems[index]?.qty}</span></td>
                                    <td><button type="button" onClick={() => remove(index)} className="bg-red-400 text-white flex items-center justify-center rounded-full w-5 h-5">x</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-between'>
                        <button
                            type="button"
                            onClick={() => append({ item: "", qty: 1, price: 0 })}
                            className="text-primary uppercase text-sm"
                        >
                            + ADD ITEM
                        </button>
                        <p className='label'>Total <span className='font-bold text-base text-black ml-4'>${totalLineAmount(lineItems)}</span></p>
                        <input type="hidden" {...register("amount")} id='amount' value={totalLineAmount(lineItems)} />
                    </div>

                    <div>
                        <label htmlFor="notes" className="label">
                            Additional Notes
                        </label>
                        <textarea id="notes"
                            {...register("notes")}
                            className={`form-control rounded-md`}
                        >

                        </textarea>
                    </div>
                </div>


                <div className='flex justify-between items-center border-t-2 border-slate-200 pt-4'>

                    <button
                        type="button"
                        className={`${!isDirty || !isValid ? 'text-slate-400' : 'text-primary'}  uppercase text-sm`}
                        disabled={!isDirty || !isValid}
                        onClick={() => setIsOpenPreview(true)}
                    >
                        Preview
                    </button>
                    <button
                        type="submit"
                        className="btn-cta uppercase w-auto"
                        disabled={isLoading}
                    >
                        Send
                    </button>
                </div>

            </form>
            {isOpenPreview ? <InvoicePreview invoice={getValues()} isOpenPreview={isOpenPreview} setIsOpenPreview={setIsOpenPreview} /> : null}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Invoice Sent
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Your invoice has been successfully sent. We've sent
                                            your an email with all of the details of the invoice.
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2"
                                            onClick={closeModal}
                                        >
                                            OK!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default InvoiceForm