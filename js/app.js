'use strict'
// $( document ).ready(function(){
//     console.log("ready");
// });

var button = $("#submit");
var wind = $("#wind");
var radiation = $("#radiation");
var year = $("#year");
var start = $("#start");
var end = $("#end");
var table = $("#table");
var graph = $("#graph");
const form = $("#myForm");

form.on("submit", function(e){ //When form is submitted
    e.preventDefault();

    //Check wind speed checkbox
    if(wind.prop("checked") === true){
        console.log("Wind speed checked: " + true);
    }
    else{
        console.log("Wind speed checked: " + false);
    }

    //Check solar radiation checkbox
    if(radiation.prop("checked") === true){
        console.log("Solar radiation checked: " + true);
    }
    else{
        console.log("Solar radiation checked: " + false);
    }

    //Get value of Year
    console.log(year.val());

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

  var formData = new FormData(form);
  console.log(formData);
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function(){
//     if(xhr.readyState == 4 && xhr.status == 200){
//       document.getElementById("message").innerHTML = xhr.responseText; //Display success message retrieved from server
//       document.getElementById("myForm").reset();                       //Reset the whole form after success message retrieved
//     }
//     else{
//       document.getElementById("message").innerHTML = "<span style='background-color: red'> Error submitting!"
//       + " Please check again and make sure form is filled</span>"
//       errorMessage(); //Run function errorMessage() for displaying error user input messages
//     }
//   }
//   xhr.open("POST", "/addstud", true);  
//   xhr.send(formData);
});





