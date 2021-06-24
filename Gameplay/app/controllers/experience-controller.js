const DB_PG = require('../db/pg');

 function experience (req,res)  {

  DB_PG('scores').select('experience').where('id_student', idStudent)
  .then((rows) => {

    if (rows.length > 0) {



      return res.status(200).json({ experience: rows[0].experience});

    }

    return res.status(403).json({status: 'Something is wrong'})



  }).catch(function(error){return res.status(500).json({status: error.stack});
})

};


module.exports = {
  experience
}
