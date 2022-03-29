const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' });

async function sendMail(subject, message, sender, senderName, senderFirstName) {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_SENDER_PASSWORD
        },
    });
    let messageMod = `Mail du site eurheka!\r\nMr / Mme ${senderFirstName} ${senderName} (${sender}) a envoyé ce message\r\n` + message;
    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: process.env.MAIL_DEST,
        subject: subject,
        text: messageMod
    });
    return info.accepted[0];
}

async function sendNotification (firstname, lastname, email){
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_SENDER_PASSWORD
        },
    });
    let messageMod = `Mail du site eurheka!`;
    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: process.env.MAIL_DEST,
        subject: "Notification d'inscription",
        text: `Message du site Eurheka : L'utilisateur ${firstname} ${lastname}, adresse mail ${email} vient de créer son compte sur le site.`
    });
    return info.accepted[0];

}

module.exports = {
    sendMail,
    sendNotification
} 