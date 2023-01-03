const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin.controllers');
const checkAuth = require('../middleware/user-auth');

// router.get("/",medicinekeeperController.sampleUser
router.get("/",checkAuth, adminController.getAll);
router.post("/login", adminController.loginUser);
router.post("/register", adminController.registerUser);
router.get("/:_id",adminController.getSingleUser);
// router.post("/",medicinekeeperController.addUser);
router.put("/:_id", adminController.updateUser);
router.delete("/:_id", adminController.deleteUser);


module.exports = router;