const express = require('express');
const app = express();
const user = require('./src/controllers/usercontroller');
require('dotenv').config();
require('./src/config/db');

app.use(express.json());
app.use('/gurukripa', user);

const PORT = process.env.PORT | 8000;

app.get('/',(req,res)=>{
  return res.status(200).json({
    message:"Welcome To Guru Kripa"
  })
})

app.listen(PORT, () => {
  console.log(`Server is Running on PORT = ${PORT}`);
});
