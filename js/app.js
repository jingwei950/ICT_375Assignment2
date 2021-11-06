'use strict'

// const form = $("#myForm");
const form = document.querySelector("#myForm");

form.addEventListener("submit", function(e){ //When form is submitted
    e.preventDefault();
    var wind = $("#wind");
    var radiation = $("#radiation");
    var year = $("#year").val();
    var start = $("#start");
    var end = $("#end");
    var table = $("#table");
    var graph = $("#graph");
    var output = $("#output");

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    if(year == 2007 || year == 2008 || year == 2009){
        
        //console.log("Year selected is: " + year);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                xhr.responseText;
                
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

    //Display Title
    output.removeAttr("hidden");
    output.html("<h3> Data for "+ start.val() + " to " + end.val() + " of year " + year + "</h3>")
    

});

// function sendReq(){
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState == 4 && xhr.status == 200){
//         xhr.responseText;
//         }
//         else{
//         //Run function errorMessage() for displaying error user input messages
//         }
//     }
//     xhr.open("GET", "/", true);  
//     xhr.send();
// }



