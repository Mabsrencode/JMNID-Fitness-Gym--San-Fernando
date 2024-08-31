import React from 'react'
import { images } from '../../constants'

const About = () => {
    return (
        <>
            <section className='px-4 grid items-center min-h-[60vh]'>
                <div className='max-w-[600px] mx-auto text-center text-white-light'>
                    <h1 className='font-teko font-semibold md:leading-[80px] text-3xl sm:text-4xl md:text-6xl'>
                        Our Story
                    </h1>
                    <p className='font-poppins text-gray-light text-sm md:text-base'>
                        At JMNID Fitness Gym, we strive to create a welcoming and inclusive environment where everyone can achieve their fitness goals. Join us and be part of a supportive community dedicated to health and wellness.
                    </p>
                </div>
            </section>
            <section className="px-4 md:px-12 my-24 w-full md:flex justify-center items-center gap-12">
                <div className="md:w-[50%] max-w-[700px] text-white-light">
                    <h3 className="font-teko font-semibold md:leading-[50px] text-3xl sm:text-4xl md:text-5xl">
                        Our Values
                    </h3>
                    <p className="text-sm sm:text-base mt-2 text-gray-light font-poppins max-w-[500px]">
                        JMNID Fitness Gym values inclusivity, dedication, and progress, aiming to inspire and support individuals on their fitness journey.
                    </p>
                </div>
                <div className="md:w-[50%] mt-8 md:mt-0 rounded-l-3xl overflow-hidden">
                    <img className="object-cover " src={images.aboutHero} alt="gym" />
                </div>
            </section>
        </>
    )
}

export default About