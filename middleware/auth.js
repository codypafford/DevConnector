const jwt = require("jsonwebtoken");
const config = require("config");
// THIS MODULE JUST VALIDATES TOKENS AND SETS REQ.USER TO THE DECODED USER
// a middleware function is basically a function that has access to the requests and responses.
//next is a callback
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  //verify token
  try {
    // decode the token
    const decoded = jwt.verify(token, config.get("jwtSecret")); // check that token is correctly decoded
    console.log(decoded);
    // decoded contains user which contains id
    req.user = decoded.user; // req.user could be named req.ANYTHING as long as we use that to get the user in the other files
    // now we can use req.user in any of our protected routes
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
