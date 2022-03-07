const router = require("express").Router();
const enterprise = require('../models/enterprises.model');
const { userCheck, checkLevel, checkAdmin} = require('../middleware/UserValidation');
const { userRole } = require('../utils/definitions')

router.get('/', userCheck, checkAdmin, async (req,res)=>
{
    // get enterprises data
    const enterprises = await enterprise.findAll();
    if (enterprises)
    return res.status(200).json(enterprises);
    else
    return res.sendstatus(500);
});
router.get('/:id',(req,res)=>
{

});
router.post('/', userCheck, async (req,res)=>
{
    // check data
    const error = enterprise.validate(req.body);
    if (error) {
        const errorDetail = error.details;
        const errorArray = [];
        errorDetail.forEach((item) => {
            errorArray.push(item.message);
        } )
        return res.status(422).json(errorArray);
    }
    const idEnterprise = await enterprise.createOne(req.body);
    if (idEnterprise) {
        return res.status(201).json({idEnterprise});
    } else {
        return res.sendstatus(500)
    }
});
router.put('/:id',(req,res)=>
{

});
router.delete('/:id',(req,res)=>
{

});

module.exports = router;