const DB_PG = require('../db/db');
const path = require('path');





let getQuestionsImages = (req,res) =>  {
    const idImg = req.params.id;
    console.log(idImg, 6666666);
    const basePath = `/../static/questions/${idImg}`;
    return  res.download(path.join(__dirname + basePath));
  
  }
  

module.exports = {
    getQuestionsImages
}