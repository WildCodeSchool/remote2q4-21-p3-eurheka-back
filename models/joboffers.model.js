const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

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

module.exports = {
    getOfferTypeAll,
}