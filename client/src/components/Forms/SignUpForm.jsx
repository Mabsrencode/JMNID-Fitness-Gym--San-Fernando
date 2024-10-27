//! MUlTI FORM SIGN UP
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

// Import all images
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

const BODY_GOALS = [
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

const BODY_TYPES = {
  ectomorph,
  mesomorph,
  endomorph
};

const TabBar = ({ activeTab, setActiveTab }) => (
  <div className="absolute top-0 left-0 mt-4 ml-4">
    {['assessment', 'body-goals', 'signup'].map((tab, index) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-4 py-2 
          ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-200'}
          ${index === 0 ? 'rounded-l-lg' : index === 2 ? 'rounded-r-lg' : ''}`}
      >
        {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </button>
    ))}
  </div>
);

const BodyGoals = ({ onGoalSelect, selectedGoal, onNext }) => {
  const handleSubmit = () => {
    if (!selectedGoal) {
      alert("Please select a goal first");
      return;
    }
    onNext();
  };

  return (
    <div className="w-full md:w-[600px] bg-white-light px-6 py-3 rounded-xl m-10">
      <h2 className="text-2xl mb-4">Body Goals</h2>
      <div className="grid grid-cols-2 gap-4">
        {BODY_GOALS.map((goal) => (
          <div
            key={goal.name}
            className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-200 
              ${selectedGoal === goal.name ? 'border-primary' : 'border-gray-300'}`}
            onClick={() => onGoalSelect(goal.name)}
          >
            <img src={goal.image} alt={goal.name} className="w-12 h-12 rounded-full mb-2" />
            <h3 className="text-lg font-semibold">{goal.name}</h3>
            <p className="text-sm text-gray-600">{goal.description}</p>
          </div>
        ))}
      </div>
      {selectedGoal && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Selected Goal:</h3>
          <p>{selectedGoal}</p>
        </div>
      )}
      <button 
        className="w-full bg-primary px-4 py-2 text-white mt-4" 
        onClick={handleSubmit}
      >
        NEXT
      </button>
    </div>
  );
};

const BodyAssessment = ({ onAssessmentChange, assessmentData, onNext }) => {
  const [error, setError] = useState('');
  const { height, weight, bodyType } = assessmentData;

  const validateInputs = (height, weight) => {
    if (!height || !weight) return 'Please enter both height and weight.';
    const heightNum = parseInt(height, 10);
    const weightNum = parseInt(weight, 10);

    if (isNaN(heightNum) || isNaN(weightNum)) return 'Height and weight must be numbers.';
    if (heightNum <= 0 || weightNum <= 0) return 'Height and weight must be positive numbers.';
    if (heightNum < 50 || heightNum > 250) return 'Height must be between 50 cm and 250 cm.';
    if (weightNum < 3 || weightNum > 300) return 'Weight must be between 3 kg and 300 kg.';
    if (!Number.isInteger(heightNum) || !Number.isInteger(weightNum)) return 'Height and weight must be whole numbers.';

    return '';
  };

  const calculateBMI = () => {
    const validationError = validateInputs(height, weight);
    if (validationError) {
      setError(validationError);
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters ** 2)).toFixed(2);
    onAssessmentChange({ ...assessmentData, bmi });
    setError('');
  };

  const handleSubmit = () => {
    if (!height || !weight || !bodyType) {
      alert("Please complete all fields first");
      return;
    }
    onNext();
  };

  return (
    <div className="w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl">
      <h2 className="text-2xl">Body Assessment</h2>
      <div>
        <label className="text-black w-full text-lg" htmlFor="height">Height (cm)</label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) => onAssessmentChange({ ...assessmentData, height: e.target.value })}
          className="border-2 border-primary w-full px-4 py-2 rounded-xl"
          placeholder="Enter your height in cm"
          required
        />
      </div>
      <div>
        <label className="text-black w-full text-lg" htmlFor="weight">Weight (kg)</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => onAssessmentChange({ ...assessmentData, weight: e.target.value })}
          className="border-2 border-primary w-full px-4 py-2 rounded-xl"
          placeholder="Enter your weight in kg"
          required
        />
      </div>
      {error && <span className="text-red-600">{error}</span>}
      <button
        onClick={calculateBMI}
        className="w-full bg-primary text-white px-4 py-2 rounded-xl"
      >
        Calculate BMI
      </button>
      {assessmentData.bmi && (
        <div>
          <h3 className="text-lg">Your BMI is: {assessmentData.bmi}</h3>
        </div>
      )}
      <div>
        <label className="text-black w-full text-lg" htmlFor="bodyType">Select Body Type</label>
        <select
          id="bodyType"
          value={bodyType}
          onChange={(e) => onAssessmentChange({ ...assessmentData, bodyType: e.target.value })}
          className="border-2 border-primary w-full px-4 py-2 rounded-xl"
          required
        >
          <option value="" disabled>Select Body Type</option>
          {Object.keys(BODY_TYPES).map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {bodyType && (
        <div className="mt-4">
          <h3 className="text-lg">
            Your Body Type: {bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}
          </h3>
          <img src={BODY_TYPES[bodyType]} alt="Body Type" width={120} height={100} />
        </div>
      )}
      <button 
        className="w-full bg-primary px-4 py-2 text-white" 
        onClick={handleSubmit}
      >
        NEXT
      </button>
    </div>
  );
};

