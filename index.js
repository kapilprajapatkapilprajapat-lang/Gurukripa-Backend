const express = require('express');
const app = express();
const user = require('./src/controllers/usercontroller');
require('dotenv').config();
require('./src/config/db');

app.use(express.json());
app.use('/gurukripa', user);

const PORT = process.env.PORT | 8000;

app.get("/", (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Welcome | Guru Kripa</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(135deg, #ff9a9e, #fad0c4);
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          background: #ffffff;
          padding: 40px 30px;
          border-radius: 16px;
          text-align: center;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        h1 {
          margin: 0;
          color: #333;
          font-size: 28px;
        }
        p {
          margin-top: 12px;
          color: #555;
          font-size: 16px;
          line-height: 1.6;
        }
        .footer {
          margin-top: 25px;
          font-size: 14px;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🙏 Welcome To Guru Kripa 🙏</h1>
        <p>
          Your backend service is running successfully on Vercel.
          We wish you growth, success, and divine blessings.
        </p>
        <div class="footer">
          🚀 Powered by Node.js & Vercel
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is Running on PORT = ${PORT}`);
});
