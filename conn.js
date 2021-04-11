const Datastore = require("nedb");

const users = new Datastore({ filename: "data/users.db" });
const contacts = new Datastore({
  filename: "data/contacts.db",
  autoload: true,
});

const ODataServer = require("simple-odata-server");
const Adapter = require("simple-odata-server-nedb");

const userModel = {
  namespace: "sfouser",
  entityTypes: {
    UserType: {
      _id: { type: "Edm.String", key: true },
      name: { type: "Edm.String" },
    },
  },
  entitySets: {
    users: {
      entityType: "sfouser.UserType",
    },
  },
};

const contactModel = {
  namespace: "sfocontact",
  entityTypes: {
    ContactType: {
      _id: { type: "Edm.String", key: true },
      name: { type: "Edm.String" },
    },
  },
  entitySets: {
    contacts: {
      entityType: "sfocontact.ContactType",
    },
  },
};

const oUsers = ODataServer()
  .model(userModel)
  .adapter(
    Adapter(function (err, db) {
      db(null, users);
    })
  );
const oContacts = ODataServer()
  .model(contactModel)
  .adapter(
    Adapter(function (err, db) {
      db(null, contacts);
    })
  );

module.exports = { oContacts, oUsers };
