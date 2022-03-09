const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        name: Joi.string().max(255).presence(presence),
    }).validate(data, { abortEarly: false }).error;
}

const getAll = () => {
    return db
        .query("SELECT id_theme, name FROM theme ORDER BY name")
        .then(([result]) => result)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const findOne = (id) => {
    return db
        .query("SELECT id_theme, name FROM theme WHERE id_theme=?", [id])
        .then(([result]) => result[0])
        .catch((err) => {
            console.log(err)
            return err;
        });
}

const destroyByResource = (id) => {
    return db
        .query("DELETE FROM theme_to_ressources WHERE id_ressource=?", [id])
        .then(([result]) => result.affectedRows)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const create = ({name}) =>{
    return db
        .query("INSERT INTO theme (name) VALUES(?)",[name])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const add_RessourceTheme=(id_resource,id_theme)=>{
    return db
        .query("INSERT INTO theme_to_ressources (id_theme,id_ressource) VALUES(?,?)",[id_theme,id_resource])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}  

const update=(id,{name})=>{
    return db
        .query('UPDATE theme SET name=? WHERE id_theme=?',[name,id])
        .then(([result])=>{
            return result.affectedRows!==0
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const destroy=(id)=>{
    return db
        .query("DELETE FROM theme WHERE id_theme=?",[id])
        .then(([result])=>{
           return result.affectedRows!==0
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

    module.exports = {
        getAll,
        destroyByResource,
        findOne,
        create,
        update,
        destroy,
        validate,
        add_RessourceTheme
    }