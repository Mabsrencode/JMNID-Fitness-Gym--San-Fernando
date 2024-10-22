const Accomplishment = require('../models/accomplishment-task.js');

const getAccomplishmentTaskById = async (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(400).json({ message: "Invalid user ID." });
    }

    try {
        const accomplishmentTask = await Accomplishment.findOne({ userId: userId });

        if (!accomplishmentTask) {
            return res.status(404).json({ message: "Accomplishment task not found." });
        }

        return res.status(200).json(accomplishmentTask);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const addAccomplishmentTask = async (req, res) => {
    try {
        const { userId, date, workouts, meals } = req.body;


        if (!Array.isArray(workouts) || !Array.isArray(meals) || 
            workouts.some(w => typeof w !== 'string') || 
            meals.some(m => typeof m !== 'string')) {
            return res.status(400).json({ message: "Workouts and meals must be arrays of strings." });
        }

        const insertData = new Accomplishment({
            userId: userId,
            date: date,
            workouts: workouts,
            meals: meals
        });

        await insertData.save();

        return res.status(201).json({ message: "Successfully inserted data", data: insertData });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

module.exports = { getAccomplishmentTaskById, addAccomplishmentTask };
