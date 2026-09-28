const express = require('express');
const router = express.Router();
const { addPrescription, getUserPrescriptions } = require('../controllers/prescriptionController');

// 1. Add Prescription URL
router.post('/add', addPrescription);

// 2. Get User Prescription URL
router.get('/user/:userId', getUserPrescriptions);

module.exports = router;