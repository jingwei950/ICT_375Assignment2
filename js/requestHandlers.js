"use strict";
const fs = require("fs");
const xmldom = require('xmldom').DOMParser;
const formid = require("formidable");
const http = require('http');
const xml2js = require('xml2js');



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
    var monthNumber = 
    [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug","Sep", "Oct", "Nov", "Dec"
    ];
    var resultTable = [];
    var parser, doc, targetNodes;
    var i, targetObj, fcObj, recordContent, records, testMonth, startDate, endDate;

    var requestedMonths = [];
    var table = '<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>'
    + '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>';

    
    var form = new formid.IncomingForm();
    //Parse form
    form.parse(request, function (error, field, file) {
        if (error) {
            console.log("Error");
        } else {
            var selectedYear = field.year;
            var selectedStartM = field.start;
            var selectedEndM = field.end;

            //Get all the months user requested
            for(var j = monthNumber.indexOf(selectedStartM); j <= monthNumber.indexOf(selectedEndM); j++){
                requestedMonths.push(monthNumber[j]); //Store all requested months into array
            }
            console.log(requestedMonths);

            if (selectedYear >= 2007 && selectedYear <= 2009) {

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
                        // console.log(data);

                        //Parser for xml2js
                        parser.parseString(data, function (xmlError, result) {
                            if (xmlError) {
                                throw xmlError;
                            } else if (result) { //Get result of parsed xml obj

                                var requestedRec = [];
                                //Shorten Object
                                var records = result.weather.record;

                                //Loop through objects
                                for (var i = 0; i < records.length; i++) {
                                    if (records[i].date[0].includes("/01/")) {
                                        requestedRec.push({
                                            Month: 'Jan',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    } else if (records[i].date[0].includes("/02/")) {
                                        requestedRec.push({
                                            Month: 'Feb',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/03/")) {
                                        requestedRec.push({
                                            Month: 'Mar',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/04/")) {
                                        requestedRec.push({
                                            Month: 'Apr',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/05/")) {
                                        requestedRec.push({
                                            Month: 'May',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/06/")) {
                                        requestedRec.push({
                                            Month: 'Jun',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/07/")) {
                                        requestedRec.push({
                                            Month: 'Jul',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/08/")) {
                                        requestedRec.push({
                                            Month: 'Aug',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/09/")) {
                                        requestedRec.push({
                                            Month: 'Sep',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/10/")) {
                                        requestedRec.push({
                                            Month: 'Oct',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/11/")) {
                                        requestedRec.push({
                                            Month: 'Nov',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                    else if (records[i].date[0].includes("/12/")) {
                                        requestedRec.push({
                                            Month: 'Dec',
                                            Ws: Number(records[i].ws[0]),
                                            Sr: Number(records[i].sr[0])
                                        });
                                    }
                                }
                                console.log(requestedRec);

                                let avgArray = [];
                                requestedRec.reduce(function (res, {Month, Ws, Sr}) {
                                    //If there is no month exist in array push empty record
                                    if (!res[Month]) {
                                        res[Month] = {
                                            Month: Month,
                                            Count: 0,
                                            WsAvg: 0,
                                            WsSum: 0,
                                            SrAvg: 0,
                                            SrSum: 0
                                        };
                                        avgArray.push(res[Month]);
                                    }
                                    //If there is month exist append these
                                    res[Month].Count += 1;
                                    res[Month].WsSum += Ws;                            
                                    res[Month].WsAvg = res[Month].WsSum / res[Month].Count;
                                    res[Month].SrSum += Sr;
                                    res[Month].SrAvg = res[Month].SrSum / res[Month].Count
                                    return res;
                                }, {});
                                console.log(avgArray); 

                                table += '<tr><td>Wind Speed</td>';
                                avgArray.filter(function(item) {
                                    if(requestedMonths.includes(item.Month)){
                                        table += "<td>"+ item.WsAvg.toFixed(2) +"</td>";
                                        console.log("<td>"+ item.WsAvg +"</td>");
                                    }
                                    else{
                                        table += "<td></td>";
                                        console.log("<td></td>");
                                    };
                                });
                                table += '</tr>';
                                
                                table += '<tr><td>Solar Radiation</td>';
                                avgArray.filter(function(item) {
                                    
                                    if(requestedMonths.includes(item.Month)){
                                        table += "<td>"+ item.SrAvg.toFixed(2) +"</td>";
                                        console.log("<td>"+ item.SrAvg +"</td>");
                                    }
                                    else{
                                        table += "<td></td>";
                                        console.log("<td></td>");
                                    };
                                    return  
                                });
                                table += "</tr></table>"
                                console.log(table);

                                // table += '<tr><td>Wind Speed</td>';                             
                                // for(var k = 0; k < requestedMonths.length; k++){
                                    
                                //     if(requestedMonths[k] == avgArray[k].Month){
                                //         table += "<td>" + avgArray[k].WsAvg.toFixed(2) + "</td>";
                                //     }
                                //     else{
                                //         table += "<td></td>";
                                //     }
                                // }

                                // table += '</tr><tr><td>Solar Radiation</td>';
                                // for(var k = 0; k < requestedMonths.length; k++){
                                    
                                //     if(requestedMonths[k] == avgArray[k].Month){
                                //         table += "<td>" + avgArray[k].SrAvg.toFixed(2) + "</td>";
                                //     }
                                //     else{
                                //         table += "<td></td>";
                                //     }
                                // }
                                // table += '</table>';
                                console.log(table);
                                response.writeHead(200, {"Content-Type": "text/css"});
                                response.write(table);
                                response.end();
                            }
                        });
                    });
                }).on('error', function (err) {
                    console.log("Error");
                });

                
 
            } else { //Download JSON file for year 2010 to 2016
                console.log("Run download JSON functions");
                route(pathName, request, response, handle);
            }


            // console.log("entered form parse function");


        }
    });
    
}

//Handle JSON request
function reqJson(response, request, pathName) {
    var form = new formid.IncomingForm();

    //Parse form
    form.parse(request, function (error, field, file) {
        var selectedYear = field.year;
        console.log(year);
        fs.readFile("./data/" + selectedYear + ".json", function (error, data) {
            if (error) {
                console.log("Error reading file");
                response.writeHead(404, {
                    "Content-Type": "text/html"
                });
                response.write("404 not found \n");
                response.end();
            } else if (data) {
                console.log("Successfully read " + selectedYear + ".json file");
                response.writeHead(200, {
                    "Content-Type": "text/html"
                });
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