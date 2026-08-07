const User = require("../models/User");
const passport = require("passport");

// GET /api/me
const getCurrentUser = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({ user: req.user });
    }

    res.status(200).json({ user: null });
};


// POST /api/signup
const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        email,
        username,
    });

    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
        if (err) return next(err);

        res.status(201).json({
            message: `Welcome ${username}`,
            user: registeredUser,
        });
    });
};


// POST /api/login
const login = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);

        if (!user) {
            return res.status(401).json({
                message: info?.message || "Invalid username or password",
            });
        }

        req.login(user, (err) => {
            if (err) return next(err);

            res.json({
                message: `Welcome back ${user.username}`,
                user,
            });
        });
    })(req, res, next);
};


// POST /api/logout
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        res.json({
            message: "Logged out successfully",
        });
    });
};


module.exports = {
    getCurrentUser,
    signup,
    login,
    logout,
};