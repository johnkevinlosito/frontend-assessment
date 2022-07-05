import React, { useState } from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai'

const InvoicesTable = ({ columns, data }) => {
    const [filterInput, setFilterInput] = useState("");

    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        setGlobalFilter,
    } = useTable({
        columns, data,
        autoResetFilters: false,
        autoResetGlobalFilter: false

    },
        useFilters,
        useGlobalFilter,
        useSortBy
    )
    return (
        <>
            <div className='flex flex-row justify-between items-center gap-4'>
                <input
                    value={filterInput}
                    onChange={e => {
                        setFilterInput(e.target.value)
                        onChange(e.target.value)
                    }}
                    placeholder={"Search invoice"}
                    className="form-control rounded-md"
                />
                <select
                    className="form-control rounded-md max-w-[150px]"
                    onChange={e => {
                        setFilter("status", e.target.value || undefined)
                    }}>
                    <option value="">Show All</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="due">Due</option>
                </select>
            </div>
            <div className='w-full relative overflow-x-auto'>
                <div {...getTableProps()} className="w-full text-left table border-separate border-spacing-y-3">
                    <div className='font-normal table-header-group'>
                        {
                            headerGroups.map(headerGroup => (
                                <div {...headerGroup.getHeaderGroupProps()} className="table-row">
                                    {
                                        headerGroup.headers.map(column => (
                                            <div {...column.getHeaderProps(column.getSortByToggleProps)} className={`px-6 py-3 table-cell`}>
                                                <span className={`flex gap-2 items-center ${column.id == 'status' || column.id == 'amount' ? 'justify-end' : ''}`} >{
                                                    column.render('Header')}

                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? <AiFillCaretDown />
                                                            : <AiFillCaretUp />
                                                        : ''}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                    <div {...getTableBodyProps()} className="table-row-group">
                        {
                            rows.map(row => {

                                prepareRow(row)
                                return (
                                    <div {...row.getRowProps()} className="shadow-xl rounded-xl bg-white table-row">
                                        {
                                            row.cells.map(cell => {
                                                return (
                                                    <div {...cell.getCellProps()} className={`px-6 py-3 table-cell ${cell.column.id == 'status' || cell.column.id == 'amount' ? 'text-right' : ''}`}>
                                                        {cell.render('Cell')}
                                                    </div>
                                                )
                                            })}
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvoicesTable