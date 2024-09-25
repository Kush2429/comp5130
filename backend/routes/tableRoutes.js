const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const auth = require('../middlewares/auth');

// Public Routes (User Role)
router.get('/', tableController.getTableData);

// Admin-only routes
router.post('/', auth.verifyAdmin, tableController.createOrUpdateTable);
router.put('/:id', auth.verifyUser, tableController.checkRules);

module.exports = router;
