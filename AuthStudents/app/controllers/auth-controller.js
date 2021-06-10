const bcrypt = require('bcryptjs');
const DB_PG = require('../db/pg');
const DB_REDIS = require('../db/redis');
const generateToken = require('../helpers/generator-token');
const generateTokenResources = require('../helpers/generator-token-resources');
const registerToken = require('../helpers/register-refresh-token');
const deleteToken = require('../helpers/delete-refresh-token');
const signingKey = require('../config/keys');


let auth = (req, res) => {
  DB_PG('students').select('pass', 'id_student').where('student', req.body.student)
    .then(rows => {

      if (rows.length > 0) {

        if (!bcrypt.compareSync(req.body.pass, rows[0].pass)) {
          return res.status(401).send({ status: 'authentication failed', auth: false, token: null }
          );
        }

        DB_REDIS.scan('0', 'MATCH', `${rows[0].id_student}*`, function (err, obj) {
          if (obj[1].length > 0) {
            deleteToken(obj[1][0]);
          }
        });

        let token = generateToken(
                                  { id_student: rows[0].id_student }, signingKey.SIGNING_KEY,
                                  new Date().getTime() + (2 * 60 * 1000)
                                  );

        let tokenResources = generateTokenResources();
        let refresh = registerToken(rows[0].id_student);
        let cookieConfig = {
                            domain: 'localhost', path: '/refresh', secure: false,
                            expires: new Date(Date.now() + 300000), httpOnly: true
                          }

        return res.status(200).cookie('token', refresh.token, cookieConfig)
                              .json({ 
                                status: 'Successful authentication', tokenResources: tokenResources, 
                                token: token, auth: true, scode: refresh.scode 
                              });
      }

      return res.status(401).send(
        { status: 'authentication failed', auth: false, token: null }
      );
      
    }).catch(function (err) {
      return res.status(500).json(
        { status: err.stack, auth: false, token: null }
      );
    });
}


module.exports = {
  auth
}
