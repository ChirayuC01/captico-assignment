const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // Extract the token from the Authorization header (format: "Bearer <token>")
    const token = req.headers.authorization?.split(" ")[1];

    // console.log("Received token:", token);

    // If no token is provided, return an unauthorized error
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Verify the token using the secret key stored in environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

module.exports = { protect };
