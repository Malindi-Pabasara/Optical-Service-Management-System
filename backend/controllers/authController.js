const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Register
exports.register = async (req, res) => {
    try {
        const { name, email, password, contact_number, role } = req.body;

        // Email Check
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'This email address already exists in the system.' });
        }

        // Password (Hash)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // New User ADD Database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword, // Hash password Save
            contact_number,
            role
        });

        res.status(201).json({ message: 'Successfully registered!', userId: newUser.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Email Check
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found. Invalid email address.' });
        }

        // Password Check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'The entered password is incorrect.' });
        }

        // Frontend Create Secure JSON Web Token (JWT) 
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } 
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};