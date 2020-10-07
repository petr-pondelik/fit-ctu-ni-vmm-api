#!/usr/bin/env node

/**
 * Module dependencies.
 */

import {app} from "../app";
import {Debug} from "debug";
import * as http from "http";
import {Server} from "http";

let debug: Debug = require("debug")('semestral-project:server');

/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT ?? '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
let server: Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address();
    let bind: string = '';

    if (addr !== null) {
        if (typeof addr === 'string') {
            bind = 'pipe ' + addr
        } else {
            bind = 'port ' + addr.port
        }
        console.debug('Listening on ' + bind);
    }
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
    let port: number = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}