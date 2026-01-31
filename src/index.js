const express = require("express");
const cors = require("cors");
require("dotenv").config();

const customerRoutes = require("./routes/customer.routes");
const orderRoutes = require("./routes/order.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Customer–Order Management API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
