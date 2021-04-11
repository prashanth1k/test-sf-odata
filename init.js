function initDb(req, res) {
  const fs = require("fs");
  fs.unlinkSync("data/contacts.db");
  fs.unlinkSync("data/users.db");

  const Datastore = require("nedb");
  const db = {};
  db.users = new Datastore("data/users.db");
  db.contacts = new Datastore("data/contacts.db");
  db.users.loadDatabase((err) => {
    db.users.insert([{ name: "Tom" }]);
  });
  db.contacts.loadDatabase((err) => db.contacts.insert([{ name: "Joe" }]));

  res.send("Reinitialised app.");
}

module.exports = initDb;
