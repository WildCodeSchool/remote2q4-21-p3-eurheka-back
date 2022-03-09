const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const findAll = () => {
    return db
        .query("SELECT u.firstname, u.lastname, u.email, cv.path FROM users as u INNER JOIN cv_to_user as t ON id_user=u.id_users INNER JOIN cv ON cv.id_cv=t.id_cv")
        .then(([result]) => result)
        .catch((err) => {
            console.error(err);
            return err;
        });
}

module.exports = {
    findAll
}