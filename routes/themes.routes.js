const router = require("express").Router();
const theme = require('../models/themes.model');

const {checkLevel,checkAdmin}=require('../middleware/UserValidation');

router.get('/', async (req,res)=>
{
    //get all categories
    const result=await theme.getAll();
    if(result.errno){
        return res.sendStatus(500);
    }
    if(result)
        return res.status(200).json(result);
    else
        return res.sendStatus(500);
});

router.get('/:id',async (req,res)=>
{
    const result=await theme.findOne(req.params.id);
    if(result.errno)
    {
        return res.sendStatus(500);
    }
    if(result)
        return res.status(200).json(result);
    else
        return res.sendStatus(404);
});
router.post('/',async (req,res)=>
{
     const errors = theme.validate(req.body);
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return res.status(422).json(errorArray);
    }
    const newTheme=await theme.create(req.body);
    if(newTheme&& (typeof(newTheme.errno)!=='undefined')){
        return res.sendStatus(500);
    }
    if(newTheme){
        return res.status(201).send('theme created');
    }
    else
    {
        return res.status(500).send('theme not created');
    }

});
router.put('/:id',async (req,res)=>
{
    const errors = theme.validate(req.body);
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return res.status(422).json(errorArray);
    }
    //Put to DB
    const updatedTheme=await theme.update(req.params.id,req.body);
    if(updatedTheme&& (typeof(updatedTheme.errno)!=='undefined')){
        return res.sendStatus(500);
    }
    if(updatedTheme===true){
        return res.status(201).send('theme updated');
    }
    else
    {
        return res.status(500).send('theme not updated');
    }

});

router.delete('/:id',(req,res)=>
{

});

module.exports = router;