const Listing = require("../models/Listing");
const Review = require("../models/Review");

// POST /api/listings/:id/reviews
const createReview = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).json({
            message: "Listing not found",
        });
    }

    const { rating, comment } = req.body;

    const newReview = new Review({
        rating,
        comment,
        author: req.user._id,
    });

    listing.review.push(newReview);

    await newReview.save();
    await listing.save();

    await newReview.populate("author");

    res.status(201).json({
        message: "Review added successfully",
        review: newReview,
    });
};


// DELETE /api/listings/:id/reviews/:reviewId
const destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: {
            review: reviewId,
        },
    });

    await Review.findByIdAndDelete(reviewId);

    res.json({
        message: "Review deleted successfully",
    });
};


module.exports = {
    createReview,
    destroyReview,
};