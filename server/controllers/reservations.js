const { StatusCodes } = require('http-status-codes');
const CustomError = require('./../errors');
const Reservation = require('./../models/reservation');

const getAllReservations = async (req, res) => {
    const reservations = await Reservation.find({});
    res.status(StatusCodes.OK).json(reservations);
}

const getById = async (req, res) => {
    const reservation = await Reservation.findById(req.params.id);

    if(reservation.user != req.user.username && req.user.role != 'admin') {
        throw new CustomError.UnauthorizedError(`Access denied.`);
    }

    if(!reservation) {
        throw new CustomError.NotFoundError(`Reservation with id ${req.params.id} was not found.`);
    }

    res.status(200).json(reservation);
}

const getByUsername = async (req, res) => {
    const username = req.params.username;

    if(username != req.user.username && req.user.role != 'admin') {
        throw new CustomError.UnauthorizedError(`Access denied.`);
    }

    const reservations = await Reservation.find({ user: username });

    if(!reservations) {
        throw new CustomError.NotFoundError(`Reservations for user ${username} were not found.`);
    }

    res.status(200).json(reservations);
}

const makeReservation = async (req, res) => {
    const { host, start, end } = req.body;

    if(!host || !start || !end) {
        throw new CustomError.BadRequestError('Some values are empty.');
    }

    const conflictingReservations = await Reservation.find({
        $and: [
            { host: host },
            {
                $or: [
                    { start: { $gte: start, $lte: end} },
                    { start: { $lte: end}, end: { $gte: end } },
                    { start: { $lte: start}, end: { $gte: start } },
                ]
            }
        ]
    }).exec();

    if(conflictingReservations?.length > 0) {
        throw new CustomError.BadRequestError('Host is reserved.');
    }

    const username = req.user.username;

    let reservation = await Reservation.create({
        host: host,
        user: username,
        start: start,
        end: end
    });

    res.status(StatusCodes.CREATED).json({ reservation });
}

const deleteReservation = async (req, res) => {
    const id = req.params.id;
    
    let reservation = await Reservation.findById(id).exec();

    if(!reservation) {
        throw new CustomError.NotFoundError(`Reservation with id ${id} was not found.`);
    }

    if(reservation.user != req.user.username && req.user.role != 'admin') {
        throw new CustomError.UnauthorizedError(`Access denied.`);
    }

    await Reservation.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json({});
}
module.exports = {
    getAllReservations,
    getById,
    getByUsername,
    makeReservation,
    deleteReservation
}