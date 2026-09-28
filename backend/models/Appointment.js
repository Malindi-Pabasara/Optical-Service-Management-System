const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Identity Appointment

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    appointment_date: {
        type: DataTypes.DATEONLY, // (YYYY-MM-DD)
        allowNull: false
    },
    appointment_time: {
        type: DataTypes.TIME, // (HH:MM:SS)
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
        defaultValue: 'Pending' // Pending
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    patient_phone: {
        type: DataTypes.STRING,
        allowNull: true // phone number 
    },

    is_reminder_sent: {
        type: DataTypes.TINYINT,
        defaultValue: 0 
    }
}, {
    timestamps: true
});

User.hasMany(Appointment, { foreignKey: 'user_id' });
Appointment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Appointment;