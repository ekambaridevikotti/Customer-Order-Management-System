const supabase = require("../config/supabaseClient");

// Register Customer
const registerCustomer = async (req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase not configured",
    });
  }

  const { full_name, email, phone } = req.body;

  // Check duplicate email
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    return res.status(409).json({
      error: "Email already registered",
    });
  }

  const { data, error } = await supabase.from("customers").insert([
    {
      full_name,
      email,
      phone,
    },
  ]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Customer registered successfully",
    data,
  });
};

// Delete Customer (CASCADE handled by DB)
const deleteCustomer = async (req, res) => {
  if (!supabase) {
    return res.status(503).json({
      error: "Supabase not configured",
    });
  }

  const { customerId } = req.params;

  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", customerId);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.json({
    message:
      "Customer deleted successfully (related orders removed via CASCADE)",
  });
};

module.exports = { registerCustomer, deleteCustomer };
