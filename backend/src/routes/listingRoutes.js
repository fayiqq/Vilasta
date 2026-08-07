const express = require("express");
const router = express.Router();

const multer = require("multer");

const { storage } = require("../config/cloudinaryConfig.js");
const upload = multer({ storage });

const {
    isLogged,
    isOwner,
} = require("../middlewares/authMiddleware.js");

const wrapAsync = require("../utils/wrapAsync.js");

const {
    index,
    show,
    create,
    destroy,
    update,
} = require("../controllers/listingController.js");


// GET /api/listings
router.get(
    "/",
    wrapAsync(index)
);


// GET /api/listings/:id
router.get(
    "/:id",
    wrapAsync(show)
);


// POST /api/listings
router.post(
    "/",
    isLogged,
    upload.single("image"),
    wrapAsync(create)
);


// DELETE /api/listings/:id
router.delete(
    "/:id",
    isOwner,
    wrapAsync(destroy)
);


// PUT /api/listings/:id
router.put(
    "/:id",
    isOwner,
    upload.single("image"),
    wrapAsync(update)
);


module.exports = router;