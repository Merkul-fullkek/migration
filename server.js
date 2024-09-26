const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const userRoutes = require('./routes/user-routes');

(async () => {
  await db.sync({ force: true });
  console.log("The table for the User model was just (re)created!");
})();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});