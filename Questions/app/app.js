const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const baseUrl = '/api';


const questions = require('./routes/questions');


const app = express()
  .use(cors({credentials: true, origin: 'http://localhost:4200'
}))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(bearerToken());

app.use(baseUrl, questions);


module.exports = app;
