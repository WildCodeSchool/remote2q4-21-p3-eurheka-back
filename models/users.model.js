const connection = require("../db-config");
const Joi = require('joi');
const argon2 = require('argon2');
const { userRole } = require('../utils/definitions');
const db = connection.promise();

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
};

const checkPassword = (plainPassword, hashedPassword) => {
    if(plainPassword==='' ||hashedPassword==='')
        return false;
    if(!hashedPassword.includes('$'))
        return false;
    try{
     const valid= argon2.verify(hashedPassword, plainPassword, hashingOptions);
     return valid;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        email: Joi.string().email().max(255).presence(presence),
        firstname: Joi.string().max(255).presence(presence),
        lastname: Joi.string().max(255).presence(presence),
        password: Joi.string().min(8).max(50).presence(presence),
        options: Joi.number().integer().presence('optional')
    }).validate(data, { abortEarly: false }).error;
}

const validateUpdate = (data, forCreation = false) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        email: Joi.string().email().max(255).presence(presence),
        firstname: Joi.string().max(255).presence(presence),
        lastname: Joi.string().max(255).presence(presence),
        password: Joi.string().min(8).max(50).presence(presence),
        adresse: Joi.string().max(255).allow(null).presence(presence),
        phone: Joi.string().max(14).allow(null).presence(presence), 
        birthday: Joi.string().allow(null).presence(presence),
        in_post: Joi.boolean().truthy(1).falsy(0).allow(null).presence(presence),    
        free_date: Joi.string().allow(null).presence(presence),
        enterprise_name: Joi.string().max(125).allow(null).presence(presence),
        job_date: Joi.string().allow(null).presence(presence),
        job_name: Joi.string().max(125).allow(null).presence(presence),
        job_search: Joi.boolean().truthy(1).falsy(0).allow(null).presence(presence),      
    }).validate(data, { abortEarly: false }).error;
}

const validateLevel=(data)=>{
    return Joi.object({
       user_level: Joi.number().integer().min(2).max(5).presence('required')
    }).validate(data, { abortEarly: false }).error;
}

const validateLogin = (data) => {
    return Joi.object({
        email: Joi.string().email().max(255).presence('required'),
        password: Joi.string().min(8).max(50).presence('required'),
    }).validate(data, { abortEarly: false }).error;
}

const validateLostPass= (data) => {
    return Joi.object({
        email: Joi.string().email().max(255).presence('required'),
        password: Joi.string().min(8).max(50).presence('required'),
        token:Joi.string().min(8).max(255).presence('required'),
    }).validate(data, { abortEarly: false }).error;
}

const hashPassword = (plainPassword) => {
    return argon2.hash(plainPassword, hashingOptions);
};

const findOneByMail = (email) => {
    return db
        .query("SELECT id_users FROM users WHERE email=?", [email])
        .then(([result]) => result[0])
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const findOneById = (id) => {
    return db
        .query("SELECT id_users FROM users WHERE id_users=?", [id])
        .then(([result]) => result[0])
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const getDetailById = (id) => {
    return db
    .query("SELECT id_users, firstname, lastname, email, phone, birthday, adresse, in_post, free_date, job_search, job_name, job_date, enterprise_name, signin_options FROM users WHERE id_users=?", [id])
    .then(([result]) => result[0])
    .catch((err) =>{
        console.log(err);
        return err;
    })
}

const putDetailById = (data, id) => {
    return db
    .query("UPDATE users SET ? WHERE id_users=?", [data, id])
    .then(([result])=>{
        return result.affectedRows!==0
    })
    .catch((err)=>{
        console.log(err);
        return err;
    })
}

const findOneByMailForLogin = (email) => {
    return db
        .query("SELECT id_users,password,user_level,firstname,lastname FROM users WHERE email=?", [email])
        .then(([result]) => result[0])
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const create = async ({ firstname, lastname, password, email, options }) => {
    const hashedPassword = await hashPassword(password);
    return db
        .query("INSERT INTO users (firstname,lastname, email,password,signin_options,user_level) VALUES(?,?,?,?,?,?)",
            [firstname, lastname, email, hashedPassword, options, userRole.USER])
        .then(([result]) => {
            const lastId = result.insertId;
            return lastId;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });

}

const findAll=()=>{
    return db
        .query("SELECT id_users,userName, user_level, name FROM view_user_admin ORDER BY userName")
        .then(([result])=>{
            return result
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const destroy=(idUser)=>{
    return db
        .query("DELETE FROM users WHERE id_users=?",[idUser])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const updateLevelUser=(id,level)=>{
    return db
        .query("UPDATE users SET user_level=? WHERE id_users=?",[level,id])
        .then(([result])=>{
            return result.affectedRows!==0
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const createTokenForPass=(id,token)=>{
    return db
        .query("UPDATE users SET token_lost=? WHERE id_users=?",[token,id])
        .then(([result])=>{
            return result.affectedRows!==0
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const findOneByMailForPass = (email) => {
    return db
        .query("SELECT id_users, token_lost FROM users WHERE email=?", [email])
        .then(([result]) => result[0])
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const updateLostPassword =(id,newPassword)=>{
    return db
        .query("UPDATE users SET password= ? , token_lost='' WHERE id_users= ?", [newPassword,id])
        .then(([result]) => {
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

module.exports = {
    validate,
    validateUpdate,
    hashPassword,
    create,
    findOneByMail,
    validateLogin,
    findOneByMailForLogin,
    checkPassword,
    findAll,
    getDetailById,
    destroy,
    updateLevelUser,
    findOneById,
    validateLevel,
    putDetailById,
    createTokenForPass,
    validateLostPass,
    findOneByMailForPass,
    updateLostPassword
}