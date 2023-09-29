const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const env = require("dotenv");
const users = require("./routes/users");
const energy = require("./routes/energy");
const cors = require("cors");

const app = express();
env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.2lphmx5.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((ex) => {
    console.log(ex);
    console.log("Couldnot connect to mongodb");
  });

//routes
app.use(express.json());
app.use(cors());
app.use("/api/user", users);
app.use("/api/energy", energy);
// app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
