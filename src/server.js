let express = require("express");
let app = express();
let multer = require("multer");
let upload = multer({ dest: "uploads/" });
let MongoDB = require("mongodb");
let MongoClient = MongoDB.MongoClient;
let ObjectId = MongoDB.ObjectId;
let sha256 = require("js-sha256");

let dbo = undefined;
let url =
  "mongodb+srv://thib:123@cluster0-4njgc.azure.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  dbo = client.db("main-db");
});

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets

app.post("/signup", upload.none(), (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const pwd = req.body.password;
  for (key in req.body) {
    if (req.body[key] === "") {
      return res.send(
        JSON.stringify({
          success: false,
          message: `${key} cannot be empty.`
        })
      );
    }
  }
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      return res.send(
        JSON.stringify({ success: false, message: "Error in the sign up." })
      );
    }
    if (user === null) {
      dbo
        .collection("users")
        .insertOne({ username: name, email: email, password: sha256(pwd) });
      console.log(
        "Sign up done. Username is: ",
        name,
        " and password is: ",
        sha256(pwd)
      );
      return res.send(
        JSON.stringify({ success: true, message: "Signup is successful!" })
      );
    }
    if (user.username === name) {
      return res.send(
        JSON.stringify({
          success: false,
          message: "Username already exists. Log in instead?"
        })
      );
    }
  });
});

app.post("/login", upload.none(), (req, res) => {
  const name = req.body.username;
  const hashedPwd = sha256(req.body.password);
  for (key in req.body) {
    if (req.body[key] === "") {
      return res.send(
        JSON.stringify({
          success: false,
          message: `${key} cannot be empty.`
        })
      );
    }
  }
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      return res.send(
        JSON.stringify({ success: false, message: "Error with this login" })
      );
    }
    if (user === null) {
      return res.send(
        JSON.stringify({
          success: false,
          message: "User doesn't exist. Log in instead?"
        })
      );
    }
    if (user.password === hashedPwd) {
      return res.send(
        JSON.stringify({ success: true, message: "Succesfully logged in!" })
      );
    }
    return res.send(
      JSON.stringify({ success: false, message: "Your password don't match!" })
    );
  });
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

// app.listen(4000, "0.0.0.0", () => {
//   console.log("Server running on port 4000");
// });
