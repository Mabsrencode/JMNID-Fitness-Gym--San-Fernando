import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast, useToast } from 'react-toastify';
import WorkoutModal from "../../components/Modals/WorkoutModal";
import WorkoutSkeleton from "../../components/Skeletons/WorkoutSkeleton";
import { BsThreeDots } from "react-icons/bs";

const WorkoutDashboard = () => {
    const [workoutModal, setWorkoutModal] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeActionButtonIndex, setActiveActionButtonIndex] = useState(null);

    const handleOpenModalWorkout = (workout = null) => {
        setSelectedWorkout(workout);
        setWorkoutModal(!workoutModal);
    };

    const fetchAllWorkouts = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("/workouts/all-workouts");
            const data = response?.data || [];

            setWorkouts(data);
            console.log("Workout Data: ", data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch workouts. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`/workouts/delete-workout/${id}`);
            toast.success(response.data.message);
            fetchAllWorkouts();  // Refresh the workouts list after deletion
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete workout. Please try again.");
        }
    };

    const handleShowActionButtons = (index) => {
        setActiveActionButtonIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        fetchAllWorkouts();
    }, [fetchAllWorkouts]);

    return (
        <>
            <div className="relative">
                {workoutModal && (
                    <WorkoutModal
                        onclick={handleOpenModalWorkout}
                        handleRefetch={fetchAllWorkouts}
                        workout={selectedWorkout}
                    />
                )}
                <div className="sticky top-16 left-0 w-full bg-white-dark px-6 shadow-2xl py-2 rounded-lg z-[1000]">
                    <button
                        className="bg-primary-dark hover:bg-primary-light text-white px-6 py-2 rounded-xl"
                        onClick={() => handleOpenModalWorkout(null)}
                    >
                        Add Workout
                    </button>
                </div>
                <ul className="mt-6 list-none flex gap-4 flex-wrap justify-center">
                    {loading ? (
                        <WorkoutSkeleton />
                    ) : workouts.length > 0 ? (
                        workouts.map((data, index) => (
                            <li key={data._id} className="w-full md:w-[400px] max-h-auto bg-white-dark rounded-xl p-4">
                                <div className="relative w-full h-[200px] shadow-2xl">
                                    <BsThreeDots
                                        onClick={() => handleShowActionButtons(index)}
                                        className="absolute top-2 right-2 p-1 cursor-pointer text-3xl rounded-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 hover:bg-opacity-60 z-10"
                                    />
                                    {activeActionButtonIndex === index && (
                                        <div className="absolute overflow-hidden font-semibold top-10 right-2 bg-white rounded shadow-md z-10">
                                            <button 
                                                onClick={() => handleOpenModalWorkout(data)} 
                                                className="block w-full text-left px-2 py-1 hover:bg-gray-400" 
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(data._id)} 
                                                className="block w-full text-left px-2 py-1 hover:bg-red-400" 
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                    <video
                                            crossOrigin="anonymous"
                                        className="object-cover w-full h-full rounded-lg"
                                        controls
                                        preload="metadata"
                                        title={data.title}
                                    >
                                        <source src={data.url} type="video/mp4" />
                                    </video>
                                </div>
                                <h1 className="font-teko text-2xl uppercase mt-2 font-semibold">{data.title}</h1>
                                <div>
                                    <h2 className="font-poppins font-semibold">Description:</h2>
                                    <p className="font-poppins text-sm overflow-hidden text-ellipsis line-clamp-3">
                                        {data.description}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="flex justify-center items-center">
                            <h2 className="text-4xl font-teko text-white-light font-semibold">No workouts have been posted.</h2>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default WorkoutDashboard;