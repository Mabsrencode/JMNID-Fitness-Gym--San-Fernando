const mongoose = require("mongoose");

const offersSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100, // Example constraint
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid title!`,
    },
  },
  requirements: {
    type: [String],
    required: true,
    maxlength: 100,
  },
});

const Offers = mongoose.model("Offers", offersSchema);
module.exports = Offers;
