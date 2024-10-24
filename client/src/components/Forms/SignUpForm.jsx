import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import ectomorph from '../../assets/images/ectomorph.jpg';
import mesomorph from '../../assets/images/mesomorph.jpg';
import endomorph from '../../assets/images/endormorph.jpg';
import shredded from '../../assets/images/shredded.jpg';
import lean from '../../assets/images/lean.jpg';
import defined from '../../assets/images/defined.jpg';
import bulky from '../../assets/images/bulky.jpg';
import athletic from '../../assets/images/athletic.jpg';
import fit from '../../assets/images/fit.jpg';
import curvy from '../../assets/images/curvy.jpg';
import powerlifter from '../../assets/images/powerlifter.jpg';
import functional from '../../assets/images/functional.jpg';

const BodyGoals = ({ onGoalSelect, selectedGoal }) => {

    console.log('Selected goals: ', selectedGoal);

    const bodyGoals = [
        { name: 'Ectomorph', description: 'A body type characterized by a slim build and difficulty gaining weight.', image: ectomorph },
        { name: 'Mesomorph', description: 'A naturally muscular body type that can easily gain or lose weight.', image: mesomorph },
        { name: 'Endomorph', description: 'A body type with a rounder physique that finds it easier to gain weight.', image: endomorph },
        { name: 'Shredded', description: 'Refers to having low body fat with well-defined muscles.', image: shredded },
        { name: 'Lean', description: 'A body type that is low in body fat but not necessarily muscular.', image: lean },
        { name: 'Defined', description: 'A body with noticeable muscle separation and low body fat.', image: defined },
        { name: 'Bulky', description: 'A muscular physique with significant muscle mass.', image: bulky },
        { name: 'Athletic', description: 'A well-proportioned body that is strong and agile.', image: athletic },
        { name: 'Fit', description: 'A general term implying a healthy body with good muscle tone and cardiovascular fitness.', image: fit },
        { name: 'Curvy', description: 'A body type that emphasizes natural curves.', image: curvy },
        { name: 'Powerlifter', description: 'A focus on strength rather than aesthetics, resulting in a robust appearance.', image: powerlifter },
        { name: 'Functional', description: 'A body optimized for everyday activities, emphasizing strength and mobility.', image: functional },
    ];

    return (
        <div className='w-full md:w-[600px] bg-white-light px-6 py-3 rounded-xl m-10'>
            <h2 className='text-2xl mb-4'>Body Goals</h2>
            <div className='grid grid-cols-2 gap-4'>
                {bodyGoals.map((goal) => (
                    <div
                        key={goal.name}
                        className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-200 ${selectedGoal === goal.name ? 'border-primary' : 'border-gray-300'}`}
                        onClick={() => onGoalSelect(goal.name)}
                    >
                        <img src={goal.image} alt={goal.name} className="w-12 h-12 rounded-full mb-2" />
                        <h3 className='text-lg font-semibold'>{goal.name}</h3>
                        <p className='text-sm text-gray-600'>{goal.description}</p>
                    </div>
                ))}
            </div>
            <br />
            {selectedGoal && (
                <div className='mt-4'>
                    <h3 className='text-lg font-semibold'>Selected Goal:</h3>
                    <p>{selectedGoal}</p>
                </div>
            )}
        </div>
    );
};

const BodyAssessment = ({ onAssessmentChange, assessmentData }) => {
    const [error, setError] = useState('');

    const calculateBMI = () => {
        const { height, weight } = assessmentData;
        if (height && weight) {
            const heightNum = parseFloat(height);
            const weightNum = parseFloat(weight);

            // Validation
            if (heightNum <= 0 || weightNum <= 0) {
                setError('Height and weight must be positive numbers.');
                return;
            }

            setError('');
            const bmiValue = (weightNum / ((heightNum / 100) ** 2)).toFixed(2); // Height in cm to meters
            onAssessmentChange({ ...assessmentData, bmi: bmiValue });
        } else {
            setError('Please enter both height and weight.');
        }
    };

    const bodyTypes = {
        ectomorph: ectomorph,
        mesomorph: mesomorph,
        endomorph: endomorph
    }

    return (
        <div className='w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl'>
            <h2 className='text-2xl'>Body Assessment</h2>

            <div>
                <label className='text-black w-full text-lg' htmlFor='height'>Height (cm)</label>
                <input
                    type='number'
                    id='height'
                    value={assessmentData.height}
                    onChange={(e) => onAssessmentChange({ ...assessmentData, height: e.target.value })}
                    className='border-2 border-primary w-full px-4 py-2 rounded-xl'
                    placeholder='Enter your height in cm'
                    required
                />
            </div>

            <div>
                <label className='text-black w-full text-lg' htmlFor='weight'>Weight (kg)</label>
                <input
                    type='number'
                    id='weight'
                    value={assessmentData.weight}
                    onChange={(e) => onAssessmentChange({ ...assessmentData, weight: e.target.value })}
                    className='border-2 border-primary w-full px-4 py-2 rounded-xl'
                    placeholder='Enter your weight in kg'
                    required
                />
            </div>

            {error && <span className='text-red-600'>{error}</span>}

            <button
                onClick={calculateBMI}
                className='w-full bg-primary text-white px-4 py-2 rounded-xl'>
                Calculate BMI
            </button>

            {assessmentData.bmi && (
                <div>
                    <h3 className='text-lg'>Your BMI is: {assessmentData.bmi}</h3>
                </div>
            )}

            <div>
                <label className='text-black w-full text-lg' htmlFor='bodyType'>Select Body Type</label>
                <select
                    id='bodyType'
                    required
                    value={assessmentData.bodyType}
                    onChange={(e) => onAssessmentChange({ ...assessmentData, bodyType: e.target.value })}
                    className='border-2 border-primary w-full px-4 py-2 rounded-xl'>
                    <option value="">Select Body Type</option>
                    <option value="ectomorph">Ectomorph</option>
                    <option value="mesomorph">Mesomorph</option>
                    <option value="endomorph">Endomorph</option>
                </select>
            </div>

            {assessmentData.bodyType && (
                <div className='mt-4'>
                    <h3 className='text-lg'>Your Body Type: {assessmentData.bodyType.charAt(0).toUpperCase() + assessmentData.bodyType.slice(1)}</h3>
                    <img src={bodyTypes[assessmentData.bodyType]} alt="Body Type" width={120} height={100} />
                </div>
            )}
        </div>
    );
};

const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showPasswords, setShowPasswords] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isCodeSent, setIsCodeSent] = useState(false);

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [activeTab, setActiveTab] = useState('signup');

    const [selectedGoal, setSelectedGoal] = useState(null);
    const [assessmentData, setAssessmentData] = useState({ height: '', weight: '', bmi: null, bodyType: '' });

    const TabBar = () => (
        <div className="absolute top-0 left-0 mt-4 ml-4">
            <button
                onClick={() => setActiveTab('signup')}
                className={`px-4 py-2 ${activeTab === 'signup' ? 'bg-primary text-white' : 'bg-gray-200'} rounded-l-lg`}>
                Sign Up
            </button>
            <button
                onClick={() => setActiveTab('assessment')}
                className={`px-4 py-2 ${activeTab === 'assessment' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                Body Assessment
            </button>
            <button
                onClick={() => setActiveTab('body-goals')}
                className={`px-4 py-2 ${activeTab === 'body-goals' ? 'bg-primary text-white' : 'bg-gray-200'} rounded-r-lg`}>
                Body Goals
            </button>
        </div>
    );

    useEffect(() => {
        console.log("is Email Verified", isEmailVerified);
    });

    useEffect(() => {
        const verifyCookie = async () => {
            const { data } = await axios.post("/auth", {}, { withCredentials: true });
            setUser(data);
            if (data && data.status) {
                navigate(-1);
            }
        };
        verifyCookie();
    }, [navigate]);

    const handleClick = () => {
        setShowPasswords(!showPasswords);
    };

    const sendVerificationEmail = async (email) => {
        try {
            setIsLoading(true);
            const response = await axios.post('/verify-email/send-verification-code', { email });
            localStorage.setItem('verificationCode', response.data.code);
            localStorage.setItem('userEmail', response.data.email);
            setIsLoading(false);
            alert('Verification code sent successfully! Please check your email.');
        } catch (error) {
            console.error('Error sending verification email:', error);
            alert('Error sending verification email. Please try again later.');
        }
    };

    const handleVerifyCode = async (enteredCode) => {
        const storedCode = localStorage.getItem('verificationCode');
        if (storedCode && storedCode === enteredCode) {
            // Set email verified
            setIsEmailVerified(true);
            alert('Successfully verified email');
            localStorage.removeItem('verificationCode'); // Clear code after successful verification
        } else {
            alert('Invalid code entered. Please check your email for the correct verification code.');
        }
    };

    const handleSendCode = async () => {
        const isValid = await trigger("email");
        if (isValid) {
            const email = getValues('email');
            await sendVerificationEmail(email);
            setIsCodeSent(true);
        }
    };

    const onSubmit = async (data) => {

        if (isEmailVerified === false) {
            setError("Please verified your email");
        }

        if (data.password !== data.cpassword) {
            setError("Passwords do not match.");
            return;
        }

        setIsLoading(true);

        console.log('Email_verified', isEmailVerified);

        // Prepare the data for registration
        const registrationData = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            cpassword: data.cpassword,
            fitness_goals: [selectedGoal],
            body_assessment: {
                height: assessmentData.height,
                weight: assessmentData.weight,
                bmi: assessmentData.bmi,
            },
            body_type: assessmentData.bodyType,
        };

        // Log the registration data to the console
        console.log("Registration Data:", registrationData);

        try {
            const response = await axios.post('/auth/register', {
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                cpassword: data.cpassword,
                fitness_goals: [selectedGoal],
                body_assessment: {
                    height: assessmentData.height,
                    weight: assessmentData.weight,
                    bmi: assessmentData.bmi,
                },
                body_type: assessmentData.bodyType,
            }, { withCredentials: true });
            navigate('/client');
            console.log("Response: ", response.data);
            window.location.reload();

            if (response.status === 400) {
                console.log('Response:', response);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <TabBar />
            {activeTab === 'signup' && (
                <form className='w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="username">Username</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('username', {
                                    required: "Username is required",
                                    maxLength: {
                                        value: 30,
                                        message: "Username must be at most 30 characters long"
                                    }
                                })} id='username' type="text" placeholder="Username" />
                            </div>
                            {errors.username && <span className='font-poppins font-semibold text-xs text-red'>{errors.username.message}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className='md:w-5/6 w-full'>
                            <label className='text-black w-full text-2xl' htmlFor="email">Email</label>
                            <input className='border-2 border-primary w-full px-4 py-3 rounded-xl' {...register('email', {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: 'Invalid email format'
                                },
                                maxLength: {
                                    value: 150,
                                    message: "Email must be at most 150 characters long"
                                }
                            })} id='email' type="text" placeholder="Email" />
                            {errors.email && <span className='font-poppins font-semibold text-xs text-red'>{errors.email.message}</span>}
                        </div>
                        <div className='md:w-1/4 w-full'>
                            <button
                                onClick={handleSendCode}
                                type="button"
                                className='w-full border-2 border-primary bg-primary text-white px-4 py-3 rounded mt-4 md:mt-10'
                            >
                                Send Code
                            </button>
                        </div>
                    </div>

                    {isCodeSent && (
                        <div className="flex flex-col md:flex-row gap-2 mt-2">
                            <div className='w-full'>
                                <label className='text-black w-full text-2xl' htmlFor="verificationCode">Verification Code</label>
                                <input
                                    className='border-2 border-primary w-full px-6 py-3 rounded-xl'
                                    {...register('verificationCode', {
                                        required: "Verification code is required",
                                        maxLength: { value: 6, message: "Verification code must be 6 digits long" }
                                    })}
                                    id='verificationCode'
                                    type="text"
                                    placeholder="Enter verification code"
                                />
                                {errors.verificationCode && <span className='font-poppins font-semibold text-xs text-red'>{errors.verificationCode.message}</span>}
                            </div>
                            <button
                                onClick={() => handleVerifyCode(getValues("verificationCode"))}
                                type="button"
                                className='border-2 border-primary bg-primary text-white px-5 rounded'>
                                Verify
                            </button>
                        </div>
                    )}

                    <div className='flex gap-4'>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="firstName">First Name</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('firstName', {
                                    required: "First Name is required",
                                    maxLength: {
                                        value: 30,
                                        message: "First Name must be at most 30 characters long"
                                    }
                                })} id='firstName' type="text" placeholder="First Name" />
                            </div>
                            {errors.firstName && <span className='font-poppins font-semibold text-xs text-red'>{errors.firstName.message}</span>}
                        </div>
                        <div className='flex-1'>
                            <div className='w-full relative'>
                                <label className='text-black w-full text-2xl' htmlFor="lastName">Last Name</label>
                                <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('lastName', {
                                    required: "Last Name is required",
                                    maxLength: {
                                        value: 30,
                                        message: "Last Name must be at most 30 characters long"
                                    }
                                })} id='lastName' type="text" placeholder="Last Name" />
                            </div>
                            {errors.lastName && <span className='font-poppins font-semibold text-xs text-red'>{errors.lastName.message}</span>}
                        </div>
                    </div>

                    <div>
                        <div className='w-full relative'>
                            {showPasswords ? <FaEye className='absolute right-[14px] bottom-[14px] text-[20px] cursor-pointer' onClick={handleClick} /> : <FaEyeSlash className='absolute right-[14px] bottom-[14px] text-[20px] cursor-pointer' onClick={handleClick} />}
                            <label className='text-black w-full text-2xl' htmlFor="password">Password</label>
                            <input className='border-2 border-primary w-full px-6 py-3 rounded-xl' {...register('password', {
                                required: "Password is required",
                                maxLength: {
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
                                required: "Confirm Password is required",
                                maxLength: {
                                    value: 30,
                                    message: "Password must be at most 30 characters long"
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                }
                            })} id='cpassword' type={showPasswords ? "text" : "password"} placeholder="Confirm Password" />
                        </div>
                        {errors.cpassword && <span className='font-poppins font-semibold text-xs text-red'>{errors.cpassword.message}</span>}
                    </div>
                    <button className='text-nowrap text-center font-semibold text-white md:text-white md:font-semibold rounded-full transition-all hover:opacity-75 py-2 bg-primary-dark' type="submit">
                        {isLoading ? <AiOutlineLoading3Quarters className='mx-auto text-[24px] animate-spin' /> : "Sign Up"}
                    </button>
                    {error && <span className='font-poppins font-semibold text-xs text-red'>{error}</span>}
                    <div>
                        <Link className='underline text-gray-light font-poppins text-xs font-semibold text-center block mt-2' to={"/sign-in"}>
                            Already have an account? <span className='text-primary-dark'>Sign In</span>
                        </Link>
                    </div>
                </form>
            )};
            {activeTab === 'assessment' && (
                <>
                    <div>
                        <BodyAssessment
                            onAssessmentChange={setAssessmentData}
                            assessmentData={assessmentData}
                        />
                    </div>
                </>
            )};
            {activeTab === 'body-goals' && (
                <>
                    <BodyGoals
                        onGoalSelect={setSelectedGoal}
                        selectedGoal={selectedGoal}
                    />
                </>
            )};
        </>
    );
}

export default SignUpForm;