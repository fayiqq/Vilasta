const Listing = require("../models/Listing");

// GET /api/listings
const index = async (req, res) => {
    const allListing = await Listing.find({});
    res.json({ listings: allListing });
};

// GET /api/listings/:id
const show = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        return res.status(404).json({
            message: "Listing does not exist",
        });
    }

    res.json({ listing });
};

// POST /api/listings
const create = async (req, res) => {
    const { title, description, price, location, country } = req.body;

    const newListing = new Listing({
        title,
        description,
        price,
        location,
        country,
    });

    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    await newListing.save();

    res.status(201).json({
        message: "Listing added successfully",
        listing: newListing,
    });
};

// DELETE /api/listings/:id
const destroy = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    res.json({
        message: "Listing deleted successfully",
    });
};

// PUT /api/listings/:id
const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, location, country } = req.body;

    const update = {
        title,
        description,
        price,
        location,
        country,
    };

    if (req.file) {
        update.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    const listing = await Listing.findByIdAndUpdate(id, update, {
        new: true,
    });

    res.json({
        message: "Listing updated successfully",
        listing,
    });
};

module.exports = {
    index,
    show,
    create,
    destroy,
    update,
};