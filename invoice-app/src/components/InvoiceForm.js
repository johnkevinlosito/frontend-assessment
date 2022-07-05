import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const InvoiceForm = ({ setOpenInvoiceForm, type }) => {
    const [invoiceId, setInvoiceId] = useState(nanoid(6))
    const { control, register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            line_items: [
                { item: "", qty: 1, price: 0 },
            ]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "line_items"
    });
    const onSubmit = data => {
        console.log(data);
        console.log(format(data.issued_date, 'yyyy-MM-dd'))
    }
    return (
        <div className='w-full max-w-xl bg-white shadow-lg fixed right-0'>
            <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between gap-4 overflow-y-auto h-screen relative p-5 text-black'>
                <button className='absolute right-5 top-5' onClick={() => setOpenInvoiceForm({ open: false, type: '' })}>x</button>
                <div className='space-y-4'>
                    <h3 className='font-poppins mb-4'>Create new invoice</h3>
                    <span className='text-xl'>#INV-{invoiceId}</span>
                    <div>
                        <label htmlFor="description" className="label">
                            Project/Description
                        </label>
                        <input
                            id="description"
                            {...register("description", { required: "descriptionis required" })}
                            type="text"
                            className="form-control rounded-md"
                            placeholder="Project/Description"
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>

                        <div>
                            <label htmlFor="issued_date" className="label">
                                Issued on
                            </label>
                            <Controller
                                control={control}
                                id="issued_date"
                                name='issued_date'
                                rules={{ required: "Date required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        className="form-control rounded-md"
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label htmlFor="due_date" className="label">
                                Due on
                            </label>
                            <Controller
                                control={control}
                                id="due_date"
                                name='due_date'
                                rules={{ required: "Date required" }}
                                render={({ field }) => (
                                    <DatePicker
                                        dateFormat="MMMM d, yyyy"
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        className="form-control rounded-md"
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className='label font-normal'>Item</th>
                                <th className='label font-normal w-12'>QTY</th>
                                <th className='label font-normal w-32'>Price</th>
                                <th className='label font-normal'>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((item, index) => (
                                <tr key={item.id} className="">
                                    <td className='pr-2'><input {...register(`line_items.${index}.item`)} className='form-control rounded-md mb-2 mr-2' /></td>
                                    <td className='pr-2'><input {...register(`line_items.${index}.qty`)} className='form-control rounded-md mb-2 mr-2' /></td>
                                    <td className='pr-2'><input {...register(`line_items.${index}.price`)} className='form-control rounded-md mb-2 mr-2' /></td>
                                    <td><span>{item.price * item.qty}</span></td>
                                    <td><button type="button" onClick={() => remove(index)} className="bg-red-400 text-white flex items-center justify-center rounded-full w-5 h-5">x</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-between'>
                        <button
                            type="button"
                            onClick={() => append({ item: "", qty: 1, price: 0 })}
                            className="text-primary uppercase"
                        >
                            + ADD ITEM
                        </button>
                        <span>Total</span>
                    </div>

                    <div>
                        <label htmlFor="notes" className="label">
                            Additional Notes
                        </label>
                        <textarea id="notes"
                            {...register("notes")}
                            className="form-control rounded-md"></textarea>
                    </div>
                </div>


                <button
                    type="submit"
                    className="btn-cta uppercase"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default InvoiceForm