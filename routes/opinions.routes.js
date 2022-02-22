const router = require("express").Router();
const Opinion = require('../models/opinions.model');
const Entreprise = require('../models/enterprises.model');

router.get('/', (req, res) => {
    //This route must be protected and only for administrator
    Opinion.findAll()
        .then((result) => {
            res.status(200).json(result);
        })

});

router.get('/eurheka/', (req, res) => {
    Entreprise.findOneByName('eurhéka')
        .then((id) => {
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
});

router.get('/enterprise/:id', (req, res) => {
    Entreprise.findOne(req.params.id)
        .then((id) => {
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

router.get('/:id', (req, res) => {
    Opinion.findOne(req.params.id)
        .then((opinion) => {
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
router.post('/', (req, res) => {
    //Get id_user via token, to do.
    const user_id = 1; //for tests
    //Check if enterprise is set
    let enterprise_id =0;
    const { entreprise, opinion } = req.body;
    if (entreprise === undefined) {
        //pour debug
        console.log('ID entreprise non communiqué');
        //Get Eurheka ID from DB
         enterprise_id = 2;
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
                res.status(201).json(opinionCreated);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send('Error saving the movie');
            });
    }
});

router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});



module.exports = router;