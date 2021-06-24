const DB_PG = require('../db/pg');

 function yields (req,res)  {
  let sumMath; let sumSci; let sumSpa; let sumEng;
  let yieldMath = 0; let yieldSci = 0; let yieldSpa = 0; let yieldEng = 0;
  DB_PG('yields').select('right_mathematics',
                          'wrong_mathematics',
                          'right_sciences',
                          'wrong_sciences',
                          'right_spanish',
                          'wrong_spanish',
                          'right_english',
                          'wrong_english').where('id_student', idStudent)
  .then((rows) => {

    if (rows.length > 0) {

      sumMath = rows[0].right_mathematics + rows[0].wrong_mathematics;
      if (sumMath != 0){
        yieldMath = Math.round(rows[0].right_mathematics/sumMath*100);
      }

      sumSci = rows[0].right_sciences + rows[0].wrong_sciences;
      if (sumSci != 0){
        yieldSci = Math.round(rows[0].right_sciences/sumSci*100);
      }

      sumSpa = rows[0].right_spanish + rows[0].wrong_spanish;
      if (sumSpa != 0){
        yieldSpa = Math.round(rows[0].right_spanish/sumSpa*100);
      }

      sumEng = rows[0].right_english + rows[0].wrong_english;
      if (sumEng != 0){
        yieldEng = Math.round(rows[0].right_english/sumEng*100);
      }


      return res.status(200).json({ yieldMath: yieldMath, yieldSci: yieldSci,
                                    yieldSpa: yieldSpa, yieldEng: yieldEng});

    }

    return res.status(500).json({status: 'Something is wrong'})



  }
  )


  .catch(function(error){return res.status(500).json({status: error.stack});
})

};


module.exports = {
  yields
}
