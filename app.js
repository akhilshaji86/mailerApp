"use strict";
exports.__esModule = true;
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
router.post('/sendMail', function (req, res) {
    var mailModel = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailModel.fromMail,
            pass: mailModel.password
        }
    });
    mailModel.toMailList.forEach(function (mailTo) {
        var mailOptions = {
            from: mailModel.fromMail,
            to: mailTo,
            subject: mailModel.subject,
            text: mailModel.content
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                sendError(error, res);
            }
            else {
                console.log('Email sent: ' + info.response);
                sendSuccess('Mail Send succesfully', res);
            }
        });
    });
    // res.json('Mail Send succesfully');
});
router.get('/', function (req, res) {
    console.log('working');
    res.json('working');
});
var response = {
    status: 200,
    data: [],
    message: null
};
var sendError = function (err, res) {
    response.status = 501;
    response.message = typeof err === 'object' ? err.message : err;
    res.status(501).json(response);
};
var sendSuccess = function (msg, res) {
    response.status = 200;
    response.message = msg;
    res.status(200).json(response);
};
module.exports = router;
