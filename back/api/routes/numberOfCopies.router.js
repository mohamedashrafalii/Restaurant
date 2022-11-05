const express = require("express");
const router = express.Router();
const Controller = require("../controllers/common.controller");
const Target = require("../../models/numberOfCopies.model");
const verify = require("../controllers/verifyToken.controller")

const {
    Create,
    Read_by_id,
    Get_all,
    Update,
    Delete
}=Controller
  router.post("/add",verify, Create(Target));
  router.get("/",verify,Get_all(Target));
  router.delete("/delete/:id",verify,Delete(Target));
  router.get("/:id",verify,Read_by_id(Target));
  router.put("/:id",verify,Update(Target));
  
  module.exports = router;
