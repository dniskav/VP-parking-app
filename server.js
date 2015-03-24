var app = require('./app');
var http = require('http');

var port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
var io = require('socket.io')(server);

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

io.on('connection', ioConnection);

function ioConnection(socket) {
  console.log('a user connected');
}

function onError(error) {

}

function onListening() {
  console.log('Listening on port ' + server.address().port);
}