import React from 'react'
import { CustomLink } from '../../components/CustomButtons/CustomButtons'
import { ArrowRightIcon } from '../../constants/icons'
import images from '../../constants/images'
import services from '../../data/servicesData'
import ServicesCard from '../../components/CustomeCards/ServicesCard'
import { Link } from 'react-router-dom'
const Services = () => {
    return (
        <>
            <section className='px-4 min-h-screen w-full flex justify-center items-center'>
                <div className='text-white'>
                    <h1 className='text-center text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-teko'>Personalized Fitness Plans</h1>
                    <div className='mt-12 flex justify-center items-center'>
                        <CustomLink url={"/meal-planner"} className={"mr-4 bg-primary-dark px-6 py-3 rounded-full font-semibold text-white"} text={"Start Meal Plan"} />
                        <CustomLink url={"/about"} className={"underline font-semibold text-white"} text={`Learn More`} Icon={<ArrowRightIcon className={"inline text-[10px]"} />} />
                    </div>
                    <div className='hidden md:block mt-12 border-2 gap-6 md:p-4 border-black-light h-[600px] w-full rounded-xl'>
                        <img className='w-full h-full rounded-xl object-cover' src={images.bannerServices} alt="banner" />
                    </div>
                </div>
            </section>
            <section className='min-h-screen px-4 mt-24'>
                <div className='mt-12 text-white-light'>
                    <h2 className='text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-teko'>Personalized Fitness & Nutrition Plans.</h2>
                    <p className='mx-auto text-sm sm:text-base max-w-[600px] font-poppins text-gray-light'>Access personalized fitness and nutrition plans tailored to your individual needs, helping you achieve your health and wellness objectives effectively.</p>
                </div>
                <div className='flex flex-wrap justify-center gap-4 text-white-light mx-0 md:mx-4 mt-12'>
                    {services.map((data, index) => (
                        <ServicesCard
                            key={index}
                            containerClassName={"w-[350px]"}
                            title={data.title} titleClassName={"text-xl md:text-2xl lg:text-3xl font-teko mt-2"}
                            paragraph={data.paragraph}
                            paragraphClassName={"text-gray-light font-poppins text-sm"}
                            img={data.image}
                            imageClassName={"h-[350px]"}
                        />
                    ))}
                </div>
            </section>
            <section className='min-h-screen px-4 mt-12 md:mt-0 flex flex-col md:flex-row gap-4 items-center text-white-light'>
                <div className='w-full md:w-[50%] md:pr-6'>
                    <div>
                        <span className="block text-gray-light font-teko text-base md:text-2xl">
                            Customized Fitness & Meal Plans
                        </span>
                        <h4 className=' text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-teko'>Tailored Nutrition Plans.</h4>
                    </div>
                    <hr />
                    <div className='md:pr-12'>
                        <div className='mt-8'>
                            <h5 className='font-teko text-xl md:text-4xl'>Custom Workout Plans </h5>
                            <p className='font-poppins text-gray-light text-xs md:text-sm'>Receive personalized workout plans designed to target your specific fitness objectives and preferences.</p>
                        </div>
                        <div className='mt-12'>
                            <h5 className='font-teko text-xl md:text-4xl'>Personalized Meal Plans </h5>
                            <p className='font-poppins text-gray-light text-xs md:text-sm'>Get customized meal plans that align with your dietary requirements and fitness goals for optimal results.</p>
                        </div>
                        <div className='mt-12'>
                            <h5 className='font-teko text-xl md:text-4xl'>Progress Tracking Tools</h5>
                            <p className='font-poppins text-gray-light text-xs md:text-sm'>Utilize progress tracking tools to monitor your fitness journey and stay motivated as you work towards your goals.</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-[50%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 md:mt-0">


                    <div className="md:col-span-2 lg:col-span-3">
                        <img src={images.gridServices1} alt="banner" className="w-full h-full object-cover rounded-lg" />
                    </div>


                    <div className='md:block'>
                        <img src={images.gridServices2} alt="banner" className="w-full h-full object-cover rounded-lg" />
                    </div>


                    <div className='md:block'>
                        <img src={images.gridServices3} alt="banner" className="w-full h-full object-cover rounded-lg" />
                    </div>

                    <div className='hidden lg:block'>
                        <img src={images.gridServices4} alt="banner" className="w-full h-full object-cover rounded-lg" />
                    </div>

                </div>
            </section>
            <section className="text-white-light my-12 md:mt-0 md:h-screen flex justify-center items-center">
                <div className="relative bg-gray p-12 max-w-[900px] mx-4 md:mx-auto rounded-xl">
                    <h2 className="font-teko font-semibold text-2xl md:text-4xl lg:text-6xl text-center">Start Your Fitness Journey.</h2>
                    <p className="text-center text-xs md:text-base font-poppins">“JMNID FITNESS GYM has been a game-changer for me. The personalized meal plans and workouts have made a significant impact on my fitness journey. I highly recommend JMNID FITNESS GYM to anyone looking to improve their health and well-being.” - Ava Thomas</p>
                    <Link className="px-6 py-3 bg-primary text-white block mt-12 text-center rounded-full font-semibold">Start Meal</Link>
                </div>
            </section>
        </>
    )
}

export default Services