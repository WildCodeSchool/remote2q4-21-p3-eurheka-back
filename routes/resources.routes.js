const router = require("express").Router();
const multer = require('multer');
const resource = require('../models/resources.model');
const { userCheck, checkLevel, checkAdmin } = require('../middleware/UserValidation');
const theme = require('../models/themes.model');
const { resourceCategory } = require('../utils/definitions');

const storageJob = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/jobs')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
);
const addResourceToDb = async (payload) => {
    const errors = resource.validate(payload);
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return { error: 422, errors: errorArray };
    }
    //Envoi à la BDD
    const result = await resource.create(payload);

    if (result && (typeof (result.errno) !== 'undefined')) {
        return { error: 500 };
    }
    if (result) {
        return { error: 0, newId: result };
    }
    else {
        return { error: 500 };
    }
}

const addThemeToResource=(themes,resourceId)=>{
    try {
        themes.forEach(async (themeItem) => {
            if(themeItem.checked){
                let idTheme = themeItem.idTheme;
                let result = await theme.add_RessourceTheme(resourceId, idTheme);
                if (result && (typeof (result.errno) !== 'undefined')) {
                    throw 'break';
                }
            }
        })
        return {error:0}
    }
    catch (e) {
        return {error:500};
    }
}

const storageDoc = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/docs')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    }
);

const uploadJob = multer({ storage: storageJob });
const uploadDoc = multer({ storage: storageDoc });

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

router.post('/job/',userCheck, checkAdmin , uploadJob.single('file'), async (req, res) => {
    //Needed for model 
    const path = req.file.path;
    const visibility = req.body.visibility;
    const id_cat = req.body.id_cat;
    const name = req.body.name;
    const payload = { path, visibility, id_cat, name };
    const addedDb = await addResourceToDb(payload);
    const error = addedDb.error;
    if (error === 0) {
        const newDocId = addedDb.newId;
        const themes=JSON.parse(req.body.themes);
        const addTheme=addThemeToResource(themes,newDocId);
        if(addTheme.error===0)
            return res.sendStatus(201);
        else
            return res.sendStatus(addTheme.error);
    }
    else {
        if (error === 422) {
            return res.status(error).json(addedDb.errors)
        }
        return res.sendStatus(error);
    }
});

router.post('/doc/',userCheck, checkAdmin ,uploadDoc.single('file'), async (req, res) => {
    const path = req.file.path;
    const visibility = req.body.visibility;
    const id_cat = req.body.id_cat;
    const name = req.body.name;
    const payload = { path, visibility, id_cat, name };
    const addedDb = await addResourceToDb(payload);
    const error = addedDb.error;
    if (error === 0) {
        const newDocId = addedDb.newId;
        const themes=JSON.parse(req.body.themes);
        const addTheme=addThemeToResource(themes,newDocId);
        if(addTheme.error===0)
            return res.sendStatus(201);
        else
            return res.sendStatus(addTheme.error);
    }
    else {
        if (error === 422) {
            return res.status(error).json(addedDb.errors)
        }
        return res.sendStatus(error);
    }
});

router.post('/video/',userCheck, checkAdmin , uploadDoc.single('file'), async (req, res) => {
    //Needed for model 
    const path = req.body.video;
    const visibility = req.body.visibility;
    const id_cat = req.body.id_cat;
    const name = req.body.name;
    const payload = { path, visibility, id_cat, name };
    const addedDb = await addResourceToDb(payload);
    const error = addedDb.error;
    if (error === 0) {
        const newDocId = addedDb.newId;
        const themes=req.body.themes;
        const addTheme=addThemeToResource(themes,newDocId);
        if(addTheme.error===0)
            return res.sendStatus(201);
        else
            return res.sendStatus(addTheme.error);
    }
    else {
        if (error === 422) {
            return res.status(error).json(addedDb.errors)
        }
        return res.sendStatus(error);
    }
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
                    themes.forEach(async (themeItem) => {
                        let idTheme = themeItem.idTheme;
                        let result = await theme.add_RessourceTheme(req.params.id, idTheme);
                        if (result && (typeof (result.errno) !== 'undefined')) {
                            throw 'break';
                        }
                        if (result) {
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