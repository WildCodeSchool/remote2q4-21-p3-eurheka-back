const router = require("express").Router();
const Users = require('../models/users.model');
const {userInscriptionOptions}=require('../utils/definitions');

router.post('/', async(req, res) => {
    const {firstname,lastname,password,email,stage,focus,accompanied}=req.body;
    //Setting signIn options
    let options=0;
    if(stage)
        options+=userInscriptionOptions.STAGE;
    if(focus)
        options+=userInscriptionOptions.FOCUS;
    if(accompanied)
        options+=userInscriptionOptions.ACCOMPANIED;
    const payload={firstname,lastname,password,email,options};
    const errors=Users.validate(payload);
    if(errors){
        res.status(422).json({ validationErrors: errors.details });
    }
    else{
        //check if user already exists
        const existUser= await Users.findOneByMail(email);
        if(existUser)
        {
            return res.status(409).json({ message: 'This email is already used' });
        }
        const newId=await Users.create(payload);
        res.status(201).json({userId:newId});
    }
});
router.get('/', (req, res) => {

});
router.get('/:id', (req, res) => {

});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});
router.post('/login/',async (req,res)=>{

})

module.exports = router;