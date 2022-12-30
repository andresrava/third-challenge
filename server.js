const mongoose = require("mongoose");
const dotenv = require("dotenv");

console.log("Punto 1");
dotenv.config({ path: "./config.env" });
const app = require("./app");

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

console.log(process.env.PORT + " Esto");
const port = process.env.PORT || 3000;
console.log("Punto 3");
console.log("port es: " + port);
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
console.log("pasé!");
