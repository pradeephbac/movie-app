var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
var port = process.env.PORT || 8000
server.listen(port, function () {
    console.log("App is running on port " + port);
});
app.use(express.static("./"));
app.use("/node_modules", express.static('node_modules'));
app.use("/public", express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
