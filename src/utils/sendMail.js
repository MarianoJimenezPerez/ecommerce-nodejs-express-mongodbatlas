const nodemailer = require('nodemailer');

const sendEmailOrder = async (email, subject, order) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: "lacey68@ethereal.email",
            pass: "fZmJS7UGPSGze8p7hM"
        }
    });

    let mailOptions = {
        from: "NoReply",
        to: email,
        subject: subject,
        text: order
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error.message);
        } else {
            return info;
        }
    })
};

module.exports = { sendEmailOrder };