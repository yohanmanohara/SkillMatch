const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { route } = require('../../routes/user');




const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
 
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
   
  
  
    try {
     
     
      if (email === "admin@gmail.com" && password === "admini") {
        const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        res.cookie('token', token, { httpOnly: true, maxAge:86400000 });
        return res.status(200).json({
          message: "Login successful as admini",
          redirectUrl:`${process.env.PORT}/admin/overview`,
          token,
          

        });
      }
  
  
      const user = await User.findOne({ email});

     

      
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      
      }
      const status = await User.findOne({email,status:"Active"});

      if (!status) {
        return res.status(400).json({ message: 'Your account is not active' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
    
      const token = jwt.sign({ email: user.email,role: "customer",id: user._id },process.env.JWT_SECRET, { expiresIn: '24h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
     
        res.status(200).json({
          message: 'Login successful',
          redirectUrl: `${process.env.PORT}/customer/overview`,
          user: { email: user.email ,
                  id: user._id.toString(),
          },
          token,
          
        });
      

     

      

    
  
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };
  


 



  module.exports = { loginUser };
  