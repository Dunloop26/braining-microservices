const DB_PG = require('../db/pg');


async function register (req,res)  {
  DB_PG('yields').insert({ id_student: req.body.idStudent })

  .then(() =>
    DB_PG('weekly').insert({ id_student: req.body.idStudent })
  )

  .then(() =>
    DB_PG('scores').insert({ id_student: req.body.idStudent })
  )

  .then(() =>
    res.status(200).send({ status: 'Successful registration'})
  )

  .catch(function(error){return res.status(500).json({status: error.stack});
})

};


module.exports = {
  register
}
