const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const register = require('./routes/register'); 
const auth = require('./routes/auth'); 
const refresh = require('./routes/refresh'); 
const user = require('./routes/user'); 

const app = express()
  .use(cors({credentials: true, origin: 'http://localhost:4200'}))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(bearerToken());

app.use('/register', register);
app.use('/auth', auth);
app.use('/refresh', refresh);
app.use('/user', user);


module.exports = app;
