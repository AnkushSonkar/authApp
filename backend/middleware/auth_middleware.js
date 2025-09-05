import jwt from "jsonwebtoken";

async function auth_middleware(req, res, next) {
  try {
    // Get token from cookies (or you can also check headers)
    const token = req.cookies.token;
    // console.log("Token:", token);

    if (!token) {
      return res.status(401).json({
        message: "No token provided. User not authenticated",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next(); // ✅ allow request to continue
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}

export default auth_middleware;
