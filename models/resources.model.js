const connection = require("../db-config");
const Joi = require('joi');
const {userRole} =require('../utils/definitions');
const db = connection.promise();

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        visibility: Joi.number().integer().presence(presence),
        name: Joi.string().max(255).presence(presence),
        id_cat:Joi.number().integer().presence(presence),
        path: Joi.string().max(255).presence(presence)
    }).validate(data, { abortEarly: false }).error;
}

const validateTheme=(data) => {
    const presence = 'required';
    return Joi.object({
        idTheme: Joi.number().integer().presence(presence),
        checked: Joi.boolean().presence(presence),
        themeName: Joi.string().max(255).presence('optional'),
    }).validate(data, { abortEarly: false }).error;
}

const findOne=(id)=>{
    return db
        .query("SELECT id_resource FROM resource WHERE id_resource=?",[id])
        .then(([result])=>{ 
            return result[0]})
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const findOneAdmin = (id) => {
    return db
        .query("SELECT id_resource,id_cat, name, path, visibility, id_theme, themename, name_resource_category FROM view_resource_theme WHERE id_resource= ?",[id])
        .then(([result])=>{return result})
        .catch((err) => {
            console.log(err);
            return err;
        });
}


const findAllByCategory = (level, category) => {
    console.log(category);
    const sqlArray = [];
    let sql="";
    if (level >= userRole.ADMIN) {
        sql = "SELECT id_resource, id_cat, name, path FROM resource WHERE id_cat=?";
        sqlArray.push(category);
    }
    else {
        sql = "SELECT id_resource, id_cat, name, path FROM resource WHERE (id_cat=? AND visibility=1)";
        sqlArray.push(category);
        if (level > 1) {
            sql += " OR (id_cat=? AND visibility=?)";
            sqlArray.push(category);
            sqlArray.push(level);
        }
    }
    console.log(sql);
    return db
        .query(sql, sqlArray)
        .then(([result]) => result)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const findAllByCategoryAdmin = (category) => {
    let sql = "SELECT id_resource, id_cat, name,visibility, path FROM resource WHERE id_cat=?";
    return db
        .query(sql, [category])
        .then(([result]) => result)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const update=(data,id)=>{
    return db
        .query("UPDATE resource SET ? WHERE id_resource=?",[data,id])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const destroy=(id)=>{
    
    return db
        .query("DELETE FROM resource WHERE id_resource=?",[id])
        .then(([result])=>result.affectedRows)
        .catch((err) => {
            console.log(err);
            return err;
        });
}

const create=({visibility,name,id_cat,path})=>{
    return db
        .query("INSERT INTO resource (id_cat,name,path,visibility) VALUES (?,?,?,?)",[id_cat,name,path,visibility])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

module.exports = {
    findAllByCategory,
    findAllByCategoryAdmin,
    findOneAdmin,
    destroy,
    validate,
    validateTheme,
    findOne,
    update,
    create
}