const initDb = require("./init");

const express = require("express");
const app = express();
const conn = require("./conn");

app.get("/", (req, res) => res.send("hello world"));

app.post("/initdb", initDb);

// app.use("/ousers", oUsers.handle.bind(oUsers));
// app.use("/ousers", conn.oUsers.handle.bind(conn.oUsers));

app.use("/ocontacts", conn.oContacts.handle.bind(conn.oContacts));

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
