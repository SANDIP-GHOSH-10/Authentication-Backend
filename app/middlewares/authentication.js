import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    // res.status(401).json({ error: "Pass Details" });
    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = tokenData.userId;
        next();
    } catch (error) {
        console.log("Error verifying token", error);
        res.status(401).json({ error: "Invalid token" });
    }
}