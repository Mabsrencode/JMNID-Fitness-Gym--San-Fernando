import { useUser } from '../../context/UserContext';
const React = require('react');
const { useState } = React;
const { Calendar, momentLocalizer } = require('react-big-calendar');
const moment = require('moment');
require('react-big-calendar/lib/css/react-big-calendar.css');

const localizer = momentLocalizer(moment);

const MyWorkouts = () => {
    const user = useUser();
    const [dailyPlans, setDailyPlans] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchPlansForDate = async (date) => {
        const userId = user?.user?._id;
    
        if (!date) {
            console.error("Error: Invalid date passed to fetchPlansForDate.");
            return;
        }
    
        console.log('Selected Data: ' + selectedDate);
        const selectedDateISO = moment(date).format('YYYY-MM-DD');
        console.log('Selected Date ISO:', selectedDateISO);
    
        console.log('Data Fetch: ', {
            userId: userId,
            selectedDate: selectedDateISO,
            url: `http://localhost:4000/meal-planner/${userId}?week=${selectedDateISO}`
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