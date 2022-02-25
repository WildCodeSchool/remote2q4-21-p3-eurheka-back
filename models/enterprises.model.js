const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

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
}