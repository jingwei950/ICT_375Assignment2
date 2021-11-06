"use strict";
//Import modules
const http = require('http');
const url = require('url');
const router = require('./router');

//Port number
// const serverPort = 40019;
const serverPort = 8080;

function startServer(route, handle){

    //Create Server, get pathname and pass it to function route()
    const server = http.createServer(function(request, response){   
        console.log("Requested URL: " + request.url);
        var pathName = url.parse(request.url).pathname;
        console.log("Path: " + pathName);
 
        //Call function route()
        route(pathName, request, response, handle);
    });

    //Listen to port
    server.listen(serverPort);

    //Display Message
    console.log('Server running at http://ceto.murdoch.edu.au:' + serverPort + ' Process ID: ' + process.pid);
}

//Export function startServer
exports.startServer = startServer;