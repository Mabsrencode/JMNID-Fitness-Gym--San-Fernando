const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Workout = require('../models/workouts.js');

// Setup Multer Storage Configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/workoutVideos/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Multer Upload Setup
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 20000000 }, // 20MB limit
    fileFilter: function (req, file, cb) {
        const allowedTypes = ['.mp4'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedTypes.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Only .mp4 videos are allowed!'), false);
        }
    }
}).single('video');

// Get All Workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve workouts: " + err.message });
    }
};

// Create a New Workout
const createWorkout = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(422).json({ message: err.message });
        }

        const { title, description, category } = req.body;

        if (!title || !description || !req.file) {
            return res.status(400).json({ message: "Title, description, and video file are required." });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/workoutVideos/${req.file.filename}`;

        const newWorkout = new Workout({
            title,
            description,
            video: req.file.filename,
            url: fileUrl,
            category: category
        });

        try {
            const savedWorkout = await newWorkout.save();
            res.status(201).json({ message: "Workout created successfully", workout: savedWorkout });
        } catch (err) {
            res.status(500).json({ message: "Failed to create workout: " + err.message });
        }
    });
};

// Update a Workout
const updateWorkout = (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(422).json({ message: err.message });
        }

        const { id } = req.params;
        const { title, description } = req.body;

        const updateData = { title, description };

        try {
            const workout = await Workout.findById(id);
            if (!workout) {
                return res.status(404).json({ message: "Workout not found" });
            }

            if (req.file) {
                const fileUrl = `${req.protocol}://${req.get('host')}/workoutVideos/${req.file.filename}`;

                // Delete the old video if exists
                if (workout.video) {
                    const oldVideoPath = path.join(__dirname, '../public/workoutVideos', workout.video);
                    fs.unlink(oldVideoPath, (err) => {
                        if (err) {
                            console.error("Failed to delete old video:", err);
                        }
                    });
                }

                updateData.video = req.file.filename;
                updateData.url = fileUrl;
            }

            const updatedWorkout = await Workout.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedWorkout) {
                return res.status(404).json({ message: "Workout not found" });
            }

            res.status(200).json({ message: "Workout updated successfully", workout: updatedWorkout });
        } catch (err) {
            res.status(500).json({ message: "Failed to update workout: " + err.message });
        }
    });
};

// Delete a Workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout.findById(id);
        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        // Delete the associated video file
        if (workout.video) {
            const videoPath = path.join(__dirname, '../public/workoutVideos', workout.video);
            fs.unlink(videoPath, (err) => {
                if (err) {
                    console.error("Failed to delete video file:", err);
                }
            });
        }

        // Delete workout from DB
        await Workout.findByIdAndDelete(id);

        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete workout: " + err.message });
    }
};

// Export all functions
module.exports = {
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    upload
};