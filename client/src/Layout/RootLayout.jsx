import React from 'react'
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx"
import Footer from "../components/Footer/Footer.jsx"
const RootLayout = () => {
    return (
        <>
            <Header />
            <main className='relative'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RootLayout