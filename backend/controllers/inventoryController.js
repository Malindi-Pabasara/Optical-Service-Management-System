const Inventory = require('../models/Inventory');

// 1. Item Add Item
exports.addItem = async (req, res) => {
    try {
        const { item_name, item_type, brand, price, quantity } = req.body;

        const newItem = await Inventory.create({
            item_name,
            item_type,
            brand,
            price,
            quantity
        });

        res.status(201).json({ message: '"Item successfully added to inventory!', item: newItem });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get All Items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Inventory.findAll();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Update Stock
exports.updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { price, quantity } = req.body;

        const item = await Inventory.findByPk(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found.' });
        }

        // Change Price
        if (price) item.price = price;
        if (quantity !== undefined) item.quantity = quantity;

        await item.save();
        res.json({ message: 'Inventory details updated successfully!', item });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};