const express = require('express');

const { addDefaut, getDefaut, getDefautyId } = require('../controllers/centerController');

const router = express.Router();


router.post('/centres', addDefaut);
router.get('/centres', getDefaut);
router.get('/centres/:id', getDefautyId);
module.exports = router;
