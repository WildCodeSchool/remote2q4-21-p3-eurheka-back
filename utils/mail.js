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
    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: process.env.MAIL_DEST,
        subject: "Notification d'inscription",
        text: `Message du site Eurheka : L'utilisateur ${firstname} ${lastname}, adresse mail ${email} vient de créer son compte sur le site.`
    });
    return info.accepted[0];

}

async function sendNewPass ( email,token){
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_SENDER_PASSWORD
        },
    });
    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: email,
        subject: "Réinitialisation du mot de passe",
        html: `<p>Bonjour, Vous avez demandé de réinitialiser votre mot de passe sur le site Eurhéka</p></p>Veuillez vous rendre sur la page de connexion du site, rubrique mot de passe perdu et saisir le code suivant : ${token}</p><p>Si vous n'êtes pas à l'origine de ce message, aucune action n'est nécessaire.</p><p>Cordialement, l'équipe Eurhéka</p>`
    });
    return info.accepted[0];

}

async function sendMailForRDV(dateRDV,object,user){
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_SENDER_PASSWORD
        },
    });
    const explodeDate=dateRDV.split('T');
    const dateForRDV=explodeDate[0];
    const hourRDV=explodeDate[1];
    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: process.env.MAIL_DEST,
        subject: "Demande de RDV",
        html: `<p>Bonjour, ${user} a demandé un rendez-vous le ${dateForRDV} à ${hourRDV} pour le motif ${object
        }</p><p>Vous pouvez vous rendre dans la partie administration pour confimrer le RDV</p>`
    });
    return info.accepted[0];
}

async function sendMailForConfirmRDV(dateRDV,email,state){
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_SERVER,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_SENDER,
            pass: process.env.MAIL_SENDER_PASSWORD
        },
    });
    let stateRDV='annulé';
    if(state===1)
        stateRDV='confirmé';
    let info = await transporter.sendMail({
        from: process.env.MAIL_SENDER,
        to: email,
        subject: "Votre demande de rendez vous",
        html: `<p>Bonjour,</p><p>Votre rendez-vous ${dateRDV} a bien été ${stateRDV} par votre correspondant</p><p>Cordialement, l'équipe Eurhéka</p>`
    });
    return info.accepted[0];
}

module.exports = {
    sendMail,
    sendNotification,
    sendNewPass,
    sendMailForRDV,
    sendMailForConfirmRDV
} 