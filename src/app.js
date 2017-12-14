// Packages
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

// Routes
var student = require('routes/student');
var index = require('routes/index');
var tutors = require('routes/tutor')
var courses = require('routes/courses')
var company = require('routes/company')
// Variables
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/internships', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use('/css', express.static(path.join(__dirname, '..', 'static/css')));
app.use('/js', express.static(path.join(__dirname, '..', 'static/js')));
app.use('/fonts', express.static(path.join(__dirname, '..', 'static/fonts')));
app.use('/media', express.static(path.join(__dirname, '..', 'static/media')));

// Add routes
app.use('/', student);

app.use('/', index);

app.use(function(req, res, next) {
	res.render('404');
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.listen(3000, function() {
    console.log('Server started');
});