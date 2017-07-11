// no es6 or jsx in this file please
'use strict';

var express = require('express');
var ws = express();

// map static path for serving application bundle to client
ws.use(express['static'](__dirname + '/public')); // localhost:8081/favicon.ico
ws.use('/public', express['static'](__dirname + '/public')); // localhost:8081/public/bundle.js

function listenOnPort(port) {
  ws.listen(port, function() {
    console.log('listening on port' + port);
  });
};

listenOnPort(8081);
