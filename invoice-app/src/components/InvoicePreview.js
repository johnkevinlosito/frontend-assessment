import { Dialog, Transition } from '@headlessui/react'
import { format } from 'date-fns'
import React, { Fragment } from 'react'

const InvoicePreview = ({ invoice, isOpenPreview, setIsOpenPreview }) => {
    return (
        <Transition appear show={isOpenPreview} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setIsOpenPreview(false)}>
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
                            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-sm text-left align-middle shadow-xl transition-all">
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-2xl leading-6 font-poppins mb-2"
                                        >
                                            #{invoice.inv}
                                        </Dialog.Title>
                                        <span className='uppercase font-light text-lg'>{invoice.description}</span>
                                    </div>
                                    <div className='p-4 mb-4'>
                                        <img
                                            className="mx-auto h-12 object-contain"
                                            src="storia-logo.png"
                                            alt="Storia Logo"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-10">
                                    <div>
                                        <span className='label'>Issued on</span>
                                        <p>{format(new Date(invoice.issueDate), 'MMMM d, yyyy')}</p>
                                    </div>
                                    <div>
                                        <span className='label'>Due on</span>
                                        <p>{format(new Date(invoice.dueDate), 'MMMM d, yyyy')}</p>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <span className='label'>Invoice for</span>
                                    <p>{invoice.clientName}</p>
                                    <p className='font-light'>{invoice.clientEmail}</p>
                                </div>

                                <div className='mt-4 border rounded-md px-4 py-2'>
                                    <table className='table-auto w-full'>
                                        <thead>
                                            <tr>
                                                <th className='label font-normal text-left'>Item</th>
                                                <th className='label font-normal text-right w-20'>QTY</th>
                                                <th className='label font-normal text-right w-28'>Price</th>
                                                <th className='label font-normal text-right w-28'>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y-2 divide-solid divide-slate-100 text-right'>
                                            {invoice.lineItems.map((line, i) => (
                                                <tr key={i}>
                                                    <td className='text-left py-2'>{line.item}</td>
                                                    <td className='py-2'>{line.qty}</td>
                                                    <td className='py-2'>${line.price}</td>
                                                    <td className='py-2'>${line.qty * line.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className='mt-4 flex flex-col-reverse sm:flex-row justify-between'>
                                    <p className='w-1/2 label'>{invoice.notes}</p>
                                    <div className='pr-0 sm:pr-4 flex justify-between'>
                                        <span className='label mr-12'>Total Amount</span>
                                        <span className='font-bold text-base'>${invoice.amount}</span>
                                    </div>
                                </div>

                                <div className="mt-10 flex justify-end items-center border-t border-slate-100 pt-4">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-slate-500 px-4 py-2 text-sm uppercase text-slate-500 font-medium focus:outline-none focus-visible:ring-2"
                                        onClick={() => setIsOpenPreview(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default InvoicePreview