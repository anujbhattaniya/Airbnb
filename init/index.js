const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");

main()
  .then((res) => {
    console.log("connection sucessfuly");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wonderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67fbae10c04b2f6e090e9a9b",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};
initDb();
