const Organization = require('../../models/organizationModel');
const User = require('../../models/userModel')
require('dotenv').config();

const createOrganization = async (req, res) => {
  const { id } = req.query;
  const {
    companyPicUrl, comapnyName, companyType, companyEmail, contactnumber,
    websiteUrl, streetAddress, city, state, postalCode, companyDescription
  } = req.body;

  if (!companyPicUrl || !comapnyName || !companyType || !companyEmail || !contactnumber || !websiteUrl || !streetAddress || !city || !state || !postalCode || !companyDescription) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log(req.body);

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
      comapnyName,
      companyType,
      companyEmail,
      contactnumber,
      websiteUrl,
      streetAddress,
      city,
      state,
      postalCode,
      companyDescription,
      user: user._id, 
    });

    await newOrganization.save();

    user.company.push(newOrganization._id);
    await User.findByIdAndUpdate(
      id, 
      { $set: { role: 'Employer' } }, 
      { new: true } 
    );
    await user.save();

    res.status(201).json({ message: 'Organization created successfully', organization: newOrganization });
  } catch (error) {
    res.status(500).json({ message: 'Error creating organization', error: error.message });
  }
};




  const getpicture = async (req, res) => {
    const { id } = req.query;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      const organization = await Organization.findOne({ user: id });
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }

      const companyanme = organization.comapnyName;
      if (!companyanme) {
        return res.status(404).json({ message: 'Organization name not found' });
      }
      const companyPicUrl = organization.companyPicUrl;
      if (!companyPicUrl) {
        return res.status(404).json({ message: 'Organization picture not found' });
      }
      res.status(200).json({ 
        companyName: companyanme,
        pictureurl: companyPicUrl,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving organization picture', error: error.message });
    }
  }


  module.exports = { createOrganization,getpicture };