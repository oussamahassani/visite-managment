
const Vehicle = require('../models/vehicle');
const { Op } = require('sequelize');

exports.addVehicle = async (req, res) => {
  const { cusID, VehicleType, VehicleName, RegistrationNo, UsageType, Capacity, FuelType, Availability } = req.body;

  try {
    const vehicle = await Vehicle.create({
      VehicleType,
      VehicleName,
      RegistrationNo,
      UsageType,
      Capacity,
      FuelType,
      Availability,
      cusID
    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle', error });
  }
};


exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.findAll({
      where: {
        Availability: {
          [Op.eq]: 'Available',
        },
      },
    });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available vehicles' });
  }
};

exports.getVehicleById = async (req, res) => {
  const { VehicleID } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(VehicleID);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};
exports.getVehicleByUser = async (req, res) => {
  const { UserID } = req.params;

  try {
    const vehicle = await Vehicle.findAll({ where: { cusID: UserID } });
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

exports.updateVehicle = async (req, res) => {
  const { VehicleID } = req.params;
  const { VehicleType, VehicleName, RegistrationNo, UsageType, Capacity, FuelType, Availability } = req.body;

  try {
    const vehicle = await Vehicle.findByPk(VehicleID);
    if (vehicle) {
      await vehicle.update({ VehicleType, VehicleName, RegistrationNo, UsageType, Capacity, FuelType, Availability });
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vehicle', error });
  }
};

exports.updateVehicleAvailability = async (req, res) => {
  const { VehicleID } = req.params;
  const { Availability } = req.body;

  try {
    const vehicle = await Vehicle.findByPk(VehicleID);
    if (vehicle) {
      await vehicle.update({ Availability });
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vehicle status', error });
  }
};

exports.deleteVehicle = async (req, res) => {
  const { VehicleID } = req.params;

  try {
    const vehicle = await Vehicle.findByPk(VehicleID);
    if (vehicle) {
      await vehicle.destroy();
      res.status(200).json({ message: 'Vehicle deleted successfully' });
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};