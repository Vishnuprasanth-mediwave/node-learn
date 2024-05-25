const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");



router.post("/:id",orderController.OrderPlaced);
router.get("/all",orderController.getOrdersWithDetails);


module.exports = router;
