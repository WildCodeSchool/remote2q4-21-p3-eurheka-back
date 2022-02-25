const router = require("express").Router();
const Users = require('../models/users.model');
const Auth = require('../models/auth.model');
const { userInscriptionOptions } = require('../utils/definitions');

router.post('/', async (req, res) => {
    const { firstname, lastname, password, email, stage, focus, accompanied } = req.body;
    //Setting signIn options
    let options = 0;
    if (stage)
        options += userInscriptionOptions.STAGE;
    if (focus)
        options += userInscriptionOptions.FOCUS;
    if (accompanied)
        options += userInscriptionOptions.ACCOMPANIED;
    const payload = { firstname, lastname, password, email, options };
    const errors = Users.validate(payload);
    if (errors) {
        res.status(422).json({ validationErrors: errors.details });
    }
    else {
        //check if user already exists
        const existUser = await Users.findOneByMail(email);
        if (existUser) {
            return res.status(409).json({ message: 'This email is already used' });
        }
        const newId = await Users.create(payload);
        res.status(201).json({ userId: newId });
    }
});
router.get('/', (req, res) => {
    res.sendStatus(404);
});
router.get('/:id', (req, res) => {
    res.sendStatus(404);
});
router.put('/:id', (req, res) => {
    res.sendStatus(404);
});
router.delete('/:id', (req, res) => {
    res.sendStatus(404);
});
router.post('/login/', async (req, res) => {
    //Check if email et pass are corrects
    const errors = Users.validateLogin(req.body);
    if (errors) {
        return  res.status(422).json({ validationErrors: errors.details });
    }
    //Check if user exists
    const userExist= await Users.findOneByMailForLogin(req.body.email);
    if(!userExist){
        return res.status(404).send('User not found');
    }
    console.log(userExist);
    //CheckPassword
    const userOK=await Users.checkPassword(req.body.password,userExist.password);
    if(!userOK)
    {
        return res.status(401).send('Wrong password')
    }
    //create token

    //Envoie de l'information
    res.sendStatus(200);
});
router.get('/logout/', (req, res) => {
    res.sendStatus(404);
});

module.exports = router;