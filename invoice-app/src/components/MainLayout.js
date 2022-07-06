import React, { useState } from 'react'
import Navbar from './Navbar'
import SideNav from './SideNav'

const MainLayout = (props) => {
    const [openSideNav, setOpenSideNav] = useState(false)

    return (
        <div className='flex bg-slate-50 min-h-screen'>
            <SideNav isOpen={openSideNav} setOpenSideNav={setOpenSideNav} />
            <div className='w-full overflow-hidden'>
                <Navbar setOpenSideNav={setOpenSideNav} />
                <div className='max-w-7xl mx-auto md:mt-16'>
                    {props.children}
                </div>

            </div>
        </div>
    )
}

export default MainLayout