const { userRole } = require('../utils/definitions');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const userCheck = (req, res, next) => {
    //check if user is connected
    const userToken=req.cookies.jwt;
    if(!userToken){
       return res.sendStatus(401);
    }
    try{
        const userData=jwt.verify(userToken,process.env.PRIVATE_KEY);
        req.userData=userData;
    }
    catch {
        return res.status(403).send('passage par catch');
    }
    next();
}

const checkLevel = (req, res, next) => {
    //Check User Level
    const userToken=req.cookies.jwt;
    if(!userToken){
        req.userData={user_level:userRole.UN_CONNECTED};
    }
    else{
        try{
            const userData=jwt.verify(userToken,process.env.PRIVATE_KEY);
            req.userData=userData;
        }
        catch {
            req.userData={user_level:userRole.UN_CONNECTED};
        }
    }
    next();
}

const checkAdmin=(req, res, next) =>{
    const userLevel=req.userData.user_level;
    if(userLevel<userRole.ADMIN){
        return res.sendStatus(401);
    }
    next();
}
const checkSuperAdmin=(req, res, next) =>{
    const user_level=req.userData.user_level;
    if(userLevel<userRole.SUPER_ADMIN){
        return res.sendStatus(401);
    }
    next();
}

module.exports = {
    userCheck,
    checkLevel,
    checkAdmin,
    checkSuperAdmin
}