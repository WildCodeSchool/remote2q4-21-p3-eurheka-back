const connection = require("../db-config");
const Joi = require('joi');
const {userRole} =require('../utils/definitions');
const db = connection.promise();

/*const findOne = (id) => {
    return db
        .query("SELECT id_resource,id")
}*/

const findAllByCategory = (level, category) => {
    const sqlArray = [];
    let sql="";
    if (level >= userRole.ADMIN) {
        sql = "SELECT id_resource, id_cat, name, path FROM resource WHERE id_cat=?";
        sqlArray.push(category);
    }
    else {
        sql = "SELECT id_resource, id_cat, name, path FROM resource WHERE id_cat=? AND visibility=1";
        const sqlArray = [];
        sqlArray.push(category);
        if (level > 1) {
            sql += " OR visibility=?";
            sqlArray.push(level);
        }
    }
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

module.exports = {
    findAllByCategory,
    findAllByCategoryAdmin,
}