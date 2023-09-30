const mongoose = require("mongoose");
const env = require("dotenv");
const Joi = require("joi");
env.config();

const salesSchema = new mongoose.Schema(
  {
    pvtAddress: {
      type: String,
      required: true,
    },
    houseNo: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["sold", "unsold", "cancelled"],
      default: "unsold",
    },
    amount: {
      type: Number,
      required: true,
    },
    units: {
      type: String,
      default: "kW",
    },
    soldAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports.Sales = mongoose.model("Sales", salesSchema);
