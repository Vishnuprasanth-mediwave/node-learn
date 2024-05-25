const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController");

router.post("/address", addressController.addAddress);
router.get('/address/:id', addressController.getAddressesByUserId);
router.delete('/address/:id', addressController.deleteAddress);
router.patch('/address/:id', addressController.updateAddress);


module.exports = router;
