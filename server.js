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
  const queryResult = await db.executeQuery(
    `SELECT * FROM tbl_users WHERE email='${email}'`
  );
  let userExists = queryResult.length > 0;
  console.log("User already exists");
  if (userExists) {
    res.status(400).send("The provided Email already exists.");
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

app.get("/api/test", async function (req, res) {
  res.send("Welcome Test");
  const queryResultTest = await db.executeQuery("SELECT * FROM tbl_users");
  console.log(queryResultTest);
  console.log(queryResultTest[0].email);
});

app.get("/api/profile", async function (req, res) {
  const email = "fake@email.com";
  const queryForProfile = await db.executeQuery(
    `SELECT * FROM tbl_users WHERE email='${email}'`
  );
  // const queryForName = await db.executeQuery(
  //   `SELECT first_name FROM tbl_users WHERE email='${email}'`
  // );
  // console.log(req.body);
  console.log(queryForProfile[0].first_name);
  const usersName = queryForProfile[0].first_name + queryForProfile[0].last_name;
  const usersAge = queryForProfile[0].age;
  const usersCity = queryForProfile[0].city;
  const usersArtist = queryForProfile[0].favorite_artist;

  const userInfo = `
  <h5 className="card-header text-center bg-success text-white">Personal Info</h5>
                <div className="card-body bg-dark text-white">
                  <h5 className="card-title">${usersName}</h5>
                  <p className="card-text"><b>Age:</b> ${usersAge}</p>
                  <p className="card-text"><b>City of Interest:</b> ${usersCity}</p>
                  <p className="card-text"><b>Favorite Artist:</b> ${usersArtist}</p>  
                </div>
  `;  

});

app.post("/profile", async function (req, res) {
  document.getElementsByClassName("card").push(userInfo);

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

// app.get("/profile", function (req, res){
const queryResult = db.executeQuery("SELECT * FROM tbl_users");
console.log(queryResult);
// });
