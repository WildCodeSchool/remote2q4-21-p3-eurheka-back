const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      category: Joi.number().integer().presence(presence),
      name: Joi.string().max(200).presence(presence),
      date: Joi.string().isoDate().presence(presence)
    }).validate(data, { abortEarly: false }).error;
  };

const validateRDV=(data)=>{
    return Joi.object({
        is_valid : Joi.boolean().presence('required')
    }).validate(data, { abortEarly: false }).error;
}

const validateCategory=(data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      category_name: Joi.string().min(1).max(200).presence(presence),
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

const findAllForAdmin=()=>{
    return db
        .query("SELECT e.id_event,e.name,e.date_event,c.category_name FROM event e INNER JOIN category_events c ON e.id_cat=c.id_category WHERE id_cat!=1 ORDER BY e.date_event DESC")
        .then(([result])=>{
            return result;
        })
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

const getAllCat=()=>{
    return db
        .query("SELECT id_category, category_name FROM category_events ORDER BY category_name")
        .then(([result])=>{
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const getOneCat=(id)=>{
    return db
        .query("SELECT id_category, category_name FROM category_events WHERE id_category=? ORDER BY category_name",[id])
        .then(([result])=>{
            return result[0];
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const addCategory=({category_name})=>{
    return db
        .query("INSERT INTO category_events (category_name) VALUES(?)",[category_name])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const updateCategory=({category_name},id)=>{
    return db
        .query("UPDATE category_events SET category_name=? WHERE id_category=?",[category_name,id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const deleteCategory=(id)=>{
    return db
        .query("DELETE FROM category_events WHERE id_category= ?",[id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const deleteEvent=(id)=>{
    return db
        .query("DELETE FROM event WHERE id_event=?",[id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const removeDependancies=(id)=>{
    return db
        .query("DELETE FROM event_to_user WHERE id_event=?",[id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const updateRDV=({is_valid},id,userId)=>{
    return db
        .query("UPDATE event_to_user SET is_valid=? WHERE (id_event=? AND id_user=?)",[is_valid,id,userId])
        .then(([result])=>{
            return result.affectedRows!==0
        })
        .catch((err) => {
            console.error(err);
            return err;
        })
}

const findLastWhithoutRDV=()=>{
    return db
        .query("SELECT id_event,name, date_eventFR,category_name FROM view_event_display WHERE date_event>=now() ORDER BY date_event asc")
        .then(([result])=>{
            return result[0];
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
    findAllRelatedToUser,
    getAllCat,
    getOneCat,
    validateCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    findAllForAdmin,
    deleteEvent,
    removeDependancies,
    validateRDV,
    updateRDV,
    findLastWhithoutRDV
}