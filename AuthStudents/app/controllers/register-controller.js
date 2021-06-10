const DB_PG = require('../db/pg');
const bcrypt = require('bcryptjs');


let register = (req,res) => {

    let hashPass = bcrypt.hashSync(req.body.pass, 8);
    DB_PG('students').insert({ 
        student: req.body.student, code_school:req.body.code_school,
        pass:hashPass, name:req.body.name, last_name:req.body.last_name, 
        gender:req.body.gender, type_document:req.body.type_document, document:req.body.document,
        birthdate:req.body.birthdate
    }).then( function(){return res.status(200).json({ status: 'Successful registration'});
    }).catch(function(){return res.status(500).json({status: 'Something is wrong'});
 })

}


module.exports = {
    register
}