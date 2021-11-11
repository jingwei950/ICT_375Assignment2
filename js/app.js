'use strict'

// const form = $("#myForm");
const form = document.querySelector("#myForm");
var wind = $("#wind");
var radiation = $("#radiation");
var start = $("#start");
var end = $("#end");

form.addEventListener("submit", function(e){ //When form is submitted
    e.preventDefault();
    
    var year = $("#year").val();
    var table = $("#table");
    var graph = $("#graph");
    var output = $("#output");

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    if(year == 2007 || year == 2008 || year == 2009){
        
        //console.log("Year selected is: " + year);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                //Display Title
                output.removeAttr("hidden");
                output.html("<h3> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h3>" + xhr.responseText);
                form.reset();         
            }
        }
        xhr.open("POST", "/reqXml", true);  
        xhr.send(formData);
    }
    else if(year == 2010 || year == 2011 || year == 2012 || year == 2013 
    || year == 2014 || year == 2015 || year == 2016){
        console.log("Year selected is: " + year);


        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
            xhr.responseText;
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

//Check box validation
wind.on('click', function(){
    if(wind.prop("checked") === false && radiation.prop("checked") === false){
        $("#dataErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#dataErrMsg").html("");
    }
});

radiation.on('click', function(){
    if(wind.prop("checked") === false && radiation.prop("checked") === false){
        $("#dataErrMsg").html("Please select at least 1 option").css("color", "red");
    }else{
        $("#dataErrMsg").html("");
    }
});

//Start month and end month validation
start.val()