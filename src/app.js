// default modules by node js
import path from 'node:path';

// our installed modules
import 'dotenv/config';
import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';


// our own created modules
import { authRouter } from './api/v1/features/auth/index.js';
import errorHandler from './api/common/middlewares/error.middleware.js';
import notFoundHandler from './api/common/middlewares/notFound.middleware.js';
import setLastVisit from './api/common/middlewares/lastVisit.middleware.js';
import config from './config/config.js';

const app = express();

// session configuration
const { sessionSecret, sessionTimeOut } = config;
app.use(
  session({
    secret: sessionSecret,
    saveUninitialized: false, // don't create session until something stored
    resave: false, // don't save session if unmodified
    cookie: {
      secure: "auto",
      httpOnly: true,
      maxAge: sessionTimeOut,
    },
  })
);


app.use(express.static('public'));


// this will help us to read req.body if coming request is in urlencoded or json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add cookie parser middleware to interact with cookies
app.use(cookieParser());




// set-up for template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('src', 'views'));
app.use(expressEjsLayouts);

// to set last visit in cookie
app.use(setLastVisit);

// set route
app.get('/', (req, res) => {
  return res.status(200).render('landing');
});
// routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/jobs');

// Middleware to handle 405(not allowed) error
// Api end point not found
app.use('*', notFoundHandler);

// always app level error handler will be last
app.use(errorHandler);

export default app;
