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
router.get("/exists/", userExists);
router.get("/me", userProfile);

module.exports = router;
