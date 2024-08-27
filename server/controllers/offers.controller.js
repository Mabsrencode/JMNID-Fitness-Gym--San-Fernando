const Offers = require("../models/offers.js");

// Get all job offers
const getAllJobOffers = async (req, res) => {
  try {
    const jobOffers = await Offers.find();
    res.json(jobOffers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a job offer
const createJobOffer = async (req, res) => {
  const offer = new Offers({
    title: req.body.title,
    requirements: req.body.requirements,
  });

  try {
    const newOffer = await offer.save();
    res.status(201).json(newOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a job offer
const updateJobOffer = async (req, res) => {
  try {
    const updatedOffer = await Offers.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedOffer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a job offer
const deleteJobOffer = async (req, res) => {
  try {
    await Offers.findByIdAndDelete(req.params.id);
    res.json({ message: "Job offer deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllJobOffers,
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
};
