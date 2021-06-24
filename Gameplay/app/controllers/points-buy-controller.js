const DB_PG = require('../db/pg');

 function pointsBuy (req,res)  {

  DB_PG('scores').select('points_buy').where('id_student', idStudent)
  .then((rows) => {

    if (rows.length > 0) {



      return res.status(200).json({ pointsBuy: rows[0].points_buy});

    }

    return res.status(403).json({status: 'Something is wrong'})



  }).catch(function(error){return res.status(500).json({status: error.stack});
})

};


module.exports = {
  pointsBuy
}
