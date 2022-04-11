const router = require("express").Router();
require('dotenv').config({ path: '../.env' });
const Joi = require('joi');
const { sendMail } = require("../utils/mail");

const validate = (data) => {

    return Joi.object({
        email: Joi.string().email().max(255).presence('required'),
        lastname: Joi.string().presence('required'),
        firstname: Joi.string().presence('required'),
        subject: Joi.string().presence('required'),
        message: Joi.string().presence('required'),
    }).validate(data, { abortEarly: false }).error;
};

router.post('/', async (req, res) => {
    const errors = validate(req.body);
    if (errors) {
        return res.sendStatus(422);
    }
    try {
        const { email, lastname, firstname, subject, message } = req.body;
        //
        sendMail(subject, message, email, lastname, firstname)
            .then((result) => {
                //result contains the delivery mail
                res.status(200).send('email sent');
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send(`SMTP server not found err: ${err.errno}`);
            })
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    };
});
module.exports = router;