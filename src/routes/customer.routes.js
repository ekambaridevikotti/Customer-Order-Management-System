const express = require("express");
const router = express.Router();

const {
  registerCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller");

const {
  validateCustomer,
} = require("../validations/customer.validation");

router.post("/register", validateCustomer, registerCustomer);
router.delete("/:customerId", deleteCustomer);

module.exports = router;
