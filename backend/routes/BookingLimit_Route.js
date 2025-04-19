const express = require('express');
const { Op } = require('sequelize');
const BookingLimit = require('../models/bookingLimit'); // Adjust path as needed

const router = express.Router();

// Create new booking limit
router.post('/', async (req, res) => {
  try {
    const { Booking_Date, Booking_Limit } = req.body;

    if (!Booking_Date || !Booking_Limit) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    const newLimit = await BookingLimit.create({
      Booking_Date,
      Booking_Limit
    });

    return res.status(201).json(newLimit);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Get all booking limits
router.get('/', async (req, res) => {
  try {
    const bookingLimits = await BookingLimit.findAll();
    return res.status(200).json(bookingLimits);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Get booking limit by ID or Booking_Date
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    // Try to find by primary key (id)
    const byId = await BookingLimit.findByPk(identifier);
    if (byId) {
      return res.status(200).json(byId);
    }

    // Try to find by Booking_Date (ISO format expected)
    const byDate = await BookingLimit.findOne({
      where: { Booking_Date: new Date(identifier) }
    });

    if (byDate) {
      return res.status(200).json(byDate);
    }

    return res.status(404).json({ message: 'Booking limit not found.' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Update booking limit
router.put('/:id', async (req, res) => {
  try {
    const { Booking_Date, Booking_Limit } = req.body;

    if (!Booking_Date || !Booking_Limit) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    const [updated] = await BookingLimit.update(
      { Booking_Date, Booking_Limit },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Booking limit not found' });
    }

    return res.status(200).send({ message: 'Booking limit updated successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// Delete booking limit
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BookingLimit.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Booking limit not found' });
    }

    return res.status(200).send({ message: 'Booking limit deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
