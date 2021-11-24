'use strict';
const form = document.querySelector("#myForm");
var wind = $("#wind");
var radiation = $("#radiation");
var year = $("#year");
var start = $("#start");
var end = $("#end");
var table = $("#table");
var graph = $("#graph");
var toTopBtn = $("#toTopBtn");
var monthNumber = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


form.addEventListener("submit", function(e){ //When form is submitted
    e.preventDefault();

    var tableOutput = $("#tableOutput");
    var graphOutput = $("#graphOutput");
    var requestedMonths = [];

    //Process range of month from what user select
    for (var j = monthNumber.indexOf(start.val()); j <= monthNumber.indexOf(end.val()); j++) {
        requestedMonths.push(monthNumber[j]); //Store requested range of months into array
    }

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    //If year is in between 2007 to 2009 execute this (XML)
    if(year.val() == 2007 || year.val() == 2008 || year.val() == 2009){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //Retrieved XML data
                var xmlData = JSON.parse(xhr.responseText);  

                //If table checkbox is checked, display data on table
                if(table.prop("checked") === true){

                    //Display table
                    tableOutput.removeAttr("hidden");                    
                  
                    var tableData = '<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>' +
                    '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>';

                    //If wind speed checkbox is checked, generate ws data
                    if(wind.prop("checked") === true){ 
                        tableData += '<tr><td>Wind Speed (km/h)</td>';
                        //Generate table data for Wind Speed
                        xmlData.filter(function(item) {
                            if(requestedMonths.includes(item.Month)){
                                if(item.WsAvg == undefined){ //If Ws contains undefined, show no data
                                    tableData += "<td>0</td>";
                                }
                                else{
                                    tableData += "<td>"+ item.WsAvg.toFixed(2) +"</td>"; //Round off to 2 decimal places
                                }
                            }
                            else{
                                tableData += "<td></td>";
                            };
                        });
                        tableData += '</tr>';                      
                    }   

                    if(radiation.prop("checked") === true){ //If solar radiation checkbox is checked, generate sr data
                        //Generate table data for Solar Radiation
                        tableData += '<tr><td>Solar Radiation (kWh/m&#178;)</td>';
                        xmlData.filter(function(item) {
                            if(requestedMonths.includes(item.Month)){
                                if(item.SrTotal == undefined){ //If Ws contains undefined, show no data
                                    tableData += "<td>0</td>";
                                }
                                else{
                                    tableData += "<td>"+ item.SrTotal.toFixed(2) +"</td>"; //Round off to 2 decimal places
                                }
                            }
                            else{
                                tableData += "<td></td>";
                            };
                            return  
                        });
                        tableData += "</tr>";
                    }
                    tableData += "</table>";
                    tableOutput.html("<h2 class='underline'> Data for "+ start.val() + " to " + end.val() + " of year " + year.val() + "</h2>" + tableData);                 
                }
                else{
                    tableOutput.attr("hidden", "hidden");                       
                }              
                
                //If graph checkbox is checked, display chart data
                if(graph.prop("checked") === true){ 
                    graphOutput.removeAttr("hidden");    

                    //To store requested WS and SR
                    var requestedWs = [];
                    var requestedSr = [];

                    //All WindSpeed data from XML
                    var wsData = [
                        xmlData[0].WsAvg.toFixed(2), xmlData[1].WsAvg.toFixed(2), xmlData[2].WsAvg.toFixed(2), xmlData[3].WsAvg.toFixed(2), 
                        xmlData[4].WsAvg.toFixed(2), xmlData[5].WsAvg.toFixed(2), xmlData[6].WsAvg.toFixed(2), xmlData[7].WsAvg.toFixed(2), 
                        xmlData[8].WsAvg.toFixed(2), xmlData[9].WsAvg.toFixed(2), xmlData[10].WsAvg.toFixed(2), xmlData[11].WsAvg.toFixed(2)
                    ];

                    //All Solar Radiation data from XML
                    var srData = [
                        xmlData[0].SrTotal.toFixed(2), xmlData[1].SrTotal.toFixed(2), xmlData[2].SrTotal.toFixed(2), xmlData[3].SrTotal.toFixed(2), 
                        xmlData[4].SrTotal.toFixed(2), xmlData[5].SrTotal.toFixed(2), xmlData[6].SrTotal.toFixed(2), xmlData[7].SrTotal.toFixed(2), 
                        xmlData[8].SrTotal.toFixed(2), xmlData[9].SrTotal.toFixed(2), xmlData[10].SrTotal.toFixed(2), xmlData[11].SrTotal.toFixed(2)
                    ]

                    //To process requested WS data requested
                    function getwsSets(){   
                        for (var k = monthNumber.indexOf(start.val()); k <= monthNumber.indexOf(end.val()); k++) {
                            requestedWs.push(wsData[k]); //Store requested Windspeed of range of months into array
                        }
                        //Wind Speed Data set to be placed into data in chart object
                        var wsDSet = {
                            label: "Wind Speed", yAxisID: 'Ws', data: requestedWs, backgroundColor:['rgba(54,162,235,0.6)'],
                            borderWidth: 5, borderColor: 'rgba(54,162,235,0.6)', tension: 0.4, fill: true
                        };
                        
                        //Check if windspeed check box is checked
                        if(wind.prop("checked") === true){
                            return wsDSet;  //Return data if checked
                        }
                        else{
                            return {}       //Return nothing if not checked
                        }
                        
                    }

                    //To process requested SR data requested
                    function getsrSets(){
                        for (var l = monthNumber.indexOf(start.val()); l <= monthNumber.indexOf(end.val()); l++) {
                            requestedSr.push(srData[l]); //Store requested Solar Radiation of range of months into array
                        }

                        //Solar Radiation data set to be placed into data in chart object
                        var srDSet = {
                            label: "Solar Radiation", yAxisID: 'Sr', data: requestedSr, backgroundColor:['rgba(255,159,64,0.6)'],
                            borderWidth: 5, borderColor:'rgba(255,159,64,0.6)', tension: 0.4, fill: true
                        }

                        //Check if radiation check box is checked
                        if(radiation.prop("checked") === true){
                            return srDSet;  //Return data if checked
                        }
                        else{
                            return {}       //Return nothing if not checked
                        }
                    }
                    
                    if(myChart){        //If chart already exist
                        ctx.destroy();  //Destroy previous chart

                        new Chart(ctx,  //Create new chart
                        {
                            type: "line",
                            data: {labels: requestedMonths, datasets: [getwsSets(), getsrSets()]}, //Function for requested data
                            options: {
                                bezierCurve: true, 
                                legend: {display: true},
                                title: {display: true},
                                scales:{
                                    Ws:{type: 'linear', position: 'left'},
                                    Sr:{type: 'linear', position: 'right', grid: {display: false}, ticks: {max: 50, min: 0}}
                                }
                            }
                        });   
                    }
                    else{ //If no chart exist 
                        graphOutput.html('<h2 class="underline">Graph for '+ start.val() + ' to ' + end.val() + ' of year ' + year.val() + '</h2>' + 
                        '<canvas id="myChart" style="width:100%;" hidden="hidden"></canvas>');
                        var myChart = document.getElementById("myChart");
                        myChart.removeAttribute("hidden");
                        var ctx =  myChart.getContext("2d");

                        new Chart(ctx,  //Create new chart
                        {
                            type: "line",
                            data: {labels: requestedMonths, datasets: [getwsSets(), getsrSets()]}, //Function for requested data
                            options: {
                                bezierCurve: true, 
                                legend: {display: true},
                                title: {display: true},
                                scales:{
                                    Ws:{type: 'linear', position: 'left'},
                                    Sr:{type: 'linear', position: 'right', grid: {display: false}, ticks: {max: 50, min: 0}}
                                }
                            }
                        });    
                    }   
                }
                else{
                    graphOutput.attr("hidden", "hidden");
                } 
                //Auto scroll to bottom of page when result is out
                $('html, body').animate({ scrollTop: "900px" });
                //Reset the form after data displayed
                form.reset();  
            }
        }
        xhr.open("POST", "/reqXml", true);  
        xhr.send(formData);

        
    }
    //If year is in between 2010 to 2016 execute this (JSON)
    else if(year.val() == 2010 || year.val() == 2011 || year.val() == 2012 || year.val() == 2013 
    || year.val() == 2014 || year.val() == 2015 || year.val() == 2016){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //Retrieved JSON data
                var jsonData = JSON.parse(xhr.responseText);

                //Check table checkbox
                if(table.prop("checked") === true){

                    //Display table
                    tableOutput.removeAttr("hidden");                    
                  
                   var tableData = '<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>' +
                    '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>';

                    //If wind speed checkbox is checked, generate ws data
                    if(wind.prop("checked") === true){ 
                        tableData += '<tr><td>Wind Speed (km/h)</td>';
                        //Generate table data for Wind Speed
                        jsonData.filter(function(item) {
                            if(requestedMonths.includes(item.Month)){
                                if(item.WsAvg == undefined){ //If Ws contains undefined, show no data
                                    tableData += "<td>0</td>";
                                }
                                else{
                                    tableData += "<td>"+ item.WsAvg.toFixed(2) +"</td>"; //Round off to 2 decimal places
                                }
                            }
                            else{
                                tableData += "<td></td>";
                            };
                        });
                        tableData += '</tr>';                      
                    }   
                    //If solar radiation checkbox is checked, generate sr data
                    if(radiation.prop("checked") === true){ 
                        //Generate table data for Solar Radiation
                        tableData += '<tr><td>Solar Radiation (kWh/m&#178;)</td>';
                        jsonData.filter(function(item) {
                            if(requestedMonths.includes(item.Month)){
                                if(item.SrTotal == undefined){ //If Ws contains undefined, show no data
                                    tableData += "<td>0</td>";
                                }
                                else{
                                    tableData += "<td>"+ item.SrTotal.toFixed(2) +"</td>"; //Round off to 2 decimal places
                                }
                            }
                            else{
                                tableData += "<td></td>";
                            };
                            return  
                        });
                        tableData += "</tr>";
                    }
                    tableData += "</table>";
                    tableOutput.html("<h2 class='underline'> Data for "+ start.val() + " to " + end.val() + " of year " + year.val() + "</h2>" + tableData);
                }
                else{
                    tableOutput.attr("hidden", "hidden");                       
                }  
                if(graph.prop("checked") === true){ 
                    graphOutput.removeAttr("hidden");  

                    //To store requested WS and SR
                    var requestedWs = [];
                    var requestedSr = [];

                    //All WindSpeed data from JSON
                    var wsData = [
                        jsonData[0].WsAvg.toFixed(2), jsonData[1].WsAvg.toFixed(2), jsonData[2].WsAvg.toFixed(2), jsonData[3].WsAvg.toFixed(2), 
                        jsonData[4].WsAvg.toFixed(2), jsonData[5].WsAvg.toFixed(2), jsonData[6].WsAvg.toFixed(2), jsonData[7].WsAvg.toFixed(2), 
                        jsonData[8].WsAvg.toFixed(2), jsonData[9].WsAvg.toFixed(2), jsonData[10].WsAvg.toFixed(2), jsonData[11].WsAvg.toFixed(2)
                    ];

                    //All Solar Radiation data from JSON
                    var srData = [
                        jsonData[0].SrTotal.toFixed(2), jsonData[1].SrTotal.toFixed(2), jsonData[2].SrTotal.toFixed(2), jsonData[3].SrTotal.toFixed(2), 
                        jsonData[4].SrTotal.toFixed(2), jsonData[5].SrTotal.toFixed(2), jsonData[6].SrTotal.toFixed(2), jsonData[7].SrTotal.toFixed(2), 
                        jsonData[8].SrTotal.toFixed(2), jsonData[9].SrTotal.toFixed(2), jsonData[10].SrTotal.toFixed(2), jsonData[11].SrTotal.toFixed(2)
                    ]

                    //Process requested WindSpeed
                    function getwsSets(){
                        for (var k = monthNumber.indexOf(start.val()); k <= monthNumber.indexOf(end.val()); k++) {
                            requestedWs.push(wsData[k]); //Store requested Windspeed of range of months into array
                        }

                        //Wind Speed Data set to be placed into data in chart object
                        var wsDSet = {
                            label: "Wind Speed", yAxisID: 'Ws', data: requestedWs, backgroundColor:['rgba(54,162,235,0.6)'],
                            borderWidth: 5, borderColor: 'rgba(54,162,235,0.6)', tension: 0.4, fill: true
                        };

                        //Check if radiation check box is checked
                        if(wind.prop("checked") === true){
                            return wsDSet;  //Return data if checked
                        }
                        else{
                            return {}       //Return nothing if not checked
                        }
                        
                    }

                    //Process requested Solar Radiation
                    function getsrSets(){
                        for (var l = monthNumber.indexOf(start.val()); l <= monthNumber.indexOf(end.val()); l++) {
                            requestedSr.push(srData[l]); //Store requested Solar Radiation of range of months into array
                        }

                        //Solar Radiation Data set to be placed into data in chart object
                        var srDSet = {
                            label: "Solar Radiation", yAxisID: 'Sr', data: requestedSr, backgroundColor:['rgba(255,159,64,0.6)'],
                            borderWidth: 5, borderColor:'rgba(255,159,64,0.6)', tension: 0.4, fill: true
                        }

                        //Check if radiation check box is checked
                        if(radiation.prop("checked") === true){
                            return srDSet;  //Return data if checked
                        }
                        else{
                            return {}       //Return nothing if not checked
                        }
                    }                  
                
                    if(myChart){        //If chart already exist
                        ctx.destroy();  //Destroy previous chart

                        //Create new chart
                        new Chart(ctx, 
                        {
                            type: "line", //Graph type
                            data: {labels: requestedMonths, datasets: [getwsSets(), getsrSets()]}, //Function for requested data
                            options: {
                                bezierCurve: true, 
                                legend: {display: true},
                                title: {display: true },
                                scales:{
                                    Ws:{type: 'linear', position: 'left'},
                                    Sr:{type: 'linear', position: 'right', grid: {display: false}, ticks: { max: 50,min: 0}}
                                }
                            }
                        }); 
                    }
                    else{ //If no chart exist 
                        graphOutput.html('<h2 class="underline">Graph for '+ start.val() + ' to ' + end.val() + ' of year ' + year.val() + '</h2>' 
                        + '<canvas id="myChart" style="width:100%;" hidden="hidden"></canvas>');
                        var myChart = document.getElementById("myChart");
                        myChart.removeAttribute("hidden");
                        var ctx =  myChart.getContext("2d");

                        new Chart(ctx,
                        {
                            type: "line",
                            data: {labels: requestedMonths, datasets: [getwsSets(), getsrSets()]}, //Function for requested data
                            options: {
                                bezierCurve: true, 
                                legend: {display: true},
                                title: {display: true},
                                scales:{
                                    Ws:{type: 'linear', position: 'left'},
                                    Sr:{type: 'linear', position: 'right', grid: {display: false}, ticks: {max: 50, min: 0}}
                                }
                            }
                        });  
                    }   
                }
                else{
                    graphOutput.attr("hidden", "hidden");
                }
                //Auto scroll to bottom of page when result is out
                $('html, body').animate({ scrollTop: "900px" });
                //Reset the form after data displayed
                form.reset();  
            }
        }
        xhr.open("POST", "/reqJson", true);  
        xhr.send(formData);
    }
});

