const router = require("express").Router();
const theme = require('../models/themes.model');

const {checkLevel}=require('../middleware/UserValidation');

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
    console.log(result);
    if(result.errno)
    {
        return res.sendStatus(500);
    }
    if(result)
        return res.status(200).json(result);
    else
        return res.sendStatus(404);
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