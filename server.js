const nodemailer=require('nodemailer');

const express=require('express');
const app=express();

app.post('/api/sendMail',(req,res) => {
    const mailModel=req.body;
    
    res.json("user addedd");
});

var transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'akhilshaji86@gmail.com',
        pass: 'anumybestfriend'
    }
});
var mailList=['akhil.shaji.ofx.1@gmail.com','akhilshaji86@gmail.com']
mailList.forEach(mailTo => {
    var mailOptions={
        from: 'akhilshaji86@gmail.com',
        to: mailTo,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions,function(error,info) {
        if(error) {
            console.log(error);
        } else {
            console.log('Email sent: '+info.response);
        }
    });
})
