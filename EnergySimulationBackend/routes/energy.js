const express = require("express");
const {
  energyData,
  updateEnergyProduced,
  updateEnergyConsumed,
  updateEnergySold,
  updateEnergyBought,
  updateMaxCapacity,
  setUpEnergyData,
} = require("../controllers/energyController");
const router = express.Router();

router.get("/data", energyData);
router.put("/produced", updateEnergyProduced);
router.put("/consumed", updateEnergyConsumed);
router.put("/sold", updateEnergySold);
router.put("/bought", updateEnergyBought);
router.put("/update/maxcapacity", updateMaxCapacity);
router.post("/setup", setUpEnergyData);
module.exports = router;
