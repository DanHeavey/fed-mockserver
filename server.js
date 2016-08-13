var express = require('express');
var url = require('url');
var app = express();
var fs = require('fs');
var appPort = 8081;


var requestHandler = function (req, res) {

    console.log(req.method);
    //var delayed = new DelayedResponse(req, res);

    //delayed.on('done', function (data) {
    //console.log(res);

    //res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});


    res.header("Access-CAontrol-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, emailaddress, partnername, tokenid");

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
    if(req.url.indexOf('.html') > -1) {

        if(req.method !== 'POST') {
            path = __dirname + '/html/' + req.url.toLowerCase();
        }else {
            path = __dirname + '/html/success.html';
            //res.status(200).send({});
        }

    } else {

        path = __dirname + '/json/' + req.url.toLowerCase() + ".json";
    }
    fs.exists(path, function(exists) {
        if (exists) {
            console.log('file:' + path);
            res.sendFile(path);
        } else {
            console.log('could not find: ' + path);
            res.status(404).send('Not found');
        }
    });

    //});
    //
    //delayed.wait(1000);

};

var optionHandler = function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, emailaddress, partnername, tokenid");
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