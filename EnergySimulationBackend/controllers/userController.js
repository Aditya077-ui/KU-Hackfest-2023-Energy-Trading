const { User, validate } = require("../models/user");
const env = require("dotenv");
const { response } = require("express");
env.config();

exports.signUp = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { userName, pvtAddress, houseNo } = req.body;
  const newUser = new User({
    userName,
    pvtAddress,
    houseNo,
  });
  await newUser.save();
  res.status(201).json({ token: pvtAddress, id: newUser._id });
};

exports.signIn = async (req, res) => {
  const user = await User.findOne({ pvtAddress: req.body.pvtAddress });
  if (!user)
    return res
      .status(400)
      .json({ message: "Invalid token, do you want to create a new account?" });

  res.status(200).json({ token: req.body.pvtAddress, id: user._id });
};

exports.userExists = async (req, res) => {
  const pvtAddress = req.params.pvtAddress;
  const user = await User.findOne({ pvtAddress: pvtAddress });
  if (!user) return res.status(400).json({ message: "User doesnot exists" });
  res.status(200).json({ message: "User exists" });
};

exports.userProfile = async (req, res) => {
  const user = await User.findOne({ pvtAddress: req.params.pvtAddress });
  if (!user) return res.status(400).json({ message: "User doesnot exist" });
  res.status(200).json(user);
};
