"use strict";
const fs = require("fs");
const formid = require("formidable");

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
        var year = field.year;
        console.log(field);
        console.log(year);
        fs.readFile("./data/" + year + ".xml", function (error, data) {
            if (error) {
                console.log("Error reading file");
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404 not found \n");
                response.end();
            } 
            else if (data) {
                console.log("Successfully read " + year + ".xml file");
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(data);
                response.end();
            }
        });
    });
}


//Handle JSON request
function reqJson(response, request, pathName) {
    var form = new formid.IncomingForm();

    //Parse form
    form.parse(request, function (error, field, file) {
        var year = field.year;
        console.log(year);
        fs.readFile("./data/" + year + ".json", function (error, data) {
            if (error) {
                console.log("Error reading file");
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404 not found \n");
                response.end();
            } 
            else if (data) {
                console.log("Successfully read " + year + ".json file");
                response.writeHead(200, {"Content-Type": "text/html"});
                // response.write(data);
                response.write("Success");
                response.end();
            }
        });
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