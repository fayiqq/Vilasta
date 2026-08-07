const notFound = (req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
};

const errorHandler = (err, req, res, next) => {
    const {
        status = 500,
        message = "Something went wrong",
    } = err;

    res.status(status).json({
        message,
    });
};

module.exports = {
    notFound,
    errorHandler,
};