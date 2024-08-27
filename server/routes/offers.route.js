const express = require("express");
const router = express.Router();
const {
  getAllJobOffers,
  createJobOffer,
  updateJobOffer,
  deleteJobOffer,
} = require("../controllers/offers.controller");
router.get("/all-offers", getAllJobOffers);
router.post("/create-offer", createJobOffer);
router.put("/update-offer/:id", updateJobOffer);
router.delete("/delete-offer/:id", deleteJobOffer);
module.exports = router;
