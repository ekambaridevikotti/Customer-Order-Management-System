const validateOrder = (req, res, next) => {
  const { product_name, quantity, price, customerId } = req.body;

  if (!product_name || !quantity || !price || !customerId) {
    return res.status(400).json({
      error: "product_name, quantity, price, and customerId are required",
    });
  }

  if (quantity <= 0 || price <= 0) {
    return res.status(400).json({
      error: "Quantity and price must be positive numbers",
    });
  }

  next();
};

module.exports = { validateOrder };
