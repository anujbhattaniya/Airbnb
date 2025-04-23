const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwer, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.createListing)
  );

//new route
router.get("/new", isLoggedIn, isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwer,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.updateListing)
  )
  .delete(isOwer, isLoggedIn, wrapAsync(listingController.deleteListing));

//Edit rout
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwer,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
