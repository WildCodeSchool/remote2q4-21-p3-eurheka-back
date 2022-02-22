const router = require("express").Router();
const Opinion = require('../models/opinions.model');
const Entreprise = require('../models/enterprises.model');

router.get('/',(req,res)=>{
    res.send('Opinion Eurheka');

});

router.get('/eurheka/', (req, res) => {
    Entreprise.findOneByName('eurhéka')
    .then((id)=>{
        if(id===undefined)
        {
            console.log('erreur');
            res.status(404).send('Company not found');
        }
        else{
            let id_ent=id.id_enterprise;
            console.log(`ID : ${id_ent}`);
            Opinion.findAllByEnterprise(`${id_ent}`)
            .then((opinions)=>{
                res.json(opinions);
            })

        }
    })
    
});



router.get('/:id', (req, res) => {

});
router.post('/', (req, res) => {

});
router.put('/:id', (req, res) => {

});
router.delete('/:id', (req, res) => {

});



module.exports = router;