const Listing = require("../models/Listing");
const Review = require("../models/Review");

// Check if user is logged in
const isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: "You need to login first",
        });
    }

    next();
};


// Check if logged-in user is the author of the review
const isAuthor = async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        return res.status(404).json({
            message: "Review not found",
        });
    }

    if (!req.user || !review.author.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not the author of this review",
        });
    }

    next();
};


// Check if logged-in user owns the listing
const isOwner = async (req, res, next) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).json({
            message: "Listing not found",
        });
    }

    if (!req.user || !listing.owner.equals(req.user._id)) {
        return res.status(403).json({
            message: "You are not the owner of this listing",
        });
    }

    next();
};


module.exports = {
    isLogged,
    isAuthor,
    isOwner,
};