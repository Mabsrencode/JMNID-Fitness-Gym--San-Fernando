import React, { useCallback, useEffect, useState } from 'react';

// Import all images
import ectomorph from '../../assets/images/ectomorph.jpg';
import mesomorph from '../../assets/images/mesomorph.jpg';
import endomorph from '../../assets/images/endormorph.jpg';
import { toast } from 'react-toastify';


const BodyAssessment = ({ onAssessmentChange, assessmentData, onNext }) => {
  const [error, setError] = useState("");
  const { height, weight, bodyType } = assessmentData;
  const [BMIClassification, setBMIClassification] = useState("");
  const BODY_TYPES = {
    ectomorph: {
      image: ectomorph,
      description: "An ectomorph is a body type characterized by a naturally lean and slender build, long limbs, low body fat, and a fast metabolism. They have difficulty gaining both muscle and fat and often require a high-calorie diet to support energy and muscle-building needs. Ectomorphs excel in endurance activities like running but face challenges in strength training due to slower muscle gain. They benefit from a focus on nutrient-dense foods and consistent, targeted exercise to maintain strength and health.",
    },
    mesomorph: {
      image: mesomorph,
      description: "A mesomorph is a body type characterized by a naturally athletic and muscular build, broad shoulders, a narrow waist, and a well-defined physique. They gain muscle and strength easily and tend to have a balanced metabolism, making it relatively easy to maintain a healthy weight. Mesomorphs are well-suited for strength and power-based activities, responding quickly to both cardio and resistance training. They benefit from a balanced diet of protein, carbohydrates, and healthy fats to support their active lifestyle. While mesomorphs often excel in fitness and sports, they should monitor calorie intake to avoid gaining excess fat."
    },
    endomorph: {
      image: endomorph,
      description: "An endomorph is a body type characterized by a naturally rounder and softer physique, with a tendency to store fat more easily. They often have a wider waist, hips, and shoulders, with shorter limbs and a stocky build. Endomorphs typically have a slower metabolism, making weight loss more challenging and requiring careful attention to diet and exercise. While they may struggle with fat gain, endomorphs can build strength and muscle more easily compared to ectomorphs. To maintain a healthy weight, they benefit from a diet rich in lean proteins, vegetables, and healthy fats, along with consistent physical activity, particularly cardio and strength training, to boost metabolism and improve body composition."
    },
  };

  const handleBMIClassification = useCallback(() => {
    const { bmi } = assessmentData;

    if (bmi < 16) {
      setBMIClassification("Severe Thinness");
    } else if (bmi >= 16 && bmi < 17) {
      setBMIClassification("Moderate Thinness");
    } else if (bmi >= 17 && bmi < 18.5) {
      setBMIClassification("Mild Thinness");
    } else if (bmi >= 18.5 && bmi < 25) {
      setBMIClassification("Normal");
    } else if (bmi >= 25 && bmi < 30) {
      setBMIClassification("Overweight");
    } else if (bmi >= 30 && bmi < 35) {
      setBMIClassification("Obese Class I");
    } else if (bmi >= 35 && bmi < 40) {
      setBMIClassification("Obese Class II");
    } else if (bmi >= 40) {
      setBMIClassification("Obese Class III");
    } else {
      setError("Invalid BMI value");
    }
  }, [assessmentData]);

  useEffect(() => {
    handleBMIClassification();
  }, [handleBMIClassification]);
  const validateInputs = (height, weight) => {
    if (!height || !weight) return "Please enter both height and weight.";
    const heightNum = parseInt(height, 10);
    const weightNum = parseInt(weight, 10);

    if (isNaN(heightNum) || isNaN(weightNum))
      return "Height and weight must be numbers.";
    if (heightNum <= 0 || weightNum <= 0)
      return "Height and weight must be positive numbers.";
    if (heightNum < 50 || heightNum > 250)
      return "Height must be between 50 cm and 250 cm.";
    if (weightNum < 3 || weightNum > 300)
      return "Weight must be between 3 kg and 300 kg.";
    if (!Number.isInteger(heightNum) || !Number.isInteger(weightNum))
      return "Height and weight must be whole numbers.";

    return "";
  };

  const calculateBMI = useCallback(() => {
    const validationError = validateInputs(height, weight);
    if (validationError) {
      setError(validationError);
      return;
    }

    const heightInMeters = height / 100;
    const bmi = (weight / heightInMeters ** 2).toFixed(2);
    onAssessmentChange({ ...assessmentData, bmi });
    setError("");
  }, [assessmentData, height, onAssessmentChange, weight]);

  useEffect(() => {
    calculateBMI()
  }, [calculateBMI]);

  const handleSubmit = () => {
    if (!height || !weight || !bodyType) {
      toast.error("Please complete all fields first");
      return;
    }
    onNext();
  };

  return (
    <div className="w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl">
      <h2 className="text-2xl">Body Assessment</h2>
      <div>
        <label className="text-black w-full text-lg" htmlFor="height">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          value={height}
          onChange={(e) =>
            onAssessmentChange({ ...assessmentData, height: e.target.value })
          }
          className="border-2 border-primary w-full px-4 py-2 rounded-xl"
          placeholder="Enter your height in cm"
          required
        />
      </div>
      <div>
        <label className="text-black w-full text-lg" htmlFor="weight">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) =>
            onAssessmentChange({ ...assessmentData, weight: e.target.value })
          }
          className="border-2 border-primary w-full px-4 py-2 rounded-xl"
          placeholder="Enter your weight in kg"
          required
        />
      </div>
      {error && <span className="text-red-600">{error}</span>}
      {assessmentData.bmi && (
        <div>
          <h3 className="label text-lg text-black">Your BMI  <span className='bg-gray-dark text-white rounded-lg px-2 text-base'>{assessmentData.bmi}</span></h3>
          <h3 className="label text-lg text-black">Your Classification <span className='bg-gray-dark text-white rounded-lg px-2 text-base'>{BMIClassification}</span></h3>
        </div>
      )}
      <div>
        <label className="text-black w-full text-lg" htmlFor="bodyType">
          Select Body Type
        </label>
        <select
          id="bodyType"
          value={bodyType}
          onChange={(e) =>
            onAssessmentChange({ ...assessmentData, bodyType: e.target.value })
          }
          className="border-2 border-primary w-full px-4 py-2 rounded-xl"
          required
        >
          <option value="" disabled>
            Select Body Type
          </option>
          {Object.keys(BODY_TYPES).map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {bodyType && (
        <div className='flex flex-col lg:flex-row gap-4'>
          <div className="">
            <h3 className="text-sm">
              Body Type:{" "}
              <span className='font-bold'>{bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}</span>
            </h3>
            <img className='mt-2'
              src={BODY_TYPES[bodyType].image}
              alt="Body Type"
              width={120}
              height={100}
            />
          </div>
          <div>
            <p className='text-sm'>{BODY_TYPES[bodyType].description}</p>
          </div>
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

export default BodyAssessment;
