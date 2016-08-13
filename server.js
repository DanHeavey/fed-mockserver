var express = require('express');
var url = require('url');
var app = express();
var fs = require('fs');
var appPort = 8081;

var requestHandler = function (req, res) {

    console.log(req.method);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

    if(req.url.indexOf('/') > -1 && req.url.indexOf('.') === -1) {
        console.log(req.url);
        req.url = req.url.replace('/api/', '');
        //req.url = req.url.replace(/ap.+\//, '');
        req.url = req.url.slice(req.url.indexOf('/'), req.url.length);
        console.log(req.url)

    }

    if(req.url.indexOf('?') > -1){
        req.url = req.url.slice(0, req.url.indexOf('?'));
        //req.url = req.url.replace('?','');
    }
    var path = "";
    path = __dirname + '/json/' + req.url.toLowerCase() + ".json";

    fs.exists(path, function(exists) {
        if (exists) {
            console.log('file:' + path);
            res.sendFile(path);
        } else {
            console.log('could not find: ' + path);
            res.status(404).send('Not found');
        }
    });

};

var optionHandler = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.status(200).send('OK');
};

app.use(express.static(__dirname));
app.get('*', requestHandler);
app.post('*', requestHandler);
app.put('*', requestHandler);
app.delete('*', requestHandler);
app.options('*', optionHandler);

app.listen(appPort);

console.log("server started on port localhost:" + appPort);