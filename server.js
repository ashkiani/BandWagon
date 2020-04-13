const express = require("express");
const path = require("path");
const Database = require("mysql-sync-query");
const db = new Database("bandwagon_db");
const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
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