// When to toTopBtn button is clicked, scroll to the top
$("#toTopBtn").on('click', function(){
    $('html, body').animate({ scrollTop: "0px" });
});

//Year input validation
year.on('blur', function(){
    if(year.val() < 2007 || year.val() > 2016){
        $("#yearErrMsg").html("Please select year between 2007 and 2016").css("color", "red");
    }else{
        $("#yearErrMsg").html("");
    }
});

//WindSpeed check box validation
wind.on('click', function(){
    if(wind.prop("checked") === false && radiation.prop("checked") === false){
        $("#measurementsErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#measurementsErrMsg").html("");
    }
});
//Solar Radiation check box validation
radiation.on('click', function(){
    if(wind.prop("checked") === false && radiation.prop("checked") === false){
        $("#measurementsErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#measurementsErrMsg").html("");
    }
});
//Table check box validation
table.on('click', function(){
    if(table.prop("checked") === false && graph.prop("checked") === false){
        $("#formatErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#formatErrMsg").html("");
    }
});
//Graph check box validation
graph.on('click', function(){
    if(table.prop("checked") === false && graph.prop("checked") === false){
        $("#formatErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#formatErrMsg").html("");
    }
});

//End month dropdown validation
end.change(function(){
    if(monthNumber.indexOf(start.val()) > monthNumber.indexOf(end.val())){
        start.val(end.val());
    }
});

//Start month dropdown validation
start.change(function(){
    if(monthNumber.indexOf(end.val()) < monthNumber.indexOf(start.val())){
        end.val(start.val());
    }
});