import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { images } from '../../constants';
import { MessageIcon, XMarkIcon, BurgerIcon } from "../../constants/icons"
const Header = () => {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };
    return (
        <>
            <header className={`flex flex-wrap md:justify-start bg-black transition-all md:bg-bg-color md:flex-nowrap z-50 w-full text-sm py-3 md:py-0`}>
                <nav className="relative max-w-[100rem] w-full my-[1%] mx-auto px-4 md:flex md:items-center md:justify-between md:px-6 lg:px-8" aria-label="Global">
                    <div className="flex items-center justify-between">
                        <div className='flex gap-2 items-center'>
                            <Link to={"/"} className="flex-none text-xl font-semibold dark:text-white" aria-current="page">
                                <img src={images.logo} className='hidden md:block h-[40px] md:h-[60px]' alt="segen-consulting" />
                            </Link>
                            <Link to={"/"} className="block md:hidden flex-none text-xl font-semibold dark:text-white" aria-current="page">
                                <img src={images.mobileLogo} className='h-[40px] md:h-[60px]' alt="segen-consulting" />
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <button type="button" className="size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-primary border-2 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation" onClick={toggleNavbar}>
                                {!isNavbarOpen ? <BurgerIcon className="fa-solid fa-bars text-primary" /> : <XMarkIcon className="fa-solid fa-xmark text-primary" />}
                            </button>
                        </div>
                    </div>
                    <div className={`${isNavbarOpen ? "h-full" : "hidden"} transition-all duration-300 basis-full grow md:block `}>
                        <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7">
                            <Link to={"/"} className="text-center lg:text-xs text-primary md:text-white md:font-semibold hover:opacity-75 md:focus:text-primary">Home</Link>
                            <Link to={"/careers"} className="text-center lg:text-xs text-primary md:text-white md:font-semibold hover:opacity-75 md:focus:text-primary">Job Openings</Link>
                            <Link to={"/about"} className="text-center lg:text-xs text-primary md:text-white md:font-semibold hover:opacity-75 md:focus:text-primary" >About Us</Link>
                            {/* <Link to={"/FAQs"} className="text-center lg:text-xs text-primary md:text-white md:font-semibold hover:opacity-75 md:focus:text-primary" >FAQs</Link> */}
                            <Link to={"/contact"} className={`text-nowrap font-semibold text-white md:text-white md:font-semibold rounded-full transition-all hover:opacity-75 py-2 bg-primary-dark text-center px-[20px] text-white md:flex md:items-center md:gap-2`} >Contact Us <MessageIcon className={"hidden md:block text-primary md:text-white"} /></Link>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header