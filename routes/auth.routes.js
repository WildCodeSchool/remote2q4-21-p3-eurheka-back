const router = require("express").Router();
const auth = require('../models/auth.model');
const { checkLevel } = require('../middleware/UserValidation');

router.get('/',checkLevel ,(req, res) => {
    let userId=req.userData.user_id;
    let userLevel=req.userData.user_level;
    if(userId===undefined){
        userId=0;
    }
    return res.status(200).json({userId,userLevel});

});


module.exports = router;