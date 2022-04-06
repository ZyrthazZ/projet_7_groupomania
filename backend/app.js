//Imports

var express = require('express');
var bodyParser = require('body-parser');
var usersRouter = require("./routes/usersRouter");
var postsRouter = require("./routes/postsRouter");
var likesRouter = require("./routes/likesRouter");
const dotenv = require('dotenv');


//Set path to file app.env
dotenv.config({
    path: "app.env"
});

//Instantiate application
var app = express();

//Body-Parser configuration
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Middleware dealing with the CORS errors (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    //Accepte les requêtes depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    //Accepte les requêtes comprenant certains headers
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //Accepte d'envoyer des requêtes avec des verbes HTTPS spécifiques
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Call the routes
app.use("/api/", usersRouter);
app.use("/api/", postsRouter);
app.use("/api/", likesRouter);


//Exports

module.exports = app;