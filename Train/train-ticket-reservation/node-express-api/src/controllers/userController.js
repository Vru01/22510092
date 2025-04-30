const { UserModel } = require('../models/db/user.model');

const userRouter = require('express').Router();


userRouter.post('/createUser', (req, res) => {
    let user = new UserModel;
    user.name = req.body.name || '';
    user.gender = req.body.gender || '';
    user.email = req.body.email || '';
    user.phone = req.body.phone || '';
    user.password = req.body.password || '';
    user.save().then((data) => {
        res.status(200).send({message: 'User created successfully', status: '1'});
    }).catch(err => {
        res.status(400).send({message: err.message, status: '0'});
    });
});

userRouter.post('/login', (req, res) => {
    UserModel.findOne({email:req.body.email, password: req.body.password}).then((data) => {
        if(data) {
            let {name, _id, email, phone, gender} = data;
            let user = {name, _id, email, phone, gender};
            res.status(200).send({message: 'User logged in', user, status: '1'});
        } else {
            res.status(200).send({message: "User not matched with this credentials", status: '0'});
        }
    }).catch((err) => res.status(400).send({message: err.message, status: '0'}))
})

userRouter.post('/updateUser', (req, res) => {
    let user = {};
    user.name = req.body.name || '';
    user.gender = req.body.gender || '';
    user.phone = req.body.phone || '';
    user.password = req.body.password;
    UserModel.findByIdAndUpdate(req.body.userId, user, (err, doc) => {
        if(err) res.status(400).send({message:err.message, status: 0})
        let {name, _id, email, phone, gender} = doc;
        let user = {name, _id, email, phone, gender};
        res.status(200).send({message: "User updated successfully", user, status: 1})
    });
});

module.exports = userRouter;