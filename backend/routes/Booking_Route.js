const express = require('express');
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const Booking = require('../models/booking'); // Sequelize version of createVehicle
const BookingLimit = require('../models/bookingLimit'); // Sequelize version of addLimit

const router = express.Router();


let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "44803bfdbba068",
      pass: "22dc105f11c1e9"
    }
  });

// Send confirmation email
const sendBookingConfirmationEmail = (customerEmail, bookingDetails) => {
  const mailOptions = {
    from: 'system@gmail.com',
    to: customerEmail,
    subject: 'Booking Confirmation',
    html: `<p>Dear ${bookingDetails.Customer_Name},</p>
           <p>Your booking for ${bookingDetails.Vehicle_Type} (Number: ${bookingDetails.Vehicle_Number})</p>
           <p>on ${bookingDetails.Booking_Date} has been confirmed.</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Create new booking
router.post('/', async (req, res) => {
  try {
    const {
      cusID, Booking_Date, Customer_Name, Vehicle_Type,
      Vehicle_Number, Contact_Number, Email,
      selectedPackage, selectedServices
    } = req.body;

    if (!Customer_Name || !Vehicle_Type || !Vehicle_Number || !Contact_Number || !Email) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    const bookingDate = new Date(Booking_Date);

    const bookingLimit = await BookingLimit.findOne({ where: { Booking_Date: bookingDate } });
    const maxBookingsPerDay = bookingLimit ? bookingLimit.Booking_Limit : 0;

    const bookingsCount = await Booking.count({ where: { Booking_Date: bookingDate } });

    if (bookingsCount >= maxBookingsPerDay) {
      return res.status(400).send({ message: 'Booking limit exceeded for the selected date' });
    }

    const newBooking = await Booking.create({
      cusID,
      Booking_Date: bookingDate,
      Customer_Name,
      Vehicle_Type,
      Vehicle_Number,
      Contact_Number,
      Email,
      selectedPackage,
      selectedServices
    });

    sendBookingConfirmationEmail(Email, req.body);

    return res.status(201).json(newBooking);

  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get booking by ID or cusID
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;

    const byId = await Booking.findByPk(identifier);
    if (byId) return res.status(200).json(byId);

    const byCUSID = await Booking.findAll({ where: { cusID: identifier } });
    if (byCUSID.length > 0) return res.status(200).json(byCUSID);

    return res.status(404).json({ message: 'Booking not found' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    const {
      Customer_Name, Vehicle_Type, Vehicle_Number,
      Contact_Number, Email, Booking_Date, selectedPackage, selectedServices
    } = req.body;

    if (!Customer_Name || !Vehicle_Type || !Vehicle_Number || !Contact_Number || !Email) {
      return res.status(400).send({ message: 'Send all required fields' });
    }

    const [updated] = await Booking.update(req.body, { where: { id: req.params.id } });

    if (!updated) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).send({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Booking.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    return res.status(200).send({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Search bookings by name, vehicle number, or email
router.get('/searchbooking', async (req, res) => {
  try {
    const search = req.query.search;

    const results = await Booking.findAll({
      where: {
        [Op.or]: [
          { Customer_Name: { [Op.iLike]: `%${search}%` } },
          { Vehicle_Number: { [Op.iLike]: `%${search}%` } },
          { Email: { [Op.iLike]: `%${search}%` } }
        ]
      }
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
