// const server = require('./server');
// module.exports = server;

const mongoose = require("mongoose");
const dotenv = require("dotenv");

console.log("Punto 1");
dotenv.config({ path: "./config.env" });
// const app = require("./app");

const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const compression = require("compression");
const eventRouter = require("./routes/eventRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
console.log("Hello from here 👋");
// 1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware 👋");
  next();
});

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;

console.log(process.env.PORT + " Esto");
const port = process.env.PORT || 3000;
console.log("Punto 3");
console.log("port es: " + port);
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
console.log("pasé!");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log("Punto 2");
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));
