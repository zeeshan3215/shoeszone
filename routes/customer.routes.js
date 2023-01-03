const express = require("express");
const router = express.Router();

const customerController = require('../controllers/customer.controllers');
const checkAuth = require('../middleware/user-auth');

// router.get("/" customerController.sampleUser);
router.get("/",checkAuth, customerController.getAll);
router.post("/login", customerController.loginUser);
router.post("/register", customerController.registerUser);
router.get("/:_id", customerController.getSingleUser);
// router.post("/" customerController.addUser);
router.put("/:_id", customerController.updateUser);
router.delete("/:_id", customerController.deleteUser);


module.exports = router;