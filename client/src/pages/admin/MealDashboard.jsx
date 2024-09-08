import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import MealModal from "../../components/Modals/MealModal";
import MealSkeleton from "../../components/Skeletons/MealSkeleton";
import { BsThreeDots } from "react-icons/bs";

const MealDashboard = () => {
    const [mealModal, setMealModal] = useState(false);
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeActionButtonIndex, setActiveActionButtonIndex] = useState(null);

    const handleOpenModalMeal = (meal = null) => {
        setSelectedMeal(meal);
        setMealModal(!mealModal);
    };

    const fetchAllMeals = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("/meals/all-meals");
            const data = response?.data || [];
            setMeals(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/meals/delete-meal/${id}`);
            toast.success(response.data.message);
            fetchAllMeals()
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowActionButtons = (index) => {
        setActiveActionButtonIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        fetchAllMeals();
    }, [fetchAllMeals]);

    return (
        <>
            <div className="relative">
                {mealModal && (
                    <MealModal
                        onclick={handleOpenModalMeal}
                        handleRefetch={fetchAllMeals}
                        meal={selectedMeal}
                    />
                )}
                <div className="sticky top-16 left-0 w-full bg-white-dark px-6 shadow-2xl py-2 rounded-lg z-[1000]">
                    <button
                        className="bg-primary-dark hover:bg-primary-light text-white px-6 py-2 rounded-xl"
                        onClick={() => handleOpenModalMeal(null)}
                    >
                        Add Meal
                    </button>
                </div>
                <ul className="mt-6 list-none flex gap-4 flex-wrap justify-center">
                    {loading ? (
                        <MealSkeleton />
                    ) : meals && meals.length > 0 ? (
                        meals.map((data, index) => (
                            <li key={index} className="w-full md:w-[400px] max-h-auto bg-white-dark rounded-xl p-4">
                                <div className="relative w-full h-[200px] shadow-2xl">
                                    <BsThreeDots
                                        onClick={() => handleShowActionButtons(index)}
                                        className="absolute top-2 right-2 p-1 cursor-pointer text-3xl rounded-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 hover:bg-opacity-60"
                                    />
                                    {activeActionButtonIndex === index && (
                                        <div className="absolute overflow-hidden font-semibold top-10 right-2 bg-white rounded shadow-md">
                                            <button onClick={() => handleOpenModalMeal(data)} className="block w-full text-left px-2 py-1 hover:bg-gray-400">Edit</button>
                                            <button onClick={() => handleDelete(data._id)} className="block w-full text-left px-2 py-1 hover:bg-red-400">Delete</button>
                                        </div>
                                    )}
                                    <img
                                        className="object-cover w-full h-full rounded-lg"
                                        src={data.image}
                                        alt={data.name}
                                    />
                                </div>
                                <h1 className="font-teko text-2xl uppercase mt-2 font-semibold">{data.name}</h1>
                                <h2 className="font-poppins capitalize mt-2 font-semibold">Calories: {data.calories}</h2>
                                <div>
                                    <h2 className="font-poppins font-semibold">Ingredients:</h2>
                                    <ul className="grid grid-cols-2 gap-x-2 my-3">
                                        {data.ingredients.map((ingredient, index) => (
                                            <li className="font-poppins text-gray-dark" key={index}>
                                                <span className="font-bold">{index + 1}.</span> {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="w-full mb-2">
                                    <h3 className="font-poppins font-semibold">Instructions:</h3>
                                    <div>
                                        <p className="font-poppins text-sm overflow-hidden text-ellipsis line-clamp-3">
                                            {data.instructions}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-poppins text-sm block bg-gray-dark inline px-3 py-1 text-white-dark rounded-full">
                                        {data.dietary_preferences}
                                    </span>
                                    <span className="font-poppins text-sm block bg-gray-light inline px-3 py-1 text-white-dark rounded-full">
                                        {data.category}
                                    </span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="flex justify-center items-center">
                            <h2 className="text-4xl font-teko text-white-light font-semibold">No meals have been posted.</h2>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default MealDashboard;
