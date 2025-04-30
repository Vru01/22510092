const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGODB_URL } = require('./config/config');
const userRouter = require('./src/controllers/userController');
const trainRouter = require('./src/controllers/trainController');
const { sampleDataImport } = require('./src/services/commonServices');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors({
    origin: function(origin, cbk) {
        cbk(null, true)
    }
}))

server.get("/",function(req, res) {
    res.status(200).send({message: "Greetings !!!"});
});

server.use('/user', userRouter);
server.use('/train', trainRouter);

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.info('Database connected successfully!')
    server.listen(process.env.PORT || 3200, function() {
        console.log("Server running on port " + (process.env.PORT || "3200"));
        sampleDataImport();
    })
}).catch(err => {
    console.error('Database connection failed: ' + err.message);
    process.exit(1);
});