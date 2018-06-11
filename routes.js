var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    _ = require('lodash'),
    MongoClient = require('mongodb').MongoClient,
    URL = process.env.PROD_DB_URL || "mongodb://admin:test1234@ds031701.mlab.com:31701/yamovies-dev",
    DB = process.env.PROD_DB || "yamovies-dev",
    MOVIES_COLLECTION = "movies";

var port = process.env.PORT || 8080
server.listen(port, function () {
    console.log("App is running on port " + port);
});
app.use(express.static("./"));
app.use("/node_modules", express.static('node_modules'));
app.use("/public", express.static('public'));

app.get('/getAllMovies', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        var db = client.db(DB);
        db.collection(MOVIES_COLLECTION).find({}).toArray()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});

app.get('/getMovies', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        console.log(DB)
        var db = client.db(DB);
        db.collection(MOVIES_COLLECTION).find({ "is_main": false }).toArray()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});

app.get('/getMainMovies', function (req, res) {
    MongoClient.connect(URL, function (err, client) {
        var db = client.db(DB);
        db.collection(MOVIES_COLLECTION).find({ "is_main": true }).toArray()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});