const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        enum: [
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
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;
