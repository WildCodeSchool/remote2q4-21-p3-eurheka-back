const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const getAll=()=>{
    return db
        .query("SELECT id_theme, name FROM theme ORDER BY name")
        .then(([result])=> result)
        .catch((err)=>console.log(err));
}

const destroybyResource=(id)=>{
    return db
        .query("DELETE * FROM theme_to_ressources WHERE id_ressource=?",[id])
        .then(([result])=>result.affectedRows)
        .catch((err)=>console.log(err));
}
module.exports = {
    getAll,
    destroybyResource,
}