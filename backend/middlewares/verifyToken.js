const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = await req.headers['authorization']
  
  if (!token) {
    return res.status(401).json({ error: "You are not logged in" });
  }
  try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "You are not logged in" });
    }
};
