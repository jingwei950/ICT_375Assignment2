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

            if (selectedYear >= 2007 && selectedYear <= 2009) { //Download xml file for year 2007 to 2009
                //Download directory
                var DOWNLOAD_DIR = "../Assignment2/data/";
                var file_name = selectedYear + ".xml";
                var file_url = 'http://it.murdoch.edu.au/~S900432D/ict375/data/' + selectedYear + '.xml';
                var file = fs.createWriteStream(DOWNLOAD_DIR + file_name, {
                    'flags': 'w'
                });

                http.get(file_url, function (urlRes) {
                    //Download xml file
                    urlRes.pipe(file);
                    console.log("Data retrieved");

                    //Read downloaded xml file
                    console.log("Reading file..");
                    var startMonth = monthNumber.indexOf(selectedStartM.toLowerCase());
                    var endMonth = monthNumber.indexOf(selectedEndM.toLowerCase());
                    console.log("Year: " + selectedYear + "\n" + "Start month: " + startMonth + "\n" + "End month: " + endMonth);

                    fs.readFile("./test_data/" + selectedYear + "test.xml", "utf8", function (error, data) {
                        if (error) {
                            console.log("Error reading file");
                            response.writeHead(404, {
                                "Content-Type": "text/html"
                            });
                            response.write("404 not found \n");
                            response.end();
                        } else if (data) {
                            console.log("Successfully read " + selectedYear + ".xml file");
                            // console.log(data);
                            var parser = new xml2js.Parser();

                            // parser.parseString
                            
                            //Construct parser
                            parser = new xmldom();
                            //Call method to parse document
                            doc = parser.parseFromString(data, 'text/xml');
                            targetNodes = doc.getElementsByTagName("record");

                            var date, time, windspeed, radiation;
                            var wsArray = [];
                            var srArray = [];
                            var dataArray = [];
                            var sum = 0;
                            var count = 0;

                            var startDate = new Date(selectedYear, startMonth, 1); //First day of month
                            var endDate = new Date(selectedYear, endMonth + 1, 0); //Last day of month
                            console.log("Start date: " + startDate);
                            console.log("End date: " + endDate);

                            for (var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) { //if 01/01/2007
                                console.log("Current date:" + currentDate); //01/01/2007
                                for (i in targetNodes) { //loop thru all record nodes
                                    records = targetNodes[i]; //first record node
                                    var testDate = records.childNodes[1].textContent; //first record node date 

                                    if (testDate.match(currentDate.toLocaleDateString("en-GB"))) { 
                                        count++;
                                        console.log("Match " + count + ": " + testDate); 
                                        
                                        // if (records.nodeName == "record") {
                                        //     // console.log(records.childNodes[1].textContent); //Get date
                                            

                                        //     // for(var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)){
                                        //     //     console.log("Current date:" + currentDate);
                                        //     //     if(testDate.match(currentDate.toLocaleDateString("en-GB"))){
                                        //     //         count++;
                                        //     //         console.log("match " + count);
                                        //     //     }
                                        //     //     // dataArray.forEach(obj =>{
                                        //     //     //     // console.log(obj.date);
                                        //     //     //     if(obj.date.match(currentDate.toLocaleDateString("en-GB"))){
                                        //     //     //         wsArray.push(Number(obj.windspeed));
                                        //     //     //         srArray.push(Number(obj.radiation));
                                        //     //     //         // console.log(obj.windspeed);
                                        //     //     //         // console.log(obj.radiation);
                                        //     //     //         console.log(count);
                                        //     //     //         count++;
                                        //     //     //     }

                                        //     //     // });
                                        //     // } 


                                        //     // dataArray.push({
                                        //     //     date : records.childNodes[1].textContent,
                                        //     //     time : records.childNodes[3].textContent,
                                        //     //     windspeed : records.childNodes[5].textContent,
                                        //     //     radiation : records.childNodes[7].textContent,
                                        //     // });
                                        // }


                                    }else{
                                        break;
                                    }
                                    // count++;
                                    // console.log("match " + count);
                                }
                            }

                            //         // var i = dataArray.length,
                            //         //     ownerData;

                            //         // while(i--) {
                            //         //     if(dataArray.date == currentDate) {
                            //         //         ownerData = users[i];
                            //         //         break;
                            //         //     }
                            //         // }
                            //         // function add (previousValue, currentValue){
                            //         //     return previousValue + currentValue
                            //         // };
                            //         // console.log("Average WindSpeed: " + wsArray.reduce(add)/count);
                            //         // console.log("Average Solar Radiation: " + srArray.reduce(add)/count);

                            //         console.log(count);
                            //         //for(var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)){
                            //             // console.log(currentDate.toLocaleDateString("en-GB"));

                            //             // if(dataArray.match(currentDate.toLocaleDateString("en-GB"))){ //if date match 
                            //             //     date = records.childNodes[1].textContent;       //Date
                            //             //     time = records.childNodes[3].textContent;       //Time
                            //             //     windspeed = records.childNodes[5].textContent;  //Wind speed
                            //             //     radiation = records.childNodes[7].textContent;  //Solar Radiation

                            //             //     // console.log("Windspeed of " + records.childNodes[1].textContent + ": " + records.childNodes[5].textContent);

                            //             //     wsArray.push(parseFloat(windspeed));
                            //             //     sum += parseFloat(wsArray); 
                            //             //     count++;

                            //             //     console.log("Added to array" + i);
                            //             // }

                            //         // }

                            //         console.log(dataArray);
                            //         // console.log("Total records:" + (sum - 1) / count);
                            //         // response.writeHead(200, {"Content-Type": "text/html"});
                            //         // response.write(data);
                            //         // response.end();
                        }
                    });

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