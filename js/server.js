"use strict";
//Import modules
const http = require('http');
const url = require('url');
const router = require('./router');
const fs = require('fs');
const formid = require("formidable");

//Port number
// const serverPort = 40019;
const serverPort = 8080;

function startServer(route, handle){

    //Create Server, get pathname and pass it to function route()
    const server = http.createServer(function(request, response){   
        console.log("Requested path: " + request.url);
        var pathName = url.parse(request.url).pathname;     

        //Route function
        route(pathName, request, response, handle);
    });

    //Listen to port
    server.listen(serverPort);

    //Display Message
    console.log('Server running at http://ceto.murdoch.edu.au:' + serverPort + ' Process ID: ' + process.pid);
}

//Export function startServer
exports.startServer = startServer;