exports.storeTokenInCookie = function (res, jwt, user) {
  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_DEADLINE,
  });

  return res.status(200).json({ token, success: "You are now signed in" });
};
