const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Prescription = sequelize.define('Prescription', {
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
    // Right Eye - OD
    right_sph: { type: DataTypes.STRING, allowNull: true },
    right_cyl: { type: DataTypes.STRING, allowNull: true },
    right_axis: { type: DataTypes.STRING, allowNull: true },
    
    // Left Eye - OS
    left_sph: { type: DataTypes.STRING, allowNull: true },
    left_cyl: { type: DataTypes.STRING, allowNull: true },
    left_axis: { type: DataTypes.STRING, allowNull: true },
    
    // Others
    pd: { type: DataTypes.STRING, allowNull: true }, // Pupillary Distance
    prescription_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    notes: { type: DataTypes.TEXT, allowNull: true }
}, {
    timestamps: true
});

// Relationships 
User.hasMany(Prescription, { foreignKey: 'user_id' });
Prescription.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Prescription;