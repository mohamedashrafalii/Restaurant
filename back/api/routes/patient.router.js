const express = require("express");
const router = express.Router();
const Controller = require("../controllers/common.controller");
const Target = require("../../models/patient.model");
const PatientController = require("../controllers/patient.controller");
const verifyTokenController = require("../controllers/verifyToken.controller");
const {
    Read_by_id,
    Get_all,
    Delete,
    Read_by_userId
}=Controller

const{
  CreatePatient,GetByMilitaryId,Update,GetByMilitaryIdOnly
}=PatientController
  router.get("/userId",verifyTokenController,Read_by_userId(Target));
  router.post("/add",verifyTokenController, CreatePatient(Target));
  router.get("/",verifyTokenController,Get_all(Target));
  router.delete("/delete/:id",verifyTokenController,Delete(Target));
  router.get("/:id",verifyTokenController,Read_by_id(Target));
  
  router.get("/militaryId/:id",verifyTokenController,GetByMilitaryId(Target));
  router.get("/militaryIdOnly/:id",verifyTokenController,GetByMilitaryIdOnly(Target));
  router.put("/:id",verifyTokenController,Update(Target));
  
  module.exports = router;
