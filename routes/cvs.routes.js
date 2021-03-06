const router = require("express").Router();
const multer = require('multer');
const cv = require('../models/cvs.model');
const { userCheck, checkLevel, checkAdmin, checkSuperAdmin } = require('../middleware/UserValidation');

const storageCv = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/cvs')
        },
        filename: function (req, file, cb) {
            const now = new Date(Date.now());
            const jour = now.getDate()
            const month = now.getMonth() + 1
            const year = now.getFullYear()
            const filename = jour+"-"+month+"-"+year+"_"+file.originalname
            cb(null, filename)
        }
    }
);

const uploadCv = multer({ storage: storageCv });

const addCvToDb = async (path) => {
    //Envoi à la BDD
    const result = await cv.create(path);

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
router.get('/admin/',userCheck,checkSuperAdmin,async(req,res)=>{
    const result=await cv.findAllAdmin();
    if (result && (typeof (result.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    return res.status(200).json(result);

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

router.get('/', userCheck, (req, res) => {
    cv.findByUser(req.userData.user_id)
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


router.get('/all', userCheck, checkAdmin, (req, res) => {
    cv.findAll()
        .then((cv) => {
            if(cv && (typeof(cv.errno)!=='undefined')){
                return res.sendStatus(500)
            }
            if (cv) {
                res.status(200).json(cv)
            }
            else {
                res.status(404).send('cvs not found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Error');
        })
});

router.post('/', userCheck, uploadCv.single('file'), async (req, res) => {
    const path = req.file.path;
    const addedDb = await addCvToDb(path);
    const error = addedDb.error;
    if (error === 0) {
        const newCvId = addedDb.newId;
        const is_owner = true
        const id_users = req.userData.user_id
        const addCv = await cv.add_CvToUser(id_users, newCvId, is_owner)
        if(addCv && (typeof (addCv.errno) !== "undefined"))
            return res.sendStatus(500);
        else
            return res.sendStatus(201);
    }
    else {
        if (error === 422) {
            return res.status(error).json(addedDb.errors)
        }
        return res.sendStatus(error);
    }
});

router.put('/:id', (req, res) => {

});

router.delete('/:id', userCheck, async (req, res) => {
    //Remove all link in cv where ID
    const CVExists = await cv.findOne(req.params.id);    
    if (CVExists && typeof (CVExists.errno) !== 'undefined') {
        return res.sendStatus(500);
    }
    if (CVExists) {
        const result = await cv.deleteRelation(req.params.id);
        if (result && (typeof (result.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        const destroyCVExists = await cv.destroyCVById(req.params.id);
        if (destroyCVExists && (typeof (destroyCVExists.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        if (destroyCVExists > 0) {
        return res.status(204).send('CV deleted')
        }
        else {
        return res.status(404).send('CV not found');
        }
    } else {
        return res.status(404).send('CV not found');
    }
});


module.exports = router;