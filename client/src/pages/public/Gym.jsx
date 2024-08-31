import React from "react";
import { images } from "../../constants";

const Gym = () => {
    return (
        <>
            <section className="px-4 md:px-12 my-24 w-full md:flex">
                <div className="md:w-[50%] max-w-[700px] text-white-light">
                    <h1 className="font-teko font-semibold md:leading-[80px] text-3xl sm:text-4xl md:text-6xl">
                        Discover top of the line gym gear
                    </h1>
                    <p className="text-base mt-2 text-gray-light font-poppins max-w-[500px]">
                        Explore our premium gym equipment and facilities to kickstart your
                        fitness journey with JMNID Fitness Gym.
                    </p>
                </div>
                <div className="md:w-[50%] mt-8 md:mt-0 rounded-l-3xl overflow-hidden">
                    <img className="object-cover " src={images.gymHero} alt="gym" />
                </div>
            </section>
            <section className="px-4">
                <div className="text-white-light text-center">
                    <h2 className="font-teko font-semibold text-3xl sm:text-5xl md:text-6xl">Top-of-the-line gym gear</h2>
                    <p className="font-poppins text-gray-light text-sm sm:text-lg md:text-xl">
                        Explore our premium gym equipment and facilities to kickstart your
                        fitness journey.
                    </p>
                </div>
            </section>
            <section className="px-4 md:px-12 my-24 w-full md:flex flex-row-reverse justify-center items-center gap-12">
                <div className="md:w-[50%] max-w-[700px] text-white-light">
                    <h3 className="font-teko font-semibold md:leading-[50px] text-3xl sm:text-4xl md:text-5xl">
                        Discover a wide range of equipment
                    </h3>
                    <p className="text-sm sm:text-base mt-2 text-gray-light font-poppins max-w-[500px]">
                        JMNID Fitness Gym allows you to explore a wide range of gym equipment, making it easier for you to find what suits your fitness needs.
                    </p>
                </div>
                <div className="md:w-[50%] mt-8 md:mt-0 rounded-r-3xl overflow-hidden">
                    <img className="object-cover " src={images.gym1} alt="gym" />
                </div>
            </section>
            <section className="px-4 md:px-12 my-24 w-full md:flex justify-center items-center gap-12">
                <div className="md:w-[50%] max-w-[700px] text-white-light">
                    <h3 className="font-teko font-semibold md:leading-[50px] text-3xl sm:text-4xl md:text-5xl">
                        Access top-notch facilities
                    </h3>
                    <p className="text-sm sm:text-base mt-2 text-gray-light font-poppins max-w-[500px]">
                        With JMNID Fitness Gym, you can access top-notch facilities that will enhance your workout experience and help you achieve your fitness goals.
                    </p>
                </div>
                <div className="md:w-[50%] mt-8 md:mt-0 rounded-l-3xl overflow-hidden">
                    <img className="object-cover " src={images.gym2} alt="gym" />
                </div>
            </section>
            <section className="px-4 md:px-12 my-24 w-full md:flex flex-row-reverse justify-center items-center gap-12">
                <div className="md:w-[50%] max-w-[700px] text-white-light">
                    <h3 className="font-teko font-semibold md:leading-[50px] text-3xl sm:text-4xl md:text-5xl">
                        Personalized fitness journey
                    </h3>
                    <p className="text-sm sm:text-base mt-2 text-gray-light font-poppins max-w-[500px]">
                        JMNID Fitness Gym offers a personalized fitness journey tailored to your needs, ensuring you have the best tools and resources to succeed.
                    </p>
                </div>
                <div className="md:w-[50%] mt-8 md:mt-0 rounded-r-3xl overflow-hidden">
                    <img className="object-cover " src={images.gym3} alt="gym" />
                </div>
            </section>
        </>
    );
};

export default Gym;
