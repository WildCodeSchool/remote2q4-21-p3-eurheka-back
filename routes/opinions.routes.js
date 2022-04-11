const router = require("express").Router();
const Opinion = require('../models/opinions.model');
const Entreprise = require('../models/enterprises.model');
const { userCheck, checkAdmin } = require('../middleware/UserValidation');

router.get('/', userCheck, checkAdmin, (req, res) => {
    Opinion.findAll()
        .then((result) => {
            if(result &&(typeof(result.errno)!=='undefined')){
                return res.sendStatus(500);
            }
            res.status(200).json(result)
        })
        .catch((err)=>{
            return res.sendStatus(500);
        })
});

router.get('/eurheka/', (req, res) => {
    Entreprise.findOneByName('eurhéka')
        .then((id) => {
            if(id&&(typeof(id.errno)!=='undefined')){
                return res.sendStatus(500);
            }
            if (id === undefined) {
                return res.status(404).send('Company not found');
            }
            else {
                let id_ent = id.id_enterprise;
                Opinion.findAllByEnterprise(`${id_ent}`)
                    .then((opinions) => {
                        return res.json(opinions);
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
            if(id&&(typeof(id.errno)!=='undefined')){
                return res.sendStatus(500);
            }
            if (id === undefined) {
                return res.status(404).send('Company not found');
            }
            else {
                let id_ent = id.id_enterprise;
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
            if(opinion&&(typeof(opinion.errno)!=='undefined')){
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
        if(enterprise_value&&(typeof(enterprise_value.errno)!=='undefined')){
            return res.sendStatus(500);
        }
        enterprise_id = enterprise_value.id_enterprise;
        if (enterprise_id === undefined) {
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
                if(opinionCreated&&(typeof(opinionCreated.errno)!=='undefined')){
                    return res.sendStatus(500);
                }
                return res.status(201).json(opinionCreated);
            })
            .catch((err) => {
                res.status(500).send('Error saving company');
            });
    }
});

router.put('/:id', userCheck, checkAdmin, async (req, res) => {
    const opinionExists = await Opinion.findOne(req.params.id);
    if(opinionExists&&(typeof(opinionExists.errno)!=='undefined')){
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
            if(result&&(typeof(result.errno)!=='undefined')){
                return res.sendStatus(500);
            }
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

router.delete('/:id', userCheck, checkAdmin, async (req, res) => {
    const result = await Opinion.remove(req.params.id);
    if(result&&(typeof(result.errno)!=='undefined')){
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