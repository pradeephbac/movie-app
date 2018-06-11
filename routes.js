var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    _ = require('lodash'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://admin:test1234@ds255320.mlab.com:55320/yamovies";


var port = process.env.PORT || 8080
server.listen(port, function () {
    console.log("App is running on port " + port);
});
app.use(express.static("./"));
app.use("/node_modules", express.static('node_modules'));
app.use("/public", express.static('public'));

app.get('/getAllMovies', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('yamovies');
        db.collection('movies').find({}).toArray()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});

app.get('/getMovies', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('yamovies');
        db.collection('movies').find({"is_main":false}).toArray()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});

app.get('/getMainMovies', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        var db = client.db('yamovies');
        db.collection('movies').find({"is_main":true}).toArray()
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    });
});