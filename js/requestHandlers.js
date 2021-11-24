"use strict";
const fs = require("fs");
const formid = require("formidable");
const http = require('http');
const xml2js = require('xml2js');
const processData = require('./processData');


//Handle start request
function reqStart(response, request, pathName) {
    console.log("Request handler 'reqStart' was called");
    fs.readFile("./html/index.html", function (error, data) {
        if (error) {
            console.log("Error");
            response.writeHead(404, {
                "Content-Type": "text/html"
            });
            response.write("404 not found \n");
            response.end();
        }
        else if (data) {
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            response.write(data);
            response.end();
        }
    });
}

//Handle JavaScript request
function reqJs(response, request, pathName) {
    console.log("Request handler 'reqJs' was called");
    fs.readFile("." + pathName, function (error, data) {
        if (error) {
            console.log("JavaScript read error");
        } else if (data) {
            response.writeHead(200, {
                "Content-Type": "text/javascript"
            });
            response.write(data);
            response.end();
        }
    });
}

//Handle CSS request
function reqCss(response, request, pathName) {
    console.log("Request handler 'reqCss' was called");
    fs.readFile("." + pathName, function (error, data) {
        if (error) {
            console.log("CSS read error");
        } else if (data) {          
            response.writeHead(200, {
                "Content-Type": "text/css"
            });
            response.write(data);
            response.end();
        }
    });
}

//Handle XML request
function reqXml(response, request, pathName) {
    console.log("Request handler 'reqXml' was called");
    var form = new formid.IncomingForm();
    //Parse form
    form.parse(request, function (error, field, file) {
        if (error) {
            console.log("Error");
        } else {
            var selectedYear = field.year;
            var selectedStartM = field.start;
            var selectedEndM = field.end;

            //XML URL link
            var fileURL = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + selectedYear + '.xml';

            //Retrieve XML from link provided
            http.get(fileURL, function (urlRes) {
                console.log("Requesting " + selectedYear + ".xml...");
                var data = '';
                var parser = new xml2js.Parser();

                urlRes.on('data', function (chunk) {
                    data += chunk;
                });

                urlRes.on('end', function () {
                    //Parser for xml2js
                    parser.parseString(data, function (xmlError, result) {
                        if (xmlError) {
                            throw xmlError;
                        } else if (result) { //Get result of parsed xml obj

                            //Shorten Object
                            var records = result.weather.record;

                            //Send response back
                            response.writeHead(200, {"Content-Type": "text/json"});
                            response.write(processData.processXML(records, selectedStartM, selectedEndM, selectedYear));
                            response.end(console.log("Requested data retrieved"));
                        }
                    });
                });
            })
            .on('error', function (err) {
                console.log("Error");
            });
        }
    });
}

//Handle JSON request
function reqJson(response, request, pathName) {
    console.log("Request handler 'reqJson' was called");
    var form = new formid.IncomingForm();
    //Parse form
    form.parse(request, function (error, field, file) {
        if (error) {
            console.log("Error");
        } else {
            var selectedYear = field.year;
            var selectedStartM = field.start;
            var selectedEndM = field.end;

            //XML URL link
            var fileURL = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + selectedYear + '.json';
            
            //Retrieve XML from link provided
            http.get(fileURL, function (urlRes) {
                console.log("Requesting " + selectedYear + ".json...");
                var data = '';

                urlRes.on('data', function (chunk) {
                    data += chunk;
                });

                urlRes.on('end', function () {

                    //Parse JSON data
                    var resultJson = JSON.parse(data);

                    //Shorten Object
                    var records = resultJson.weather.record;

                    //Send response back
                    response.writeHead(200, {"Content-Type": "text/json"});
                    response.write(processData.processJSON(records, selectedStartM, selectedEndM, selectedYear));
                    response.end(console.log("Requested data retrieved"));
                });
            })
            .on('error', function (err) {
                console.log("Error");
            });
        }
    });
}

//Handle errors
function reqError(response, request, pathName) {
    response.writeHead(404, {
        "Content-Type": "text/html"
    });
    response.write("404 error not found\n");
    response.end();
    console.log("Error");
}

//Export functions
exports.reqJs = reqJs;
exports.reqCss = reqCss;
exports.reqStart = reqStart;
exports.reqError = reqError;
exports.reqXml = reqXml;
exports.reqJson = reqJson;