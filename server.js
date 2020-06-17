const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express(); // backend express server

// Connect MongoDB Database
connectDB();

//Init Middleware -- allows us to get the data in req.body
app.use(express.json({ extended: false }));

// // respond with "API Running!" when a GET request is made to the homepage
// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

// Define Routes so we can access them
app.use("/api/users", require("./routes/api/users")); // take the defined routes in users file and makes 'api/user' represent that
app.use("/api/auth", require("./routes/api/auth")); // take the defined routes in auth file and makes 'api/auth' represent that
app.use("/api/profile", require("./routes/api/profile")); // take the defined routes in profile file and makes 'api/profile' represent that
app.use("/api/posts", require("./routes/api/posts")); // take the defined routes in posts file and makes 'api/posts' represent that

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000; //default to 5000

// listen to a port
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
