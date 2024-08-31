import React from 'react'
import { Link } from 'react-router-dom'
import "./SideBar.css"
import LogoutButton from "../LogoutButton/LogoutButton.jsx"
import images from '../../constants/images.js'
const ClientSideBar = () => {
    return (
        <aside className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-cover max-w-[4rem]  hover:max-w-[18rem]  shadow-xl shadow-blue-gray-900/5 transition-all">
            <div className="mb-2 p-4 flex gap-4 items-center">
                <img src={images.logo} className='w-[30px] h-[30px] object-fit' alt="logo" /> <h5 className="logo block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-primary-dark">Dashboard</h5>
            </div>
            <nav className="flex flex-col gap-2 p-2 font-sans text-base font-normal text-gray-700">
                <Link to={"/admin"} className="flex items-center w-full p-3 text-nowrap rounded-lg text-start leading-tight transition-all hover:bg-primary-dark font-semibold hover:bg-opacity-80 hover:text-white focus:bg-primary-dark focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div className="grid place-items-center">
                        <i className="fa-solid fa-list"></i>
                    </div><h1 className='ml-4'>Job Offers</h1>

                </Link>
                <Link to={"/admin-create-account"} className="flex items-center w-full p-3 text-nowrap rounded-lg text-start leading-tight transition-all hover:bg-primary-dark font-semibold hover:bg-opacity-80 hover:text-white focus:bg-primary-dark focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div className="grid place-items-center">
                        <i className="fa-solid fa-user"></i>
                    </div><h1 className='ml-4'>Create Account</h1>

                </Link>
                <Link to={"/settings"} className="flex items-center w-full p-3 text-nowrap rounded-lg text-start leading-tight transition-all hover:bg-primary-dark font-semibold hover:bg-opacity-80 hover:text-white focus:bg-primary-dark focus:bg-opacity-80 active:bg-primary-dark active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none">
                    <div className="grid place-items-center">
                        <i className="fa-solid fa-gear"></i>
                    </div><h1 className='ml-4'>Settings</h1>
                </Link>
                <LogoutButton />
            </nav>
        </aside>
    )
}

export default ClientSideBar