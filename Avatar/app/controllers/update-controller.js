const DB_PG = require('../db/db');


let updateAvatar = (req,res) => {
      DB_PG('avatar').where({id_student: idStudent}).update({eyes: req.body.avatarCombination.eyes, 
        nose: req.body.avatarCombination.nose, mouth: req.body.avatarCombination.mouth})
      .then( function(){return res.status(200).send({ status: 'Successful registration'});
      }).catch(function(err){return res.status(500).json({status: err.stack});
  })
}


module.exports = {
  updateAvatar
}