const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        name: Joi.string().max(255).presence(presence),
        address: Joi.string().max(255).presence(presence),
        id_activity: Joi.number().integer().presence(presence),
        nb_employes: Joi.number().integer().presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const findOne = (id) => {
    return db
        .query("SELECT * FROM enterprise WHERE id_enterprise=?", [id])
        .then(([result]) => {
            return result[0]
        })
        .catch((err) => console.error(err));
}

const findOneByName = (EnterpriseName) => {
    const name = EnterpriseName.toUpperCase();
    return db
        .query("SELECT id_enterprise FROM enterprise WHERE UPPER(name) = ?;", [name])
        .then(([result]) => {
            return result[0]
        });
}
module.exports = {
    findOne,
    findOneByName,
    validate
}