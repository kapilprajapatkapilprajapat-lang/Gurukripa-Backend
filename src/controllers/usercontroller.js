const express = require('express');
const app = express();
const user = require('../models/usermodel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretkey = process.env.SECRETKEY;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APPEMAIL,
    pass: process.env.APPPASSWORD
  }
});

app.post('/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Enter Required Fields"
      });
    }

    const existinguser = await user.findOne({ email });
    if (existinguser) {
      return res.status(409).json({
        message: "User Already Exists"
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      email,
      password: hashedpassword,
      username
    });

    const data = await newUser.save();

    // ✅ Welcome Email
    const mailOptions = {
      from: `"My App Team" <${process.env.APPEMAIL}>`,
      to: email,
      subject: "Welcome to My App 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${username} 👋</h2>
          <p>We are excited to have you on board.</p>
          <p>Your account has been successfully created.</p>
          <p>If you have any questions, feel free to contact us.</p>
          <br />
          <p>Thanks & Regards,</p>
          <p><strong>My App Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: "User Created & Welcome Email Sent!",
      response: data
    });

  } catch (ex) {
    console.log(ex);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
});


app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Enter Email and Password"
      })
    }
    const existinguser = await user.findOne({ email });
    if (!email) {
      return res.status(400).json({
        message: "User Not Exists"
      })
    }
    const isMatch = await bcrypt.compare(password, existinguser.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Password Not Match"
      })
    }
    const token = jwt.sign({
      id: existinguser._id
    }, secretkey, { expiresIn: '90d' });
    return res.status(201).json({
      message: "Sign In Success",
      response: existinguser,
      token: token
    })
  }
  catch (ex) {
    return res.status(500).json({
      message: "internal server error"
    })
  }
})

module.exports = app;
