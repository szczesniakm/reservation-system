const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true,
        validate: [
            {
                validator: function (v) {return (Date.now() - 1000 < v)},
                msg: 'Reservation can not start before now.' 
            }
        ]
    },
    end: {
        type: Date,
        required: true,
        validate: [
            {
                validator: function (v) {return this.start < v},
                msg: 'Reservation can not end before its start.' 
            },
            {
                validator: function (v) {return (v - this.start)/1000/60 > 5},
                msg: 'Reservation should last at least 5 minutes.' 
            }
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);