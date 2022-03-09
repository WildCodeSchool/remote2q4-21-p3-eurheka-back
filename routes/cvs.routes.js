const router = require("express").Router();
const cv = require('../models/cvs.model');
const { userCheck, checkLevel, checkAdmin } = require('../middleware/UserValidation');

router.get('/', userCheck, checkAdmin, (req, res) => {
    cv.findAll()
        .then((result) => {
            res.status(200).json(result);
        })
    //add error control
});
router.get('/:id', (req, res) => {

});
router.post('/', (req, res) => {

});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});


module.exports = router;