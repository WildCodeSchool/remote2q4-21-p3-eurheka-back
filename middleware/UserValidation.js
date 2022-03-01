const { userRole } = require('../utils/definitions');

const userCheck = (req, res, next) => {
    //check if user is connected
    console.log('passing middleware');
    next();
}

const checkLevel = (req, res, next) => {
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

module.exports = {
    userCheck,
    checkLevel,
}