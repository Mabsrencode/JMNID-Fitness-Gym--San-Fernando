import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
const SignForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation()
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await axios.post('/auth/register', {
                username: data.username,
                email: data.email,
                password: data.password
            }, { withCredentials: true })
            location('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message || error.message);
        }
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username</label>
                <input {...register('username', {
                    required: true, maxLength: {
                        value: 30,
                        message: "Username must be at most 30 characters long"
                    }
                })} id='username' type="text" placeholder="Username" />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id='password' type="password" placeholder="Password" />
            </div>
            <button type="submit">Sign In</button>
            <Link to={"/forgot-password"}>Forgot Password?</Link>
        </form>
    )
}

export default SignForm