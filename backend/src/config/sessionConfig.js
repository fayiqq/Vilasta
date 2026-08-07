const session = require("express-session");
const MongoStore = require("connect-mongo");

const createSessionOptions = () => {
    const isProd = process.env.NODE_ENV === "production";
    const atlasUrl = process.env.ATLAS_URL;

    return {
        secret: process.env.SESSION_SECRET || "secret-key",

        resave: false,

        saveUninitialized: false,

        store: MongoStore.create({
            mongoUrl: atlasUrl,
        }),

        cookie: {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        },
    };
};

module.exports = createSessionOptions;