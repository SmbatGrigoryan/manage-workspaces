const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();

const applyPassportStrategy = require('./config/passport');
applyPassportStrategy(passport);

const usersRouter = require('./routes/users');
const workspacesRouter = require('./routes/workspaces');

const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Authorization, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
  next();
});

app.use(
  cors({ origin: process.env.FRONTEND_URL })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/api/v1/users', usersRouter);
app.use('/api/v1/workspaces', workspacesRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log(req)
  next(createError(404));
});


if (process.env.NODE_ENV !== 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '.', 'frontend', 'build', 'index.html'));
  });

}

module.exports = app;


