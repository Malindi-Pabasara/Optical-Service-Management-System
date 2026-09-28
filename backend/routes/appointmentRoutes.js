const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// 1. Appointment Book
router.post('/book', appointmentController.createAppointment);

// 2. User Appointments (Dashboard)
router.get('/user/:userId', appointmentController.getAppointmentsByUser);

// 3. All Appointments (Admin)
router.get('/all', appointmentController.getAllAppointments);

module.exports = router;