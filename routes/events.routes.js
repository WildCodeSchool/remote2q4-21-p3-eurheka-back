const router = require("express").Router();
const event = require('../models/events.model');
const { userCheck,checkAdmin } = require('../middleware/UserValidation');

//CRUD Event
router.get('/admin',userCheck,checkAdmin,async(req,res)=>{
  const result=await event.findAllForAdmin();
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  const now=new Date(Date.now());
  const eventToSend=[];
  if (result){
    result.forEach((event)=>{
      const eventDate=new Date(event.date_event);
      let isPassed=false;
      if(eventDate<now)
        isPassed=true;
      eventToSend.push({...event,isPassed});
    })
  }
  return res.status(200).json(eventToSend);
} );

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
  if (result){
    return res.status(200).json(result);
  }
  else
    return res.status(404).send('Category not found');
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

router.delete('/:id',async (req, res) => {
  //Remove Dependancies
  const removedDependancies=await event.removeDependancies(req.params.id);
  if (removedDependancies && (typeof (removedDependancies.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  if(removedDependancies){
    const result=event.deleteEvent(req.params.id);
    if (result && (typeof (result.errno) !== 'undefined')) {
      return res.sendStatus(500);
    }
    if (result){
      return  res.sendStatus(200);
    }
    else
      return res.sendStatus(404);
  }
  
});

//CUD Event Category

router.post('/category/', async (req, res) => {
  const errors = event.validateCategory(req.body);
  if (errors) {
    cccc
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
  const id_event=parseInt(req.params.id);
  if(id_event===1){
    return res.status(403).send('Event non updatable');
  }
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
    return res.sendStatus(404);
  }
});

router.put('/rdv/:id',userCheck,async(req,res)=>{
   const errors=event.validateRDV(req.body);
   const userId=req.userData.user_id;
   if(errors){
    const errorDetails = errors.details;
    const errorArray = [];
    errorDetails.forEach((error) => {
      errorArray.push(error.message);
    });
    return res.status(422).json(errorArray);
   }
  const result=await event.updateRDV(req.body,req.params.id,userId);
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  if(result){
    return res.status(200).json({id:req.params.id,userId,...req.body});
  }
  else
    return res.sendStatus(404);
});

router.delete('/category/:id', async (req, res) => {
  const id_event=parseInt(req.params.id);
  if(id_event===1){
    return res.status(403).send('Event non removable');
  }
  const result = await event.deleteCategory(req.params.id);
  if (result && (typeof (result.errno) !== 'undefined')) {
    return res.sendStatus(500);
  }
  if (result) {
    return res.sendStatus(204);
  }
  else {
    return res.sendStatus(404);
  }
});
module.exports = router;