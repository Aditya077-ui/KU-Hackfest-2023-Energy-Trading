const { Sales } = require("../models/sales");
const { Energy } = require("../models/energy");
const env = require("dotenv");
const { response } = require("express");
const mongoose = require("mongoose");
const { User } = require("../models/user");
env.config();

exports.addListing = async (req, res) => {
  const { pvtAddress, amount, houseNo } = req.body;
  const newSale = new Sales({
    pvtAddress,
    amount,
    houseNo,
  });
  await newSale.save();
  res.status(201).json({ token: pvtAddress, id: newSale._id });
};

exports.cancelListing = async (req, res) => {
  const data = await Sales.findByIdAndUpdate(
    req.body.id,
    {
      $set: {
        status: "cancelled",
      },
    },
    { new: true }
  );
  if (!data)
    return res.status(404).json({ message: "No listing found for given id" });
  return res.status(200).json(data);
};

exports.canBuy = async (req, res) => {
  const { sellerPvtAddress, amount } = req.body.params;

  const sellerEnergy = await Energy.findOne({ pvtAddress: sellerPvtAddress });

  if (sellerEnergy["batteryHealth"] < amount) {
    return res.status(404).json({ message: "Is not a valid transaction" });
  }
  return res.status(200).json({ message: "Is a valid transaction" });
};

exports.updateListing = async (req, res) => {
  const { id } = req.body;
  const salesData = await Sales.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "sold",
      },
    },
    { new: true }
  );
  if (!salesData)
    return res.status(404).json({ message: "No listing found for given id" });
  return res.status(200).json(salesData);
};

exports.fetchListing = async (req, res) => {
  const { id } = req.body;
  const salesData = await Sales.find({
    status: { $eq: "unsold" },
  });
  //   if (!data) return res.status(404).json([]);
  return res.status(200).json(salesData);
};
