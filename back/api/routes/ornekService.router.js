const express = require("express");
const router = express.Router();
const Controller = require("../controllers/common.controller");
const Target = require("../../models/ornekService.model");
const SubServiceController = require("../controllers/ornekService.controller");
const verify = require("../controllers/verifyToken.controller");
const Target2 = require("../../models/subService.model");
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
  Read_by_service,
  Read_by_name
}=SubServiceController
const {
  Read_Service_Orneks
}=BothOrneksByTimeController
router.get("/userId",verify,Read_by_userId(Target));
router.post("/add",verify, Create(Target));
router.post("/mainService",verify, Read_by_service(Target2));
router.post("/subServiceName",verify, Read_by_name(Target2));
router.get("/",verify,Get_all(Target));
router.delete("/delete/:id",verify,Delete(Target));
router.get("/time",verify,Read_Service_Orneks);
router.get("/:id",verify,Read_by_id(Target));

router.put("/:id",verify,Update(Target));

  
  module.exports = router;
