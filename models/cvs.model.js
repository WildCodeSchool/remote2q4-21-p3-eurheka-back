const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        path: Joi.string().max(255).presence(presence)
    }).validate(data, { abortEarly: false }).error;
}

const findAll = () => {
    return db
        .query("SELECT u.firstname, u.lastname, u.email, cv.path FROM users as u INNER JOIN cv_to_user as t ON id_user=u.id_users INNER JOIN cv ON cv.id_cv=t.id_cv")
        .then(([result]) => result)
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const findOne = (id) => {
    return db
    .query("SELECT * FROM cv WHERE id_cv=?", [id])
    .then(([result]) => {
        return result[0]
    })
    .catch((err) => console.error(err));
}

const create=(path)=>{
    return db
        .query("INSERT INTO cv (path) VALUES (?)",[path])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const add_CvToUser=(id_user,id_cv,is_owner)=>{
    return db
        .query("INSERT INTO cv_to_user (id_cv,id_user,is_owner) VALUES(?,?,?)",[id_cv,id_user,is_owner])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
} 

module.exports = {
    findAll,
    findOne,
    create,
    add_CvToUser,
    validate
}