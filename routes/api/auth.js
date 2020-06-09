const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator"); // used so we can validate the request with the check functions below

const User = require("../../models/User"); // user model

// @route  GET api/auth
// @desc   Test route
// @access Public - token must be given in header
// CHECKS THAT TOKEN WAS VALID AND PULLS THE ID FROM IT, THEN GET THE USER USING THE ID. req.user was set in auth.js middleware
router.get("/", auth, async (req, res) => {
  //^^ add middleware as second param like so ^^

  try {
    // the id comes from auth.js in middleware. we decoded the token and got the user/id from it
    const user = await User.findById(req.user.id).select("-password");
    res.json(user); // if token is valid, but there is no user with that id (after it is decoded), then the user will be blank
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//----------------------------------------------------------------------------------------------------------------------------------------------------------
// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public - no need for token
// this will listen for incoming POST requests
// (LOGIN) THIS JUST CHECKS THAT EMAIL AND PASSWORD ARE THERE AND IF A USER EXISTS IN THE DB WITH THAT EMAIL, THEN CREATE TOKEN WITH THE ID
router.post(
  "/",
  [
    // check the request and put any errors inside of validationResult array
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // check if error array is empty or not
    if (!errors.isEmpty()) {
      // send response back to client
      return res.status(400).json({ errors: errors.array() });
    }

    // get email, password from req.body
    const { email, password } = req.body;

    try {
      // See if user exists in the mongoDB
      let user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials." }] });
      }

      const isMatch = await bcrypt.compare(password, user.password); //compare entered password with encrypted password

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid credentials. Password is incorrect" }],
        });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Return jsonwebtoken -- when a user registers they can now login RIGHT AWAY
      jwt.sign(
        // The server encodes a json web token payload that contains the unique identifier (i.e. user.id) of the user that signed in using the secret_key
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          // now i have an encrypted token which was signed using my secret token and contains the payload(id)
          if (err) throw err;
          res.json({ token });
        }
      );
      // we can send the token in headers and access protected routes!!
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
); // respond to client

module.exports = router;
