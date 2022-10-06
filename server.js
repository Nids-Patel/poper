// PARSE .ENV
require('dotenv').config();

// Configuring the database
//require('./Configs/db.config.js');
const uri = process.env.MONGODBURI;

// GLOBAL SETTINGS FILES
require('./Configs/globals'); 

// NODE FRAMEWORK
const express = require('express'); 

const cors= require("cors");

// TO PARSE POST REQUEST
const bodyParser = require('body-parser'); 

// Importing express-session module
const session = require('express-session');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 8600;

app.use(cors())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(express.static(__dirname + '/Assets')); 

// Creating Session
app.use(session({secret: "Its a secret!", resave: true, saveUninitialized: true}));

// --------------------------    ROUTES    --------------------------

        // Require Users routes
        app.use("/" + process.env.API_VERSION_v1 + "/users", require('./Routes/v1/users'));

        // Require Roles routes
        app.use("/" + process.env.API_VERSION_v1 + "/roles", require('./Routes/v1/roles'));

        // Require User Address routes
        app.use("/" + process.env.API_VERSION_v1 + "/useradd", require('./Routes/v1/useradd'));

        // Require User Detail routes
        app.use("/" + process.env.API_VERSION_v1 + "/userdetail", require('./Routes/v1/userdetail'));

        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

// listen for requests
app.listen(port, () => {   
    console.log(`Server is listening on port ${port}`);
});
