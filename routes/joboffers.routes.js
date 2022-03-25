const router = require("express").Router();
const jobOffer = require('../models/joboffers.model');
const { userCheck, checkSuperAdmin } = require('../middleware/UserValidation');
const multer = require('multer');

const storageOffer = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            cb(null, 'uploads/offers')
        },
        filename: function (req, file, cb) {
            const now = new Date(Date.now());
            const jour = now.getDate()
            const month = now.getMonth()
            const year = now.getFullYear()
            const filename = jour + "-" + month + "-" + year + "_" + file.originalname
            cb(null, filename)
        }
    }
);

const uploadOffer = multer({ storage: storageOffer });

const addOfferToDb = async (path, name) => {
    //Envoi à la BDD
    const result = await jobOffer.create(name, path);
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

router.get('/', (req, res) => {
    return res.sendStatus(402);
});

router.get('/offertype/', async (req, res) => {
    const result = await jobOffer.getOfferTypeAll();
    if (result && (typeof (result.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    return res.status(200).json(result);
});

router.get('/:id', async (req, res) => {
    return res.sendStatus(402);
});

//Only superAdmin can post. To be chnage for user enterprise class
router.post('/', userCheck, checkSuperAdmin, uploadOffer.single('file'), async (req, res) => {
    //Voir pour fixer l'erreur de multer si le file est pas bon
    if (req.file === undefined) {
        return res.status(422).send('File missing');
    }
    //Only for  superAdmin
    const id_user=req.userData.user_id;
    const path = req.file.path;
    const { name,id_type } = req.body;
    const errors = jobOffer.validate({ path, name,id_user,id_type });
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return res.status(422).json(errorArray);
    }
    const jobBDD=await addOfferToDb(name, path);
    if (jobBDD.error!==0){
        return res.sendStatus(jobBDD.error);
    }
    const jobOfferId=jobBDD.newId;
    const AddedJobType=await jobOffer.addJobToCat(jobOfferId,id_type);
    //Check if OK
    if(AddedJobType&&(typeof(AddedJobType.errno)!=='undefined')){
        return res.sendStatus(500);
    }
    if(AddedJobType){
        //Add Job to user
        const AddedJobUser=await jobOffer.addJobToUser(jobOfferId,id_user,true);
        if(AddedJobUser&&(typeof(AddedJobUser.errno)!=='undefined')){
            return res.sendStatus(500);
        }
        return res.sendStatus(201);
    }
});

router.put('/:id', userCheck, checkSuperAdmin, async (req, res) => {
    return res.sendStatus(402);
});

router.delete('/:id', userCheck, checkSuperAdmin, async (req, res) => {
    return res.sendStatus(402);
});



module.exports = router;