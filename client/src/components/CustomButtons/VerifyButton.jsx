import React, { useState } from 'react';
import axios from 'axios';

const VerifyButton = ({ _id, status, handleFunction }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        try {
            setLoading(true);
            await axios.patch(`/client/verify/${_id}`, { membership_status: 'verified' });
        } catch (error) {
            console.error('Error updating verification status:', error);
        } finally {
            setLoading(false);
            handleFunction()
        }
    };

    return (
        <button
            disabled={loading || status === 'verified' || status === 'declined'}
            className='px-6 h-9 rounded-xl bg-primary disabled:bg-gray-light disabled:opacity-[0.5] font-semibold font-poppins'
            onClick={handleClick}
        >
            {loading ? "Processing..." : "Verify"}
        </button>
    );
};

export default VerifyButton;
