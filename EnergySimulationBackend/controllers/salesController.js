const { Sales } = require("../models/sales");
const { Energy } = require("../models/energy");
const env = require("dotenv");
const { response } = require("express");
const mongoose = require("mongoose");
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

exports.canBuy = async (req, res) => {};

exports.updateListing = async (req, res) => {};
