const DB_PG = require('../db/db');


let registerGroup = (req,res) => {

    DB_PG('groups').insert({ id_teacher: req.body.idTeacher, group: req.body.group,
        grade: req.body.grade, modality: req.body.modality, goal: req.body.goal,
        days_goal: req.body.daysGoal, recipients_report: req.body.recipientsReport
    }).then( function(){return res.status(200).send({ status: 'Successful registration'});
    }).catch(function(){return res.status(500).json({status: 'Something is wrong'});
 })
}


module.exports = {
    registerGroup
}