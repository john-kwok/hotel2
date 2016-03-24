var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Reservation', new Schema({
    qrCode: String,
    roomNumber: String,
    customerId: String
}));