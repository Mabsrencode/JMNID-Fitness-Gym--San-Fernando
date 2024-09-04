import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/Sidebar/AdminSidebar'
import ClientHeader from '../components/Header/ClientHeader'
const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const redirect = () => {
            location.pathname === '/admin' && navigate("dashboard")
        }
        redirect()
    }, [location, navigate])
    return (
        <>
            <main className='bg-bg-color min-h-screen w-full flex'>
                <AdminSidebar />
                <section className='w-full'>
                    <ClientHeader />
                    <div className='mt-[6rem] px-4 ml-[4rem]'>
                        <Outlet />
                    </div>
                </section>
            </main>
        </>
    )
}

export default AdminLayout