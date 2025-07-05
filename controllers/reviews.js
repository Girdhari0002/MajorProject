const Listing = require("../models/listing");
const Review = require("../models/review");


module.exports.createReview = async (req, res) => {
      let listing =  await Listing.findById(req.params.id);
     let newReview = new Review(req.body.review);
     newReview.author = req.user._id;
    //    console.log( newReview );
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    // res.send("new review saved");
     req.flash("success", "new review created!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview   = async (req, res) => {
    const { id, reviewId } = req.params;
    try {
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
       req.flash("success", "review deleted");
        res.redirect(`/listings/${id}`); // Or send a success message
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong while deleting the review.");
    }
};