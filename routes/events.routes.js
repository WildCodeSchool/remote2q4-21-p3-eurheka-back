const router = require("express").Router();
const event = require('../models/events.model');
const { userCheck } = require('../middleware/UserValidation');

//CRUD Event
// router.get('/', (req, res) => {
//   return res.sendStatus(402);
// });
router.get('/myevents/', userCheck, (req, res) => {
  userId = req.userData.user_id;
  event.findAllRelatedToUser(userId)
    .then((event) => {
      if (event && (typeof (event.errno) !== 'undefined')) {
        return res.sendStatus(500);
      }
      if (event) {
        return res.status(200).json(event)
      }
      else {
        return res.status(404).send('Event not found')
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Internal Error');
    })
});

router.get('/category/', async (req, res) => {
  const result = await event.getAllCat();
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  return res.status(200).json(result);
});

router.get('/category/:id', async (req, res) => {
  const result = await event.getOneCat(req.params.id);
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  return res.status(200).json(result);
});


router.get('/:id', userCheck, (req, res) => {
  //Must be auth validation//
  event.findOne(req.params.id)
    .then((event) => {
      if (event && (typeof (event.errno) !== 'undefined')) {
        return res.sendStatus(500);
      }
      if (event) {
        return res.status(200).json(event)
      }
      else {
        return res.status(404).send('Event not found')
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send('Internal Error');
    })
});

router.post('/', userCheck, (req, res) => {
  //Must be auth validation//
  //Get User id
  userId = req.userData.user_id;
  const error = event.validate(req.body);
  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    event.create(req.body)
      .then((createdEvent) => {
        if (event && (typeof (event.errno) !== 'undefined')) {
          return res.sendStatus(500);
        }
        //here we associate the event with user
        const idEvent = createdEvent.lastId;
        event.associateWithUser(idEvent, userId)
          .then(
            res.status(201).json(createdEvent)
          )
          .catch((err) => {
            console.log(err);
            return res.sendStatus(500);
          })
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error saving the event');
      });
  }
});

router.put('/:id', (req, res) => {
  return res.sendStatus(402);
});

router.delete('/:id', (req, res) => {
  return res.sendStatus(402);
});

//CUD Event Category

router.post('/category/', async (req, res) => {
  const errors = event.validateCategory(req.body);
  if (errors) {
    const errorDetails = errors.details;
    const errorArray = [];
    errorDetails.forEach((error) => {
      errorArray.push(error.message);
    });
    return res.status(422).json(errorArray);
  }
  const result = await event.addCategory(req.body);
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  if (result) {
    return res.sendStatus(201);
  }
  else {
    return res.sendStatus(204);
  }
});

router.put('/category/:id', async (req, res) => {
  const errors = event.validateCategory(req.body, false);
  if (errors) {
    const errorDetails = errors.details;
    const errorArray = [];
    errorDetails.forEach((error) => {
      errorArray.push(error.message);
    });
    return res.status(422).json(errorArray);
  }
  const result = await event.updateCategory(req.body,req.params.id);
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  if (result) {
    return res.sendStatus(204);
  }
  else {
    return res.sendStatus(200);
  }
});

router.delete('/category/:id', async (req, res) => {
  const result = await event.deleteCategory(req.params.id);
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  if (result) {
    return res.sendStatus(204);
  }
  else {
    return res.sendStatus(200);
  }
});
module.exports = router;