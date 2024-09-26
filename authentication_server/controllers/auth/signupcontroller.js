const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { route } = require('../../routes/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

const otpStore = {};


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60, // 3 days
  });
};

let baseId = 1; // Starting value for sequential IDs

function getSequentialId() {
  return baseId++; // Increment by 1 for each new user
}




const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending OTP email:', error);
  }
};





const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'All inputs are required' });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

   
    const otp = crypto.randomInt(100000, 999999).toString();

    
    otpStore[email] = {
      otp,
      hashedPassword: await bcrypt.hash(password, 10),
      username,
      otpExpires: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
    };


    await sendOtpEmail(email, otp);

    res.status(200).json({
      message: 'OTP sent to your email. Please verify within 5 minutes.',
      email,
      otpExpires: otpStore[email].otpExpires,
      otp,
    });


  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};


const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  
  const otpDetails = otpStore[email];
  if (!otpDetails) {
    return res.status(400).json({ message: 'OTP has expired or is invalid' });
  }

  const { otp: storedOtp, hashedPassword, username, otpExpires } = otpDetails;

 
  if (otp !== storedOtp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  
  if (Date.now() > otpExpires) {
    delete otpStore[email]; // Clean up expired OTP
    return res.status(400).json({ message: 'OTP has expired' });
  }

  try {
    
    const newUser = new User({
      id: getSequentialId(),
      email,
      password: hashedPassword,
      username,
      status: 'Active',
    });

    await newUser.save();

   
    const token = createToken(newUser._id);

    delete otpStore[email];

    res.status(200).json({
      message: 'Login successful',
        redirectUrl: `${process.env.PORT}/customer/overview`,
        user: { email: newUser.email },
        token,
    });


  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};





module.exports = { signupUser, verifyOtp};
