import React from 'react'
import Logo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
const Footer = () => {
    const date = new Date().getFullYear()
    return (

        <footer className="bg-primary-dark">
            <div className="container p-6 mx-auto">
                <div className="lg:flex">
                    <div className="w-full -mx-6 lg:w-2/5">
                        <div className="px-6">
                            <Link>
                                <img className="w-auto h-[80px] sm:h-[100px]" src={Logo} alt="" />
                            </Link>
                            <p className="max-w-sm mt-2 text-secondary-white max-w-[300px]">Segen Consulting: Your Trusted Alliance in Healthcare Excellence! </p>
                            <div className="flex mt-6 gap-10">
                                <Link><i className="fa-brands fa-facebook text-[20px] text-secondary-white"></i></Link>
                                <Link><i className="fa-brands fa-x-twitter text-[20px] text-secondary-white"></i></Link>
                                <Link><i className="fa-brands fa-linkedin text-[20px] text-secondary-white"></i></Link>
                                <Link><i className="fa-brands fa-instagram text-[20px] text-secondary-white"></i></Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 lg:mt-0 grid grid-cols-1 md:flex md:justify-end w-full text-secondary-white gap-4">
                        <div>
                            <Link to={"/"} className='hover:underline'>Home</Link>
                        </div>

                        <div>
                            <Link to={"/careers"} className='hover:underline'>Job Openings</Link>
                        </div>

                        <div>
                            <Link to={"/about"} className='hover:underline'>About Us</Link>
                        </div>

                        {/* <div>
                            <Link to={"/FAQs"} className='hover:underline'>FAQs</Link>
                        </div> */}
                        <div>
                            <Link to={"/contact"} className='hover:underline'>Contact Us</Link>
                        </div>
                    </div>
                </div>

                <hr className="h-px my-6 bg-white border-none dark:bg-white" />

                <div>
                    <p className="text-center text-secondary-white opacity-65">Copyright {date} ©Segen Consulting. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer