const { Schema, model } = require('mongoose');

const TrainSchema = new Schema({
    trainName: String,
    trainNo: String,
    days: String,
    totalSeats: Number
}, { timestamps:true });

const TrainEndPointsSchema = new Schema({
    startPoint: String,
    destPoint: String,
    departureTime: String,
    arrivalTime: String,
    fare: Number,
    trainNo: String
}, { timestamps:true });

const TrainBookingSchema = new Schema({
    bookingDate: Schema.Types.Date,
    trainNo: String,
    seatNo: String,
    noOfSeats: Number,
    status: Number,
    epId: String,
    userId: String
}, { timestamps:true });

module.exports = {
    TrainModel: model('trains', TrainSchema),
    EndPointsModel: model('trains-endpoints', TrainEndPointsSchema),
    BookingModel: model('bookings', TrainBookingSchema)
}