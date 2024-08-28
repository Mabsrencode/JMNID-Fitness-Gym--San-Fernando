import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { images } from "../../constants";
const Home = () => {
    return (
        <>
            <section className="px-4 h-screen w-full" id="hero">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="text-white-light">
                        <h1 className="text-center text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-teko">
                            Personalized Fitness & Nutrition Plans
                        </h1>
                        <div className="max-w-[800px] mx-auto">
                            <h2 className="text-gray-light font-poppins text-center text-base sm:text-xl md:text-2xl">
                                Achieve your fitness goals with custom workouts and meal plans
                                tailored just for you.
                            </h2>
                            <Link
                                to={"/sign-in"}
                                className="px-6 py-3 bg-primary text-white block mt-12 text-center rounded-full font-semibold"
                            >
                                Start Meal Plan
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* 1 */}
            <section className="text-white-light px-4 lg:px-[10%]">
                <div className="">
                    <h1 className="text-center text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-teko">Custom Fitness & Diet Programs</h1>
                    <div className="max-w-[700px] mx-auto text-center text-base sm:text-lg">

                        <h3 className="text-gray-light">
                            Unlock your fitness goals with personalized exercise routines and nutrition plans designed exclusively for you.
                        </h3>
                    </div>
                </div>
                <div className="md:flex mt-12 items-center">
                    <div className="md:w-[50%]">
                        <img className="rounded-xl" src={images.program1} alt="program" />
                    </div>
                    <div className="md:md:w-[50%] mt-4 md:mt-0 md:p-4">
                        <h3 className="text-2xl lg:text-5xl font-teko">Tailored workout plans</h3>
                        <p className="text-gray-light">
                            Our expert trainers craft personalized workout routines to help
                            you reach your fitness goals effectively and efficiently.
                        </p>
                    </div>
                </div>
            </section>
            {/* 2 */}
            <section className="text-white-light px-4 lg:px-[10%]">
                <div className="md:flex flex-row-reverse mt-12 items-center">
                    <div className="md:w-[50%]">
                        <img className="rounded-xl" src={images.program1} alt="program" />
                    </div>
                    <div className="md:w-[50%] mt-4 md:mt-0 md:p-4">
                        <h3 className="text-2xl lg:text-5xl font-teko">Customized meal plans</h3>
                        <p className="text-gray-light">
                            Nutritionists design meal plans that cater to your dietary needs and fitness objectives, ensuring you stay on track with your health goals.
                        </p>
                    </div>
                </div>
            </section>
            <section className="text-white-light px-4 lg:px-[10%]">
                <div className="md:flex mt-12 items-center">
                    <div className="md:w-[50%]">
                        <img className="rounded-xl" src={images.program1} alt="program" />
                    </div>
                    <div className="md:w-[50%] mt-4 md:mt-0 md:p-4">
                        <h3 className="text-2xl lg:text-5xl font-teko">Track your progress</h3>
                        <p className="text-gray-light">
                            Monitor your fitness journey with progress tracking tools, allowing you to see the results of your hard work and dedication.
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-primary-dark mt-24 py-24 text-white-light">
                <div className="px-4 md:px-24">
                    <h4 className="text-center text-xl sm:text-2xl md:text-4xl font-semibold"><i>"I feel healthier and more energized since starting with JMNID FITNESS GYM."</i></h4>
                    <span className="text-center underline block">Philip Alvarez</span>
                </div>
            </section>
            <section className="text-white-light my-12 md:my-0 md:h-screen flex justify-center items-center">
                <div className="relative bg-gray p-12 max-w-[900px] mx-4 md:mx-auto rounded-xl">
                    <h2 className="font-teko font-semibold text-2xl md:text-4xl lg:text-6xl text-center">Start Your Fitness Journey.</h2>
                    <p className="text-center text-xs md:text-base font-poppins">“JMNID FITNESS GYM has been a game-changer for me. The personalized meal plans and workouts have made a significant impact on my fitness journey. I highly recommend JMNID FITNESS GYM to anyone looking to improve their health and well-being.” - Ava Thomas</p>
                    <Link className="px-6 py-3 bg-primary text-white block mt-12 text-center rounded-full font-semibold">Start Meal</Link>
                </div>
            </section>
        </>
    );
};

export default Home;
