import React, { useCallback, useEffect, useState } from 'react';

// Import all images
import ectomorph from '../../assets/images/ectomorph.jpg';
import mesomorph from '../../assets/images/mesomorph.jpg';
import endomorph from '../../assets/images/endormorph.jpg';
import { toast } from 'react-toastify';

const BODY_TYPES = {
  ectomorph,
  mesomorph,
  endomorph
};

const BodyAssessment = ({ onAssessmentChange, assessmentData, onNext }) => {
  const [error, setError] = useState("");
  const { height, weight, bodyType } = assessmentData;

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
          <h3 className="text-lg">Your BMI is: {assessmentData.bmi}</h3>
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
        <div className="mt-4">
          <h3 className="text-lg">
            Your Body Type:{" "}
            {bodyType.charAt(0).toUpperCase() + bodyType.slice(1)}
          </h3>
          <img
            src={BODY_TYPES[bodyType]}
            alt="Body Type"
            width={120}
            height={100}
          />
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
