const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const findOne=(id)=>{
    //Get company by ID
}

const findOneByName=(EnterpriseName)=>{
    const name='%'+EnterpriseName.toUpperCase()+'%';
    return db
    .query("SELECT id_enterprise FROM enterprise WHERE UPPER(name) LIKE ?;",[name])
    .then(([result])=>{
        return result[0]});
}
module.exports = {
    findOne,
    findOneByName,
}