const express = require("express");
const router = express.Router();
const Controller = require("../controllers/common.controller");
const Target = require("../../models/service.model");
const verifyTokenController = require("../controllers/verifyToken.controller");
const {
    Create,
    Read_by_id,
    Get_all,
    Update,
    Delete
}=Controller
  router.post("/add",verifyTokenController, Create(Target));
  router.get("/",verifyTokenController,Get_all(Target));
  router.delete("/delete/:id",verifyTokenController,Delete(Target));
  router.get("/:id",verifyTokenController,Read_by_id(Target));
  router.put("/:id",verifyTokenController,Update(Target));
  
  module.exports = router;
