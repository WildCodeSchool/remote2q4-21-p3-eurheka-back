const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        name: Joi.string().max(255).presence(presence),
        adress: Joi.string().max(255).presence(presence),
        id_activity: Joi.number().integer().presence(presence),
        Nb_employes: Joi.number().integer().presence(presence)
    }).validate(data, { abortEarly: false }).error;
}

const findAll = () => {
    return db
        .query("SELECT * FROM enterprise")
        .then(([result]) => {
            return result
        })
        .catch((err) => console.error(err));
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

const createOne =  (data) => {
    const {name,id_activity,Nb_employes,adress}=data;
    return db
        .query("INSERT INTO enterprise (name,adress,id_activity,Nb_employes) VALUES (?,?,?,?)", [name, adress, id_activity, Nb_employes])
        .then(([result]) => {
            const idEnterprise = result.insertId;
            return idEnterprise;
        })
}

const update = (data, id) => {

    return db
        .query("UPDATE enterprise SET ? WHERE id_enterprise=?", [data, id])
        .then(([result]) => {
            return result.affectedRows;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const remove = (id) => {
    return db
        .query("DELETE FROM enterprise WHERE id_enterprise=?", [id])
        .then(([result]) => {
            return result.affectedRows !== 0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

module.exports = {
    findOne,
    findOneByName,
    validate,
    createOne,
    update,
    findAll,
    remove
}