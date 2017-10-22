// Dependencies
const express = require('express')
const contactRoute = require('./routers/contact');
const config = require('./config/secret');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const morgan = require('morgan');

//express
const app = express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(expressValidator());
app.use(session({
	secret : config.secret,
	resave : false,
	saveUninitialized: false,
	//store: new MongoStore()
}));
app.use(flash());

app.use(express.static(__dirname + '/public'));
app.use(contactRoute);

app.listen(config.port, () => {
	console.log(`server is listening on port ${config.port}`);
});