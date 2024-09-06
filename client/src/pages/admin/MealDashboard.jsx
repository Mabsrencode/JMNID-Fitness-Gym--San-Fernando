import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import MealModal from '../../components/Modals/MealModal'

const MealDashboard = () => {
    const [mealModal, setMealModal] = useState(false)
    const handleOpenModalMeal = () => setMealModal(!mealModal)
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchAllMeals = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axios.get("/meals/all-meals")
            const data = response?.data || [];
            console.log(response)
            setMeals(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchAllMeals();
    }, [fetchAllMeals])
    return (
        <div className='relative'>
            {mealModal && <MealModal onclick={handleOpenModalMeal} handleRefetch={fetchAllMeals} />}
            <div className='sticky top-0 left-0 w-full bg-white-dark px-6 py-2 rounded-lg'>
                <button className='bg-primary-dark hover:bg-primary-light text-white px-6 py-2 rounded-xl' onClick={handleOpenModalMeal}>
                    Add Meal
                </button>
            </div>
        </div>
    )
}

export default MealDashboard