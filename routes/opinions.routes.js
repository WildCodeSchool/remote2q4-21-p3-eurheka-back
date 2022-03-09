const router = require("express").Router();
const Opinion = require('../models/opinions.model');
const Entreprise = require('../models/enterprises.model');
const { userCheck, checkAdmin } = require('../middleware/UserValidation');
const { response } = require("express");

router.get('/', userCheck, checkAdmin, (req, res) => {
    //This route must be protected and only for administrator
    Opinion.findAll()
        .then((result) => {
            if(result.errno){
                return res.sendStatus(500);
            }
            res.status(200).json(result)
        .catch((err)=>{
            return res.sendStatus(500);
        })
        })

});

router.get('/eurheka/', (req, res) => {
    Entreprise.findOneByName('eurhéka')
        .then((id) => {
            if(id.errno){
                return res.sendStatus(500);
            }
            if (id === undefined) {
                console.log('erreur');
                res.status(404).send('Company not found');
            }
            else {
                let id_ent = id.id_enterprise;
                Opinion.findAllByEnterprise(`${id_ent}`)
                    .then((opinions) => {
                        res.json(opinions);
                    })
            }
        })
        .catch((err)=>{
            return res.sendStatus(500);
        })
});

router.get('/enterprise/:id', userCheck, checkAdmin, (req, res) => {
    //this route must be protected and visible only for superadmin, or entreprise concerned
    Entreprise.findOne(req.params.id)
        .then((id) => {
            if(id.errno){
                return res.sendStatus(500);
            }
            if (id === undefined) {
                console.log('erreur');
                res.status(404).send('Company not found');
            }
            else {
                let id_ent = id.id_enterprise;
                console.log(`ID : ${id_ent}`);
                Opinion.findAllByEnterprise(`${id_ent}`)
                    .then((opinions) => {
                        res.json(opinions);
                    })
            }
        })
});

router.get('/:id', userCheck, checkAdmin, (req, res) => {
    //this route must be protected, only for superadmin
    Opinion.findOne(req.params.id)
        .then((opinion) => {
            if(opinion.errno){
                return res.sendStatus(500);
            }
            if (opinion) {
                res.status(200).json(opinion)
            }
            else {
                res.status(404).send('Opinion not found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Error');
        })
});

router.post('/', userCheck, async (req, res) => {
    //This route must be protected, =>for connected users
    const user_id = req.userData.user_id; //for tests
    //Check if enterprise is set
    let enterprise_id = 0;
    const { entreprise, opinion } = req.body;
    if (entreprise === undefined) {
        //Get Eurheka Id
        const enterprise_value = await Entreprise.findOneByName('eurhéka');
        if(enterprise_value.errno){
            return res.sendStatus(500);
        }
        enterprise_id = enterprise_value.id_enterprise;
        if (enterprise_id === undefined) {
            console.log('erreur');
            return res.status(404).send('Company not found');
        }
    }
    else {
        enterprise_id = entreprise;
    }
    const data = { opinion: opinion, enterprise: enterprise_id, user: user_id };
    const error = Opinion.validate(data);
    if (error) {
        res.status(422).json({ validationErrors: error.details })
    }
    else {
        Opinion.create(data)
            .then((opinionCreated) => {
                if(opinionCreated.errno){
                    return res.sendStatus(500);
                }
                return res.status(201).json(opinionCreated);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error saving the movie');
            });
    }
});

router.put('/:id', userCheck, checkAdmin, async (req, res) => {
    //this route must be protected, only for super admin
    //Check if Opinion is in DB
    const opinionExists = await Opinion.findOne(req.params.id);
    if(opinionExists.errno){
        return res.sendStatus(500);
    }
    if (opinionExists) {
        const error = Opinion.checkValidate(req.body);
        if (error) {
            res.status(422).json({ validationErrors: error.details })
        }
        else {
            const { is_valid } = req.body;
            const result = await Opinion.update(req.params.id, is_valid);
            if (result === 1) {
                res.status(200).json({ opinion_id: req.params.id, is_valid: is_valid });
            }
            else
                if (result === 0) {
                    res.status(204).send('no opinion modified');
                }
                else {
                    res.status(500).send('Error updating an opinion');
                }
        }
    }
    else {
        res.status(404).send('Opinion not found');
    }
});

router.delete('/:id', async (req, res) => {
    //this route must be protected, only for super admin
    const result = await Opinion.remove(req.params.id);
    if(result.errno){
        return res.sendStatus(500);
    }
    if (result === true) {
        return res.status(200).send('Opinion deleted');
    }
    else {
        res.status(500).send('Error deleting an opinion');
    }
});



module.exports = router;