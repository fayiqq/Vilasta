const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync.js");
const { isLogged, isAuthor } = require("../middlewares/authMiddleware.js");

const {
    createReview,
    destroyReview,
} = require("../controllers/reviewController.js");


// POST /api/listings/:id/reviews
router.post(
    "/",
    isLogged,
    wrapAsync(createReview)
);


// DELETE /api/listings/:id/reviews/:reviewId
router.delete(
    "/:reviewId",
    isLogged,
    isAuthor,
    wrapAsync(destroyReview)
);


module.exports = router;