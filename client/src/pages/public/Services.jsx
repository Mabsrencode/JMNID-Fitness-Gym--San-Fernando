import React from 'react'
import { CustomLink } from '../../components/CustomButtons/CustomButtons'
import { ArrowRightIcon } from '../../constants/icons'
import images from '../../constants/images'
import services from '../../data/servicesData'
import ServicesCard from '../../components/CustomeCards/ServicesCard'
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
                    <h2 className='text-center md:text-left text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-teko'>Personalized Fitness & Nutrition Plans.</h2>
                    <p className='text-center md:text-left text-sm sm:text-base max-w-[600px] font-poppins text-gray-light'>Access personalized fitness and nutrition plans tailored to your individual needs, helping you achieve your health and wellness objectives effectively.</p>
                </div>
                <div className='flex flex-wrap justify-center gap-4 text-white-light mx-4 mt-12'>
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
            <section className='min-h-screen px-4 mt-24'>
                <div>
                    <div>
                        <span className="block">
                            Customized Fitness & Meal Plans
                        </span>
                        <h4>Tailored Nutrition Plans.</h4>
                    </div>
                    <div>
                        <div>
                            <h5>Custom Workout Plans </h5>
                            <p>Receive personalized workout plans designed to target your specific fitness objectives and preferences.</p>
                        </div>
                        <div>
                            <h5>Custom Workout Plans </h5>
                            <p>Receive personalized workout plans designed to target your specific fitness objectives and preferences.</p>
                        </div>
                        <div>
                            <h5>Custom Workout Plans </h5>
                            <p>Receive personalized workout plans designed to target your specific fitness objectives and preferences.</p>
                        </div>
                    </div>
                </div>
                <div></div>
            </section>
        </>
    )
}

export default Services