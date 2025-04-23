
const ControleCenter = require('../models/ContoleCenter');
const { Op } = require('sequelize');

exports.addCenters = async (req, res) => {
  const { Telephone, Name, Adresse } = req.body;

  try {
    const vehicle = await ControleCenter.create({
      Telephone,
      Name,
      Adresse,

    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle', error });
  }
};


exports.getCenters = async (req, res) => {
  try {
    const vehicles = await ControleCenter.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch center' });
  }
};


exports.getCentersById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await ControleCenter.findByPk(id);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'center not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch center' });
  }
};


exports.updateCenters = async (req, res) => {
  const { VehicleID } = req.params;
  const { Telephone, Name, Adresse } = req.body;

  try {
    const vehicle = await ControleCenter.findByPk(VehicleID);
    if (vehicle) {
      await vehicle.update({ Telephone, Name, Adresse });
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'center not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update center', error });
  }
};



exports.deleteCenters = async (req, res) => {
  const { VehicleID } = req.params;

  try {
    const vehicle = await ControleCenter.findByPk(VehicleID);
    if (vehicle) {
      await vehicle.destroy();
      res.status(200).json({ message: 'center deleted successfully' });
    } else {
      res.status(404).json({ error: 'center not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete center' });
  }
};