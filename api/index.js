const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
// force: false to avoid erase&recreate db when sv restarts.
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log("Connected successfully to the PORT."); // eslint-disable-line no-console
  });
});
