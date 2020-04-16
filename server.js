require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const Database = require("mysql-sync-query");
const db = new Database("bandwagon_db");
const withAuth = require("./middleware");
const bcrypt = require("bcrypt");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

app.get("/api/home", function (req, res) {
  res.send("Welcome!");
});

app.get("/api/secret", withAuth, function (req, res) {
  res.send("The password is potato");
});

app.post("/api/register", async function (req, res) {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let userExists =
    (await db.executeQuery(`SELECT * FROM tbl_users WHERE email='${email}'`)
      .length) > 0;
  if (userExists) {
    res.status(400).send("The provided Email is already assigned to a user.");
  } else {
    let newUser = await db.executeQuery(
      `INSERT INTO tbl_users SET email= '${email}' , password= '${hashedPassword}' , first_name='${firstName}' , last_name='${lastName}'`
    );
    if (newUser.affectedRows > 0) {
      res.status(200).send("Welcome to the club!");
    } else {
      res.status(500).send("Error registering new user please try again.");
    }
  }
});

app.post("/api/authenticate", async function (req, res) {
  const { email, password } = req.body;
  try {
    let result = await db.executeQuery(
      `SELECT * FROM tbl_users WHERE email='${email}'`
    );
    if (result.length === 1) {
      console.log("email found.");
      if (await bcrypt.compare(password, result[0].password)) {
        console.log("password matched.");
        // Issue token
        const payload = { email };
        const token = jwt.sign(payload, process.env.AUTH_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
      } else {
        console.log("password didn't match.");
        res.status(401).json({
          error: "Incorrect email or password",
        });
      }
    } else {
      console.log("email not found.");
      res.status(401).json({
        error: "Incorrect email or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal error please try again",
    });
  }
});

app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

try {
  if (process.env.JAWSDB_URL) {
    db.connectRemote(process.env.JAWSDB_URL);
  } else {
    let credential = require("./config/localConnection");
    db.connectLocal(
      credential.host,
      credential.port,
      credential.username,
      credential.password
    );
  }
  db.connection.connect(function (err) {
    if (err) {
      console.error("Failed to connect to DB."); //+ err.stack
      return;
    }
    console.log("Connected to DB as id " + db.connection.threadId);
    app.listen(PORT, async () => {
      console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
  });
} catch (err) {
  console.log("Failed to connect to DB.");
  console.log(err);
}
