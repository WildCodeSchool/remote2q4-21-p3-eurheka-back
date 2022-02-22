const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const findAllByEnterprise=(id)=>{
    return db.query("SELECT opinion, CONCAT(firstname,' ',lastname) as author FROM view_opinion WHERE is_valid=1 and id_enterprise=?;",[id])
    .then(([result])=>result);
}

module.exports = {
    findAllByEnterprise,
}