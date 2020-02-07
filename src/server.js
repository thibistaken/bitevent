let express = require("express");
let multer = require("multer");
let upload = multer({ dest: "uploads/" });
let app = express();
let MongoDB = require("mongodb");
let MongoClient = MongoDB.MongoClient;
let ObjectId = MongoDB.ObjectId;
let sha256 = require("js-sha256");
const uuidv1 = require("uuid/v1");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const sessions = {};

let dbo = undefined;
let url =
  "mongodb+srv://thib:123@cluster0-4njgc.azure.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  dbo = client.db("main-db");
});

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

app.post("/signup", upload.none(), (req, res) => {
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
  if (email === pwd) {
    return res.send(
      JSON.stringify({
        success: false,
        message: "Username and password can't be the same."
      })
    );
  }
  dbo.collection("users").findOne({ email: email }, (err, user) => {
    if (err) {
      return res.send(
        JSON.stringify({ success: false, message: "Error in the sign up." })
      );
    }
    if (user === null) {
      dbo
        .collection("users")
        .insertOne({ email: email, password: sha256(pwd) });
      console.log(
        "Sign up done. Username is: ",
        email,
        " and password is: ",
        sha256(pwd)
      );
      return res.send(
        JSON.stringify({ success: true, message: "Signup is successful!" })
      );
    }
    if (user.email === email) {
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
  const email = req.body.email;
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
  dbo.collection("users").findOne({ email: email }, (err, user) => {
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
      const sessionId = uuidv1();
      res.cookie("sid", sessionId);
      sessions[sessionId] = email;
      console.log("session user: ", email, "sessionId: ", sessionId);
      console.log("Cookies: ", req.cookies);
      return res.send(
        JSON.stringify({
          success: true,
          message: "Succesfully logged in!",
          sessionId: sessionId
        })
      );
    }
    return res.send(
      JSON.stringify({ success: false, message: "Your password don't match!" })
    );
  });
});
app.get("/event", (req, res) => {
  const eventId = req.query.id;
  console.log("eventId", eventId);
  dbo.collection("events").findOne({ _id: ObjectId(eventId) }, (err, event) => {
    if (err) {
      return res.send(
        JSON.stringify({ success: false, message: "Error with this event" })
      );
    }
    if (event === null) {
      return res.send(
        JSON.stringify({ success: false, message: "There is no such event." })
      );
    }
    return res.send(JSON.stringify({ success: true, event }));
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("sid");
  res.send(JSON.stringify({ success: true, message: "cookie sid is cleared" }));
});
app.get("/session", (req, res) => {
  const sid = req.cookies.sid;
  if (sessions[sid]) {
    return res.send(JSON.stringify({ success: true, user: sessions[sid] }));
  }
  res.send(JSON.stringify({ success: false, message: "No user session" }));
});
// app.get("/events/attending", async function(req, res) {
//   const
//   await dbo.collection("events").find({ attendees:  });
// });
app.post("/new-event", upload.array("photo", 3), function(req, res) {
  const name = req.body.name;
  const desc = req.body.desc;
  const date = req.body.date;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const timestamp = req.body.timestamp;
  const location = req.body.location;
  const capacity = Number(req.body.capacity);
  const username = req.body.username;
  const files = req.files;
  for (key in req.body) {
    if (req.body[key] === "") {
      return res.send(
        JSON.stringify({ success: false, message: `${key} cannot be empty` })
      );
    }
  }
  let filePaths = files.map(file => {
    return "/uploads/" + file.filename;
  });
  dbo.collection("events").insertOne({
    name,
    desc,
    date,
    startTime,
    endTime,
    location,
    capacity,
    username,
    timestamp,
    filePaths
  });
  console.log("event posted");
  return res.send(
    JSON.stringify({ success: true, message: "event submitted successfully" })
  );
});

app.get("/delete-event", async function(req, res) {
  const eventId = req.query.id;
  try {
    await dbo.collection("events").deleteOne({ _id: ObjectId(eventId) });
    res.send(JSON.stringify({ success: true, message: "Event was deleted." }));
  } catch (err) {
    console.log("error");
  }
});
app.post("/register-event", upload.none(), async function(req, res) {
  const username = req.body.username;
  console.log("username", username);
  const eventId = req.body.eventId;
  await dbo.collection("events").updateOne(
    { _id: ObjectId(eventId) },
    {
      $inc: { capacity: -1 },
      $push: { attendees: username }
    }
  );
  return res.send(
    JSON.stringify({ success: true, message: "Succesfully registered." })
  );
});
app.get("/all-events", async function(req, res) {
  console.log("client req to fetch all events");
  try {
    const events = await dbo
      .collection("events")
      .find({})
      .toArray();
    res.send(
      JSON.stringify({ success: true, message: "all events fetched", events })
    );
  } catch (err) {
    console.log("error");
  }
});

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
