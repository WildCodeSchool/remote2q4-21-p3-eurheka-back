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
    const id_user = req.userData.user_id;
    const path = req.file.path;
    const { name, id_type } = req.body;
    const errors = jobOffer.validate({ path, name, id_user, id_type });
    if (errors) {
        const errorDetails = errors.details;
        const errorArray = [];
        errorDetails.forEach((error) => {
            errorArray.push(error.message);
        });
        return res.status(422).json(errorArray);
    }
    const jobBDD = await addOfferToDb(name, path);
    if (jobBDD.error !== 0) {
        return res.sendStatus(jobBDD.error);
    }
    const jobOfferId = jobBDD.newId;
    const addedJobType = await jobOffer.addJobToCat(jobOfferId, id_type);
    //Check if OK
    if (addedJobType && (typeof (addedJobType.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (addedJobType) {
        //Add Job to user
        const addedJobUser = await jobOffer.addJobToUser(jobOfferId, id_user, true);
        if (addedJobUser && (typeof (addedJobUser.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        if(addedJobUser)
            return res.sendStatus(201);
        else   
            return res.status(204).send('No job created')
    }
});

router.put('/:id', userCheck, checkSuperAdmin, async (req, res) => {
    return res.sendStatus(402);
});

router.delete('/:id', userCheck, checkSuperAdmin, async (req, res) => {
    //Delete from users
    const deletedUserJob = await jobOffer.deleteJobUser(req.params.id);
    if (deletedUserJob && (typeof (deletedUserJob.errno) !== 'undefined')) {
        return res.sendStatus(500);
    }
    if (deletedUserJob) {
        //delete from type job
        const deletedTypeJob = await jobOffer.deleteJobType(req.params.id);
        if (deletedTypeJob && (typeof (deletedTypeJob.errno) !== 'undefined')) {
            return res.sendStatus(500);
        }
        if (deletedTypeJob) {
            //delete job
            const deletedJob = await jobOffer.deleteJob(req.params.id);
            if (deletedJob && (typeof (deletedJob.errno) !== 'undefined')) {
                return res.sendStatus(500);
            }
            if(deletedJob)
                return res.sendStatus(204);
            else
                return res.status(404).send('No job found');;
        }
        else
            return res.status(404).send('No job found');;
    }
    else
        return res.status(404).send('No job found');
});



module.exports = router;