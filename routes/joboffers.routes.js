const router = require("express").Router();
const jobOffer = require('../models/joboffers.model');
const { userCheck, checkSuperAdmin } = require('../middleware/UserValidation');

router.get('/', (req, res) => {
    return res.sendStatus(402);
});

router.get('/offertype/',async (req,res)=>{
    const result=await jobOffer.getOfferTypeAll();
    if (result && (typeof (result.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    return res.status(200).json(result);
});

router.get('/:id',async(req, res) => {
    return res.sendStatus(402);
});
router.post('/',userCheck,checkSuperAdmin,async(req, res) => {
    return res.sendStatus(402);
});
router.put('/:id',userCheck,checkSuperAdmin,async(req, res) => {
    return res.sendStatus(402);
});
router.delete('/:id',userCheck,checkSuperAdmin,async(req, res) => {
    return res.sendStatus(402);
});



module.exports = router;