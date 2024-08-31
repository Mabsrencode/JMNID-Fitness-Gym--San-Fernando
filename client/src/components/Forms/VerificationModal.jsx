import React, { useState } from 'react';

const VerificationModal = ({ onSubmit, isOpen, onClose }) => {
    const [code, setCode] = useState('');

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(code);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-lg w-80">
                <h2 className="text-xl mb-4">Email Verification</h2>
                <input
                    type="text"
                    value={code}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    placeholder="Enter Verification Code"
                />
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
                >
                    Verify
                </button>
                <button onClick={onClose} className="text-red-500 mt-2">Close</button>
            </div>
        </div>
    );
};

export default VerificationModal;
