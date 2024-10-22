import React, { useEffect, useState } from "react";
import "./modal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosCloseCircle } from "react-icons/io";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const WorkoutModal = ({ onclick, handleRefetch, workout }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoError, setVideoError] = useState("");

  // Pre-fill form when editing an existing workout
  useEffect(() => {
    if (workout) {
      setValue("title", workout.title);
      setValue("description", workout.description);
      setValue('categoryType', workout.category);

      setVideoFile(null); // Clear the selected video
    } else {
      reset(); // Reset form when creating a new workout
    }
  }, [workout, setValue, reset]);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];

    // Check file type (should be video)
    if (file && !file.type.startsWith("video/")) {
      setVideoError("Please upload a valid video file.");
      setVideoFile(null);
    } else if (file && file.size > 20000000) {
      // Check file size (limit 20MB)
      setVideoError("File size should be less than 20MB.");
      setVideoFile(null);
    } else {
      setVideoFile(file);
      setVideoError(""); // Clear error if file is valid
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      data.categoryType.forEach((category) => {
        formData.append("category", category);
        console.log('Category Array Data: ', data.category);
      });

      // Append video file if uploaded
      if (videoFile) {
        formData.append("video", videoFile);
      }

      let response;
      if (workout) {
        // Update existing workout
        response = await axios.put(
          `/workouts/update-workout/${workout._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        // Create new workout
        response = await axios.post("/workouts/create-workout", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      handleRefetch();
      onclick();
      toast.success(response.data.message);
      reset(); // Reset form on successful submission
      setVideoFile(null);
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const onClear = () => {
    reset();
    setVideoFile(null);
    setVideoError("");
  };

  const bodyType = [
    "Ectomorph", 
    "Mesomorph", 
    "Endomorph", 
    "Shredded", 
    "Lean", 
    "Defined", 
    "Bulky", 
    "Athletic", 
    "Fit", 
    "Curvy", 
    "Powerlifter", 
    "Functional"
  ]

  const handleCategoryChange = (event) => {
      // Get the selected options
      const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
      
      // Update state with the selected categories
      console.log('Each Category:', selectedOptions);
      setValue("categoryType", selectedOptions);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[3000]">
      <div
        onClick={onclick}
        className="fixed h-full w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60"
      ></div>
      <form
        id="create-workout-form"
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full md:w-[600px] bg-white-light px-6 py-3 grid gap-4 rounded-xl"
      >
        <IoIosCloseCircle
          onClick={onclick}
          className="absolute bg-white rounded-full -top-4 -right-4 cursor-pointer text-4xl"
        />
        <div className="w-full relative">
          <label className="text-black w-full text-2xl" htmlFor="title">
            Title
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            id="title"
            placeholder="Title"
            {...register("title", {
              required: "Title is required",
              maxLength: {
                value: 100,
                message: "Title must be at most 100 characters long",
              },
            })}
            type="text"
          />
          {errors.title && (
            <span className="text-xs text-red">{errors.title.message}</span>
          )}
        </div>

        <div className="w-full relative">
          <label className="text-black w-full text-2xl" htmlFor="description">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              maxLength: {
                value: 500,
                message: "Description must be at most 500 characters long",
              },
            })}
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            placeholder="Write the description here..."
            id="description"
          ></textarea>
          {errors.description && (
            <span className="text-xs text-red">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="w-full relative">
          <label className="text-black w-full text-2xl" htmlFor="video">
            Upload Video
          </label>
          <input
            className="border-2 border-primary w-full px-6 py-3 rounded-xl"
            type="file"
            accept="video/*"
            name="video"
            onChange={handleVideoUpload}
          />
          {videoError && (
            <span className="text-xs text-red">{videoError}</span>
          )}
        </div>

        <div className="relative w-full mx-auto">
          <label className="text-black block text-lg md:text-xl mb-2" htmlFor="category">
            Select Category Type
          </label>
          <select
              className="border-2 border-primary w-full px-4 py-2 rounded-lg text-base md:text-lg focus:outline-none focus:ring focus:ring-primary transition"
              name="categoryType"
              id="categoryType"
              onChange={handleCategoryChange}
              defaultValue={workout ? workout.category : []}
              multiple
          >
              {bodyType && bodyType.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
              ))}
          </select>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="font-poppins uppercase rounded-lg py-3 px-6 font-semibold bg-primary-dark text-white-light"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="mx-auto text-[20px] animate-spin" />
            ) : workout ? (
              "Update"
            ) : (
              "Submit"
            )}
          </button>
          <button
            type="button"
            onClick={onClear}
            className="font-poppins uppercase rounded-lg py-3 px-6 font-semibold bg-red-500 text-white-light"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutModal;