const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const getAll=()=>{
    return db
        .query("SELECT id_theme, name FROM theme ORDER BY name")
        .then(([result])=> result)
        .catch((err)=>{
            console.log(err);
            return err;
        });
}

const findOne=(id)=>{
    return db
        .query("SELECT id_theme, name FROM theme WHERE id_theme=?",[id])
            .then(([result])=> result[0])
            .catch((err)=>{
                //console.log(err)
                return err;
            });
}

const destroyByResource=(id)=>{
    return db
        .query("DELETE FROM theme_to_ressources WHERE id_ressource=?",[id])
        .then(([result])=>result.affectedRows)
        .catch((err)=>{
            console.log(err);
            return err;
        });
}


module.exports = {
    getAll,
    destroyByResource,
    findOne,
}