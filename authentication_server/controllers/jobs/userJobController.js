

const userModel = require('../../models/userModel')
const vehicleModel = require('../../models/vehicleModel')
const mongoose = require('mongoose')





const getJobs = async (req, res) => {

  const { id } = req.query;
  try {
   
    const user = await userModel.findById(id);
    const vehicles = await vehicleModel.find({ user: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
}


const deleteJobs = async (req, res) => {
  const { id } = req.params; 


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid vehicle ID' });
  }

  try {
    
    const vehicle = await vehicleModel.findById(id).select('user');

    
    if (!vehicle) {
      return res.status(404).json({ error: 'No such vehicle' });
    }

   
    const deletedVehicle = await vehicleModel.findOneAndDelete({ _id: id });

    
    await userModel.findByIdAndUpdate(vehicle.user, { $pull: { vehicles: id } });

    
    res.status(200).json(deletedVehicle);
  } catch (error) {
    
    res.status(500).json({ error: 'Error deleting vehicle', details: error.message });
  }
};










const addJobs = async (req, res) => {
  const { name, numberPlate, driverName, iotid, contactnumber } = req.body;
  const { id } = req.query;

  if (!name || !numberPlate || !driverName || !id) {
    return res.status(400).json({ message: 'All inputs are required' });
  }

  try {
    // Check if the number plate or IoT device is already in use
    const existingNumberPlate = await vehicleModel.findOne({ numberPlate });
    const existingDevice = await vehicleModel.findOne({ iotid });

    if (existingNumberPlate) {
      return res.status(400).json({ message: 'Number plate is already in use' });
    }

    if (existingDevice) {
      return res.status(400).json({ message: 'Tracker is already in use with another vehicle' });
    }

    // Check if the user exists
    const vehicleUser = await userModel.findById({_id: id});
    if (!vehicleUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create new vehicle and reference the user
    const newVehicle = new vehicleModel({
      name,
      numberPlate,
      driverName,
      iotid,
      status: 'Active',
      contactnumber,
      user: vehicleUser._id, // Reference only the user's ID
    });

    await newVehicle.save();

    // Update user to associate the vehicle with the user
    await userModel.findByIdAndUpdate({_id:id}, { $push: { vehicles: newVehicle._id } });

    const user = await userModel.findById({_id:id}).populate('vehicles');
    console.log(user);

    res.status(200).json({
      message: 'Vehicle added successfully',
    });
  } catch (error) {
    console.error('Error adding vehicle:', error); // Detailed log
    res.status(500).json({ message: 'Error', error: error.message });   }
};



module.exports = {
  getJobs,
  addJobs,
  deleteJobs,
  
};