const express = require("express");
const router = express.Router();
const Controller = require("../controllers/statistics.controller");
const verify = require("../controllers/verifyToken.controller");

const {
TotalSpendings,TotalSpendings2,TotalSpendings3
}=Controller

router.get("/totalSpendings",verify,TotalSpendings);
router.get("/totalSpendings2",verify,TotalSpendings2);
router.get("/totalSpendings3",verify,TotalSpendings3);

  
  module.exports = router;
