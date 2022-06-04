const express = require('express');
const router = express.Router();
const groupModel = require("../models/groupModel");
const groupCtrl = require("../controllers/groupCtrl");

router.get("/", groupCtrl.getAllGroups);
router.post("/", groupCtrl.addGroup);
router.get("/:id", groupCtrl.getById);
router.put("/:id", groupCtrl.updateGroup);
router.delete("/:id", groupCtrl.deleteGroup);
router.get("/get/:userid", groupCtrl.getbyUser);

module.exports = router;