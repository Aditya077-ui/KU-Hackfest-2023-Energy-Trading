const express = require("express");
const {
  addListing,
  cancelListing,
  canBuy,
  updateListing,
  fetchListing,
} = require("../controllers/salesController");
const router = express.Router();

router.post("/listing/add", addListing);
router.put("/listing/cancel", cancelListing);
router.get("/canbuy", canBuy);
router.put("/listing/update", updateListing);
router.get("/listing/fetch", fetchListing);

module.exports = router;
