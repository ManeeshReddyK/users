const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require("mongoose");
const User = require("./User.model");

app.use(express.static('frontend'));

app.use(bodyParser.json());

app.get('/getuserdetails', function (req, res, next) {
    User.find()
        .then((data) => {
            res.send({
                success: true,
                message: "User Details fetched successfully",
                data: data
            });
        })
        .catch((error) => {
            res.send({
                success: false,
                message: "Error in fetching Details",
                data: error
            });
        })
});

app.post('/createuserdetails', function (req, res, next) {
    let user = req.body;
    let newUser = new User(user);
    newUser.save()
        .then((data) => {
            console.log('data :', data);
            res.send({
                "message": "user has been added sucessfully"
            });
        })
        .catch((error) => {
            console.log('error :', error);
            res.send({
                "message": "user has not been added sucessfully"
            })
        })
});

app.delete('/deleteuserdetails', function (req, res, next) {
    let userid = parseInt(req.query.id);
    if (userid === undefined || userid === null) {
        return res.status(400).send({
            message: "please provide correct id"
        })
    }
    User.remove({ id: userid })
        .then((data) => {
            console.log('data :', data);
            res.send({
                success: true,
                message: data.n === 1 ? "User Details removed successfully" : `Üser Details with id:${userid} is not found`,
            });
        })
        .catch((error) => {
            res.send({
                success: false,
                message: "Error in deleting Details",
            });
        })
});

app.put('/updateuserdetails', function (req, res, next) {
    let userid = req.body.id;
    User.findOne({ id: userid })
        .then((user) => {
            console.log('user :', user);
            if (user) {
                User.update({ id: userid }, req.body)
                    .then(() => {
                        res.send({
                            message: `user details with user id :${userid} updated sucessfully.`
                        })
                    })
                    .catch(() => {
                        res.send({
                            message: `user details with user id :${userid} has not found.`
                        })
                    })
            }
            else {
                newUser = new User(req.body);
                newUser.save()
                    .then((data) => {
                        console.log('data :', data);
                        res.send({
                            "message": "user has been added sucessfully"
                        });
                    })
                    .catch((error) => {
                        console.log('error :', error);
                        res.send({
                            "message": "user has not been added sucessfully"
                        })
                    })
            }
        });
})

const port = 3000;

mongoose.connect('mongodb://localhost:27017/Manish', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to Database");
        app.listen(port);
        console.log(`Server is up and running on port ${port}`);
    })
    .catch((error) => {
        console.log("Not connected to database :", error);
    });
