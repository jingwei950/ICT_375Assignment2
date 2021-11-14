'use strict'
const form = document.querySelector("#myForm");
var wind = $("#wind");
var radiation = $("#radiation");
var start = $("#start");
var end = $("#end");
var table = $("#table");
var graph = $("#graph");
var allMonths = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug","Sep", "Oct", "Nov", "Dec"
];

//
form.addEventListener("submit", function(e){ //When form is submitted
    e.preventDefault();
    
    var year = $("#year").val();
    var tableOutput = $("#tableOutput");
    var graphOutput = $("#graphOutput");

    var monthNumber = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    

    var requestedMonths = [];
    //Process range of month from what user select
    for (var j = monthNumber.indexOf(start.val()); j <= monthNumber.indexOf(end.val()); j++) {
        requestedMonths.push(monthNumber[j]); //Store requested range of months into array
    }

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    //If year is in between 2007 to 2009 execute this
    if(year == 2007 || year == 2008 || year == 2009){
        console.log("Year selected is: " + year);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
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
                                if(item.SrAvg == undefined){ //If Ws contains undefined, show no data
                                    tableData += "<td>0</td>";
                                }
                                else{
                                    tableData += "<td>"+ item.SrAvg.toFixed(2) +"</td>"; //Round off to 2 decimal places
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
                    console.log(tableData);
                    tableOutput.html("<h3> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h3>" + tableData);                 
                }
                else{
                    tableOutput.attr("hidden", "hidden");  
                     
                }              
                
                //If graph checkbox is checked, display chart data
                if(graph.prop("checked") === true){ 
                    console.log("Graph checked")
                    graphOutput.removeAttr("hidden");                   
                    // graphOutput.html("<h3>Graph</h3>");
                    var wsData = [
                        xmlData[0].WsAvg, xmlData[1].WsAvg, xmlData[2].WsAvg, xmlData[3].WsAvg, 
                        xmlData[4].WsAvg, xmlData[5].WsAvg, xmlData[6].WsAvg, xmlData[7].WsAvg, 
                        xmlData[8].WsAvg, xmlData[9].WsAvg, xmlData[10].WsAvg, xmlData[11].WsAvg
                    ];
                    var srData = [
                        xmlData[0].SrAvg, xmlData[1].SrAvg, xmlData[2].SrAvg, xmlData[3].SrAvg, 
                        xmlData[4].SrAvg, xmlData[5].SrAvg, xmlData[6].SrAvg, xmlData[7].SrAvg, 
                        xmlData[8].SrAvg, xmlData[9].SrAvg, xmlData[10].SrAvg, xmlData[11].SrAvg
                    ]
                
                    if(myChart){//If there is chart
                        ctx.destroy();  //Destroy previous chart
                        
                        new Chart(ctx,  //Create new chart
                            {
                                type: "line",
                                data: {
                                    labels: requestedMonths,
                                    datasets: [{
                                        label: "Wind Speed",
                                        yAxisID: 'Ws',
                                        data: wsData,
                                        backgroundColor:[
                                            'rgba(54,162,235,0.6)'
                                        ],
                                        borderWidth: 1,
                                        // lineWidth: 5,
                                        borderColor: 'rgba(54,162,235,0.6)',
                                        tension: 0.4,
                                        fill: true
                                    },
                                    {
                                        label: "Solar Radiation",
                                        yAxisID: 'Sr',
                                        data: srData,
                                        backgroundColor:[
                                            'rgba(255,159,64,0.6)',
                                        ],
                                        borderWidth: 5,
                                        // lineWidth: 5,
                                        borderColor:'rgba(255,159,64,0.6)',
                                        tension: 0.4,
                                        fill: true
                                    }],
                                    
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
                        graphOutput.html('<h3>Graph</h3>' + '<canvas id="myChart" style="width:100%;" hidden="hidden"></canvas>');
                        var myChart = document.getElementById("myChart");
                        myChart.removeAttribute("hidden");
                        var ctx =  myChart.getContext("2d");

                        new Chart(ctx,
                        {
                            type: "line",
                            data: {
                                labels: requestedMonths,
                                datasets: [{
                                    label: "Wind Speed",
                                    yAxisID: 'Ws',
                                    data: wsData,
                                    backgroundColor:[
                                        'rgba(54,162,235,0.6)'
                                    ],
                                    borderWidth: 5,
                                    // lineWidth: 5,
                                    borderColor: 'rgba(54,162,235,0.6)',
                                    tension: 0.4,
                                    fill: true
                                },
                                {
                                    label: "Solar Radiation",
                                    yAxisID: 'Sr',
                                    data: srData,
                                    backgroundColor:[
                                        'rgba(255,159,64,0.6)'
                                    ],
                                    borderWidth: 5,
                                    // lineWidth: 5,
                                    borderColor:'rgba(255,159,64,0.6)',
                                    tension: 0.4,
                                    fill: true
                                }]
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
                //Reset the form after data displayed
                form.reset();  
            }
        }
        xhr.open("POST", "/reqXml", true);  
        xhr.send(formData);

        
    }
    //If year is in between 2010 to 2016 execute this
    else if(year == 2010 || year == 2011 || year == 2012 || year == 2013 
    || year == 2014 || year == 2015 || year == 2016){
        console.log("Year selected is: " + year);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //Check table checkbox
                var jsonData = JSON.parse(xhr.responseText);
                //Check table checkbox
                if(table.prop("checked") === true){
                    console.log("Table checked: " + true);
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
                                if(item.SrAvg == undefined){ //If Ws contains undefined, show no data
                                    tableData += "<td>0</td>";
                                }
                                else{
                                    tableData += "<td>"+ item.SrAvg.toFixed(2) +"</td>"; //Round off to 2 decimal places
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
                    console.log(tableData);
                    tableOutput.html("<h3> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h3>" + tableData);
                }
                else{ //For chart.js
                    console.log(jsonData);    
                    console.log("Table checked: " + false);                
                    graphOutput.attr("hidden");    
                    // console.log(jsonData.)                                 
                }
                //Reset the form
                form.reset();  
            }
        }
        xhr.open("POST", "/reqJson", true);  
        xhr.send(formData);
    }
    //Check wind speed checkbox
    // if(wind.prop("checked") === true && radiation.prop("checked") === true){
    //     sendReq();
    // }
    // else if(wind.prop("checked") === true){
    //     sendReq();
    // }
    // else if(radiation.prop("checked") === true){
    //     sendReq();
    // }
    // else{
    //     console.log("Please check at least 1");
    // }

    //Check solar radiation checkbox
    // if(radiation.prop("checked") === true){
    //     console.log("Solar radiation checked: " + true);
    // }
    // else{
    //     console.log("Solar radiation checked: " + false);
    // }

    //Get value of Year
    console.log(year);

    //Get start month
    console.log(start.val());

    //Get end month
    console.log(end.val());

    //Check table checkbox
    if(table.prop("checked") === true){
        console.log("Table checked: " + true);
    }
    else{
        console.log("Table checked: " + false);
    }

    //Check graph checkbox
    if(graph.prop("checked") === true){
        console.log("Graph checked: " + true);
    }
    else{
        console.log("Graph checked: " + false);
    }
});

//Chart.js data

//Check box validation
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
    if(allMonths.indexOf(start.val()) > allMonths.indexOf(end.val())){
        start.val(end.val());
    }
});

start.change(function(){
    if(allMonths.indexOf(end.val()) < allMonths.indexOf(start.val())){
        end.val(start.val());
    }
});
