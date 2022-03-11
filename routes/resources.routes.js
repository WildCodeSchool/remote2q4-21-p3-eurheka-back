const router = require("express").Router();
const multer = require('multer');
const resource = require('../models/resources.model');
const { userCheck, checkLevel, checkAdmin } = require('../middleware/UserValidation');
const theme = require('../models/themes.model');
const { resourceCategory } = require('../utils/definitions');

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
    const idCategory = req.params.id;
    const result = await resource.findAllByCategoryAdmin(idCategory);
    if (result && (typeof (result.errnno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (result) {
        return res.status(200).json(result);
    }
    else {
        return res.sendStatus(500);
    }
});

router.get('/admin/:id', userCheck, checkAdmin, async (req, res) => {
    const docId = req.params.id;
    const result = await resource.findOneAdmin(docId);
    if (result && (typeof (result.errnno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (result && result.length > 0) {
        //Get all themes and check if theme is in theme
        const themeList = await theme.getAll();
        if (themeList && (typeof (themeList.errnno) !== 'undefined')) {
            return res.sendStatus(500);
        }
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
    const returnArray = [];
    //check if resource exists
    const resourceExists = await resource.findOne(req.params.id);
    if (resourceExists && typeof (resourceExists.errno) !== 'undefined') {
        return res.sendStatus(500);
    }
    if (resourceExists) {
        const { name, visibility, themes } = req.body;
        const payload = { name, visibility };
        const errors = resource.validate(payload, false);
        if (errors) {
            const errorDetails = errors.details;
            const errorArray = [];
            errorDetails.forEach((error) => {
                errorArray.push(error.message);
            });
            return res.status(422).json(errorArray);
        }
        //Update table resource
        if (name || visibility) {
            //Update values name and visibility
            const result = await resource.update(payload, req.params.id);
            if (result && (typeof (result.errno) !== 'undefined')) {
                return res.sendStatus(500);
            }
            if (result) {
                returnArray.push('Update values OK');
            }
        }
        if (themes) {
            const errorArrayTheme = [];
            try {
                themes.forEach((themeItem) => {
                    const errorsTheme = resource.validateTheme(themeItem);
                    if (errorsTheme) {
                        const errorDetailsTheme = errorsTheme.details;
                        errorDetailsTheme.forEach((error) => {
                            errorArrayTheme.push(error.message);
                        });
                        throw 'break';
                    }
                });
                //Delete all links in  theme_to_ressource
                const result = await theme.destroyByResource(req.params.id);
                if (result && (typeof (result.errnno) !== 'undefined')) {
                    return res.sendStatus(500);
                }
                //Adding new themes to resource
                try {
                    themes.forEach(async(themeItem) => {
                        let idTheme = themeItem.idTheme;
                        let result=await theme.add_RessourceTheme(req.params.id,idTheme);
                        if(result&&(typeof(result.errno)!=='undefined')){
                            throw 'break';
                        }
                        if(result){
                            returnArray.push(`adding theme ${idTheme} to resource ${req.params.id}`);
                        }
                    })
                }
                catch (e) {
                    return res.sendStatus(500);
                }
            }
            catch (e) {
                return res.status(422).json(errorArrayTheme);
            }
        }
        return res.status(200).json(returnArray);
    }
    else
        return res.status(404).send('Resource not found');
});

router.delete('/:id', userCheck, checkAdmin, async (req, res) => {
    //Remove all link in theme_to_resource where ID
    const result = await theme.destroyByResource(req.params.id);
    if (result && (typeof (result.errnno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    //Remove resource
    const destroyResult = await resource.destroy(req.params.id);
    if (destroyResult > 0) {
        return res.status(200).send('resource deleted')
    }
    else
        return res.status(404).send('resource not found');
});

module.exports = router;