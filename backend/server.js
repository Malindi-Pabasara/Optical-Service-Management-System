const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');
const appointmentRoutes = require('./routes/appointmentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const Inventory = require('./models/Inventory');

// Automatic SMS Reminder Scheduler Import 
const initReminderScheduler = require('./reminderScheduler.js');

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/inventory', inventoryRoutes);

// Test Route
app.get('/', (req, res) => res.send('OSMS Backend API Running smoothly.'));

// Server Port 
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log('Database Connected Successfully via Sequelize.');
    
    // Database Connect after Scheduler Background Start 
    initReminderScheduler();
    
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch(err => console.log('Database connection failure:', err));