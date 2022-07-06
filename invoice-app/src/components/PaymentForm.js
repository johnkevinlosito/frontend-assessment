import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from "../utils/cardFormatter";

const PaymentForm = ({ invoice }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    })
    const navigate = useNavigate();

    const closeModal = () => {
        setIsOpen(false)
        navigate(`/payment`)
    }

    const handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }
        setCardData({ ...cardData, [target.name]: target.value })
    };

    const onSubmit = async e => {
        e.preventDefault()
        setIsLoading(true)

        const invoiceData = {
            ...invoice,
            status: 'paid',
        }
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/invoices/${invoice.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invoiceData)
            });
            const data = await response.json()
            if (data) {
                setIsLoading(false)
                setIsOpen(true)
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    return (
        <div className="mt-10 border rounded-md p-4">
            {invoice.status === 'paid' ? <h3>This invoice has been successfully paid. Thank you!</h3> :
                <div>
                    <h3 className='font-poppins'>Pay this invoice</h3>
                    <span className='label font-light'>Make payment for this invoice by filling in the details</span>

                    <form action="#" method="POST" className='mt-4' onSubmit={e => onSubmit(e)}>
                        <div>
                            <input
                                type="tel"
                                name="number"
                                className="form-control rounded-t-md"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={handleInputChange}

                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name on card"
                                required
                                onChange={handleInputChange}

                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="expiry"
                                    className="form-control rounded-bl-md"
                                    placeholder="Valid Thru"
                                    pattern="\d\d/\d\d"
                                    required
                                    onChange={handleInputChange}

                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control rounded-br-md"
                                    placeholder="CVC"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={handleInputChange}

                                />
                            </div>
                        </div>
                        <div className='flex justify-between items-center pt-4'>
                            <button
                                type="button"
                                className={`text-slate-400  uppercase text-sm px-2`}
                                onClick={() => navigate(`/payment`)}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-cta w-auto"
                                disabled={isLoading}
                            >
                                Pay ${invoice.amount}
                            </button>
                        </div>
                    </form>
                </div>
            }
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
                                        Payment Successful!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Congratulations, your transaction is completed and payment was successfully sent.
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

export default PaymentForm