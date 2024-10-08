import { useUser } from '../../context/UserContext';
import React, { useState, useEffect, useId } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyWorkouts = () => {
    const user = useUser();
    const [dailyPlans, setDailyPlans] = useState({});
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchPlans = async () => {
        const userId = user?.user?._id;
    
        if (!userId) {
            console.error("Error: Invalid user ID.");
            return;
        }
    
        console.log('Data Fetch: ', { userId });
    
        try {
            // Fetch all workout plans
            const workoutResponse = await fetch(`http://localhost:4000/workout-planner/${userId}/plan`);
            const workoutData = await workoutResponse.json();
    
            // Fetch all meal plans
            const mealResponse = await fetch(`http://localhost:4000/meal-planner/${userId}/plan`);
            const mealData = await mealResponse.json();
    
            // Check if data is valid
            if (!workoutData || !mealData || 
                (Array.isArray(workoutData.workoutPlan) && workoutData.workoutPlan.length === 0) || 
                (Array.isArray(mealData.mealPlan) && mealData.mealPlan.length === 0)) {
                throw new Error('No workout or meal plans found.');
            }
    
            // Set the fetched plans
            setDailyPlans({
                workoutPlan: workoutData.workoutPlan || null,
                mealPlan: mealData.mealPlan || null,
            });
    
            // Create events for the calendar
            const newEvents = [];
    
            // Process workout plans
            if (workoutData.workoutPlan?.workouts) {
                workoutData.workoutPlan.workouts.forEach((workout) => {
                    newEvents.push({
                        start: new Date(), // Using current date as a placeholder
                        end: new Date(),   // Using current date as a placeholder
                        title: `Workout: ${workout.title}`,
                    });
                });
            }
    
            // Process meal plans
            if (mealData.mealPlan) {
                mealData.mealPlan.forEach((mealPlan) => {
                    const weekDate = new Date(mealPlan.week);
                    mealPlan.meals.forEach((meal) => {
                        newEvents.push({
                            start: weekDate, // Use the week date from the meal plan
                            end: weekDate,   // End date same as start for one-day meals
                            title: `Meal: ${meal.mealName} (${meal.day})`, // Include day in title for clarity
                        });
                    });
                });
            }
    
            setEvents(newEvents);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);
    

    const fetchPlansForDate = async (date) => {
        const userId = user?.user?._id;

        if (!date) {
            console.error("Error: Invalid date passed to fetchPlansForDate.");
            return;
        }

        const selectedDateISO = moment(date).format('YYYY-MM-DD');
        console.log('Data Fetch: ', {
            userId: userId,
            selectedDate: selectedDateISO,
        });

        try {
            const workoutResponse = await fetch(`http://localhost:4000/workout-planner/${userId}?week=${selectedDateISO}`);
            const workoutData = await workoutResponse.json();

            const mealResponse = await fetch(`http://localhost:4000/meal-planner/${userId}?week=${selectedDateISO}`);
            const mealData = await mealResponse.json();

            if (!workoutData || !mealData || 
                (Array.isArray(workoutData.workoutPlan) && workoutData.workoutPlan.length === 0) || 
                (Array.isArray(mealData.mealPlan) && mealData.mealPlan.length === 0)) {
                throw new Error('No workout or meal plans found for this date.');
            }

            // Set the fetched plans for the selected date
            setDailyPlans((prev) => ({
                ...prev,
                [selectedDateISO]: {
                    workoutPlan: workoutData.workoutPlan || null,
                    mealPlan: mealData.mealPlan || null,
                },
            }));
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, [])

    const handleSelectSlot = (slotInfo) => {
        const selectedDate = slotInfo.start;
        console.log('Slot Info Start:', selectedDate);
        setSelectedDate(selectedDate);
        fetchPlansForDate(selectedDate);
    };

    return (
        <div className="text-white min-h-screen flex flex-col items-center p-6">
            <h1 className='text-white text-3xl font-bold mb-4'>My Workouts and Meal Plans</h1>
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6 w-full max-w-3x2">
                <Calendar
                    localizer={localizer}
                    selectable
                    views={['month']}
                    defaultView="month"
                    onSelectSlot={handleSelectSlot}
                    events={events} // Pass events to the calendar
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    className="rounded-lg"
                />
            </div>
            {selectedDate && (
                <div className="bg-gray-800 rounded-lg shadow-lg p-4 w-full max-w-3xl mb-4">
                    <h2 className="text-white text-xl font-semibold mb-2">Plans for {moment(selectedDate).format('MMMM Do YYYY')}</h2>
                    <div className="mb-4">
                        <h1 className="text-white mb-5">Workout Plan</h1>
                        {dailyPlans[moment(selectedDate).format('YYYY-MM-DD')]?.workoutPlan ? (
                            <div className="text-gray-200">
                                {dailyPlans[moment(selectedDate).format('YYYY-MM-DD')].workoutPlan.workouts.map((workout, index) => (
                                    <div key={index} className="text-gray-200">
                                        <p>Title: <b>{workout.title}</b></p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No workout plan found for this day.</p>
                        )}
                    </div>
                    <hr />
                    <div>
                        <h1 className="text-white mb-5">Meal Plan</h1>
                        {dailyPlans[moment(selectedDate).format('YYYY-MM-DD')]?.mealPlan ? (
                            <div>
                                {dailyPlans[moment(selectedDate).format('YYYY-MM-DD')].mealPlan.meals.map((meal, index) => (
                                    <div key={index} className="text-gray-200">
                                        <p>Name: <b>{meal.mealName}</b></p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No meal plan found for this day.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyWorkouts;
