const express = require('express')


const {addVehicle} = require('../controllers/vehicles/userVehicleController')
const {getVehicle} = require('../controllers/vehicles/userVehicleController')
const {deleteVehicle}=require('../controllers/vehicles/userVehicleController')

const router = express.Router()
router.post('/addvehicle',addVehicle)
router.get('/getvehicles',getVehicle)
router.delete('/deleteVehicle/:id', deleteVehicle)





module.exports = router