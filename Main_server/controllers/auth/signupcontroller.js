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

async function getUserCount() {
    try {
   

      const latestUser = await User.find().sort({id: -1}).limit(1);
      const currentId = latestUser.length > 0 ? latestUser[0].id : 0;
      console.log(`Current highest user id: ${currentId}`);
      
      return currentId;
    } catch (error) {
      console.error('Error fetching user count:', error);
      throw error; 
    }
}

async function getSequentialId() {

  try {
    const userCount = await getUserCount(); 
    const baseId = userCount + 1; 
    console.log(`Next sequential ID: ${baseId}`);
    return baseId;
  } catch (error) {
    console.error('Error getting sequential ID:', error);
    throw error; 
  }
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

 
  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

 
  const otpDetails = otpStore[email];
  if (!otpDetails) {
    return res.status(400).json({ message: 'OTP has expired or is invalid' });
  }

  const { otp: storedOtp, hashedPassword, username, otpExpires } = otpDetails;

 
  if (otp !== storedOtp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }


  if (Date.now() > otpExpires) {
    delete otpStore[email];
    return res.status(400).json({ message: 'OTP has expired' });
  }
  
 

  try {
    const newUserId = await getSequentialId();
    const newUser = new User({
      id: newUserId,
      email,
      password: hashedPassword,
      username,
      status: 'Active',
      role: 'Employee',
      
    });

    await newUser.save();

    
    delete otpStore[email];

   
    res.status(200).json({
      message: 'User registration successful',
      redirectUrl: '/login',
      user: { email: newUser.email },
    });
  } catch (error) {
   
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};



module.exports = { signupUser, verifyOtp};
