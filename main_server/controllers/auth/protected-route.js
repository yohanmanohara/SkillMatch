const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { route } = require('../../routes/user');


const verifyTokenadmin= async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      res.json({ message: `Hello ${decoded.email}`,
          
          
          token,
          role:{role:decoded.role},
          email: decoded.email,
          id: decoded.id,
          
       });
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }




}


  const verifyToken= async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        res.json({ message: `Hello ${decoded.email}`,
            
            
            token,
            role:{role:decoded.role},
            email: decoded.email,
            id: decoded.id || decoded.id,
            
         });
      });
    } else {
      res.status(401).json({ message: 'No token provided' });
    }




  }



module.exports = {verifyToken,verifyTokenadmin};