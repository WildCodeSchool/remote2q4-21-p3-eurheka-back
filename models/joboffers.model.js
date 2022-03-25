const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate= (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        path: Joi.string().max(255).presence(presence),
        name: Joi.string().max(255).presence(presence),
        id_user:Joi.number().integer().presence(presence),
        id_type:Joi.number().integer().presence(presence)
    }).validate(data, { abortEarly: false }).error;
}

const getOfferTypeAll=()=>{
    return db
        .query("SELECT id_offer_type, name_offer FROM offer_type ORDER BY name_offer")
        .then(([result])=>{
            return result;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const create=(name,path)=>{
    return db
        .query("INSERT INTO job_offer (path,name) VALUES(?,?)",[path, name])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const addJobToCat=(jobOfferId,id_type)=>{
    return db
        .query("INSERT INTO offer_type_to_job (id_job,id_type) VALUES (?,?)",[jobOfferId,id_type])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const addJobToUser=(jobOfferId,idUser,owner)=>{
    return db
        .query("INSERT INTO job_to_user (id_job,id_user,is_owner) VALUES (?,?,?)",[jobOfferId,idUser,owner])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

module.exports = {
    getOfferTypeAll,
    validate,
    create,
    addJobToCat,
    addJobToUser,
}