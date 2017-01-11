/* Import node's http module: */
var http = require('http');
var port = 3000;
var ip = '127.0.0.1';
var fs = require('fs');

var handleRequest = require('./request-handler');

var server = http.createServer(handleRequest.requestHandler);
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);


