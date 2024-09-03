import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header.jsx"
import Footer from "../components/Footer/Footer.jsx"
import axios from 'axios';
const RootLayout = () => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post("/auth", {}, { withCredentials: true });
            setUser(data);
        };
        verifyCookie();
    }, []);
    useEffect(() => {
        if (user) {
            if (user.role === 'user') {
                navigate('/client');
            } else if (user.role === 'admin') {
                navigate('/admin');
            }
        }
    }, [user, navigate]);
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