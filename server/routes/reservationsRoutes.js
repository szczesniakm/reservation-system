const express = require('express');
const { getAllReservations, getById, makeReservation, deleteReservation } = require('./../controllers/reservations');
const { authenticate } = require('./../middleware/auth');
const router = express.Router();

router.get('/', getAllReservations);
router.post('/', authenticate, makeReservation);
router.get('/:id', getById);
router.delete('/:id', authenticate, deleteReservation);

module.exports = router;