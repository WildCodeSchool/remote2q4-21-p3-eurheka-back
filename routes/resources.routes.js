const router = require("express").Router();
const resource = require('../models/resources.model');
const { userCheck, checkLevel, checkAdmin } = require('../middleware/UserValidation');

//CRUD Resource
router.get('/bycat/:id', checkLevel, async (req, res) => {
    //Check user connection and level
    const userLevel = req.userData.user_level;
    const idCategory = 3;
    //Get information from model
    const result = await resource.findAllByCategory(userLevel, idCategory);
    if (result) {
        return res.status(200).json(result);
    }
    else {
        return res.sendStatus(500);
    }
});
router.get('/adminCat/:id', userCheck, checkAdmin, async (req, res) => {
    //Check user connection and level
    const idCategory = req.params.id;
    //Get information from model
    const result = await resource.findAllByCategoryAdmin(idCategory);
    if (result) {
        return res.status(200).json(result);
    }
    else {
        return res.sendStatus(500);
    }
});
router.get('/admin/:id', userCheck, checkAdmin,async (req, res) => {
    const docId=req.params.id;
    const result=await resource.findOneAdmin(docId);
    console.log(result);
    if(result&&result.length>0){
        const name=result[0].name;
        const idDoc=result[0].id_resource;
        const path=result[0].path;
        const idCat=result[0].id_cat;
        const visibility=result[0].visibility;
        const CategoryResource=result[0].name_resource_category;
        const themes=[];
        result.forEach((item)=>{
            let idTheme=item.id_theme;
            let themeName=item.themename;
            themes.push({idTheme,themeName});
        })
        const doc={name,idDoc,path,idCat,visibility,CategoryResource,themes};
        return res.status(200).json(doc);
    }
    else
        return res.status(200).json([]);
});
router.get('/:id', (req, res) => {
    return res.status(404).send('A completer');
});
router.post('/', (req, res) => {
    return res.sendStatus(404);
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