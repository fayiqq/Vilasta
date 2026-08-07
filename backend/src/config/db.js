const mongoose = require("mongoose");

const connectDB = async () => {
    const atlasUrl = process.env.ATLAS_URL;

    if (!atlasUrl) {
        throw new Error("ATLAS_URL is not defined");
    }

    await mongoose.connect(atlasUrl);

    console.log("Connected to MongoDB");
};

module.exports = connectDB;