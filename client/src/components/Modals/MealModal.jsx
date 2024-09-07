import React, { useEffect, useState } from 'react';
import "./modal.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

const MealModal = ({ onclick, handleRefetch, meal }) => {
    console.log(meal)
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [imageBase64, setImageBase64] = useState("");

    useEffect(() => {
        if (meal) {
            setValue("name", meal.name);
            setValue("ingredients", meal.ingredients?.join(", "));
            setValue("calories", meal.calories);
            setValue("dietary_preferences", meal.dietary_preferences);
            setValue("instructions", meal.instructions);
            setImageBase64(meal.image);
        } else {
            reset();
        }
    }, [meal, setValue, reset]);

    const onSubmit = async (data) => {
        const ingredientsArray = data.ingredients
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient !== "");
        try {
            setLoading(true);
            let response;
            if (meal) {
                response = await axios.put(`/meals/update-meal/${meal._id}`, {
                    name: data.name,
                    ingredients: ingredientsArray,
                    calories: data.calories,
                    dietary_preferences: data.dietary_preferences,
                    image: imageBase64,
                    instructions: data.instructions,
                });
            } else {
                response = await axios.post("/meals/create-meal", {
                    name: data.name,
                    ingredients: ingredientsArray,
                    calories: data.calories,
                    dietary_preferences: data.dietary_preferences,
                    image: imageBase64,
                    instructions: data.instructions,
                });
            }


            handleRefetch();
            onclick();
            toast.success(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const onClear = () => {
        reset();
        setImageBase64("");
    };

    const handleFileUpload = (file) => {
        setImageBase64(file.base64);
        setValue("image", file.base64);
    };

    return (
        <>
            <div className='fixed top-0 left-0 w-full h-full z-[3000] '>
                <div onClick={onclick} className='fixed h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60'>
                </div>
                <form id='create-meal-form' onSubmit={handleSubmit(onSubmit)} className='relative w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl'>
                    <IoIosCloseCircle onClick={onclick} className='absolute bg-white rounded-full -top-4 -right-4 cursor-pointer text-4xl' />
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="name">Name</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' id='name' placeholder='Name' {...register('name', {
                                    required: {
                                        value: true,
                                        message: 'Name is required'
                                    }, maxLength: {
                                        value: 100,
                                        message: 'Name must be at most 100 characters long'
                                    }
                                })} type="text" />
                            </div>
                            {errors.name && <span className='font-poppins font-semibold text-xs text-red'>{errors.name.message}</span>}
                        </div>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="ingredients">Ingredients</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' id='ingredients' placeholder='Ingredients' {...register('ingredients', {
                                    required: {
                                        value: true,
                                        message: 'Ingredient is required'
                                    }, maxLength: {
                                        value: 300,
                                        message: 'Ingredients must be at most 300 characters long'
                                    }
                                })} type="text" />
                            </div>
                            {errors.ingredients && <span className='font-poppins font-semibold text-xs text-red'>{errors.ingredients.message}</span>}
                        </div>
                    </div>
                    {/* second row */}
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="calories">Calories</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' id='calories' placeholder='Calories' {...register('calories', {
                                    required: {
                                        value: true,
                                        message: 'Calories is required'
                                    }, maxLength: {
                                        value: 3,
                                        message: 'Calories must be at most 3 characters long'
                                    },
                                    minLength: {
                                        value: 1,
                                        message: 'Calories must be at least 1 character long'
                                    }
                                })} min={0} type="number" />
                            </div>
                            {errors.calories && <span className='font-poppins font-semibold text-xs text-red'>{errors.calories.message}</span>}
                        </div>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="dietary_preferences">Dietary Preferences</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' id='dietary_preferences' placeholder='Dietary Preferences' {...register('dietary_preferences', {
                                    required: {
                                        value: true,
                                        message: 'Dietary Preferences is required'
                                    }, maxLength: {
                                        value: 300,
                                        message: 'Dietary Preferences must be at most 300 characters long'
                                    }
                                })} type="text" />
                            </div>
                            {errors.dietary_preferences && <span className='font-poppins font-semibold text-xs text-red'>{errors.dietary_preferences.message}</span>}
                        </div>
                    </div>
                    <div>
                        <label className='text-black w-full text-2xl' htmlFor="image">Image</label>
                        <FileBase64
                            multiple={false}
                            onDone={handleFileUpload}
                        />
                    </div>
                    <div>
                        <label className='text-black w-full text-2xl' htmlFor="instructions">Instructions</label>
                        <textarea {...register('instructions', {
                            required: {
                                value: true,
                                message: "Instructions is required"
                            },
                            maxLength: {
                                value: 500,
                                message: "Instructions must be at most 500 characters long"
                            }
                        })} className='border-2 border-primary w-full px-6 py-3 rounded-xl' placeholder='Write the instructions here...' id="instructions"></textarea>
                        {errors.instructions && <span className='font-poppins font-semibold text-xs text-red'>{errors.instructions.message}</span>}
                    </div>
                    <div className="flex justify-center gap-4">
                        <button className='font-poppins uppercase rounded-lg py-3 px-6 font-semibold bg-primary-dark text-white-light' type='submit'>{loading ? "loading" : meal ? "Update" : "Submit"}</button>
                        <button type="button" onClick={onClear} className='font-poppins uppercase rounded-lg py-3 px-6 font-semibold bg-red-500 text-white-light'>Clear</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default MealModal;
