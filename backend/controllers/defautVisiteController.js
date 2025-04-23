
const DefautVisite = require('../models/defautVisit');
const { Op } = require('sequelize');

exports.addDefaut = async (req, res) => {
  const { description, gravite, visiteID } = req.body;

  try {
    const vehicle = await DefautVisite.create({
      description,
      gravite,
      visiteID,

    });
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create vehicle', error });
  }
};


exports.getDefaut = async (req, res) => {
  try {
    const vehicles = await DefautVisite.findAll();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch center' });
  }
};


exports.getDefautyId = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicle = await DefautVisite.findByPk(id);
    if (vehicle) {
      res.status(200).json(vehicle);
    } else {
      res.status(404).json({ error: 'center not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch center' });
  }
};


exports.updateDefaut = async (req, res) => {
  const { VehicleID } = req.params;
  const { Telephone, Name, Adresse } = req.body;

  try {
    const vehicle = await DefautVisite.findByPk(VehicleID);
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



exports.deleteDefaut = async (req, res) => {
  const { VehicleID } = req.params;

  try {
    const vehicle = await DefautVisite.findByPk(VehicleID);
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