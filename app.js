var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var expressLayouts = require('express-ejs-layouts');

//bodyparser setup
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

//passport setup
app.use(session({secret: 'MYS3CR3TK3Y', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', './Views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

//models for the database
var models = require('./models');
//routes
var index = require('./routes/index');
const { fstat } = require('fs');
app.use('/', index);

//sync db
models.sequelize.sync().then(function(){
	console.log("Database setup!");
}).catch(function(err){
	console.log(err);
});

//run app
https.createServer({
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem'),
	passphrase: '7@kers2323!'
}, app).listen(3000);
