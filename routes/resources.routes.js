const router = require("express").Router();
const resource = require('../models/resources.model');
const { checkLevel, checkAdmin } = require('../middleware/UserValidation');

//CRUD Resource
router.get('/',checkLevel ,(req, res) => {
    //Check user connection and level
    console.log(req.userData.user_level);
    //Get information from model
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