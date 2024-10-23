const mongoose = require("mongoose");

const AccomplishmentSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        date: {
            type: Date,
            required: true
        },
        workouts: {
            type: [String],
            required: true
        },
        meals: {
            type: [String],
            required: true
        },
    },
    { timestamps: true }
);

const Accomplishment = mongoose.model("Accomplishment", AccomplishmentSchema);

module.exports = Accomplishment;