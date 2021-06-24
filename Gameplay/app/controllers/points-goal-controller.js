const DB_PG = require('../db/pg');

 function pointsGoal (req,res)  {
   console.log("llego request");
   DB_PG('weekly').select('points_goal').where('id_student', idStudent)
   .then((rows) => {

     if (rows.length > 0) {



       return res.status(200).json({ pointsGoal: rows[0].points_goal});

     }

     return res.status(403).json({status: 'Something is wrong'})



   }).catch(function(error){return res.status(500).json({status: error.stack});
   })

};


module.exports = {
  pointsGoal
}
