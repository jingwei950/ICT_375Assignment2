'use strict'
const form = document.querySelector("#myForm");
var wind = $("#wind");
var radiation = $("#radiation");
var start = $("#start");
var end = $("#end");
var table = $("#table");
var graph = $("#graph");
var monthNumber = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


form.addEventListener("submit", function(e){ //When form is submitted
    e.preventDefault();
    
    var year = $("#year").val();
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
    if(year == 2007 || year == 2008 || year == 2009){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //XML data
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
                    tableOutput.html("<h2 class='underline'> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h2>" + tableData);                 
                }
                else{
                    tableOutput.attr("hidden", "hidden");                       
                }              
                
                //If graph checkbox is checked, display chart data
                if(graph.prop("checked") === true){ 
                    graphOutput.removeAttr("hidden");    

                    var wsData = [
                        xmlData[0].WsAvg.toFixed(2), xmlData[1].WsAvg.toFixed(2), xmlData[2].WsAvg.toFixed(2), xmlData[3].WsAvg.toFixed(2), 
                        xmlData[4].WsAvg.toFixed(2), xmlData[5].WsAvg.toFixed(2), xmlData[6].WsAvg.toFixed(2), xmlData[7].WsAvg.toFixed(2), 
                        xmlData[8].WsAvg.toFixed(2), xmlData[9].WsAvg.toFixed(2), xmlData[10].WsAvg.toFixed(2), xmlData[11].WsAvg.toFixed(2)
                    ];
                    var srData = [
                        xmlData[0].SrTotal.toFixed(2), xmlData[1].SrTotal.toFixed(2), xmlData[2].SrTotal.toFixed(2), xmlData[3].SrTotal.toFixed(2), 
                        xmlData[4].SrTotal.toFixed(2), xmlData[5].SrTotal.toFixed(2), xmlData[6].SrTotal.toFixed(2), xmlData[7].SrTotal.toFixed(2), 
                        xmlData[8].SrTotal.toFixed(2), xmlData[9].SrTotal.toFixed(2), xmlData[10].SrTotal.toFixed(2), xmlData[11].SrTotal.toFixed(2)
                    ]

                    function getwsSets(){
                        var wsDSet = {
                            label: "Wind Speed", yAxisID: 'Ws', data: wsData, backgroundColor:['rgba(54,162,235,0.6)'],
                            borderWidth: 5, borderColor: 'rgba(54,162,235,0.6)', tension: 0.4, fill: true
                        };
    
                        if(wind.prop("checked") === true){
                            return wsDSet;
                        }
                        else{
                            return {}
                        }
                        
                    }

                    function getsrSets(){
                        var srDSet = {
                            label: "Solar Radiation", yAxisID: 'Sr', data: srData, backgroundColor:['rgba(255,159,64,0.6)'],
                            borderWidth: 5, borderColor:'rgba(255,159,64,0.6)', tension: 0.4, fill: true
                        }

                        if(radiation.prop("checked") === true){
                            return srDSet;
                        }
                        else{
                            return {}
                        }
                    }
                    
                    if(myChart){//If there is chart
                        ctx.destroy();  //Destroy previous chart
                        
                        new Chart(ctx,  //Create new chart
                            {
                                type: "line",
                                data: {
                                    labels: requestedMonths,
                                    datasets: [getwsSets(), getsrSets()]
                                },
                                options: {
                                    bezierCurve: true,
                                    legend: {display: true},
                                    title: {
                                        display: true,
                                        text: 'Test'
                                    },
                                    scales:{
                                        Ws:{
                                            type: 'linear',
                                            position: 'left'
                                        },
                                        Sr:{
                                            type: 'linear',
                                            position: 'right',
                                            grid: {
                                                display: false
                                            },
                                            ticks: {
                                                max: 50,
                                                min: 0
                                            }
                                        }
                                    }
                                }
                            }); 
                    }
                    else{ //If no chart exist 
                        graphOutput.html('<h2 class="underline">Graph for '+ start.val() + ' to ' + end.val() + ' of year ' + year + '</h2>' + 
                        '<canvas id="myChart" style="width:100%;" hidden="hidden"></canvas>');
                        var myChart = document.getElementById("myChart");
                        myChart.removeAttribute("hidden");
                        var ctx =  myChart.getContext("2d");

                        new Chart(ctx,
                        {
                            type: "line",
                            data: {
                                labels: requestedMonths,
                                datasets: [getwsSets(), getsrSets()]
                            },
                            options: {
                                bezierCurve: true,
                                legend: {display: true},
                                title: {
                                    display: true,
                                    text: 'Test'
                                },
                                scales:{
                                    Ws:{
                                        type: 'linear',
                                        position: 'left'
                                    },
                                    Sr:{
                                        type: 'linear',
                                        position: 'right',
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            max: 50,
                                            min: 0
                                        }
                                    }
                                }
                            }
                        });  
                    }   
                }
                else{
                    graphOutput.attr("hidden", "hidden");
                } 
                //Auto scroll to bottom of page when result is out
                $('html, body').animate({ scrollTop: "1000px" });
                //Reset the form after data displayed
                form.reset();  
            }
        }
        xhr.open("POST", "/reqXml", true);  
        xhr.send(formData);

        
    }
    //If year is in between 2010 to 2016 execute this (JSON)
    else if(year == 2010 || year == 2011 || year == 2012 || year == 2013 
    || year == 2014 || year == 2015 || year == 2016){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //JSON data
                var jsonData = JSON.parse(xhr.responseText);

                //Check table checkbox
                if(table.prop("checked") === true){

                    //Display table
                    tableOutput.removeAttr("hidden");                    
                    // console.log(jsonData[0].Month);
                  
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

                    if(radiation.prop("checked") === true){ //If solar radiation checkbox is checked, generate sr data
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
                    tableOutput.html("<h2 class='underline'> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h2>" + tableData);
                }
                else{
                    tableOutput.attr("hidden", "hidden");                       
                }  
                if(graph.prop("checked") === true){ 
                    graphOutput.removeAttr("hidden");                   
                    var wsData = [
                        jsonData[0].WsAvg.toFixed(2), jsonData[1].WsAvg.toFixed(2), jsonData[2].WsAvg.toFixed(2), jsonData[3].WsAvg.toFixed(2), 
                        jsonData[4].WsAvg.toFixed(2), jsonData[5].WsAvg.toFixed(2), jsonData[6].WsAvg.toFixed(2), jsonData[7].WsAvg.toFixed(2), 
                        jsonData[8].WsAvg.toFixed(2), jsonData[9].WsAvg.toFixed(2), jsonData[10].WsAvg.toFixed(2), jsonData[11].WsAvg.toFixed(2)
                    ];
                    var srData = [
                        jsonData[0].SrTotal.toFixed(2), jsonData[1].SrTotal.toFixed(2), jsonData[2].SrTotal.toFixed(2), jsonData[3].SrTotal.toFixed(2), 
                        jsonData[4].SrTotal.toFixed(2), jsonData[5].SrTotal.toFixed(2), jsonData[6].SrTotal.toFixed(2), jsonData[7].SrTotal.toFixed(2), 
                        jsonData[8].SrTotal.toFixed(2), jsonData[9].SrTotal.toFixed(2), jsonData[10].SrTotal.toFixed(2), jsonData[11].SrTotal.toFixed(2)
                    ]

                    function getwsSets(){
                        var wsDSet = {
                            label: "Wind Speed", yAxisID: 'Ws', data: wsData, backgroundColor:['rgba(54,162,235,0.6)'],
                            borderWidth: 5, borderColor: 'rgba(54,162,235,0.6)', tension: 0.4, fill: true
                        };
    
                        if(wind.prop("checked") === true){
                            return wsDSet;
                        }
                        else{
                            return {}
                        }
                        
                    }

                    function getsrSets(){
                        var srDSet = {
                            label: "Solar Radiation", yAxisID: 'Sr', data: srData, backgroundColor:['rgba(255,159,64,0.6)'],
                            borderWidth: 5, borderColor:'rgba(255,159,64,0.6)', tension: 0.4, fill: true
                        }

                        if(radiation.prop("checked") === true){
                            return srDSet;
                        }
                        else{
                            return {}
                        }
                    }                  
                
                    if(myChart){//If there is chart
                        ctx.destroy();  //Destroy previous chart
                        
                        new Chart(ctx,  //Create new chart
                            {
                                type: "line",
                                data: {
                                    labels: requestedMonths,
                                    datasets: [getwsSets(), getsrSets()]
                                },
                                options: {
                                    bezierCurve: true,
                                    legend: {display: true},
                                    title: {
                                        display: true,
                                        text: 'Test'
                                    },
                                    scales:{
                                        Ws:{
                                            type: 'linear',
                                            position: 'left'
                                        },
                                        Sr:{
                                            type: 'linear',
                                            position: 'right',
                                            grid: {
                                                display: false
                                            },
                                            ticks: {
                                                max: 50,
                                                min: 0
                                            }
                                        }
                                    }
                                }
                            }); 
                    }
                    else{ //If no chart exist 
                        graphOutput.html('<h2 class="underline">Graph for '+ start.val() + ' to ' + end.val() + ' of year ' + year + '</h2>' 
                        + '<canvas id="myChart" style="width:100%;" hidden="hidden"></canvas>');
                        var myChart = document.getElementById("myChart");
                        myChart.removeAttribute("hidden");
                        var ctx =  myChart.getContext("2d");

                        new Chart(ctx,
                        {
                            type: "line",
                            data: {
                                labels: requestedMonths,
                                datasets: [getwsSets(), getsrSets()]
                            },
                            options: {
                                bezierCurve: true,
                                legend: {display: true},
                                title: {
                                    display: true,
                                    text: 'Test'
                                },
                                scales:{
                                    Ws:{
                                        type: 'linear',
                                        position: 'left'
                                    },
                                    Sr:{
                                        type: 'linear',
                                        position: 'right',
                                        grid: {
                                            display: false
                                        },
                                        ticks: {
                                            max: 50,
                                            min: 0
                                        }
                                    }
                                }
                            }
                        });  
                    }   
                }
                else{
                    graphOutput.attr("hidden", "hidden");
                }
                //Auto scroll to bottom of page when result is out
                $('html, body').animate({ scrollTop: "1000px" });
                //Reset the form
                form.reset();  
            }
        }
        xhr.open("POST", "/reqJson", true);  
        xhr.send(formData);
    }
});

//WindSpeed, SolarRadiation, Table and Graph check box validation
wind.on('click', function(){
    if(wind.prop("checked") === false && radiation.prop("checked") === false){
        $("#measurementsErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#measurementsErrMsg").html("");
    }
});

radiation.on('click', function(){
    if(wind.prop("checked") === false && radiation.prop("checked") === false){
        $("#measurementsErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#measurementsErrMsg").html("");
    }
});

table.on('click', function(){
    if(table.prop("checked") === false && graph.prop("checked") === false){
        $("#formatErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#formatErrMsg").html("");
    }
});

graph.on('click', function(){
    if(table.prop("checked") === false && graph.prop("checked") === false){
        $("#formatErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#formatErrMsg").html("");
    }
});

//Start month and end month validation
end.change(function(){
    if(monthNumber.indexOf(start.val()) > monthNumber.indexOf(end.val())){
        start.val(end.val());
    }
});

start.change(function(){
    if(monthNumber.indexOf(end.val()) < monthNumber.indexOf(start.val())){
        end.val(start.val());
    }
});