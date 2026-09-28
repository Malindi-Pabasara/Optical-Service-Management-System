const Appointment = require('../models/Appointment');
const User = require('../models/User');

// 1. Create Appointment
exports.createAppointment = async (req, res) => {
    try {
        const { user_id, appointment_date, appointment_time, notes } = req.body;
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newAppointment = await Appointment.create({
            user_id,
            appointment_date,
            appointment_time,
            notes
        });
        res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get All Appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAppointmentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.findAll({ where: { user_id: userId } });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// 3. Get User Appointments
exports.getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const appointments = await Appointment.findAll({ where: { user_id: userId } });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};