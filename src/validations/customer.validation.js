const validateCustomer = (req, res, next) => {
  const { full_name, email, phone } = req.body;

  if (!full_name || !email || !phone) {
    return res.status(400).json({
      error: "Full name, email, and phone are required",
    });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  next();
};

module.exports = { validateCustomer };
