var express = require('express'),
    app = express(),
    server = require('http').createServer(app);

server.listen(8080);
app.use(express.static("./"));
app.use("/node_modules", express.static('node_modules'));
app.use("/public", express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
