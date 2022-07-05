import React from 'react'
import SideNav from './SideNav'

const MainLayout = (props) => {
    return (
        <div className='flex bg-slate-50 min-h-screen'>
            <SideNav />
            <div className='w-full max-w-7xl mx-auto mt-16'>{props.children}</div>
        </div>
    )
}

export default MainLayout