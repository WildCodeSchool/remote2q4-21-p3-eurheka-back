const router = require("express").Router();
const enterprise = require('../models/enterprises.model');
const {userCheck, checkLevel, checkAdmin}=require('../middleware/UserValidation');
const { userRole } = require('../utils/definitions');

router.get('/',(req,res)=>
{

});
router.get('/:id',(req,res)=>
{

});
router.post('/', userCheck, async(req,res)=>
{
    

});
router.put('/:id',(req,res)=>
{

});
router.delete('/:id',(req,res)=>
{

});

module.exports = router;