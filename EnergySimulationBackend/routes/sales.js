const express = require("express");
const {
  addListing,
  cancelListing,
  canBuy,
  updateListing,
  fetchListing,
  completeTransaction,
} = require("../controllers/salesController");
const router = express.Router();

router.post("/listing/add", addListing);
router.put("/listing/cancel", cancelListing);
router.get("/canbuy/:sellerPvtAddress/:amount", canBuy);
router.put("/listing/update", updateListing);
router.get("/listing/fetch", fetchListing);
router.get("/listing/transaction/complete", completeTransaction);

module.exports = router;
