import React from 'react'
import { HiMenuAlt1 } from 'react-icons/hi'

const Navbar = ({ setOpenSideNav }) => {
    return (
        <div className='flex md:hidden items-center px-8'>
            <button onClick={() => setOpenSideNav(true)}>
                <HiMenuAlt1 size={36} />
            </button>
            <div className='p-4 w-60'>
                <img
                    className="mx-auto h-12 w-full object-contain"
                    src="storia-logo.png"
                    alt="Storia Logo"
                />
            </div>
        </div>
    )
}

export default Navbar