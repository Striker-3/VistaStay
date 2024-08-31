const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = "mongodb://127.0.0.1:27017/VistaStay";

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("In the Home Route Now");
});

// INDEX route

app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

// NEw Route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Posting , route
app.post("/listings", async (req, res) => {
  // let { title, description, image, price, location, country } = req.body;
  // let newListing = new Listing({
  //   title: title,
  //   description: description,
  //   image: image,
  //   price: price,
  //   location: location,
  //   country: country,
  // });
  let newListing = new Listing(req.body.listing);

  await newListing.save();
  res.redirect("/listings");
});

// Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});

// Test Route
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "Cozy Mountain Retreat",
//     description:
//       "A serene cabin nestled in the mountains, perfect for a peaceful getaway.",
//     price: 1500,
//     location: "Aspen, Colorado",
//     country: "USA",
//   });

//   await sampleListing.save();
//   console.log("Listing was saved");
//   res.send("Successful testing");
// });
