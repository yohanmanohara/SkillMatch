const Organization = require('../../models/organizationModel');
const User = require('../../models/userModel')
require('dotenv').config();
const Job = require('../../models/jobModel'); // Path to the Job model




const fetchjobs = async(req,res)=>
{
  
  try {
    const jobItems = await Job.find(); 

    res.status(200).json(jobItems);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch job items', error: err.message });
  }



};





















const addjobs = async (req, res) => {
  const { id } = req.query; // ID of the organization from query params
  
  console.log("Received Data:", req.body);
  const {
    companyname,
    title,
    employmentTypes,
    description,
    location,
    requirements,
    desirable,
    benefits,
    expirienceduration,
    educationlevel,
    pictureurl,
    expiredate,
    salaryMin,
    salaryMax,
  } = req.body;

  if (
    !companyname ||
    !title ||
    !description ||
    !location ||
    !expirienceduration ||
    !educationlevel ||
    !pictureurl ||
    !expiredate ||
    !salaryMin ||
    !salaryMax ||
    ! employmentTypes.length === 0 ||  // Ensure array is not empty
    ! requirements.length === 0 ||  
    ! desirable.length === 0 ||  
    ! benefits.length === 0
  ) 
  

  
  
  
  {
    return res.status(400).json({ message: 'All fields are required' });
  }


  const user = await User.findById(id);
  const organizationid =await user.company;
  console.log(organizationid);

  try {
    const newJob = new Job({
      companyname,
      title,
      employmentTypes,
      description,
      location,
      requirements,
      desirable,
      benefits,
      expirienceduration,
      educationlevel,
      pictureurl,
      expiredate,
      salaryMin,
      salaryMax,
      organization: organizationid,
    });

    await newJob.save();

    const org = await Organization.findById(organizationid);
    if (!org) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    org.addedjobs.push(newJob._id); 

    await org.save(); 
   

    // Respond with the saved job
    return res.status(201).json({ message: 'Job added successfully', job: newJob });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};




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

  const updatejobs = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedJobData = req.body;
  
      const updatedJob = await Job.findByIdAndUpdate(id, updatedJobData, {
        new: true, // Return updated job document
        runValidators: true, // Validate before updating
      });
  
      if (!updatedJob) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      res.status(200).json({ success: true, job: updatedJob });
    } catch (error) {
      console.error("Update Job Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  const deletejob = async (req, res) => {
    const { id } = req.query;
  
    try {
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      const organization = await Organization.findById(job.organization);
      if (!organization) {
        return res.status(404).json({ message: "Organization not found" });
      }
  
      organization.addedjobs = organization.addedjobs.filter(jobId => !jobId.equals(id));
      await organization.save(); 
  
      await job.deleteOne();
  
      res.status(200).json({ message: "Job deleted successfully" });

  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
 
  
  const getOrganizationJobs = async (req, res) => {
    const { id } = req.query;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const organization = await Organization.findOne({ user: id });
      if (!organization) {
        return res.status(404).json({ message: 'Organization not found' });
      }
  
      const { addedjobs } = organization;
      
      if (!Array.isArray(addedjobs) || addedjobs.length === 0) {
        return res.status(404).json({ message: 'No jobs found' });
      }
  
      // Fetch jobs
      const jobItems = await Job.find({ _id: { $in: addedjobs } });
      res.status(200).json({ jobItems });
  
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving jobs', error: error.message });
    }
  };
  



  module.exports = { createOrganization,getpicture ,addjobs,fetchjobs,updatejobs,deletejob,getOrganizationJobs}; // Export the functions to be used in the routes file