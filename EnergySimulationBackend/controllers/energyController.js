const { Energy, validate } = require("../models/energy");
const env = require("dotenv");
const { response } = require("express");
const mongoose = require("mongoose");
env.config();

exports.energyData = async (req, res) => {
  const data = await Energy.findOne({ pvtAddress: req.params.pvtAddress });
  if (!data) return res.status(404).json({ message: "No energy data" });
  return res.status(200).json(data);
};

exports.updateEnergyProduced = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { energy, pvtAddress, date, time } = req.body;
    let data = null;
    const checkData = await Energy.findOne({ pvtAddress: pvtAddress });
    if (checkData["batteryHealth"] + energy > checkData["maxCapacity"]) {
      data = await Energy.findOneAndUpdate(
        { pvtAddress: pvtAddress },
        {
          $push: {
            energyProduced: {
              date: date,
              time: time,
              energy: checkData["maxCapacity"] - energy,
            },
          },
          $inc: {
            totalProduced: checkData["maxCapacity"] - energy,
            batteryHealth:
              checkData["maxCapacity"] - checkData["batteryHealth"],
          },
        },
        { session: session, new: true }
      );
    } else {
      data = await Energy.findOneAndUpdate(
        { pvtAddress: pvtAddress },
        {
          $push: {
            energyProduced: {
              date: date,
              time: time,
              energy: energy,
            },
          },
          $inc: {
            totalProduced: energy,
            batteryHealth: energy,
          },
        },
        { session: session, new: true }
      );
    }
    await session.commitTransaction();
    session.endSession();
    if (!data) return res.status(404).json({ message: "No energy data" });
    return res.status(200).json(data);
  } catch (ex) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(400)
      .json({ message: "Error! operation couldnot be performed" });
  }
};

exports.updateEnergyConsumed = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let data = null;
    const { energy, pvtAddress, date, time } = req.body;
    const checkData = await Energy.findOne({ pvtAddress: pvtAddress });
    if (checkData["batteryHealth"] - energy <= 0) {
      data = await Energy.findOneAndUpdate(
        { pvtAddress: pvtAddress },
        {
          $push: {
            energyConsumed: {
              date: date,
              time: time,
              energy: checkData["batteryHealth"],
            },
          },
          $inc: {
            totalConsumed: checkData["batteryHealth"],
            batteryHealth: checkData["batteryHealth"] * -1,
          },
        },
        { session: session, new: true }
      );
    } else {
      data = await Energy.findOneAndUpdate(
        { pvtAddress: pvtAddress },
        {
          $push: {
            energyConsumed: {
              date: date,
              time: time,
              energy: energy,
            },
          },
          $inc: {
            totalConsumed: energy,
            batteryHealth: energy * -1,
          },
        },
        { session: session, new: true }
      );
    }
    await session.commitTransaction();
    session.endSession();
    if (!data) return res.status(404).json({ message: "No energy data" });
    return res.status(200).json(data);
  } catch (ex) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(400)
      .json({ message: "Error! operation couldnot be performed" });
  }
};

exports.updateEnergySold = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { energy, pvtAddress, date, time } = req.body;
    if (checkData["batteryHealth"] - energy <= checkData["maxCapacity"]) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Not enough energy to sell.",
      });
    }
    const data = await Energy.findOneAndUpdate(
      { pvtAddress: pvtAddress },
      {
        $push: {
          energySold: {
            date: date,
            time: time,
            energy: energy,
          },
        },
        $inc: {
          totalSold: energy,
          batteryHealth: energy * -1,
        },
      },
      { session: session, new: true }
    );
    await session.commitTransaction();
    session.endSession();
    if (!data) return res.status(404).json({ message: "No energy data" });
    return res.status(200).json(data);
  } catch (ex) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(400)
      .json({ message: "Error! operation couldnot be performed" });
  }
};

exports.updateEnergyBought = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const checkData = await Energy.findOne({ pvtAddress: pvtAddress });

  try {
    const { energy, pvtAddress, date, time } = req.body;
    if (checkData["batterHealth"] + energy > checkData["maxCapacity"]) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        message: "Max battery capacity reached. Can't buy the alloted energy",
      });
    }
    const data = await Energy.findOneAndUpdate(
      { pvtAddress: pvtAddress },
      {
        $push: {
          energyBought: {
            date: date,
            time: time,
            energy: energy,
          },
        },
        $inc: {
          totalBought: energy,
          batteryHealth: energy,
        },
      },
      { session: session, new: true }
    );
    await session.commitTransaction();
    session.endSession();
    if (!data) return res.status(404).json({ message: "No energy data" });
    return res.status(200).json(data);
  } catch (ex) {
    await session.abortTransaction();
    session.endSession();
    return res
      .status(400)
      .json({ message: "Error! operation couldnot be performed" });
  }
};

exports.updateMaxCapacity = async (req, res) => {
  const { maxCapacity, pvtAddress } = req.body;
  const data = await Energy.findOneAndUpdate(
    { pvtAddress: pvtAddress },
    {
      $set: {
        maxCapacity: maxCapacity,
      },
    }
  );
  if (!data) return res.status(404).json({ message: "No energy data" });
  return res.status(200).json({ message: "Max capacity updated successfully" });
};

exports.setUpEnergyData = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const checkData = await Energy.findOne({ pvtAddress: req.body.pvtAddress });
  if (checkData)
    return res
      .status(404)
      .json({ message: "Data for the user already exists" });
  const newData = new Energy({
    pvtAddress: req.body.pvtAddress,
    energyConsumed: [],
    energyBought: [],
    energySold: [],
    energyProduced: [],
  });
  await newData.save();
  res.status(201).json({ token: req.body.pvtAddress, id: newData._id });
};
