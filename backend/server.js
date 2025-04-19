const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const vehicleRoutes = require('./routes/vehicleRoutes');
const customerRoutes = require('./routes/customerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const orderSummaryRoutes = require('./routes/ordersummaryRoutes');
const countRoutes = require('./routes/countRoutes');
const notifyRoutes = require('./routes/notifyRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const BookingRoutes = require('./routes/Booking_Route.js');
const BookingLimitRoutes = require('./routes/BookingLimit_Route.js');

require('./association/association.js'); 

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    origin: ["http://localhost:3000",'http://localhost:3001','http://localhost:3002','http://localhost:3003', "http://192.168.1.21:3001","http://192.168.1.21:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/api/bookinglimits', BookingLimitRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api', userRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', customerRoutes);
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes);
app.use('/api', expenseRoutes);
app.use('/api', orderSummaryRoutes);
app.use('/api', countRoutes);
app.use('/api', notifyRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');

  app.listen(5001, () => {
    console.log('Server running on http://localhost:5001');
  });

  // app.listen(5000, '0.0.0.0', () => {
  //   console.log('Server running on http://192.168.1.21:5000');
  // });

});
