const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const { orderAddMiddleware, orderUpdateMiddleware } = require("../middlewares/orderMiddleware");



router.post("/:id",orderAddMiddleware,orderController.OrderPlaced);
router.put("/:orderId",orderUpdateMiddleware,orderController.OrderUpdate);
router.get("/all",orderController.getAllOrdersWithDetails);
router.get("/user/:id",orderController.getOrdersByUserId);
router.get("/:orderId",orderController.getOrdersByOrderId);
router.delete("/:orderId",orderController.orderDeleted);



module.exports = router;
