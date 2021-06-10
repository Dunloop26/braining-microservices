const DB_REDIS = require('../db/redis');
const generateToken = require('../helpers/generator-token');
const registerToken = require('../helpers/register-refresh-token');
const deleteToken = require('../helpers/delete-refresh-token');
const signingKey = require('../config/keys');


let refreshToken = (req, res) => {

  DB_REDIS.hgetall(req.cookies.token, (err, obj) => {

    if (err) {
      return res.status(500).json({ auth: false });
    }

    if (obj != null) {

      if (obj.scode == req.body.scode) {

        let token = generateToken(
          { id_student: obj.id_student }, signingKey.SIGNING_KEY,
          new Date().getTime() + (2 * 60 * 1000)
          );

        deleteToken(req.cookies.token);
        let refresh = registerToken(obj.id_student);
        let cookieConfig = {
          domain: 'localhost', path: '/refresh', secure: false,
          expires: new Date(Date.now() + 300000), httpOnly: true
        }

        return res.status(200).cookie('token', refresh.token, cookieConfig)
                              .json(
                                { status: 'Successful Refresh', token: token, 
                                scode: refresh.scode, auth: true }
                                );
      } else {
        return res.status(401).json({ auth: false })
      }
    }
    return res.status(401).json({ auth: false });
  });
}


module.exports = {
  refreshToken
}
