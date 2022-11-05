const express = require("express");
const router = express.Router();
const Controller = require("../controllers/common.controller");
const Target = require("../../models/ornek.model");
const verify = require("../controllers/verifyToken.controller");
const BothOrneksByTimeController = require("../controllers/bothOrneksByTime.controller")

const {
  Create,
  Read_by_id,
  Get_all,
  Update,
  Delete,
  Read_by_userId
}=Controller
const {
  Read_Orneks
}=BothOrneksByTimeController
router.get("/userId",verify,Read_by_userId(Target));
router.post("/add",verify, Create(Target));
router.get("/",verify,Get_all(Target));
router.delete("/delete/:id",verify,Delete(Target));
router.get("/time",verify,Read_Orneks);
router.get("/:id",verify,Read_by_id(Target));

router.put("/:id",verify,Update(Target));

  
  module.exports = router;
