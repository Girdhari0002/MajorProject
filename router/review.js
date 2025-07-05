const   express = require("express");
const  router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const reviewControllers = require("../controllers/reviews.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validatereview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


// REVIEW ROUTE
router.post("/", isLoggedIn, validatereview, wrapAsync(reviewControllers.createReview));

// delete review route 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviewControllers.destroyReview);

module.exports = router;
