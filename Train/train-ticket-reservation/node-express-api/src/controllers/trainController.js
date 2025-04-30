const { EndPointsModel, TrainModel, BookingModel } = require('../models/db/trains.model');
const { convertToDay } = require('../services/commonServices');
const trainRouter = require('express').Router();

trainRouter.get("/", (req, res) => {
    res.send({ message: "Greetings from trains Controller!" })
})

trainRouter.get("/getEndPoints", (req, res) => {
    EndPointsModel.find({}, (err, data) => {
        res.send({ data });
    });
})

trainRouter.post("/getTrains", (req, res) => {
    let source = req.body.source || '',
    destination = req.body.destination || '',
    day = convertToDay(req.body.date || null);
    date = req.body.date || '';
    EndPointsModel.find({startPoint: source, destPoint: destination}, (err, data) => {
        if(err) res.send({message: err.message})
        if(data.length == 0) {
            res.send({message: "No data found"})
        }
        let trainsArr = [];
        data.forEach(async(item, inx) => {
            let trains = await TrainModel.find({trainNo: item.trainNo , days: { $regex: day }})
            if(trains.length > 0) {
                let bookingsCount = await BookingModel.find({bookingDate: date , trainNo: item.trainNo, status: 1}).countDocuments();
                trainsArr.push({
                    ...data[inx].toJSON(),
                    seatAvailability: trains[0].totalSeats - bookingsCount,
                    trainInfo: trains[0]
                });
            }
            if(inx == data.length-1)
                res.send({data: trainsArr});
        });
    });
})

trainRouter.post("/bookTrain", (req, res) => {
    let bookingObj = new BookingModel;
    bookingObj.bookingDate = req.body.date;
    bookingObj.trainNo = req.body.trainNo;
    bookingObj.seatNo = req.body.seatNo;
    bookingObj.noOfSeats = req.body.noofseats;
    bookingObj.status = 1;
    bookingObj.epId = req.body.endPointId;
    bookingObj.userId = req.body.userId;
    bookingObj.save()
        .then(data => res.status(200).send({message: "Train ticket booked successfully!!!", data, status: 1}))
        .catch(err => res.status(400).send({message:err.message, status: 0}))
});

trainRouter.post("/cancelTrain", (req, res) => {
    BookingModel.findByIdAndUpdate(req.body.bookingId, { status: 0 }, (err, doc) => {
        if(err) res.status(400).send({message:err.message, status: 0})
        res.status(200).send({message: "Train ticket cancelled", data: doc, status: 1})
    });
});


// To get all booking details by user id
trainRouter.post("/getBookingDetails", (req, res) => {
    BookingModel.find({userId: req.body.userId}, (err, data) => {
        if(err) res.send({message: err.message})
        let bookingsArr = [];
        if(data.length == 0) {
            res.send({message: "No data found"})
        }
        data.forEach(async(item, inx) => {
            let trainDetails = await TrainModel.find({trainNo: item.trainNo})
            let endPointsDetails = await EndPointsModel.findById(item.epId);
            bookingsArr.push({
                ...data[inx].toJSON(),
                trainDetails,
                endPointsDetails
            });
            if(inx == data.length-1)
                res.send({data: bookingsArr});
        });
    })
})

module.exports = trainRouter