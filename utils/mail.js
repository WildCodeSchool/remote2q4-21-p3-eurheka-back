const nodemailer=require('nodemailer');
require('dotenv').config({path:'../.env'});

const sendMail=(subject,message,sender,senderName,senderFirstName)=>{
    let transporter=nodemailer.createTransport({
            host:process.env.MAIL_SERVER,
            port:process.env.MAIL_PORT,
            secure:false,
            auth:{
                user:process.env.MAIL_SENDER,
                pass:process.env.MAIL_SENDER_PASSWORD
            },
        });
    let messageMod=`Mail du site eurheka!\r\nMr / Mme ${senderFirstName} ${senderName} (${sender}) a envoyé ce message\r\n`+message;    
    transporter.sendMail(
    {
        from:process.env.MAIL_SENDER,
        to:process.env.MAIL_DEST,
        subject:subject,
        text:messageMod
    },(err,info)=>{
        if(err)
        {
            console.error(err);
        }
        else
        {
            console.log(info);
        }
    }
    );
}
sendMail('Bonjour','Je suis le corps du message','gcregut@free.Fr','Crégut','Guillaume')
module.exports={
    sendMail
} 