const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { connectToDb } = require("./db/connect");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});