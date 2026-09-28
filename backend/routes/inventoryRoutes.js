const express = require('express');
const router = express.Router();
const { addItem, getAllItems, updateStock } = require('../controllers/inventoryController');

// URL: http://localhost:5000/api/inventory/add
router.post('/add', addItem);

// URL: http://localhost:5000/api/inventory/all
router.get('/all', getAllItems);


// URL: http://localhost:5000/api/inventory/update/1
router.put('/update/:id', updateStock);

module.exports = router;