const router = require("express").Router();
const resource = require('../models/resources.model');
const { userCheck, checkLevel, checkAdmin } = require('../middleware/UserValidation');
const theme = require('../models/themes.model');

//CRUD Resource
router.get('/bycat/:id', checkLevel, async (req, res) => {
    //Check user connection and level
    const userLevel = req.userData.user_level;
    const idCategory = req.params.id;
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
        //Send result
        return res.status(200).json(result);
    }
    else {
        return res.sendStatus(500);
    }
});
router.get('/admin/:id', userCheck, checkAdmin, async (req, res) => {
    const docId = req.params.id;
    const result = await resource.findOneAdmin(docId);
    console.log(result);
    if (result && result.length > 0) {
        //Get all themes and check if theme is in theme
        const themeList = await theme.getAll();
        const name = result[0].name;
        const idDoc = result[0].id_resource;
        const path = result[0].path;
        const idCat = result[0].id_cat;
        const visibility = result[0].visibility;
        const CategoryResource = result[0].name_resource_category;
        const themes = [];
        result.forEach((item) => {
            let idTheme = item.id_theme;
            let themeName = item.themename;
            themes.push({ idTheme, themeName });
        });

        const ThemeDocArray = [];
        //Checked if all themes are checked
        themeList.forEach((themeItem) => {
            let checked = false;
            themes.forEach((themeDoc) => {
                if (themeItem.id_theme === themeDoc.idTheme)
                    checked = true;
            });
            ThemeDocArray.push({
                idTheme: themeItem.id_theme,
                checked,
                themeName: themeItem.name
            });
        });
        const doc = { name, idDoc, path, idCat, visibility, CategoryResource, themes: ThemeDocArray };
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
router.put('/:id', userCheck, checkAdmin, async (req, res) => {
    /* We have
    idDoc
    name
    visibility
    themes[{idTheme,checked themeName}]*/
    //Change if needed idDoc,name and visibility

    //Delete all links in  theme_to_ressource
    const result=await theme.destroyByResource(req.params.id);
    //add all checked in theme_to_resource

    return res.sendStatus(404);
});
router.delete('/:id', userCheck, checkAdmin, async (req, res) => {
    //Remove all link in theme_to_resource where ID
    const result=await theme.destroyByResource(req.params.id);
    //Remove resource
    const destroyResult=await resource.destroy(req.params.id);
    if(destroyResult>0){
       return res.status(200).send('resource deleted')
    }
    else
      return  res.status(404).send('resource not found');
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