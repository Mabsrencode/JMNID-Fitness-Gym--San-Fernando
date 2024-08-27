import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const handleClick = () => {
        setShowPasswords(!showPasswords);
    }
    const location = useNavigate();
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
        <form className='w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div className='w-full relative'>
                    <label className='text-black w-full text-2xl' htmlFor="username">Username</label>
                    <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('username', {
                        required: {
                            value: true,
                            message: "Username is required"
                        }, maxLength: {
                            value: 30,
                            message: "Username must be at most 30 characters long"
                        }
                    })} id='username' type="text" placeholder="Username" />
                </div>
                {errors.username && <span className='font-poppins font-semibold text-xs text-red'>{errors.username.message}</span>}
            </div>
            <div>
                <div className='w-full relative'>
                    <label className='text-black w-full text-2xl' htmlFor="email">Email</label>
                    <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('email', {
                        required: {
                            value: true,
                            message: "Email is required"
                        },
                        pattern: {
                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Invalid email format'
                        }, maxLength: {
                            value: 30,
                            message: "Email must be at most 30 characters long"
                        }
                    })} id='email' type="text" placeholder="Email" />
                </div>
                {errors.email && <span className='font-poppins font-semibold text-xs text-red'>{errors.email.message}</span>}
            </div>
            <div>
                <div className='w-full relative'>
                    {showPasswords ? <FaEye className='absolute right-[14px] bottom-[14px] text-[20px] cursor-pointer' onClick={handleClick} /> : <FaEyeSlash className='absolute right-[14px] bottom-[14px] text-[20px] cursor-pointer' onClick={handleClick} />}
                    <label className='text-black w-full text-2xl' htmlFor="password">Password</label>
                    <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('password', {
                        required: {
                            value: true,
                            message: "Password is required"
                        }, maxLength: {
                            value: 30,
                            message: "Password must be at most 30 characters long"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        }
                    })} id='password' type={showPasswords ? "text" : "password"} placeholder="Password" />
                </div>
                {errors.password && <span className='font-poppins font-semibold text-xs text-red'>{errors.password.message}</span>}
            </div>
            <div>
                <div className='w-full relative'>
                    <label className='text-black w-full text-2xl' htmlFor="cpassword">Confirm Password</label>
                    <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('cpassword', {
                        required: {
                            value: true,
                            message: "Confirm Password is required"
                        }, maxLength: {
                            value: 30,
                            message: "Password must be at most 30 characters long"
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        }
                    })} id='cpassword' type={showPasswords ? "text" : "password"} placeholder="Password" />
                </div>
                {errors.password && <span className='font-poppins font-semibold text-xs text-red'>{errors.password.message}</span>}
            </div>
            <button className='text-nowrap text-center font-semibold text-white md:text-white md:font-semibold rounded-full transition-all hover:opacity-75 py-2 bg-primary-dark' type="submit">Sign Up</button>
            <div>
                <Link className='underline font-poppins text-sm font-semibold text-center block mt-2' to={"/sign-in"}>Already have an account? <span className='text-primary-dark'>Sign In</span></Link>
            </div>
        </form>
    )
}

export default SignUpForm