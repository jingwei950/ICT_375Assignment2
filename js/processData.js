'use strict';
function processXML(xmlRecords, startMonth, endMonth, selectedYear) {

    console.log("Processing data...");

    var monthNumber = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var requestedMonths = [];

    //Process range of month from what user select
    for (var j = monthNumber.indexOf(startMonth); j <= monthNumber.indexOf(endMonth); j++) {
        requestedMonths.push(monthNumber[j]); //Store requested range of months into array
    }

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
                SrSum: 0,
                SrTotal: 0,
            };
            avgArray.push(res[Month]);
        }
        //If there is month exist append these
        res[Month].Count += 1;
        res[Month].WsSum += Ws;
        res[Month].WsAvg = (res[Month].WsSum / res[Month].Count) * 3.6; //Convert m/s to km/h
        res[Month].SrSum += Sr;
        res[Month].SrTotal = res[Month].SrSum / 1000 //COnvert W/m^2 to kWh/m^2
        // res[Month].SrAvg = (res[Month].SrSum / res[Month].Count); //COnvert W/m^2 to kWh/m^2
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
            SrSum: Number(0), SrTotal: Number(0)} //If undefined is returned make Avg 0 (Which XML retrieved does not have some specific months) 
    });
    var finalResult = JSON.stringify(result5);
    // console.log(finalResult);
    return finalResult; //Return the result of table
}

function processJSON (JSONRecords, startMonth, endMonth, selectedYear) {

    console.log("Processing data...");
    
    var monthNumber = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    var requestedMonths = [];

    //Process range of month from what user select
    for (var j = monthNumber.indexOf(startMonth); j <= monthNumber.indexOf(endMonth); j++) {
        requestedMonths.push(monthNumber[j]); //Store requested range of months into array
    }

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
                SrSum: 0,
                SrTotal: 0,
            };
            avgArray.push(res[Month]);
        }
        //If there is month exist append these
        res[Month].Count += 1;
        res[Month].WsSum += Ws;
        res[Month].WsAvg = (res[Month].WsSum / res[Month].Count) * 3.6; //Convert m/s to km/h
        res[Month].SrSum += Sr;
        res[Month].SrTotal = res[Month].SrSum / 1000 //Convert W/m^2 to kWh/m^2
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
            SrSum: Number(0), SrTotal: Number(0)} //If undefined is returned make Avg 0 (Which XML retrieved does not have some specific months) 
    });

    var finalResult = JSON.stringify(result5);
    return finalResult; //Return the result of table
}

exports.processXML = processXML;
exports.processJSON = processJSON;