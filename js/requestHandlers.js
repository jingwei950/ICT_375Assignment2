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

                            //START OF processXML()
                            var processXML = function (xmlRecords, startMonth, endMonth) {

                                var monthNumber = [
                                    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                                ];

                                var requestedMonths = [];

                                //Process range of month from what user select
                                for (var j = monthNumber.indexOf(startMonth); j <= monthNumber.indexOf(endMonth); j++) {
                                    requestedMonths.push(monthNumber[j]); //Store requested range of months into array
                                }
                                console.log("Requested year: " + selectedYear);
                                console.log("Requested range of months: " + requestedMonths);
                                //Process object retrieved from URL, convert dates with respective months, WS and SR to number
                                let result2 = xmlRecords.map(function (value) {
                                    if (value.date[0].includes("/01/")) {
                                        value.date[0] = 'Jan',
                                            value.ws[0] = Number(value.ws[0]), //Convert string to number
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/02/")) {
                                        value.date[0] = 'Feb',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/03/")) {
                                        value.date[0] = 'Mar',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/04/")) {
                                        value.date[0] = 'Apr',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/05/")) {
                                        value.date[0] = 'May',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/06/")) {
                                        value.date[0] = 'Jun',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/07/")) {
                                        value.date[0] = 'Jul',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/08/")) {
                                        value.date[0] = 'Aug',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/09/")) {
                                        value.date[0] = 'Sep',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/10/")) {
                                        value.date[0] = 'Oct',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/11/")) {
                                        value.date[0] = 'Nov',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                    if (value.date[0].includes("/12/")) {
                                        value.date[0] = 'Dec',
                                            value.ws[0] = Number(value.ws[0]),
                                            value.sr[0] = Number(value.sr[0]),
                                            delete value.time
                                        return value
                                    }
                                });

                                //Remove object property value of array to just value, convert 'Date' to 'Month'
                                let result3 = result2.map(function (r) {
                                    return {
                                        Month: r.date.toString(), //Convert from array to string
                                        Ws: Number(r.ws),
                                        Sr: Number(r.sr)
                                    }; //Convert Object property array
                                });

                                //Average array to store calculated records
                                let avgArray = [];
                                //Calculate average of WindSpeed and Solar Radiation and convert it
                                result3.reduce(function (res, {Month, Ws, Sr}) {
                                    //If there is no such month exist in array push empty record
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
                                    res[Month].WsAvg = (res[Month].WsSum / res[Month].Count) * 3.6; //Convert m/s to km/h
                                    res[Month].SrSum += Sr;
                                    res[Month].SrAvg = (res[Month].SrSum / res[Month].Count); //COnvert W/m^2 to kWh/m^2
                                    return res;
                                }, {});

                                //Find months in XML that does not exist append that month, Ws and Sr with value of 0
                                let result5 = monthNumber.map(function(m){ 
                                    return avgArray.find(function(a){ 
                                        if(a.Month != undefined && a.Month != null){
                                            return a.Month === m
                                        }
                                    })||{Month: m, Count: Number(0),
                                        WsSum: Number(0), WsAvg: Number(0), 
                                        SrSum: Number(0), SrAvg: Number(0)} //If undefined is returned make Avg 0 (Which XML retrieved does not have some specific months) 
                                });
                                var finalResult = JSON.stringify(result5);
                                // console.log(finalResult);
                                return finalResult; //Return the result of table
                            }
                            // END OF processXML()

                            response.writeHead(200, {"Content-Type": "text/css"});
                            response.write(processXML(records, selectedStartM, selectedEndM));
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

                    //START OF processJSON()
                    var processJSON = function (JSONRecords, startMonth, endMonth) {

                        var monthNumber = [
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];

                        var requestedMonths = [];

                        //Process range of month from what user select
                        for (var j = monthNumber.indexOf(startMonth); j <= monthNumber.indexOf(endMonth); j++) {
                            requestedMonths.push(monthNumber[j]); //Store requested range of months into array
                        }
                        console.log("Requested year: " + selectedYear);
                        console.log("Requested range of months: " + requestedMonths);
                        //Process object retrieved from URL, convert dates with respective months, WS and SR to number
                        let result2 = JSONRecords.map(function (value) {
                            if (value.date.includes("/01/")) {
                                value.date = 'Jan',
                                    value.ws = Number(value.ws), //Convert string to number
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/02/")) {
                                value.date = 'Feb',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/03/")) {
                                value.date = 'Mar',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/04/")) {
                                value.date = 'Apr',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/05/")) {
                                value.date = 'May',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/06/")) {
                                value.date = 'Jun',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/07/")) {
                                value.date = 'Jul',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/08/")) {
                                value.date = 'Aug',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/09/")) {
                                value.date = 'Sep',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/10/")) {
                                value.date = 'Oct',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/11/")) {
                                value.date = 'Nov',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                            if (value.date.includes("/12/")) {
                                value.date = 'Dec',
                                    value.ws = Number(value.ws),
                                    value.sr = Number(value.sr),
                                    delete value.time
                                return value
                            }
                        });

                        //Remove object property value of array to just value, convert 'Date' to 'Month'
                        let result3 = result2.map(function (r) {
                            return {
                                Month: r.date.toString(), //Convert from array to string
                                Ws: Number(r.ws),
                                Sr: Number(r.sr)
                            }; //Convert Object property array
                        });

                        //Average array to store calculated records
                        let avgArray = [];
                        //Calculate average of WindSpeed and Solar Radiation and convert it
                        result3.reduce(function (res, {Month, Ws, Sr}) {
                            //If there is no such month exist in array push empty record
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
                            res[Month].WsAvg = (res[Month].WsSum / res[Month].Count) * 3.6; //Convert m/s to km/h
                            res[Month].SrSum += Sr;
                            res[Month].SrAvg = (res[Month].SrSum / res[Month].Count); //Convert W/m^2 to kWh/m^2
                            return res;
                        }, {});

                        //Find months in XML that does not exist append that month, Ws and Sr with value of 0
                        let result5 = monthNumber.map(function(m){ 
                            return avgArray.find(function(a){ 
                                if(a.Month != undefined && a.Month != null){
                                    return a.Month === m
                                }
                            })||{Month: m, Count: Number(0),
                                WsSum: Number(0), WsAvg: Number(0), 
                                SrSum: Number(0), SrAvg: Number(0)} //If undefined is returned make Avg 0 (Which XML retrieved does not have some specific months) 
                        });

                        // //Table heads
                        // var table = '<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>' +
                        // '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>';
                        
                        // if(wind === "on"){ //If wind speed checkbox is checked, generate ws data
                        //     table += '<tr><td>Wind Speed (km/h)</td>';
                        //     //Generate table data for Wind Speed
                        //     result5.filter(function(item) {
                        //         if(requestedMonths.includes(item.Month)){
                        //             if(item.WsAvg == undefined){ //If it contains undefined 
                        //                 table += "<td>0</td>";
                        //             }
                        //             else{
                        //                 table += "<td>"+ item.WsAvg.toFixed(2) +"</td>"; //Round off to 2 decimal places
                        //             }
                        //         }
                        //         else{
                        //             table += "<td></td>";
                        //         };
                        //     });
                        //     table += '</tr>';
                        // }   

                        // if(radiation === 'on'){ //If solar radiation checkbox is checked, generate sr data
                        //     //Generate table data for Solar Radiation
                        //     table += '<tr><td>Solar Radiation (kWh/m&#178;)</td>';
                        //     result5.filter(function(item) {
                        //         if(requestedMonths.includes(item.Month)){
                        //             if(item.WsAvg == undefined){ //If it contains undefined 
                        //                 table += "<td>0</td>";
                        //             }
                        //             else{
                        //                 table += "<td>"+ item.SrAvg.toFixed(2) +"</td>"; //Round off to 2 decimal places
                        //             }
                        //         }
                        //         else{
                        //             table += "<td></td>";
                        //         };
                        //         return  
                        //     });
                        //     table += "</tr>";
                        // }
                        // table += "</table>";
                        // console.log(table);
                        var finalResult = JSON.stringify(result5);
                        return finalResult; //Return the result of table
                        // return result5; //Return the result of table
                    }
                    // END OF processJSON()

                    response.writeHead(200, {"Content-Type": "text/css"});
                    response.write(processJSON(records, selectedStartM, selectedEndM));
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