const router = require("express").Router();
const resource = require('../models/resources.model');
const { checkLevel, checkAdmin } = require('../middleware/UserValidation');

//CRUD Resource
router.get('/bycat/:id',checkLevel  ,async (req, res) => {
    //Check user connection and level
    const userLevel=req.userData.user_level;
    const idCategory=req.params.id;
    //Get information from model
    const result= await resource.findAllByCategory(userLevel, idCategory);
    if (result){
        res.sendStatus(200).json(result);
    }
    else {
        res.sendStatus(500);
    }
    res.sendStatus(404);
});
router.get('/:id', (req, res) => {

});
router.post('/', (req, res) => {

});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});

//CRUD Resources Category
router.get('/category/', (req, res) => {

});
router.get('/category/:id', (req, res) => {

});
router.post('/category/', (req, res) => {

});
router.put('/category/:id', (req, res) => {

});
router.delete('/category/:id', (req, res) => {

});
module.exports = router;