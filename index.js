const express = require('express');
const app = express();
const user = require('./src/controllers/usercontroller');
require('dotenv').config();
require('./src/config/db');

app.use(express.json());
app.use('/gurukripa', user);

const PORT = process.env.PORT | 8000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT = ${PORT}`);
});
