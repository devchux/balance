exports.storeTokenInCookie = function (res, user) {
  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    expires: new Date(Date.now() + 604800000),
    secure: false,
    httpOnly: true,
  });
};
