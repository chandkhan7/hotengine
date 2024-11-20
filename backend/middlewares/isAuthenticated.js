import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // Ensure cookies middleware is used in your app
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY); // No need for `await` here
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId; // Attach user ID to the request for further use
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export default isAuthenticated;
