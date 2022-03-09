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

router.get('/:id', userCheck, checkAdmin, (req,res)=>
{
    enterprise.findOne(req.params.id)
        .then((enterprise) => {
            if (enterprise) {
                res.status(200).json(enterprise)
            }
            else {
                res.status(404).send('enterprise not found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Error');
        })
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

router.put('/:id',userCheck, checkAdmin, async (req,res)=>
{
    const enterpriseExists = await enterprise.findOne(req.params.id);
    if (enterpriseExists) {
        const error = enterprise.validate(req.body, forCreation = false);
        if (error) {
            const errorDetail = error.details;
            const errorArray = [];
            errorDetail.forEach((item) => {
                errorArray.push(item.message);
            } )
            return res.status(422).json(errorArray);
        }
        const enterpriseUpdate = await enterprise.update(req.body, req.params.id);
        if (enterpriseUpdate) {
            return res.status(200).json(`Enterprise id=${req.params.id} updated`);
        } else {
            return res.sendstatus(500).send('Error updating enterprise')
        }
    }
    else {
        res.status(404).send('Enterprise not found');
    }
});

router.delete('/:id', userCheck, checkAdmin, async (req,res)=>
{
    const result = await enterprise.remove(req.params.id);
    if (result === true){
        return res.status(200).send('Enterprise deleted')
    }
    else {
        res.status(500).send('Error deleting enterprise')
    }
});

module.exports = router;