const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');
const cookieParser = require('cookie-parser');

const protocol = require('./sockets/protocol');

const baseUrl = '/api';

const register = require('./routes/register');
const yields = require('./routes/yields');
const pointsGoal = require('./routes/points-goal');
const experience = require('./routes/experience');
const pointsBuy = require('./routes/points-buy');


const app = express()
  .use(cors({
    credentials: true, origin: 'http://localhost:4200'
  }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(bearerToken());

app.use(baseUrl, register);
app.use(baseUrl, yields);
app.use(baseUrl, pointsGoal);
app.use(baseUrl, experience);
app.use(baseUrl, pointsBuy);


const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  },
  path: '/game'
});
io.on('connection', protocol)


module.exports = http;
