//IMPORTS 

const http = require('http');
const app = require('./app');


//Seek the PORT in the app.env file
const port = process.env.PORT;
app.set('port', port);

//Seek for different errors
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//Instantiate server
const server = http.createServer(app);

server.on('error', errorHandler);

//eventListener recording on which port the server in actually running
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
    console.log('Server is listening !');
});

server.listen(port);