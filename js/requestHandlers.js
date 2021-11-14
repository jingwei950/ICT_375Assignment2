"use strict";
const fs = require("fs");
const xmldom = require('xmldom').DOMParser;
const formid = require("formidable");
const http = require('http');
const xml2js = require('xml2js');
const processData = require('./processData');


//Handle start request
function reqStart(response, request, pathName) {

    if (pathName === "/") {
        pathName = "/index";
        fs.readFile("./html" + pathName + ".html", function (error, data) {
            if (error) {
                console.log("Error 1");
                response.writeHead(404, {
                    "Content-Type": "text/html"
                });
                response.write("404 not found \n");
                response.end();
            }
            if (data) {
                console.log("Request handler 'start' was called");
                response.writeHead(200, {
                    "Content-Type": "text/html"
                });
                response.write(data);
                response.end();
            }
        });
    }
}

//Handle JavaScript request
function reqJs(response, request, pathName) {
    console.log("JavaScript called");
    fs.readFile("." + pathName, function (error, data) {
        if (error) {
            console.log("JavaScript read error");
        } else if (data) {
            console.log("JavaScript read successfully");
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
    console.log("Css called");
    fs.readFile("." + pathName, function (error, data) {
        if (error) {
            console.log("CSS read error");
        } else if (data) {
            console.log("CSS read successfully");
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
    var form = new formid.IncomingForm();
    //Parse form
    form.parse(request, function (error, field, file) {
        if (error) {
            console.log("Error");
        } else {
            var selectedYear = field.year;
            var selectedStartM = field.start;
            var selectedEndM = field.end;
            var wind = field.wind;
            var radiation = field.radiation;

            //XML URL link
            var file_url = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + selectedYear + '.xml';
            var testXML = 'http://ceto.murdoch.edu.au/~34053405/ICT375/xml/2007test.xml'; //TO BE DELETED AFTER TEST

            //Retrieve XML from link provided
            http.get(file_url, function (urlRes) {
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
                            response.writeHead(200, {"Content-Type": "text/css"});
                            response.write(processData.processXML(records, selectedStartM, selectedEndM, selectedYear));
                            response.end();
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
    var form = new formid.IncomingForm();
    //Parse form
    form.parse(request, function (error, field, file) {
        if (error) {
            console.log("Error");
        } else {
            var selectedYear = field.year;
            var selectedStartM = field.start;
            var selectedEndM = field.end;
            var wind = field.wind;
            var radiation = field.radiation;

            //XML URL link
            var file_url = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + selectedYear + '.json';
            var testXML = 'http://ceto.murdoch.edu.au/~34053405/ICT375/xml/2007test.xml'; //TO BE DELETED AFTER TEST

            //Retrieve XML from link provided
            http.get(file_url, function (urlRes) {
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
                    response.writeHead(200, {"Content-Type": "text/css"});
                    response.write(processData.processJSON(records, selectedStartM, selectedEndM, selectedYear));
                    response.end();
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
    response.write("Error not found\n");
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