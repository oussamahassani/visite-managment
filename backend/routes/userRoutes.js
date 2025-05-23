// routes/userRoutes.js
const express = require('express');
const { register, login, logout, verifyToken,fogetpass} = require('../controllers/userController');

const router = express.Router();

router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ valid: true, user: req.user });
});
router.post('/register', register);
router.post('/login', login);
router.post('/fogetpass', fogetpass);
router.post('/logout',logout);

module.exports = router;
