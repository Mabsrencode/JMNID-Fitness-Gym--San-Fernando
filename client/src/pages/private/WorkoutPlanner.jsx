import React, { useState, useEffect } from 'react';
import "./styles/workout-planner.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUser } from '../../context/UserContext';
import WorkoutSkeleton from '../../components/Skeletons/WorkoutSkeleton';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WorkoutPlanner = () => {
    const user = useUser();
    const userId = user?.user?._id;
    const [workouts, setWorkouts] = useState([]);
    const [workoutPlan, setWorkoutPlan] = useState({ workouts: {} });
    const [selectedWeek, setSelectedWeek] = useState(new Date().toISOString().slice(0, 10));
    const [selectedWorkouts, setSelectedWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/workouts/all-workouts');
                const data = response.data || [];
                setWorkouts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    useEffect(() => {
        const fetchWorkoutPlan = async () => {
            try {
                const response = await axios.get(`/workout-planner/workout-plans/${userId}`, { params: { week: selectedWeek } });
                if (response.data) {
                    setWorkoutPlan({ workouts: response.data.workouts || {} });
                } else {
                    setWorkoutPlan({ workouts: {} });
                }
            } catch (err) {
                console.error(err);
                setWorkoutPlan({ workouts: {} });
            }
        };

        fetchWorkoutPlan();
    }, [userId, selectedWeek]);

    const handleWorkoutSelect = (workout) => {
        setSelectedWorkouts((prevSelectedWorkouts) => {
            if (prevSelectedWorkouts.includes(workout._id)) {
                return prevSelectedWorkouts.filter((id) => id !== workout._id);
            } else {
                return [...prevSelectedWorkouts, workout._id];
            }
        });
    };

    const handleWorkoutAssign = (day) => {
        if (selectedWorkouts.length > 0) {
            setWorkoutPlan((prev) => ({
                ...prev,
                workouts: {
                    ...prev.workouts,
                    [day]: [...(prev.workouts[day] || []), ...selectedWorkouts],
                }
            }));
            setSelectedWorkouts([]);
        }
    };

    const handleSaveWorkoutPlan = async () => {
        try {
            const workoutsToSave = Object.entries(workoutPlan.workouts).flatMap(([day, workoutIds]) =>
                workoutIds.map((workoutId) => {
                    const workout = workouts.find(workout => workout._id === workoutId);
                    return { day, workout: workoutId, title: workout ? workout.title : "Unknown Workout" };
                })
            );
    
            console.log("Saving the following workout plan:", {
                userId,
                week: selectedWeek,
                workouts: workoutsToSave,
            });
    
            const response = await axios.post('/workout-planner/save-workout-plan', {
                userId,
                week: selectedWeek,
                workouts: workoutsToSave,
            });
    
            toast(response.data.message, { autoClose: 2000 });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || "An error occurred. Please try again." + error);
        }
    };

    const handleWorkoutRemove = (day, workoutId) => {
        setWorkoutPlan((prev) => {
            const updatedWorkouts = prev.workouts[day].filter(id => id !== workoutId);
            return {
                ...prev,
                workouts: {
                    ...prev.workouts,
                    [day]: updatedWorkouts,
                },
            };
        });
    };

    return (
        <div className="workout-planner-container">
            <header className="workout-planner-header py-3 px-6 bg-white-dark rounded-xl flex flex-row-reverse items-center gap-6">
                <div className='w-[50%]'>
                    <h2 className='font-teko text-4xl font-semibold'>Create a Weekly Workout Plan</h2>
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
            <main className="workout-planner-main">
                <div className="workouts-list mb-12">
                    {loading ? <WorkoutSkeleton /> : (
                        <ul className='list-none flex gap-4 flex-wrap justify-center'>
                            {workouts && workouts.map((workout, index) => (
                                <li key={index} className="w-full md:w-[400px] bg-white-dark rounded-xl p-4 flex flex-col justify-between">
                                    <h1 className="font-teko text-2xl uppercase mt-2 font-semibold">{workout.title}</h1>
                                    <h2 className="font-poppins capitalize mt-2 font-semibold">Description: {workout.description}</h2>
                                    <div className="relative w-full h-[200px] shadow-2xl">
                                        <video crossOrigin='anonymous' className="object-cover w-full h-full rounded-lg" controls>
                                            <source src={workout.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <button className={`${selectedWorkouts.includes(workout._id) ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary-dark"} font-poppins font-semibold shadow-xl w-full py-3 px-6 rounded-xl mt-6`} onClick={() => handleWorkoutSelect(workout)}>
                                        {selectedWorkouts.includes(workout._id) ? 'Unselect' : 'Select'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
            <div className="workout-planner-aside">
                <div className='sticky top-20 right-0 bg-white-dark rounded-xl p-3'>
                    <h1 className='font-teko font-semibold text-2xl'>Select a day to assign workouts.</h1>
                    <div className='flex flex-col gap-2'>
                        {daysOfWeek.map((day) => (
                            <div className='bg-black p-3 rounded-lg text-white-light' key={day}>
                                <div className='flex justify-between items-center'>
                                    <h3 className='font-bold'>{day}</h3>
                                    <button className={`${selectedWorkouts && selectedWorkouts.length > 0 ? "bg-primary hover:bg-primary-dark" : "bg-gray"} p-2 text-black font-teko font-semibold rounded-full`} onClick={() => handleWorkoutAssign(day)}>
                                        {workoutPlan.workouts && workoutPlan.workouts[day] ? 'Add More Workouts' : 'Assign Workouts'}
                                    </button>
                                </div>
                                {workoutPlan.workouts && workoutPlan.workouts[day] && (
                                    <div className='mt-1'>
                                        <h1>Assigned Workouts:</h1>
                                        <ul className='bg-white-dark p-1 rounded-lg flex flex-col gap-5 overflow-y-auto'>
                                            {workoutPlan.workouts[day].map((workoutId) => {
                                                const workout = workouts.find((workout) => workout._id === workoutId);
                                                return (
                                                    <li className={`text-black capitalize font-semibold bg-slate-600 p-2 rounded`} key={workoutId}>
                                                        <h3 className='text-white'>{workout ? workout.title : 'Unknown Workout'}</h3>
                                                        <hr />
                                                        <button className='mt-5 py-1 px-3 rounded bg-red-500 hover:bg-red-600 text-white' onClick={() => handleWorkoutRemove(day, workoutId)}>Remove</button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className='bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl w-full mt-2 font-semibold font-poppins' onClick={handleSaveWorkoutPlan}>Save Workout Plan</button>
                </div>
            </div>
        </div>
    );
};

export default WorkoutPlanner;