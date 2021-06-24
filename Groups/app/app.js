const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const baseUrl = '/api';


const registerGroup = require('./routes/register-group'); 
const registerStudent = require('./routes/register-student'); 
const daysGoal = require('./routes/days-goal'); 
const goal = require('./routes/goal'); 

const app = express()
  .use(cors({credentials: true, origin: 'http://localhost:4200'
}))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(bearerToken());

app.use(baseUrl, registerGroup);
app.use(baseUrl, registerStudent);
app.use(baseUrl, daysGoal);
app.use(baseUrl, goal);

module.exports = app;
