const router = require("express").Router();
const Users = require('../models/users.model');
const Auth = require('../models/auth.model');
const { userInscriptionOptions, maxAge, userRole } = require('../utils/definitions');
const { calculateToken } = require('../utils/auth');
const { userCheck, checkSuperAdmin } = require('../middleware/UserValidation');

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
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });

        return res.status(422).json(errorArray);
    }
    else {
        //check if user already exists
        const existUser = await Users.findOneByMail(email);
        if (existUser && (typeof (existUser.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        if (existUser) {
            return res.status(409).json({ message: 'This email is already used' });
        }
        const newId = await Users.create(payload);
        if (newId && (typeof (newId.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        return res.status(201).json({ userId: newId });
    }
});

router.post('/login/', async (req, res) => {
    //Check if email et pass are corrects
    const errors = Users.validateLogin(req.body);
    if (errors) {
        return res.status(422).json({ validationErrors: errors.details });
    }
    //Check if user exists
    const userExist = await Users.findOneByMailForLogin(req.body.email);
    if (userExist && (typeof (userExist.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (!userExist) {
        return res.status(404).send('User not found');
    }
    //CheckPassword
    const userOK = await Users.checkPassword(req.body.password, userExist.password);
    if (userOK && (typeof (userOK.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (!userOK) {
        return res.status(401).send('Wrong login or password')
    }
    //create token
    try {
        const token = calculateToken(userExist.id_users, userExist.user_level,userExist.firstname,userExist.lastname ,maxAge);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        return res.status(200).json({ userId: userExist.id_users,firstname:userExist.firstname,lastname:userExist.lastname });
    }
    catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

router.get('/logout/', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');

});

router.get('/admin/', userCheck, checkSuperAdmin, async (req, res) => {
    const userList = await Users.findAll();
    if (userList && (typeof (userList.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    return res.status(200).json(userList);
});

router.get('/', (req, res) => {
    res.sendStatus(404);
});

router.get('/:id', userCheck, async (req, res) => {
    const idUser = req.userData.user_id;
    const levelUser = req.userData.user_level;
    if ((idUser === parseInt(req.params.id))||(levelUser === userRole.SUPER_ADMIN)) {
        const result = await Users.getDetailById(req.params.id);
        if (result && (typeof (result.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        if (result) {
            return res.status(200).json(result);
        }
        else {
            return res.status(404).send("User not found");
        }
    } 
    else {
        return res.sendStatus(403);
    }    
});

router.put('/admin/:id', userCheck, checkSuperAdmin, async (req, res) => {
    const user = await Users.findOneById(req.params.id);
    if (user && (typeof (user.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (user) {
        const { user_level } = req.body;
        const errors = Users.validateLevel({ user_level });
        if (errors) {
            const errorDetails = errors.details;
            const errorArray = [];
            errorDetails.forEach((error) => {
                errorArray.push(error.message);
            });

            return res.status(422).json(errorArray);
        }
        const result = await Users.updateLevelUser(req.params.id, user_level);
        if (result && (typeof (result.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        return res.sendStatus(204);
    }
    else {
        return res.sendStatus(404);
    }
});

router.put('/:id', userCheck, async (req, res) => {
    const errors = Users.validateUpdate(req.body);
    if (errors) {
        console.log(errors);
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });

        return res.status(422).json(errorArray);
    }
    const result = await Users.putDetailById(req.body, req.params.id);
    if (result && (typeof (result.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (result) {
    return res.sendStatus(204);
}
else {
    return res.sendStatus(404);
}
})

router.delete('/:id', userCheck, checkSuperAdmin, async (req, res) => {
    const result = await Users.destroy(req.params.id);
    if (result && (typeof (result.errno) !== 'undefined')) {
        if (result.errno === 1451) {
            return res.status(500).json({ error: 1451, message: "Suppresion impossible, l'utilisateur a encore des dépendances" });
        }
        else
            return res.sendStatus(500);
    }
    if (result) {
        return res.sendStatus(204);
    }
    else {
        return res.sendStatus(404);
    }
});


module.exports = router;