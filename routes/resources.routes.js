const router = require("express").Router();
const resource = require('../models/resources.model');
const { userCheck,checkLevel, checkAdmin } = require('../middleware/UserValidation');

//CRUD Resource
router.get('/bycat/:id',checkLevel  ,async (req, res) => {
    //Check user connection and level
    const userLevel=req.userData.user_level;
    const idCategory=req.params.id;
    //Get information from model
    const result= await resource.findAllByCategory(userLevel, idCategory);
    if (result){
       return res.status(200).json(result);
    }
    else {
      return  res.sendStatus(500);
    }
});
router.get('/adminCat/:id',userCheck,checkAdmin   ,async (req, res) => {
    //Check user connection and level
    const idCategory=req.params.id;
    //Get information from model
    const result= await resource.findAllByCategoryAdmin(idCategory);
    if (result){
       return res.status(200).json(result);
    }
    else {
      return  res.sendStatus(500);
    }
});

router.get('/:id', (req, res) => {
   return res.sendStatus(404);
});
router.post('/', (req, res) => {
  return  res.sendStatus(404);
});
router.put('/:id', (req, res) => {
   return res.sendStatus(404);
});
router.delete('/:id', (req, res) => {
   return res.sendStatus(404);
});

//CRUD Resources Category
router.get('/category/', (req, res) => {
    res.sendStatus(404);
});
router.get('/category/:id', (req, res) => {
    res.sendStatus(404);
});
router.post('/category/', (req, res) => {
    res.sendStatus(404);
});
router.put('/category/:id', (req, res) => {
    res.sendStatus(404);
});
router.delete('/category/:id', (req, res) => {
    res.sendStatus(404);
});
module.exports = router;