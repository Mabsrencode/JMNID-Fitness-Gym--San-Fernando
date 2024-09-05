import React, { useState } from 'react';
import axios from 'axios';
const DeclineButton = ({ _id, status, handleFunction }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            await axios.patch(`/client/verify/${_id}`, { membership_status: 'declined' });
        } catch (error) {
            console.error('Error updating decline status:', error);
        } finally {
            setLoading(false);
            handleFunction()
        }
    };

    return (
        <button
            disabled={loading || status === 'verified'}
            className='px-6 h-9 rounded-xl bg-red-700 disabled:bg-red-500 disabled:opacity-[0.5] font-semibold font-poppins'
            onClick={handleClick}
        >
            {loading ? "Processing..." : "Decline"}
        </button>
    );
};

export default DeclineButton;
