const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      category: Joi.number().integer().presence(presence),
      name: Joi.string().max(200).presence(presence),
      date: Joi.date().timestamp().presence(presence),
    }).validate(data, { abortEarly: false }).error;
  };

const findOne = (id) => {
    return db
        .query("SELECT id_event, id_cat, name, date_event FROM event WHERE id_event=?", [id])
        .then(([result]) => result[0])
        .catch((err) => {
            console.error(err);
            return err;
        });
}

const findAllByCategory=(category) =>{
    let sql="SELECT * FROM event WHERE id_cat=?";
    const sqlArray=[category];
    return db
        .query(sql, sqlArray)
        .then(([result]) => result[0])
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const create = ({ category, name, date }) => {
    return db
        .query('INSERT INTO event (id_cat, name, date_event) VALUES (?,?,?)', [category, name, date])
        .then(([result]) => {
            const lastId = result.insertId;
            return { lastId, category, name, date };
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

module.exports = {
    validate,
    findAllByCategory,
    findOne, 
    create
}