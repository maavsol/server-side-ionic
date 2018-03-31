require('dotenv').config();
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const auth = require('./routes/auth-routes');
const user = require('./routes/user-routes');
const address = require('./routes/address-routes');
const restaurant = require('./routes/restaurant-routes');
const order = require('./routes/order-routes');

const app = express();

require('./config/database');

const whitelist = ['http://localhost:8100'];
const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
//  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { httpOnly: true, maxAge: 60 * 60 * 24 * 365 },
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

require('./passport')(app);

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/address', address);
app.use('/api/restaurant', restaurant);
app.use('/api/order', order);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
