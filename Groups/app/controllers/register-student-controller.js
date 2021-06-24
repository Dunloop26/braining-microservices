const DB_PG = require('../db/db');


let registerStudent = (req,res) => {
    DB_PG('groups_students').insert({ id_student: req.body.idStudent, group: req.body.group,
        id_teacher: req.body.idTeacher
    }).then( function(){return res.status(200).send({ status: 'Successful registration'});
    }).catch(function(){return res.status(500).json({status: 'Something is wrong'});
 })
}


module.exports = {
    registerStudent
}