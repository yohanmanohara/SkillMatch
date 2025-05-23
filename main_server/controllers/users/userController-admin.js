
const userModel = require('../../models/userModel')
const mongoose = require('mongoose')




const getUsers = async (req, res) => {

  const {role} = req.body
  

  if (role =='admin') {
  try {
    const users = await userModel.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}
else{
  alert('You are not an admin')
}
}



const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such users'})
  }

  const user = await userModel.findOneAndDelete({_id: id})

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
};



const putEmployee = async (req, res) => {
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'cluster id is not valid'})
  }

  const user = await userModel.findOneAndUpdate(
    { _id: id }, 
    { role: "Employee" }, 
    { new: true } 
  );


  if (!user) {
    return res.status(400).json({error: 'notto update'})
  }
 
  res.status(200).json(user)
}


const putEmployer = async (req, res) => {
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'cluster id is not valid'})
  }

  const user = await userModel.findOneAndUpdate(
    { _id: id }, 
    { role: "Employer" }, 
    { new: true } 
  );


  if (!user) {
    return res.status(400).json({error: 'notto update'})
  }
 
  res.status(200).json(user)
}





const putActive = async (req, res) => {
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'cluster id is not valid'})
  }

  const user = await userModel.findOneAndUpdate(
    { _id: id }, // Query to find the user by id
    { status: "Active" }, // Update the status to 'active'
    { new: true } // Return the updated document
  );


  if (!user) {
    return res.status(400).json({error: 'notto update'})
  }
 
  res.status(200).json(user)
}



const putInactive = async (req, res) => {
  const { id } = req.params
  

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'cluster id is not valid'})
  }

  const user = await userModel.findOneAndUpdate(
    { _id: id }, // Query to find the user by id
    { status: "Inactive" }, // Update the status to 'active'
    { new: true } // Return the updated document
  );


  if (!user) {
    return res.status(400).json({error: 'notto update'})
  }
 
  res.status(200).json(user)
}









module.exports = {
  getUsers,
  putEmployee,
  putEmployer,
  putInactive,
  putActive,
  deleteUser,
  
};