const express = require("express");
require("express-async-errors");
const morgan = require("morgan");
const compression = require("compression");
const eventRouter = require("./routes/eventRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

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
