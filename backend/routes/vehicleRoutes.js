const express = require('express');
const { addVehicle, getVehicles, deleteVehicle, getVehicleById,updateVehicle, updateVehicleAvailability, getAvailableVehicles} = require('../controllers/vehicleController');

const router = express.Router();

//POST /vehicles
router.post('/vehicles', addVehicle);
router.get('/vehicles', getVehicles);
router.get('/vehicles/available',getAvailableVehicles);
router.get('/vehicles/:VehicleID', getVehicleById);
router.put('/vehicles/:VehicleID', updateVehicle);
router.put('/vehicles/availability/:VehicleID',updateVehicleAvailability);
router.delete('/vehicles/:VehicleID', deleteVehicle);

module.exports = router;
