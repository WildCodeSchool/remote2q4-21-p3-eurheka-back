const router = require("express").Router();
const theme = require('../models/themes.model');
const {checkLevel}=require('../middleware/UserValidation');
    router.get('/', async (req,res)=>
    {
        //get all categories
        const result=await theme.getAll();
        if(result)
            return res.status(200).json(result);
        else
            return res.sendStatus(500);
    });
    router.get('/:id',(req,res)=>
    {

    });
    router.post('/',(req,res)=>
    {

    });
    router.put('/:id',(req,res)=>
    {

    });
    router.delete('/:id',(req,res)=>
    {

    });

module.exports = router;