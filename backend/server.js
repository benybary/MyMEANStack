let express = require("express"),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),

dbConfig = require("./database/db");

// Create connection to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {useNewUrlParser:true})
.then(() =>{
    console.log("Database connected");
}, error => {
    console.log("Database could not connect" +error);    
});

// Setup port for express
const employeeRoute = require('../backend/routes/employee.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use('/api', employeeRoute);
//app.use(express.static(path.join(__dirname, 'myFiles/MyMEANStack')));

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, ()=> {
    console.log("Connected to port: " + port);   
});

// Find 404 if no page found
app.use((req, res, next)=>{
    next(createError(404, 'My page not found'));
});

// error handeling
app.use((req, res, error, next)=> {
    // Log error message in our server console
    console.error(error.message);
    // If error has no specified error code, set error code to 500 Internal server error
    if(!error.statusCode) error.statusCode = 500;
    // All http requests must have response, so we are sending the error with the status code
    res.status(error.statusCode).send(error.message);
});