const SignUpForm = () => {
  const { register, handleSubmit, formState: { errors }, getValues, trigger } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [activeTab, setActiveTab] = useState('assessment');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [assessmentData, setAssessmentData] = useState({ 
    height: '', 
    weight: '', 
    bmi: null, 
    bodyType: '' 
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const verifyCookie = async () => {
      try {
        const { data } = await axios.post("/auth", {}, { withCredentials: true });
        if (data?.status) {
          navigate(-1);
        }
      } catch (error) {
        console.error('Cookie verification failed:', error);
      }
    };
    verifyCookie();
  }, [navigate]);

  const sendVerificationEmail = async (email) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/verify-email/send-verification-code', { email });
      localStorage.setItem('verificationCode', response.data.code);
      localStorage.setItem('userEmail', response.data.email);
      alert('Verification code sent successfully! Please check your email.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Error sending verification email. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (enteredCode) => {
    const storedCode = localStorage.getItem('verificationCode');
    if (storedCode === enteredCode) {
      setIsEmailVerified(true);
      alert('Successfully verified email');
      localStorage.removeItem('verificationCode');
    } else {
      alert('Invalid code entered. Please check your email for the correct verification code.');
    }
  };

  const handleSendCode = async () => {
    const isValid = await trigger("email");
    if (isValid) {
      await sendVerificationEmail(getValues('email'));
      setIsCodeSent(true);
    }
  };

  const onSubmit = async (data) => {
    if (!isEmailVerified) {
      setError("Please verify your email");
      return;
    }

    if (data.password !== data.cpassword) {
      setError("Passwords do not match.");
      return;
    }

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

    try {
      setIsLoading(true);
      const response = await axios.post('/auth/register', registrationData, { 
        withCredentials: true 
      });
      if (response.data) {
        navigate('/client');
        window.location.reload();
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderSignUpForm = () => (
    <form className="w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl" 
          onSubmit={handleSubmit(onSubmit)}>
      {/* Username field */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-black w-full text-2xl" htmlFor="username">
            Username
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            {...register('username', {
              required: "Username is required",
              maxLength: {
                value: 30,
                message: "Username must be at most 30 characters long"
              }
            })}
            id="username"
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <span className="text-red-600 text-sm">{errors.username.message}</span>
          )}
        </div>
      </div>

      {/* Email and verification section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-5/6 w-full">
          <label className="text-black w-full text-2xl" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 border-primary w-full px-4 py-3 rounded-xl"
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'Invalid email format'
              }
            })}
            id="email"
            type="text"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="md:w-1/4 w-full">
          <button
            type="button"
            onClick={handleSendCode}
            className="w-full border-2 border-primary bg-primary text-white px-4 py-3 rounded mt-4 md:mt-10"
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="mx-auto text-[24px] animate-spin" />
            ) : (
              "Send Code"
            )}
          </button>
        </div>
      </div>

      {/* Verification code section */}
      {isCodeSent && (
        <div className="flex flex-col md:flex-row gap-2 mt-2">
          <div className="w-full">
            <label className="text-black w-full text-2xl" htmlFor="verificationCode">
              Verification Code
            </label>
            <input
              className="border-2 border-primary w-full px-6 py-3 rounded-xl"
              {...register('verificationCode', {
                required: "Verification code is required",
                maxLength: { 
                  value: 6, 
                  message: "Verification code must be 6 digits long" 
                }
              })}
              id="verificationCode"
              type="text"
              placeholder="Enter verification code"
            />
            {errors.verificationCode && (
              <span className="text-red-600 text-sm">
                {errors.verificationCode.message}
              </span>
            )}
          </div>
          <button 
            type="button"
            onClick={() => handleVerifyCode(getValues("verificationCode"))}
            className="border-2 border-primary bg-primary text-white px-5 rounded"
          >
            Verify
          </button>
        </div>
      )}

      {/* Name fields */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-black w-full text-2xl" htmlFor="firstName">
            First Name
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            {...register('firstName', {
              required: "First Name is required",
              maxLength: {
                value: 30,
                message: "First Name must be at most 30 characters long"
              }
            })}
            id="firstName"
            type="text"
            placeholder="First Name"
          />
          {errors.firstName && (
            <span className="text-red-600 text-sm">{errors.firstName.message}</span>
          )}
        </div>
        <div className="flex-1">
          <label className="text-black w-full text-2xl" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            {...register('lastName', {
              required: "Last Name is required",
              maxLength: {
                value: 30,
                message: "Last Name must be at most 30 characters long"
              }
            })}
            id="lastName"
            type="text"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <span className="text-red-600 text-sm">{errors.lastName.message}</span>
          )}
        </div>
      </div>

      {/* Password fields */}
      <div>
        <div className="relative">
          <label className="text-black w-full text-2xl" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            {...register('password', {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
              }
            })}
            id="password"
            type={showPasswords ? "text" : "password"}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="absolute right-3 bottom-3"
          >
            {showPasswords ? (
              <FaEye className="text-xl" />
            ) : (
              <FaEyeSlash className="text-xl" />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-600 text-sm">{errors.password.message}</span>
        )}
      </div>

      <div>
        <div className="relative">
          <label className="text-black w-full text-2xl" htmlFor="cpassword">
            Confirm Password
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            {...register('cpassword', {
              required: "Confirm Password is required",
              validate: value => value === getValues('password') || "Passwords do not match"
            })}
            id="cpassword"
            type={showPasswords ? "text" : "password"}
            placeholder="Confirm Password"
          />
        </div>
        {errors.cpassword && (
          <span className="text-red-600 text-sm">{errors.cpassword.message}</span>
        )}
      </div>

      {/* Submit button */}
      <button
        className="text-center font-semibold text-white rounded-full 
                 transition-all hover:opacity-75 py-2 bg-primary-dark"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? (
          <AiOutlineLoading3Quarters className="mx-auto text-2xl animate-spin" />
        ) : (
          "Sign Up"
        )}
      </button>

      {error && <span className="text-red-600 text-sm">{error}</span>}

      {/* Sign in link */}
      <div>
        <Link 
          className="underline text-gray-light text-xs font-semibold text-center block mt-2" 
          to="/sign-in"
        >
          Already have an account? <span className="text-primary-dark">Sign In</span>
        </Link>
      </div>
    </form>
  );

  return (
    <div>
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'assessment' && (
        <BodyAssessment
          assessmentData={assessmentData}
          onAssessmentChange={setAssessmentData}
          onNext={() => setActiveTab('body-goals')}
        />
      )}
      
      {activeTab === 'body-goals' && (
        <BodyGoals
          selectedGoal={selectedGoal}
          onGoalSelect={setSelectedGoal}
          onNext={() => setActiveTab('signup')}
        />
      )}
      
      {activeTab === 'signup' && renderSignUpForm()}
    </div>
  );
};

export default SignUpForm;