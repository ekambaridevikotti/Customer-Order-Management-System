const express = require("express");
const router = express.Router();

const {
  createOrder,
  getCustomerOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const {
  validateOrder,
} = require("../validations/order.validation");

router.post("/add-order", validateOrder, createOrder);
router.get("/get-my-orders/:customerId", getCustomerOrders);
router.put("/update-order/:orderId", updateOrder);
router.delete("/delete-order/:orderId", deleteOrder);

module.exports = router;
