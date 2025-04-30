const trainsModel = require("../models/db/trains.model");

const daysArr = ["mon","tue","wed","thu","fri","sat","sun"];


function convertToDay(date = null) {
    let day = daysArr[new Date().getDay()-1]
    if(date) {
        day = daysArr[new Date(date).getDay()-1]
    }
    return day;
}

async function sampleDataImport() {
    const TrainsCount = await trainsModel.TrainModel.collection.countDocuments();
    const EndpointsCount = await trainsModel.EndPointsModel.collection.countDocuments();
    if(TrainsCount == 0 && EndpointsCount == 0) {
        let sampleData = require('../trainsData.json');
        trainsModel.TrainModel.insertMany(sampleData.trains).then((TData) => {
            trainsModel.EndPointsModel.insertMany(sampleData['trains-endpoints']).then((EPData) => {
                console.log("Sample data imported successfully!")
            }).catch((err) => {
                console.log('Unable to create entries in trains-endpoints collection: ' + err.message)
            })
        }).catch((err) => {
            console.log('Unable to create entries in trains collection: ' + err.message)
        })
    } else {
        console.log({'message': 'Seems DB already have the data.', TrainsCollectionsCount: TrainsCount, EndPointsCollectionsCount: EndpointsCount})
    }
}


module.exports = {
    convertToDay,
    sampleDataImport
}