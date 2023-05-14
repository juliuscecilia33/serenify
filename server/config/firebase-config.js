var admin = require("firebase-admin");

var serviceAccount = require("./serenify-82872-firebase-adminsdk-1q5lx-bc9a18629a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
