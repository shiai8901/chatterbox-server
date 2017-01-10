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
var port = 3000;
var ip = '127.0.0.1';
var serverUrl = 'http://127.0.0.1:3000/classes/messages';
// the data stored in the server
var data = [];

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.


  var headers = request.headers;
  var method = request.method;
  var url = ''.concat('http://', ip, ':', port, request.url);
  var results = [];

  var result = {
    headers: headers,
    method: method,
    url: url,
    results: data,
  };

  if (url !== serverUrl) {
    response.writeHead(404, {'Content-type': 'text/plain'});
    response.end();
  } else if (method === 'GET') {
      response.writeHead(200, {'Content-type': 'text/plain'});
      response.end(JSON.stringify(result));
  } else if (method === 'POST') {
    if (url === serverUrl) {    
      var requestBody = '';
      request.on('data', function(data) {
        response.writeHead(201, {'Content-Type': 'text/plain'});
        requestBody += data;
        response.end();        
      });
      request.on('end', function() {
        var message = JSON.parse(requestBody);
        data.push(message); 
        response.writeHead(201, {'Content-Type': 'text/plain'});
        response.end();
      });
    }
  } else if (method === 'OPTIONS') {
    result.headers = defaultCorsHeaders;
  }

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //


  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
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
