// Packages
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

// Routes
var student = require('routes/students');
var index = require('routes/index');
var tutors = require('routes/tutors')
var courses = require('routes/courses')
var companies = require('routes/companies')

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
app.use('/', tutors);
app.use('/', companies);
app.use('/', courses)
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

/*
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

unction ipcListeners() {
    ipcMain.on('requestLogin', function(event, value) {
        login(value);
    });
    ipcMain.on('requestRegister', function(event, value) {
        registerUser(value);
    });

     // Getting username for orders
    ipcMain.on('getUsername', function(event, value) {
        let username = usernameModule.getUsername();
        indexWindow.webContents.send('username', username);
    });
    //  Check if already logged in.. 
    ipcMain.on('check_login', function(event, value) {
        let bool = tokenModule.checkToken();
        indexWindow.webContents.send('is_logged_in', bool);
    });
    ipcMain.on('getComputers', function (event, value) {
        getComputers();
    });
    ipcMain.on('get_order', function (event, value) {
        console.log("get_order started..");
        getOrders();
    });

    ipcMain.on('getComputerByArticleNr', function (event, value){
        getComputerByArticleNr(value);
    }) ;

}
*/
