const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { connectToDb } = require("./db/connect");

const passport = require("./config/passport");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.PORT || 8080;
const isProduction = process.env.BASE_URL && process.env.BASE_URL.startsWith("https://");

app.set("trust proxy", 1);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_session_secret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax"
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

if (require.main === module) {
  connectToDb().then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  });
}

module.exports = app;