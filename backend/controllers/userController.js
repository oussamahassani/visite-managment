

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios')
const nodemailer = require('nodemailer');

const secretKey = 'your_secret_key';
//const RECAPTCHA_SECRET_KEY = "6LdXItcqAAAAAFpLvdcVx5qphP7PQ0uz4-SANOhD"; 
const SITE_KEY = "6Lcu2RwrAAAAAFTuatspqDBOoRs5Ue4CLCgjcpnl"
const RECAPTCHA_SECRET_KEY = "6Lcu2RwrAAAAAOFqJZkFo56LpcNy32-sQUO7iKP2"
const saltRounds = 10;
const blacklistedTokens = new Set();

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "44803bfdbba068",
      pass: "22dc105f11c1e9"
    }
  });
exports.verifyToken = (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ valid: false, message: 'Access denied' });

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ valid: false, message: 'Token is invalidated' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ valid: false, message: 'Session expired' });
            }
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username, email, password: hashedPassword });

        return res.status(201).json({ status: 'Success', message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
};


exports.fogetpass = async (req, res) => {
    const {  email } = req.body;

    if ( !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }
console.log(email)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        const hashedPassword = await bcrypt.hash("123456789", saltRounds);
        const existingUsers = await existingUser.update({ password: hashedPassword });

    let mailOptions = {
        from: '"System" <websitel@gmail.com>',  // sender address
        to: email,                 // list of receivers
        subject: 'new password is '    ,
        text: 'your password is ' +123456789  ,        // plain text body
      };
      
      // Send email
     transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(200).json({status:false, message: error });

        }
        console.log('Message sent:', info.response);
        return res.status(200).json({status:true, message: 'password send' });

      });
    }
    else {
        return res.status(400).json({ message: 'Email not exists' });

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password, captcha } = req.body;
        if (!captcha) {
            return res.status(400).json({ login: false, message: "reCAPTCHA verification is required" });
        }
        const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${captcha}`;
        const recaptchaResponse = await axios.post(recaptchaUrl);

        if (!recaptchaResponse.data.success) {
            return res.status(400).json({ login: false, message: "Invalid reCAPTCHA. Please try again." });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ login: false, message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ login: false, message: 'Invalid password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            { expiresIn: '1h' }
        );

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: false,
            maxAge: 3600000,
        });

        return res.status(200).json({ login: true, token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
    }
};

exports.logout = (req, res) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ status: 'Error', message: 'No token provided' });
    }

    blacklistedTokens.add(token);

    res.clearCookie('accessToken');

    return res.status(200).json({ status: 'Success', message: 'Logged out successfully' });
};
