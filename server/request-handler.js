/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/ 
// all properties in request:
// key:  _readableState , value: undefined
// key:  readable , value: undefined
// key:  domain , value: undefined
// key:  _events , value: undefined
// key:  _eventsCount , value: undefined
// key:  _maxListeners , value: undefined
// key:  socket , value: undefined
// key:  connection , value: undefined
// key:  httpVersionMajor , value: undefined
// key:  httpVersionMinor , value: undefined
// key:  httpVersion , value: undefined
// key:  complete , value: undefined
// key:  headers , value: undefined
// key:  rawHeaders , value: undefined
// key:  trailers , value: undefined
// key:  rawTrailers , value: undefined
// key:  upgrade , value: undefined
// key:  url , value: undefined
// key:  method , value: undefined
// key:  statusCode , value: undefined
// key:  statusMessage , value: undefined
// key:  client , value: undefined
// key:  _consuming , value: undefined
// key:  _dumped , value: undefined
// key:  setTimeout , value: undefined
// key:  read , value: undefined
// key:  _read , value: undefined
// key:  destroy , value: undefined
// key:  _addHeaderLines , value: undefined
// key:  _addHeaderLine , value: undefined
// key:  _dump , value: undefined
// key:  push , value: undefined
// key:  unshift , value: undefined
// key:  isPaused , value: undefined
// key:  setEncoding , value: undefined
// key:  pipe , value: undefined
// key:  unpipe , value: undefined
// key:  on , value: undefined
// key:  addListener , value: undefined
// key:  resume , value: undefined
// key:  pause , value: undefined
// key:  wrap , value: undefined
// key:  setMaxListeners , value: undefined
// key:  getMaxListeners , value: undefined
// key:  emit , value: undefined
// key:  prependListener , value: undefined
// key:  once , value: undefined
// key:  prependOnceListener , value: undefined
// key:  removeListener , value: undefined
// key:  removeAllListeners , value: undefined
// key:  listeners , value: undefined
// key:  listenerCount , value: undefined
// key:  eventNames , value: undefined

var port = 3000;
var ip = '127.0.0.1';
// var urlPre = ''.concat(ip, ':', port);
var serverUrl = 'http://127.0.0.1:3000/classes/messages';
// the data stored in the server
var data = {
};

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


  var headers = defaultCorsHeaders;
  var method = request.method;
  var url = ''.concat('http://', ip, ':', port, request.url);
  console.log('url:', url);
  var results = [];
  // The outgoing status.
  var statusCode = 200;

  // on GET method, need to check the statusCode
  if (method === 'GET') {
    if (url !== serverUrl) {
      statusCode = 404;
    }
  } else if (method === 'POST') {
    statusCode = 201;
  }

  // See the note below about CORS headers.

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'text/plain';

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  response.writeHead(statusCode, headers);
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  var body = {
    headers: headers,
    method: method,
    url: url,
    results: results,
  };
  console.log('body: ', body);

  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  response.end(JSON.stringify(body));
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
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;
