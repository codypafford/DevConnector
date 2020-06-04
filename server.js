const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API Running"));
const PORT = process.env.PORT || 5000; //default to 5000

// listen to a port
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
