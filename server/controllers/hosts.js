const CustomError = require("../errors");
const Reservation = require('./../models/reservation');
const { getHosts } = require("../services/host.service")

const getAllHosts = async (req, res) => {
    const allHosts = await getHosts();
    res.status(200).json(allHosts);
}

const getHostReservations = async (req, res) => {
    const hostname = req.params.hostname;

    if(!hostname) {
        throw new CustomError.BadRequestError(`Hostname is empty.`);
    }

    const allHosts = await getHosts();

    if(allHosts.filter( h => h.name == hostname).length < 1) {
        throw new CustomError.NotFoundError(`Host ${hostname} was not found`);
    } 

    let reservations;
    if(req.user.role == 'admin') {
        reservations = await Reservation.find({ host: hostname }).exec();
    }   
    else {
        reservations = await Reservation.find({ host: hostname }, 'host start end').exec();
    }   

    res.status(200).json(reservations);
}

module.exports = {
    getAllHosts,
    getHostReservations
}