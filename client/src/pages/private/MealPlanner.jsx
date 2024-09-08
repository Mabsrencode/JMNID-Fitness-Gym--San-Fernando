import React, { useState, useEffect } from 'react';
import "./styles/meal-planner.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import MealSkeleton from '../../components/Skeletons/MealSkeleton';
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const MealPlanner = () => {
    const user = useUser();
    const userId = user?.user?._id;
    const [meals, setMeals] = useState([]);
    const [mealPlan, setMealPlan] = useState({ meals: {} });
    const [selectedWeek, setSelectedWeek] = useState(new Date().toISOString().slice(0, 10));
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState()
    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/meals/all-meals');
                const data = response.data || [];
                setMeals(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false)
            }
        };

        fetchMeals();
    }, []);

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const response = await axios.get(`/meal-planner/meal-plans/${userId}`, { params: { week: selectedWeek } });
                if (response.data) {
                    setMealPlan({ meals: response.data.meals || {} });
                } else {
                    setMealPlan({ meals: {} });
                }
            } catch (err) {
                console.error(err);
                setMealPlan({ meals: {} });
            }
        };

        fetchMealPlan();
    }, [userId, selectedWeek]);

    const handleMealSelect = (meal) => {
        setSelectedMeals((prevSelectedMeals) => {
            if (prevSelectedMeals.includes(meal._id)) {
                return prevSelectedMeals.filter((id) => id !== meal._id);
            } else {
                return [...prevSelectedMeals, meal._id];
            }
        });
    };

    const handleMealAssign = (day) => {
        if (selectedMeals.length > 0) {
            setMealPlan((prev) => ({
                ...prev,
                meals: {
                    ...prev.meals,
                    [day]: [...(prev.meals[day] || []), ...selectedMeals],
                }
            }));
            setSelectedMeals([]);
        }
    };

    const handleSaveMealPlan = async () => {
        try {
            const response = await axios.post('/meal-planner/save-meal-plan', {
                userId,
                week: selectedWeek,
                meals: Object.entries(mealPlan.meals).flatMap(([day, mealIds]) =>
                    mealIds.map((mealId) => ({ day, meal: mealId }))
                ),
            });
            toast(response.data.message)
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="meal-planner-container">
            <style>
                {`
          .date-input::-webkit-calendar-picker-indicator {
            filter: invert(1); 
          }
        `}
            </style>
            <header className="meal-planner-header py-3 px-6 bg-white-dark rounded-xl flex flex-row-reverse items-center gap-6">
                <div className='w-[50%]'>
                    <h2 className='font-teko text-4xl font-semibold'>Create a Weekly Meal Plan</h2>
                    <input
                        className="date-input bg-black text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                        type="date"
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                    />
                </div>
                <div className='w-[50%] relative'>
                    <input className='py-3 px-6 bg-white shadow-2xl border-4 placeholder:font-bold border-black outline-none rounded-xl w-full' placeholder='Search...' type="text" />
                </div>
            </header>
            <main className="meal-planner-main">
                <div className="meals-list mb-12">
                    {loading ? <MealSkeleton /> : <ul className='list-none flex gap-4 flex-wrap justify-center'>
                        {meals && meals.map((meal, index) => (
                            <li key={index} className="w-full md:w-[400px] bg-white-dark rounded-xl p-4 flex flex-col justify-between">
                                <div className="relative w-full h-[200px] shadow-2xl">
                                    <img
                                        className="object-cover w-full h-full rounded-lg"
                                        src={meal.image}
                                        alt={meal.name}
                                    />
                                </div>
                                <div>
                                    <h1 className="font-teko text-2xl uppercase mt-2 font-semibold">{meal.name}</h1>
                                    <h2 className="font-poppins capitalize mt-2 font-semibold">Calories: {meal.calories}</h2>
                                    <div>
                                        <h2 className="font-poppins font-semibold">Ingredients:</h2>
                                        <ul className="grid grid-cols-2 gap-x-2 my-3">
                                            {meal.ingredients.map((ingredient, index) => (
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
                                                {meal.instructions}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-poppins text-sm block bg-gray-dark inline px-3 py-1 text-white-dark rounded-full">
                                            {meal.dietary_preferences}
                                        </span>
                                        <span className="font-poppins text-sm block bg-gray-light inline px-3 py-1 text-white-dark rounded-full">
                                            {meal.category}
                                        </span>
                                    </div>
                                </div>
                                <button className={`${selectedMeals.includes(meal._id) ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-dark"} font-poppins font-semibold shadow-xl w-full py-3 px-6 rounded-xl mt-6`} onClick={() => handleMealSelect(meal)}>
                                    {selectedMeals.includes(meal._id) ? 'Unselect' : 'Select'}
                                </button>
                            </li>
                        ))}
                    </ul>}
                </div>
            </main>
            <div className="meal-planner-aside">
                {/* {selectedMeals.length > 0 && (
                    <div className='p-3 bg-white-dark rounded-xl'>
                        <div>
                            <h4>Selected Meals:</h4>
                            <ul>
                                {selectedMeals.map((mealId) => {
                                    const meal = meals.find((m) => m._id === mealId);
                                    return <li key={mealId}>{meal ? meal.name : 'Unknown Meal'}</li>;
                                })}
                            </ul>
                        </div>
                    </div>
                )} */}

                <div className='sticky top-20 right-0 bg-white-dark rounded-xl p-3'>
                    <h1 className='font-teko font-semibold text-2xl'>Select a day to assign.</h1>
                    <div className='flex flex-col gap-2'>
                        {daysOfWeek.map((day) => (
                            <div className='bg-black p-3 rounded-lg text-white-light' key={day}>
                                <div className='flex justify-between items-center'>
                                    <h3 className='font-bold'>{day}</h3>
                                    <button className={`${selectedMeals && selectedMeals.length > 0 ? "bg-primary hover:bg-primary-dark" : "bg-gray"} p-2 text-black font-teko font-semibold rounded-full`} onClick={() => handleMealAssign(day)}>
                                        {mealPlan.meals && mealPlan.meals[day] ? 'Add More Meals' : 'Assign Meals'}
                                    </button>
                                </div>
                                {mealPlan.meals && mealPlan.meals[day] && (
                                    <div className='mt-1'>
                                        <h1>Selected Meals:</h1>
                                        <ul className='bg-white-dark p-1 rounded-lg flex flex-col gap-1'>
                                            {mealPlan.meals[day].map((mealId) => {
                                                const meal = meals.find((meal) => meal._id === mealId);
                                                return (
                                                    <li className={`text-black capitalize font-semibold `} key={mealId}>
                                                        <div className='flex justify-between items-center '>
                                                            <h3>{meal ? meal.name : 'Unknown Meal'}</h3>
                                                            <button className='py-1 px-3 rounded-full bg-red-500 hover:bg-red-600'>Remove</button>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button className='bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl w-full mt-2 font-semibold font-poppins' onClick={handleSaveMealPlan}>Save Meal Plan</button>
                </div>
            </div>
        </div>
    );
};

export default MealPlanner;
