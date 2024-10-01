import React from 'react'
import { Link } from 'react-router-dom'
import "./SideBar.css"
import LogoutButton from "../LogoutButton/LogoutButton.jsx"
import { BarbelIcon, DashboardIcon, FoodMenuIcon, LightBarbelIcon } from '../../constants/icons.js'
const ClientSideBar = () => {
    return (
        <aside className="fixed h-full flex flex-col bg-black text-white-light h-cover max-w-[4rem]  hover:max-w-[18rem] border-r border-gray-light transition-all z-[2000]">
            <Link to={"/client"}>
                <div className="mb-2 p-4 flex gap-4 items-center">
                    <DashboardIcon className={"w-[30px] h-[30px]"} /> <h5 className="logo block antialiased tracking-normal font-sans text-xl font-bold leading-snug text-primary-dark">Dashboard</h5>
                </div>
            </Link>
            <nav className="flex flex-col gap-2 p-2 font-sans text-base font-normal text-white flex flex-col justify-between h-full">
                <div className='flex flex-col gap-2'>
                    <Link to={"meal-planner"} className="flex items-center w-full p-3 text-nowrap rounded-lg text-start leading-tight transition-all hover:bg-primary-dark font-semibold hover:bg-opacity-80 hover:text-white focus:bg-primary-dark focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-white-light focus:text-white-light active:text-white-light outline-none">
                        <div className="grid place-items-center">
                            <FoodMenuIcon />
                        </div><h1 className='ml-4'>Meal Planner</h1>

                    </Link>
                    <Link to={"workout-planner"} className="flex items-center w-full p-3 text-nowrap rounded-lg text-start leading-tight transition-all hover:bg-primary-dark font-semibold hover:bg-opacity-80 hover:text-white focus:bg-primary-dark focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-white-light focus:text-white-light active:text-white-light outline-none">
                        <div className="grid place-items-center">
                            <BarbelIcon />
                        </div><h1 className='ml-4'>Workout Planner</h1>

                    </Link>
                    <Link to={"my-workouts"} className="flex items-center w-full p-3 text-nowrap rounded-lg text-start leading-tight transition-all hover:bg-primary-dark font-semibold hover:bg-opacity-80 hover:text-white focus:bg-primary-dark focus:bg-opacity-80 active:bg-primary-dark active:bg-opacity-80 hover:text-white-light focus:text-white-light active:text-white-light outline-none">
                        <div className="grid place-items-center">
                            <LightBarbelIcon />
                        </div><h1 className='ml-4'>My Plans</h1>
                    </Link>
                </div>
                <LogoutButton />
            </nav>
        </aside>
    )
}

export default ClientSideBar