const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => {
    console.log("Error connecting to db");
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(8080, () => {
  console.log("Listening to port 8080");
});

app.get("/", (req, res) => {
  res.send("In the Home Route Now");
});
