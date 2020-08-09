const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

router.post('/sendMail', (req, res) => {
    const mailModel: RequestModel = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailModel.fromMail,
            pass: mailModel.password
        }
    });
    mailModel.toMailList.forEach(mailTo => {
        const mailOptions = {
            from: mailModel.fromMail,
            to: mailTo,
            subject: mailModel.subject,
            text: mailModel.content
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                sendError(error, res);
            } else {
                console.log('Email sent: ' + info.response);
                sendSuccess('Mail Send succesfully', res);
            }
        });

    });
    // res.json('Mail Send succesfully');

});
router.get('/', (req, res) => {
    console.log('working');
    res.json('working');
});
const response = {
    status: 200,
    data: [],
    message: null
};

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err === 'object' ? err.message : err;
    res.status(501).json(response);
};
const sendSuccess = (msg, res) => {
    response.status = 200;
    response.message = msg;
    res.status(200).json(response);
};

export interface RequestModel {
    fromMail: string;
    password: string;
    toMailList: string[];
    subject: string;
    content: string;
}
module.exports = router;
