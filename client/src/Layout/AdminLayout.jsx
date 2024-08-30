import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/Sidebar/SideBar.jsx'
const AdminLayout = () => {
    return (
        <>
            <main className='bg-primary min-h-screen w-full flex'>
                <SideBar />
                <Outlet />
            </main>
        </>
    )
}

export default AdminLayout