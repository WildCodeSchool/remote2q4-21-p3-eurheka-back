const router = require("express").Router();
const cv = require('../models/cvs.model');
const { userCheck, checkLevel, checkAdmin } = require('../middleware/UserValidation');

router.get('/', userCheck, checkAdmin, async (req, res) => {
    const cvList = await cv.findAll();
    if(cvList && (typeof(cvList.errno)!=='undefined')){
        return res.sendStatus(500)
    }
    if (cvList)
    return res.status(200).json(cvList);
    else
    return res.sendstatus(500);
});

router.get('/:id', userCheck, checkAdmin, (req, res) => {
    cv.findOne(req.params.id)
        .then((cv) => {
            if(cv && (typeof(cv.errno)!=='undefined')){
                return res.sendStatus(500)
            }
            if (cv) {
                res.status(200).json(cv)
            }
            else {
                res.status(404).send('cv not found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Error');
        })
});

router.post('/', (req, res) => {

});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});


module.exports = router;