const express = require("express");
const {
  signUp,
  signIn,
  userExists,
  userProfile,
} = require("../controllers/userController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/exists/:pvtAddress", userExists);
router.get("/me/:pvtAddress", userProfile);

module.exports = router;
