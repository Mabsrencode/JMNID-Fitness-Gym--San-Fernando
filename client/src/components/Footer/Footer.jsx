import React from 'react'
import Logo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { FaceBookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '../../constants/icons'
const Footer = () => {
    const date = new Date().getFullYear()
    return (

        <footer className="bg-black">
            <div className="container p-6 mx-auto">
                <div className="lg:flex">
                    <div className="w-full -mx-6 lg:w-2/5">
                        <div className="px-6">
                            <Link>
                                <img className="w-auto h-[80px] sm:h-[100px]" src={Logo} alt="" />
                            </Link>
                            <div className="flex mt-6 gap-10">
                                <Link><FaceBookIcon className={"text-[20px] text-white"} /></Link>
                                <Link><TwitterIcon className={"text-[20px] text-white"} /></Link>
                                <Link><LinkedInIcon className={"text-[20px] text-white"} /></Link>
                                <Link><InstagramIcon className={"text-[20px] text-white"} /></Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 lg:mt-0 grid grid-cols-1 md:flex md:justify-end w-full text-white gap-4">
                        <div>
                            <Link to={"/"} className='hover:underline'>Home</Link>
                        </div>

                        <div>
                            <Link to={"/gym"} className='hover:underline'>Gym</Link>
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
                    <p className="text-center text-white opacity-65">Copyright {date} ©Segen Consulting. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer