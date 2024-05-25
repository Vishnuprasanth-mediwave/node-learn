const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.post("/deleteUser", adminController.deleteUserDetailByMobileNumber);


module.exports = router;
