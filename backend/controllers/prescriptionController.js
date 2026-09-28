const Prescription = require('../models/Prescription');
const User = require('../models/User');

// 1. New Prescription 
exports.addPrescription = async (req, res) => {
    try {
        const { 
            user_id, right_sph, right_cyl, right_axis, 
            left_sph, left_cyl, left_axis, pd, notes 
        } = req.body;

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found. Invalid User ID.' });
        }

        const newPrescription = await Prescription.create({
            user_id, right_sph, right_cyl, right_axis,
            left_sph, left_cyl, left_axis, pd, notes
        });

        res.status(201).json({ message: 'Eye examination report entered successfully!', prescription: newPrescription });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getUserPrescriptions = async (req, res) => {
    try {
        const { userId } = req.params;
        const prescriptions = await Prescription.findAll({ where: { user_id: userId } });
        res.json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};