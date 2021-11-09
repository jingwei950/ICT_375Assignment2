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
        var selected_year = field.year;
        var start = field.start;
        var end = field.end;
        // console.log(field);

        var startMonth = monthNumber.indexOf(start.toLowerCase());
        var endMonth = monthNumber.indexOf(end.toLowerCase());
        console.log("Year: " + selected_year + "\n" + "Start month: " + startMonth + "\n" + "End month: " + endMonth);

        fs.readFile("./data/" + selected_year + ".xml", "utf8", function (error, data) {   
            if (error) {
                console.log("Error reading file");
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404 not found \n");
                response.end();
            } 
            else if (data) {
                console.log("Successfully read " + selected_year + ".xml file");
                // console.log(data);

                //Construct parser
                parser = new xmldom();
                //Call method to parse document
                doc = parser.parseFromString(data, 'text/xml');
                targetNodes = doc.getElementsByTagName("record");

                var startDate = new Date(year, startMonth, 1); //First day of month
                var endDate = new Date(year, endMonth + 1, 0); //Last day of month
                console.log("Start date: " + startDate);
                console.log("End date: " + endDate);

                var date, time, windspeed, radiation;
                var wsArray = [];
                var srArray = [];
                var dataArray = [];
                var sum = 0;
                var count = 0;                
                for(i in targetNodes){

                    records = targetNodes[i];
                    //dataArray.push(records);

                    if(records.nodeName === "record"){
                        dataArray.push({
                            date : records.childNodes[1].textContent,
                            time : records.childNodes[3].textContent,
                            windspeed : records.childNodes[5].textContent,
                            radiation : records.childNodes[7].textContent,
                        });
                    }
                }
            }

                
        //         // for(var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)){
        //         //     dataArray.forEach(obj =>{
        //         //         // console.log(obj.date);
        //         //         if(obj.date.match(currentDate.toLocaleDateString("en-GB"))){
        //         //             wsArray.push(Number(obj.windspeed));
        //         //             srArray.push(Number(obj.radiation));
        //         //             // console.log(obj.windspeed);
        //         //             // console.log(obj.radiation);
        //         //             console.log(count);
        //         //             count++;
        //         //         }
        });
                // } 

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
        //     }
        // });
    });
}

//Handle JSON request
function reqJson(response, request, pathName) {
    var form = new formid.IncomingForm();

    //Parse form
    form.parse(request, function (error, field, file) {
        var selected_year = field.year;
        console.log(year);
        fs.readFile("./data/" + selected_year + ".json", function (error, data) {
            if (error) {
                console.log("Error reading file");
                response.writeHead(404, {"Content-Type": "text/html"});
                response.write("404 not found \n");
                response.end();
            } 
            else if (data) {
                console.log("Successfully read " + selected_year + ".json file");
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