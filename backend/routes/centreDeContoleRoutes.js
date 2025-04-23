const express = require('express');

const { addCenters, getCenters, deleteCenters, updateCenters, getCentersById } = require('../controllers/centerController');

const router = express.Router();


router.post('/centres', addCenters);
router.get('/centres', getCenters);
router.get('/centres/:id', getCentersById);
router.put('/centres/:VehicleID', updateCenters);
router.delete('/centres/:VehicleID', deleteCenters);
module.exports = router;
