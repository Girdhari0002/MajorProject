const   express = require("express");
const  router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControllers = require("../controllers/listing.js");
const {  storage } = require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({  storage });

router
.route("/")
.get(wrapAsync(listingControllers.index))
.post( isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingControllers.CreateListing)
);

// New Route
router.get("/new", isLoggedIn, listingControllers.renderNewForm);

router
.route("/:id")
.get(wrapAsync(listingControllers.ShowListing))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing,
   wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingControllers.destroyListing));



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingControllers.renderEditForm));

module.exports = router;