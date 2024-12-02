/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const AccomplishmentTask = () => {
    const user = useUser();
    const userId = user?.user?._id;
    console.log("user id: ", userId);
    const [accomplishments, setAccomplishments] = useState([]);

    useEffect(() => {
        if (!userId) return;
    
        const fetchAccomplishments = async () => {
            try {
                const response = await axios.get(`/task-history/${userId}`);
                console.log("Response Data", response.data);
    
                const data = Array.isArray(response.data) ? response.data : [response.data];
                
                setAccomplishments(data);
            } catch (error) {
                console.error("Error fetching accomplishments:", error);
            }
        };
    
        fetchAccomplishments();
    }, [userId]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return date.toLocaleDateString('en-US', options);
    };

    const formatDateWithTime = (timestamp) => {
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Accomplishment History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-800 text-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-300 font-semibold">Date</th>
                            <th className="py-3 px-6 text-left text-gray-300 font-semibold">Workouts</th>
                            <th className="py-3 px-6 text-left text-gray-300 font-semibold">Meals</th>
                            <th className="py-3 px-6 text-left text-gray-300 font-semibold">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accomplishments.length > 0 ? (
                            accomplishments.map((accomplishment, index) => (
                                <tr key={index} className="hover:bg-gray-600 transition duration-200">
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        {formatDate(accomplishment.date)}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        {accomplishment.workouts?.join(', ') || 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        {accomplishment.meals?.join(', ') || 'N/A'}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-700">
                                        {formatDateWithTime(accomplishment.createdAt)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-4 px-6 text-center text-gray-500">No accomplishments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccomplishmentTask;