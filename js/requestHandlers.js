"use strict";
const fs = require("fs");
const xmldom = require('xmldom').DOMParser;
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
    var monthNumber = ["january", "february", "march", "april", "may", "june", "july", "august", 
    "september", "october", "november", "december"];
    var parser, doc, targetNodes;
    var i, targetObj, fcObj, recordContent, records, testMonth, startDate, endDate;
    var form = new formid.IncomingForm();

    //Parse form
    form.parse(request, function (error, field, file) {
        var year = field.year;
        var start = field.start;
        var end = field.end;
        // console.log(field);

        var startMonth = monthNumber.indexOf(start.toLowerCase());
        var endMonth = monthNumber.indexOf(end.toLowerCase());
        

        console.log("Year: " + year + "\n" + "Start month: " + startMonth + "\n" + "End month: " + endMonth);
        fs.readFile("./data/" + year + ".xml", "utf8", function (error, data) {
            if (error) {
                console.log("Error reading file");
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404 not found \n");
                response.end();
            } 
            else if (data) {
                console.log("Successfully read " + year + ".xml file");
                // console.log(data);

                //Construct parser
                parser = new xmldom();
                //Call method to parse document
                doc = parser.parseFromString(data, 'text/xml');
                targetNodes = doc.getElementsByTagName("record");

                var startDate = new Date(year, startMonth, 1);
                var endDate = new Date(year, endMonth + 1, 0);
                console.log("Start date: " + startDate);
                console.log("End date: " + endDate);

                var date, time, windspeed, radiation;
                var wsArray = [];
                var srArray = [];
                var dataArray = [];
                var sum = 0;
                var count = 0;                

                for(var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)){
                    //console.log(currentDate.toLocaleDateString("en-GB"));
                    for(i in targetNodes){

                        records = targetNodes[i];
                        dataArray.push(records);

                        if(records.nodeName === "record"){
                            if(records.childNodes[1].textContent.match(currentDate.toLocaleDateString("en-GB"))){ //if date match 
                                date = records.childNodes[1].textContent;       //Date
                                time = records.childNodes[3].textContent;       //Time
                                windspeed = records.childNodes[5].textContent;  //Wind speed
                                radiation = records.childNodes[7].textContent;  //Solar Radiation

                                // console.log("Windspeed of " + records.childNodes[1].textContent + ": " + records.childNodes[5].textContent);
                                
                                wsArray.push(parseFloat(windspeed));
                                sum += parseFloat(wsArray); 
                                count++;

                                console.log("Added to array" + i);

                            //     // records.childNodes[1].textContent;
                            //     console.log(records.textContent);
                            //     console.log(records.parentNode.getElementsByTagName("ws")[0].textContent);
                            // //     // for(var i = 0; i < targetNodes[i]; i++)//loop through all the same dates
                            // //     console.log(records.childNodes[5].textContent);                         //display windspeed
                            // //     // if(date.match(s.toLocaleDateString("en-GB"))){
                            // //     //     console.log(date);
                            // //     //     wsArray.push(parseFloat(windspeed));
                            // //     //     sum += parseFloat(wsArray); 
                            // //     //     count++;
                            // //     // }
                            }
                            // else{
                            //     break;
                            // }
                        }
                        
                        // if(records.nodeName === "record"){ //<record>

                        //     date = records.childNodes[1].textContent;       //Date
                        //     time = records.childNodes[3].textContent;       //Time
                        //     windspeed = records.childNodes[5].textContent;  //Wind speed
                        //     radiation = records.childNodes[7].textContent;  //Solar Radiation
    
                        //     if(date.match(s.toLocaleDateString("en-GB"))){
                        //         console.log(date);
                        //         wsArray.push(parseFloat(windspeed));
                        //         sum += parseFloat(wsArray); 
                        //         count++;
                        //     }
                        //     // console.log("Start date: " + s);
                        //     // console.log("End date: " + e);
                                                 
                        //     // console.log(wsArray);
                        //     // if(date.match(startMonth)){
                        //     //     console.log("Date: " + date);
                        //     //     console.log("Time: " + time);
                        //     //     console.log("Wind Speed: " + windspeed);
                        //     //     console.log("Solar Radiation: " + radiation);
                        //     // }
                            
                        // }
                        
                    }
                    
                }
                console.log(wsArray);
                console.log("Total records:" + (sum - 1) / count);
                // response.writeHead(200, {"Content-Type": "text/html"});
                // response.write(data);
                // response.end();
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