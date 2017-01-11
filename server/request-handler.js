/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/ 

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var fs = require('fs');

var port = 3000;
var ip = '127.0.0.1';
var serverUrl = 'http://127.0.0.1:3000/classes/messages';
var data = [];

// var requestHandler = function(request, response) {

//   var headers = request.headers;
//   var method = request.method;
//   var url = ''.concat('http://', ip, ':', port, request.url, 'classes/messages');
//   var results = [];

//   var result = {
//     headers: headers,
//     method: method,
//     url: url,
//     results: data,
//   };

//   if (url !== serverUrl) {
//     response.writeHead(404, {'Content-type': 'application/json'});
//     response.end();
//   } else if (method === 'GET') {   
//     response.writeHead(200, {'Content-type': 'application/json'});
//     response.end(JSON.stringify(result));
//   } else if (method === 'POST') {
//     var requestBody = '';
//     request.on('error', function(err) {
//       console.error(err);
//     });
//     request.on('data', function(data) {
//       response.writeHead(201, {'Content-Type': 'application/json'});
//       requestBody += data;
//       response.end();        
//     });
//     request.on('end', function() {
//       var message = JSON.parse(requestBody);
//       data.push(message); 
//       response.writeHead(201, {'Content-Type': 'application/json'});
//       response.end();
//     });
//   } else if (method === 'OPTIONS') {
//     result.headers = defaultCorsHeaders;
//   }

// };
var requestHandler = function(request, response) {

  var headers = request.headers;
  var method = request.method;
  var url = ''.concat('http://', ip, ':', port, request.url, 'classes/messages');
  var results = [];

  var result = {
    headers: headers,
    method: method,
    url: url,
    results: data,
  };
  console.log('request url: ', request.url);
  console.log('url: ', url);
  console.log('serverUrl: ', serverUrl);
  var writeStrem = fs.createWriteStream('./output');
  if (url !== serverUrl) {
    console.log('Got ya!');
    response.writeHead(404, {'Content-type': 'application/json'});
    response.end();
  } else if (method === 'GET') {   
    response.writeHead(200, {'Content-type': 'application/json'});
    response.end(JSON.stringify(result));
  } else if (method === 'POST') {
    var requestBody = '';
    request.on('error', function(err) {
      console.error(err);
    });
    request.on('data', function(data) {
      response.writeHead(201, {'Content-Type': 'application/json'});
      requestBody += data;
      response.end();        
    });
    request.on('end', function() {
      var message = JSON.parse(requestBody);
      console.log(message);
      data.push(message); 
      response.writeHead(201, {'Content-Type': 'application/json'});
      response.end();
    });
  } else if (method === 'OPTIONS') {
    result.headers = defaultCorsHeaders;
  }

};
// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;
