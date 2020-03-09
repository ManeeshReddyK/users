const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var arr = [];

app.use(express.static('frontend'));

app.use(bodyParser.json());

app.get('/getuserdetails', function (req, res, next) {
    res.send(arr);
});

app.post('/createuserdetails', function (req, res, next) {
    let user = req.body;
    user.id = arr.length;
    arr.push(user);
    res.send({
        "message": "user has been added sucessfully"
    });
});

app.delete('/deleteuserdetails', function (req, res, next) {
    let userid = req.query.id;
    if (userid === undefined || userid === null || userid.trim() === '') {
        return res.status(400).send({
            message: "please provide correct id"
        })
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == userid) {
            arr.splice(i, 1);
            return res.send({
                "message": `user with id ${userid} has been deleted sucessfully!`
            })
        }
    }
    res.status(400).send({
        message: `user with id ${userid} has not been found!`
    })
});

app.put('/updateuserdetails', function (req, res, next) {
    let userid = req.body.id;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === userid) {
            arr[i] = req.body;
            return res.send({
                message: `user with id ${userid} has been updated successfully......`
            })
        }
    }
    arr.push(req.body);
    return res.send({
        message: `user with id ${userid} has not found so create user successfully....`
    })
});

app.listen(3000);