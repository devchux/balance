const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token || '';
  if (!token) {
    return res.status(401).json({ error: "Token does not exist" });
  }
  try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log(req.user)
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};
