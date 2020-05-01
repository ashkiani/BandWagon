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
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      favArtist,
      cityOfInterest,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const queryResult = await db.executeQuery(
      `SELECT * FROM tbl_users WHERE email='${email}'`
    );
    let userExists = queryResult.length > 0;
    console.log("User already exists");
    if (userExists) {
      res.status(400).send("The provided Email already exists.");
    } else {
      let newUser = await db.executeQuery(
        `INSERT INTO tbl_users SET email= '${email}' , password= '${hashedPassword}' , first_name='${firstName}' , last_name='${lastName}', fav_artist='${favArtist}', city_of_interest='${cityOfInterest}'`
      );
      if (newUser.affectedRows > 0) {
        res.status(200).send("Welcome to the club!");
      } else {
        res.status(500).send("Error registering new user please try again.");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal error please try again",
    });
  }
});

app.post("/api/authenticate", async function (req, res) {
  try {
    const { email, password } = req.body;
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

app.post("/api/interested", withAuth, async function (req, res) {
  try {
    const { eventId } = req.body;
    const email = req.email;
    console.log("email");
    console.log(email);
    console.log("event");
    console.log(eventId);
    let queryResult = await db.executeQuery(
      `SELECT id FROM tbl_users WHERE tbl_users.email ='${email}'`
    );
    const userExists = queryResult.length > 0;
    if (userExists) {
      const userId = queryResult[0].id;
      const conditions = [`user_id =${userId}`, `event_id=${eventId}`];
      queryResult = await db.executeQuery(
        `SELECT * FROM tbl_interests WHERE ${conditions[0]} and ${conditions[1]}`
      );
      const recordExists = queryResult.length > 0;
      if (recordExists) {
        console.log("interest exists");
        res.status(400).send("The user has already marked this event.");
      } else {
        console.log("interest not exist");
        queryResult = await db.executeQuery(
          `INSERT INTO tbl_interests SET ${conditions[0]} , ${conditions[1]}`
        );
        if (queryResult.affectedRows > 0) {
          res.status(200).send("Interest recorded!");
        } else {
          res.status(500).send("Failed to record the interest.");
        }
      }
    } else {
      res.status(400).send("Invalid User.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("/api/profile", async function (req, res) {
  const email = "test2@mail.com";
  // const { email, password } = req.body;
  // console.log(req.body);
  const queryForProfile = await db.executeQuery(
    `SELECT * FROM tbl_users WHERE email='${email}'`
  );
  const usersName = queryForProfile[0].first_name + " " + queryForProfile[0].last_name;
  const usersCity = queryForProfile[0].city_of_interest;
  const usersArtist = queryForProfile[0].fav_artist;
  const usersEmail = queryForProfile[0].email;
  res.json({name: usersName, artist: usersArtist, city: usersCity, email: usersEmail});
});

app.get("/api/api_key", withAuth, async function (req, res) {
  try {
    console.log("sending API_KEY");
    res.status(200).json({
      API_KEY: process.env.API_KEY,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

try {
  if (process.env.JAWSDB_URL) {
    db.connectRemote(process.env.JAWSDB_URL);
  } else {
    let credential = JSON.parse(process.env.LOCAL_DB);
    console.log(credential);
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
      console.log(err);
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
