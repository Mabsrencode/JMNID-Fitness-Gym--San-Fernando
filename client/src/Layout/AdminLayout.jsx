import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/Sidebar/AdminSidebar'
import ClientHeader from '../components/Header/ClientHeader'
const AdminLayout = () => {
    return (
        <>
            {/* <main className='bg-primary min-h-screen w-full flex'>
                <AdminSidebar />
                <Outlet />
            </main> */}
            <main className='bg-bg-color min-h-screen w-full flex'>
                <AdminSidebar />
                <section className='w-full'>
                    <ClientHeader />
                    <div className='mt-12 px-4'>
                        <Outlet />
                    </div>
                </section>
            </main>
        </>
    )
}

export default AdminLayout