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
    var output = $("#output");

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    //If year is in between 2007 to 2009 execute this
    if(year == 2007 || year == 2008 || year == 2009){
        console.log("Year selected is: " + year);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //Check table checkbox
                if(table.prop("checked") === true){
                    console.log("Table checked: " + true);
                    //Display table
                    output.removeAttr("hidden");
                    output.html("<h3> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h3>" + xhr.responseText);
                }
                else{
                    output.attr("hidden", "hidden");
                    console.log("Table checked: " + false);
                }
                
                //Reset the form
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
                console.log(xhr.responseText);
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

    

    //Check graph checkbox
    if(graph.prop("checked") === true){
        console.log("Graph checked: " + true);
    }
    else{
        console.log("Graph checked: " + false);
    }
});

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
