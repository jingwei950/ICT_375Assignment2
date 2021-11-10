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
    var monthNumber = ["january", "february", "march", "april", "may", "june", "july", "august",
        "september", "october", "november", "december"
    ];
    var parser, doc, targetNodes;
    var i, targetObj, fcObj, recordContent, records, testMonth, startDate, endDate;


    var form = new formid.IncomingForm();
    //Parse form
    form.parse(request, function (error, field, file) {
        if (error) {
            console.log("Error");
        } else {
            var selectedYear = field.year;
            var selectedStartM = field.start;
            var selectedEndM = field.end;

            console.log(selectedStartM);

            if (selectedYear >= 2007 && selectedYear <= 2009) { //Download xml file for year 2007 to 2009

                var file_url = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + selectedYear + '.xml';
                var testXML = 'http://ceto.murdoch.edu.au/~34053405/ICT375/xml/2007test.xml'; //TO BE DELETED AFTER TEST

                //Retrieve XML from link provided
                http.get(testXML, function (urlRes) {
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

                                let wsArray = [];
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
                                        wsArray.push(res[Month]);
                                    }
                                    //If there is month exist append these
                                    res[Month].Count += 1;
                                    res[Month].WsSum += Ws;                            
                                    res[Month].WsAvg = res[Month].WsSum / res[Month].Count;
                                    res[Month].SrSum += Sr;
                                    res[Month].SrAvg = res[Month].SrSum / res[Month].Count
                                    return res;
                                }, {});
                                console.log(wsArray);     
                                // if(selectedStartM === "january"){
                                //     console.log("Average WindSpeed of " + selectedYear + " " + selectedStartM + ": " + wsArray[0].WsAvg.toFixed(2));
                                //     console.log("Average Solar Radiation of " + selectedYear + " " + selectedStartM + ": " + wsArray[0].SrAvg.toFixed(2));
                                // } 
                                // if(requestedRec.Month)
                                // console.log(requestedRec[1].Month);
                                // console.log(requestedRec.length);

                                // if(requestedRec[1].Month === "Apr"){
                                //     console.log("match");
                                // }
                                // for(var j = 0; j < requestedRec.length; j++){
                                //     if(requestedRec[j].Month === "Apr"){
                                //         console.log(requestedRec[j].Ws);
                                //     }
                                // }

                            }
                        });
                    });


                    // //Read downloaded xml file
                    // console.log("Reading file..");
                    // var startMonth = monthNumber.indexOf(selectedStartM.toLowerCase());
                    // var endMonth = monthNumber.indexOf(selectedEndM.toLowerCase());
                    // console.log("Year: " + selectedYear + "\n" + "Start month: " + startMonth + "\n" + "End month: " + endMonth);

                    // fs.readFile("./test_data/" + selectedYear + "test.xml", "utf8", function (fileError, data) {
                    //     if (fileError) {
                    //         console.log("Error reading file");
                    //         response.writeHead(404, {
                    //             "Content-Type": "text/html"
                    //         });
                    //         response.write("404 not found \n");
                    //         response.end();
                    //     } else if (data) {
                    //         console.log("Successfully read " + selectedYear + ".xml file");

                    //         //Parser for xml2js
                    //         parser.parseString(data, function(xmlError, result){
                    //             if(xmlError){
                    //                 throw xmlError;
                    //             }
                    //             else if(result){ //Get result of parsed xml obj

                    //                 //Shorten Object
                    //                 var records = result.weather.record;

                    //                 //Loop through objects
                    //                 for(var i = 0; i < records.length; i++){
                    //                     if(records[i].date[0].includes("/01/")){
                    //                         console.log("match");
                    //                     }else{
                    //                         console.log("don't match");
                    //                     }
                    //                 }
                    //             }
                    //         });
                    //         //         console.log(dataArray);
                    //         //         // console.log("Total records:" + (sum - 1) / count);
                    //         //         // response.writeHead(200, {"Content-Type": "text/html"});
                    //         //         // response.write(data);
                    //         //         // response.end();
                    //     }
                    // });

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