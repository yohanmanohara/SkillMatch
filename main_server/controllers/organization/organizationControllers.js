const Organization = require('../../models/organizationModel');
const User = require('../../models/userModel')
require('dotenv').config();


const createOrganization = async (req, res) => {
      const { id } = req.query; 
      const {
        companyName, companyType, companyEmail, contactNumber,
        websiteUrl, streetAddress, city, state, postalCode, companyDescription
      } = req.body;
  
      if (!companyName || !companyType || !companyEmail || !contactNumber || !websiteUrl || !streetAddress || !city || !state || !postalCode || !companyDescription) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      try {
      
        const user = await User.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
       
        const existingOrganization = await Organization.findOne({ companyEmail });
        if (existingOrganization) {
          return res.status(400).json({ message: 'Email already in use' });
        }
  
        
        const newOrganization = new Organization({
          companyPicUrl,
          companyName,
          companyType,
          companyEmail,
          contactNumber,
          websiteUrl,
          streetAddress,
          city,
          state,
          postalCode,
          companyDescription
        });
  
        await newOrganization.save();
  
    
        user.company.push(newOrganization._id);
        await user.save();
  
        res.status(201).json({ message: 'Organization created successfully', organization: newOrganization });
      } catch (error) {
        res.status(500).json({ message: 'Error creating organization', error: error.message });
      }
    }
    



module.exports = { createOrganization };