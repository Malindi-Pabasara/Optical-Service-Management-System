const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    item_name: {
        type: DataTypes.STRING,
        allowNull: false // Frame and Lens Name Add
    },
    item_type: {
        type: DataTypes.ENUM('Frame', 'Lens', 'Accessories', 'Other'),
        allowNull: false // Item Category Add
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 
    }
}, {
    timestamps: true
});

module.exports = Inventory;