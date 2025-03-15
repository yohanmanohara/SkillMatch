
const userModel = require('../../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const otpStore = {};


const updatecv = async (req, res) => {
  const { id } = req.query;
  const { formdataurl } = req.body;

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User ID is not valid' });
  }

  try {
    // Find the user by ID
    const user = await userModel.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if formdataurl exists and is an object with a `url` field
    if (formdataurl && formdataurl.url) {
      // Extract the URL from the object
      user.cvUrl = formdataurl.url; // Assign the actual URL string to cvUrl
    } else {
      return res.status(400).json({ error: 'Invalid CV URL provided' });
    }

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'CV uploaded and user updated', user });

  } catch (error) {
    console.error('Error during CV update:', error);
    res.status(500).json({ error: 'An error occurred while uploading the CV' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User ID is not valid' });
  }

  const user = await userModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });

  if (!user) {
    return res.status(400).json({ error: 'Failed to update user' });
  }

  res.status(200).json(user);
};


const updatePassword = async (req, res) => {
  const { id } = req.query;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid({id})) {
    return res.status(404).json({ error: 'User ID is not valid' });
  }


  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'All password fields are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'New password must be at least 6 characters long' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New password and confirm password do not match' });
  }


  const user = await userModel.findById({_id	: id});

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }


  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({error: 'Current password is incorrect' });
  }


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

 
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: 'Password updated successfully' });
};


 
const getsingleuser = async (req, res) => {

  const { id } = req.query;
  try {
   
    const user = await userModel.findById({_id: id});
   
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
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





const otpfroget = async (req, res) => {

  const { email } = req.body;

  const otp = crypto.randomInt(100000, 999999).toString();
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  } 
  otpStore[email] = {
    otp,
    user,
    otpExpires: Date.now() + 5 * 60 * 1000, // OTP expires in 5 minutes
  };


  await sendOtpEmail(email, otp);

  res.status(200).json({
    message: 'OTP sent to your email. Please verify within 5 minutes. {froget password}',
    email,
    otpExpires: otpStore[email].otpExpires,
    otp,
  });




}


const resetpassword = async (req, res) => {

  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Password and confirm password do not match' });
  }

  const userpas = await userModel.findOne({ email: email }); 
  const isSamePassword = await bcrypt.compare(newPassword, userpas.password);

  if (isSamePassword) {
    return res.status(400).json({ message: 'New password cannot be the same as the old password' });
  }

  if (!otpStore[email]) {
    return res.status(400).json({ message: 'OTP not sent or expired' });
  }

  if (otp !== otpStore[email].otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  if (Date.now() > otpStore[email].otpExpires) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  const user = otpStore[email].user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: 'Password reset successful' });



}












  
module.exports = {
    getsingleuser,
    resetpassword,
    otpfroget,
    updateUser,
    updatePassword,
    updatecv
  };