const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const { productUpdateMiddleware, productAddMiddleware } = require("../middlewares/productMiddleware");

router.post("/add",productAddMiddleware,productController.ProductAdd);
router.get("/list",productController.getAllProduct);
router.put("/:id",productUpdateMiddleware,productController.productUpdate);
router.delete("/:id",productController.productDeleted);

module.exports = router;
