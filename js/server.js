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
        console.log("Requested URL: " + request.url);
        var pathName = url.parse(request.url).pathname;
        console.log("Path: " + pathName);     

        //Download requested file
        var form = new formid.IncomingForm();
        form.parse(request, function (error, field, file) {
            if(error){
                console.log("Error");
            }
            else{
                var UI_year = field.year;
    
                if (UI_year >= 2007 && UI_year <= 2009){ //Download xml file for year 2007 to 2009
                    //Download directory
                    var DOWNLOAD_DIR ="../Assignment2/data/";
                    var file_name = UI_year + ".xml";
                    var file_url='http://it.murdoch.edu.au/~S900432D/ict375/data/' + UI_year + '.xml';
                    var file = fs.createWriteStream(DOWNLOAD_DIR + file_name,{'flags': 'w'});

                    http.get(file_url, function(urlRes){
                        //Download xml file
                        urlRes.pipe(file);
                        console.log("Data retrieved");
                    });
                }
                else{ //Download JSON file for year 2010 to 2016
                    console.log("Run download JSON functions");
                }
            }
        });

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