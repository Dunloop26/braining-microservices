const DB_PG = require('../db/db');
var path = require('path');

let getAvatarCombination = (req,res) =>  {
  //console.log(id);

  DB_PG('avatar').
    select('cloth', 'front_hair', 'back_hair', 'head', 'eyes', 'mouth').where('id_student', idStudent)
  .then(rows => {
    if (rows.length > 0) {
      return res.status(200).json({ 
        cloth: rows[0].cloth, frontHair: rows[0].front_hair, backHair: rows[0].back_hair, 
        head: rows[0].head, eyes: rows[0].eyes, mouth: rows[0].mouth});
    }
    return res.status(500).json({status: 'Something is wrong'})
  })
  .catch(function(){return res.status(500).json({status: 'Something is wrong'});
})
}

let getAvatarPart = (req,res) =>  {
  const part = req.params.part;
  const id = req.params.id;
  console.log("part:", part);
  console.log("id:", id);

  const basePath = `/../static/user/${part}/${id}.svg`;
  
  return  res.download(path.join(__dirname + basePath));

}


module.exports = {
  getAvatarCombination,
  getAvatarPart
}
