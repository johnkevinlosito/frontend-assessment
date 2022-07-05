import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout, useAuthDispatch, useAuthState } from '../context'
import Card from './Card'
import { MdSpaceDashboard } from 'react-icons/md'
import { FaFileInvoiceDollar, FaWallet } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'

const SideNav = () => {
    const dispatch = useAuthDispatch() // read dispatch method from context
    const userDetails = useAuthState() //read user details from context
    const navigate = useNavigate();
    const handleLogout = () => {
        logout(dispatch) //call the logout action

        navigate(`/`); //navigate to login page on logout
    }
    return (
        <div className='hidden md:block w-60 bg-white shadow-lg flex-shrink-0'>
            <div className='flex flex-col justify-between gap-4 pb-8 overflow-y-auto h-screen text-black'>
                <div className=''>
                    <div className='p-4 mb-4'>
                        <img
                            className="mx-auto h-12 w-full object-contain"
                            src="storia-logo.png"
                            alt="Storia Logo"
                        />
                    </div>
                    <div className='px-4 space-y-4 flex flex-col'>
                        <Card className='bg-slate-50 shadow-none p-2'>
                            <div className='flex gap-2 items-center'>
                                <img src='https://via.placeholder.com/60'
                                    className='object-contain rounded-full w-12'
                                    alt='user' />
                                <div className='flex flex-col'>
                                    <span className='text-sm'>{`${userDetails.user.firstName} ${userDetails.user.lastName}`}</span>
                                    <span className='font-light text-xs'>{userDetails.user.email}</span>
                                </div>
                            </div>
                        </Card>
                        <Link to="#" className='py-1 font-light hover:text-primary hover:border-r-4 hover:border-solid hover:border-primary flex items-center justify-start gap-2'>
                            <MdSpaceDashboard size={20} className="text-primary" />
                            Dashboard
                        </Link>
                        <NavLink to="/invoices" className={({ isActive }) => `py-1 flex items-center justify-start gap-2 ${isActive ? "border-r-4 border-solid border-primary text-primary font-bold" : "font-light hover:text-primary"}`}>
                            <FaFileInvoiceDollar size={20} className="text-primary" />
                            Invoices
                        </NavLink>
                        <Link to="#" className='py-1 font-light hover:text-primary hover:border-r-4 hover:border-solid hover:border-primary flex items-center justify-start gap-2'>
                            <FaWallet size={20} className="text-primary" />
                            Wallet
                        </Link>
                    </div>
                </div>

                <div className='px-4'>
                    <button className='w-full font-light hover:text-primary hover:border-r-4 hover:border-solid hover:border-primary flex items-center justify-start gap-2' onClick={handleLogout}>
                        <IoLogOut size={24} className="text-red-400" />
                        Logout
                    </button>
                </div>
            </div>

        </div>
    )
}

export default SideNav