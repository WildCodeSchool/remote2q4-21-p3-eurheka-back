const {userRole} = require ('../utils/definitions');

const userCheck =(req,res,next)=>{
    //check if user is connected
    console.log('passing middleware');
    next();
}

const checkLevel =(req,res,next)=>{
//Check User Level
    next();
}

module.exports={
    userCheck,
    checkLevel,
}