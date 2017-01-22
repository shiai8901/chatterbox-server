/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var urlParser = require('url');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var data = {
  results: [],
};

var requestHandler = function(request, response) {

  var url = urlParser.parse(request.url).pathname;
  if (url.charAt(url.length - 1) === '/') {
    url = url.substring(0, url.length - 1);
  }
  console.log('url.pathname: ', url);
  var method = request.method;

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  if (url !== '/classes/messages') {
    headers['url'] = url;
    response.writeHead(404, headers);
    response.end();
  } else {
    if (request.method === 'GET') {
        response.writeHead(200, headers);
        response.end(JSON.stringify(data));
    } else if (request.method === 'POST') {
        var message = '';
        request.on('error', function(err) {
          console.log('Error to get messages from /classes/messages');
        });
        request.on('data', function(chunk) {
          message += chunk; // body is already a string
        });
        request.on('end', function() {
          data.results.push(JSON.parse(message)); // need the message to be an object
        });
        // console.log('data.results , after push: ', data.results);
        response.writeHead(201, headers);
        response.end();      
    } else if (request.method === 'OPTIONS') {
      console.log('OPTIONS');
      response.writeHead(200, headers);
      response.end();
    }
  }

};


// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.

exports.requestHandler = requestHandler;

