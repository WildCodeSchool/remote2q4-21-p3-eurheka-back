const router = require("express").Router();
const event = require('../models/events.model');

//CRUD Event
router.get('/', (req, res) => {

});
router.get('/:id', (req, res) => {
    event.findOne(req.params.id)
        .then((event) => {
            if (event) {
                res.status(200).json(event[0])
            }
            else {
                res.status(404).send('Event not found')
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Error');
        })
});
router.post('/', (req, res) => {
    const error = event.validate(req.body);
    if (error) {
      res.status(422).json({ validationErrors: error.details });
    } else {
      event.create(req.body)
        .then((createdEvent) => {
          res.status(201).json(createdEvent);
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

//CRUD Event Category
router.get('/category/', (req, res) => {

});
router.get('/category/:id', (req, res) => {

});
router.post('/category/', (req, res) => {

});
router.put('/category/:id', (req, res) => {

});
router.delete('/category/:id', (req, res) => {

});
module.exports = router;