const connection = require("../db-config");
const Joi = require('joi');
const argon2 = require('argon2');
const {userRole}=require('../utils/definitions');
const db = connection.promise();

const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

const validate=(data,forCreation=true)=>{
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        email: Joi.string().email().max(255).presence(presence),
        firstname: Joi.string().max(255).presence(presence),
        lastname: Joi.string().max(255).presence(presence),
        password: Joi.string().min(8).max(50).presence(presence),
        options:Joi.number().integer().presence('optional')
    }).validate(data, { abortEarly: false }).error;
}

const hashPassword = (plainPassword) => {
    return argon2.hash(plainPassword, hashingOptions);
  };

const findOneByMail=(email)=>{
    return db
    .query("SELECT id_users FROM users WHERE email=?",[email])
    .then(([result])=>result[0]);
} 
const create=async ({firstname,lastname,password,email,options})=>{
    const hashedPassword= await hashPassword(password);
    return db
    .query("INSERT INTO users (firstname,lastname, email,password,signin_options,user_level) VALUES(?,?,?,?,?,?)",
    [firstname,lastname,email,hashedPassword,options,userRole.USER])
    .then(([result])=>{
        const lastId = result.insertId;
        return lastId;
    })
    .catch((err) => {
        console.error(err);
        return err;
    });

}
module.exports = {
    validate,
    hashPassword,
    create,
    findOneByMail,
}