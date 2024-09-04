import React from 'react'
import "./styles/member-layout.css"
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import ClientSideBar from '../components/Sidebar/ClientSidebar'
import ClientHeader from '../components/Header/ClientHeader'
import { images } from '../constants'
import { CustomLink } from '../components/CustomButtons/CustomButtons'
const MemberLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    if (location.pathname === '/client') {
        return <main className='bg-black min-h-screen w-full flex'>
            <ClientSideBar />
            <section className='w-full'>
                <ClientHeader />
                <div className='mt-[6rem] px-4 flex flex-col md:flex-row gap-2 justify-center ml-[4rem]'>
                    <div onClick={() => navigate("meal-planner")} className='parent-container relative max-w-[600px] bg-white-dark px-6 py-3 rounded-xl shadow-xl overflow-hidden'>
                        <div className='hover-container z-[1]'>
                        </div>
                        <div className='z-[1000] absolute h-full w-full hidden cursor-pointer justify-center items-center top-0 left-0 button-container'>
                            <CustomLink url={"meal-planner"} className={"font-teko font-semibold text-2xl underline"} text={"View"} />
                        </div>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold font-teko'>Meal Planner</h1>
                        <div className='h-[200px] md:h-[300px] mb-2 md:mb-6 rounded-lg overflow-hidden shadow-2xl'>
                            <img className='w-full h-full object-cover' src={images.mealPlanner} alt="gym" />
                        </div>
                        <p className='font-poppins text-gray text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis doloremque magni magnam natus asperiores? Eveniet, est numquam porro inventore libero, vero cumque suscipit sunt optio quidem iusto necessitatibus error illo!</p>
                    </div>
                    <div onClick={() => navigate("workout-planner")} className='parent-container relative max-w-[600px] bg-white-dark px-6 py-3 rounded-xl shadow-xl overflow-hidden'>
                        <div className='hover-container'>
                        </div>
                        <div className='z-[1000] absolute h-full w-full hidden cursor-pointer justify-center items-center top-0 left-0 button-container'>
                            <CustomLink url={"workout-planner"} className={"font-teko font-semibold text-2xl underline"} text={"View"} />
                        </div>
                        <h1 className='text-3xl sm:text-4xl md:text-5xl font-semibold font-teko'>Workout Planner</h1>
                        <div className='h-[200px] md:h-[300px] mb-2 md:mb-6 rounded-lg overflow-hidden shadow-2xl'>
                            <img className='w-full h-full object-cover' src={images.gym1} alt="gym" />
                        </div>
                        <p className='font-poppins text-gray text-sm md:text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident recusandae maiores ipsa aliquam culpa aliquid nemo quae? Quibusdam unde sequi error quidem amet explicabo, similique repellat officiis? Pariatur, tempora quo!</p>
                    </div>
                </div>
            </section>
        </main>;
    }
    return (
        <>
            <main className='bg-bg-color min-h-screen w-full flex'>
                <ClientSideBar />
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

export default MemberLayout