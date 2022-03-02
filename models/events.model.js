const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      category: Joi.number().integer().presence(presence),
      name: Joi.string().max(200).presence(presence),
      date: Joi.string().isoDate().presence(presence),
    }).validate(data, { abortEarly: false }).error;
  };

const findOne = (id) => {
    return db
      .query('SELECT * FROM event WHERE id_event = ?', [id])
      .then(([results]) => results[0]);
  };

const findAllByCategory=(category) =>{
    let sql="SELECT * FROM event WHERE id_cat = ?";
    const sqlArray=[category];
    return db
        .query(sql, sqlArray)
        .then(([result]) => result[0])
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const findAllRelatedToUser= (userId) => {
    return db
        .query("SELECT * FROM view_event_user WHERE id_users = ?", [userId])
        .then(([results]) => results)
        .catch((err) => {
            console.log(err);
            return err;
        })
    
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

const associateWithUser = (idEvent, idUser) => {
    return db
        .query('INSERT INTO event_to_user  (id_event, id_user) VALUES (?, ?)', [idEvent, idUser])
        .then(([result]) => {
            return {idEvent, idUser};
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

module.exports = {
    validate,
    findAllByCategory,
    findOne, 
    create,
    associateWithUser,
    findAllRelatedToUser
}