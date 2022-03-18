const express = require('express');
const { authenticate, authorize } = require('./../middleware/auth');
const { getByUsername } = require('./../controllers/reservations');
const { getAllUsers } = require('./../services/user.service');
const router = express.Router();

router.get('/', authenticate, authorize('admin'), getAllUsers);
router.get('/:username/reservations', authenticate, getByUsername);

module.exports = router;