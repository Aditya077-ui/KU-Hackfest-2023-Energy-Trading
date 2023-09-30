const mongoose = require("mongoose");
const env = require("dotenv");
const Joi = require("joi");
env.config();

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 255,
    },
    pvtAddress: {
      type: String,
      required: true,
      trim: true,
      min: 2,
      max: 1024,
    },
    houseNo: {
      type: String,
      required: true,
      trim: 2,
      max: 255,
    },
  },
  { timestamps: true }
);

module.exports.validate = function (user) {
  const schema = Joi.object({
    userName: Joi.string().min(2).required().max(255),
    pvtAddress: Joi.string().min(8).max(1024).required(),
    houseNo: Joi.string().required().min(2).max(255),
  });

  const result = schema.validate(user);
  return result;
};

module.exports.User = mongoose.model("User", userSchema);
