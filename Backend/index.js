const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config(); //                               step1

main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/info");
//   console.log("Database Connected");
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Database Connected to MongoDB Atlas");
}


const userInfoSchema = new mongoose.Schema({
  userName: String,
  password: String,
});

const User = mongoose.model("User", userInfoSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/userInfo", async (req, res) => {
  let user = new User();
  console.log(req.body);
  user.userName = req.body.userName;
  user.password = req.body.password;

  try {
    // Save the user to the database
    const doc = await user.save();
    console.log(doc);

    // Return the saved user as the response
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);

    // Return an error response if something goes wrong
    res.status(500).json(err);
  }
});

app.get("/userInfo", async (req, res) => {
  try {
    const doc = await User.find({});
    res.json(doc);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(8080, () => {
  console.log("Server Connected");
});
