const express = require("express");
const router = express.Router();
const Controller = require("../controllers/common.controller");
const Target = require("../../models/invType.model");
const {
    Create,
    Read_by_id,
    Get_all,
    Update,
    Delete
}=Controller
  router.post("/add", Create(Target));
  router.get("/",Get_all(Target));
  router.delete("/delete/:id",Delete(Target));
  router.get("/:id",Read_by_id(Target));
  router.put("/:id",Update(Target));
  
  module.exports = router;
