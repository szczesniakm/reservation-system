const express = require('express');
const { getAllHosts, getHostReservations } = require('../controllers/hosts');
const { authenticate } = require('./../middleware/auth');

const router = express.Router();

router.get('/', authenticate, getAllHosts);
router.get('/:hostname/reservations', authenticate, getHostReservations);

module.exports = router;