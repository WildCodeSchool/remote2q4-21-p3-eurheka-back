const connection = require("../db-config");
const Joi = require('joi');

const db = connection.promise();

const validate= (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
        path: Joi.string().max(255).presence(presence),
        name: Joi.string().max(255).presence(presence),
        id_user:Joi.number().integer().presence(presence),
        id_type:Joi.number().integer().presence(presence)
    }).validate(data, { abortEarly: false }).error;
}

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

const create=(name,path)=>{
    return db
        .query("INSERT INTO job_offer (path,name) VALUES(?,?)",[path, name])
        .then(([result])=>{
            return result.insertId;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const addJobToCat=(jobOfferId,id_type)=>{
    return db
        .query("INSERT INTO offer_type_to_job (id_job,id_type) VALUES (?,?)",[jobOfferId,id_type])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const addJobToUser=(jobOfferId,idUser,owner)=>{
    return db
        .query("INSERT INTO job_to_user (id_job,id_user,is_owner) VALUES (?,?,?)",[jobOfferId,idUser,owner])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const deleteJobUser=(idJob)=>{
    return db
        .query("DELETE FROM job_to_user WHERE id_job=?",[idJob])
        .then(([result])=>{
            return result.affectedRows!==0;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const deleteJobType=(idJob)=>{
    return db
    .query("DELETE FROM offer_type_to_job WHERE id_job=?",[idJob])
    .then(([result])=>{
        return result.affectedRows!==0;
    })
    .catch((err)=>{
        console.log(err);
        return err;
    })
}

const deleteJob=(idJob)=>{
    return db
    .query("DELETE FROM job_offer WHERE id_job_offer=?",[idJob])
    .then(([result])=>{
        return result.affectedRows!==0;
    })
    .catch((err)=>{
        console.log(err);
        return err;
    })
}

const getAdminJob=()=>{
    return db
        .query("SELECT id_job,name, path,name_offer FROM view_admin_job")
        .then(([result])=>{
            return result;
        })
        .catch((err)=>{
            console.log(err);
            return err;
        })
}

const getCount=()=>{
    return db
        .query("SELECT COUNT(*) as nb FROM job_offer")
        .then(([result])=>{
            return result[0];
        })

}

module.exports = {
    getOfferTypeAll,
    validate,
    create,
    addJobToCat,
    addJobToUser,
    deleteJobUser,
    deleteJobType,
    deleteJob,
    getAdminJob,
    getCount,
}