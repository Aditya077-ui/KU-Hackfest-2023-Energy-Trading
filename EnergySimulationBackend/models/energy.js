const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const Joi = require("joi");
env.config();

const energySchema = new mongoose.Schema(
  {
    pvtAddress: {
      type: String,
      required: true,
    },
    maxCapacity: {
      type: Number,
      default: 25,
    },
    totalProduced: {
      type: Number,
      default: 0,
    },
    totalConsumed: {
      type: Number,
      default: 0,
    },
    totalBought: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    energyProduced: [
      {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        energy: {
          type: Number,
          required: true,
        },
        units: {
          type: String,
          default: "Watts",
        },
        _id: false,
      },
    ],
    energyConsumed: [
      {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        energy: {
          type: Number,
          required: true,
        },
        units: {
          type: String,
          default: "Watts",
        },
        _id: false,
      },
    ],
    energyBought: [
      {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        energy: {
          type: Number,
          required: true,
        },
        units: {
          type: String,
          default: "Watts",
        },
        _id: false,
      },
    ],
    energySold: [
      {
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
        energy: {
          type: Number,
          required: true,
        },
        units: {
          type: String,
          default: "Watts",
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports.validate = function (energy) {
  const schema = Joi.object({
    pvtAddress: Joi.string().required(),
    maxCapacity: Joi.number(),
    energyProduced: Joi.array(),
    energyConsumed: Joi.array(),
  });

  const result = schema.validate(energy);
  return result;
};

module.exports.Energy = mongoose.model("Energy", energySchema);
