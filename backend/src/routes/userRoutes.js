const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");

const {
    getCurrentUser,
    signup,
    login,
    logout,
} = require("../controllers/userController.js");


// GET /api/me
router.get("/me", getCurrentUser);


// POST /api/signup
router.post(
    "/signup",
    wrapAsync(signup)
);


// POST /api/login
router.post(
    "/login",
    login
);


// POST /api/logout
router.post(
    "/logout",
    logout
);


module.exports = router;