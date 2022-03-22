const router = require("express").Router();
const auth = require('../models/auth.model');
const { checkLevel } = require('../middleware/UserValidation');
const {userRole}=require('../utils/definitions');

router.get('/',checkLevel ,(req, res) => {
    let userId=req.userData.user_id;
    let userLevel=req.userData.user_level;
    let userFirstname=req.userData.firstname;
    let userLastname=req.userData.lastname;
    let userLevelString='';
    if(userId===undefined){
        userId=0;
    }

    switch(userLevel)
    {
        case userRole.UN_CONNECTED : userLevelString='not connected'; break;
        case userRole.USER: userLevelString='user';break;
        case userRole.COMPANY: userLevelString='company';break;
        case userRole.ADMIN: userLevelString='admin';break;
        case userRole.SUPER_ADMIN: userLevelString="superadmin";break;
    }
    return res.status(200).json({userId,userLevelString,firstname:userFirstname,lastname:userLastname});

});


module.exports = router;