const DB_PG = require('../db/db');
const avatarDefault = require('../helpers/avatar-default');


let register = (req,res) => {
    combination = avatarDefault(req.body.gender);
    DB_PG('avatar').insert({ id_student: req.body.id_student, eyes: combination.eyes, nose: combination.nose,
        mouth: combination.mouth
    }).then( function(){return res.status(200).send({ status: 'Successful registration'});
    }).catch(function(){return res.status(500).json({status: 'Something is wrong'});
 })
}


module.exports = {
    register
}