const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const session = require("express-session")
const passport = require("./config/passportConfig.js")
const {notFound,errorHandler} = require("./middlewares/errorHandler.js");
const sessionOptions = require("./config/sessionConfig.js");


const app = express()

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}


// CORS
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))


// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

//session configuration
app.use(session(sessionOptions()));


// Passport configuration
app.use(passport.initialize());
app.use(passport.session());



/* require all the routes here */
const ListingRoutes = require("./routes/listingRoutes.js");
const ReviewRoutes = require("./routes/reviewRoutes.js");
const UserRoutes = require("./routes/userRoutes.js");


/* using all the routes here */
app.use("/api/listings", ListingRoutes);
app.use("/api/listings/:id/reviews", ReviewRoutes);
app.use("/api", UserRoutes);


// Error handling
app.use(notFound);
app.use(errorHandler);



module.exports = app