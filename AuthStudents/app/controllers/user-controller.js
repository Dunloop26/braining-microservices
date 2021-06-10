const DB_PG = require('../db/pg');


let name = (req, res) => {

  DB_PG('students').select('name', 'last_name').where('id_student', idStudent)
    .then(rows => {
      if (rows.length > 0) {

        return res.status(200).json({ status: 'Successful', name: rows[0].name, lastName: rows[0].last_name});

      }
      return res.status(401).send(
        { status: 'failed' }
      );
    }).catch(function (err) {
      return res.status(500).json(
        { status: err.stack, auth: false, token: null }
      );
    });
}


module.exports = {
  name
}
