const supabase = require("../config/supabaseClient");

// Create Order
const createOrder = async (req, res) => {
  if (!supabase) {
    return res.status(503).json({ error: "Supabase not configured" });
  }

  const { product_name, quantity, price, customerId } = req.body;

  const { data, error } = await supabase.from("orders").insert([
    {
      product_name,
      quantity,
      price,
      customer_id: customerId,
    },
  ]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json({
    message: "Order created successfully",
    data,
  });
};

// Get Customer Orders
const getCustomerOrders = async (req, res) => {
  const { customerId } = req.params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_id", customerId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json(data);
};

// Update Order
const updateOrder = async (req, res) => {
  const { orderId } = req.params;

  const { quantity, price, order_status } = req.body;

  const { data, error } = await supabase
    .from("orders")
    .update({ quantity, price, order_status })
    .eq("id", orderId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message: "Order updated successfully",
    data,
  });
};

// Delete Order
const deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({ message: "Order deleted successfully" });
};

module.exports = {
  createOrder,
  getCustomerOrders,
  updateOrder,
  deleteOrder,
};
