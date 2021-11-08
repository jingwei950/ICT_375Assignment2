//Array if month
var monthNumber = ["january", "february", "march", "april", "may", "june", "july", "august", 
"september", "october", "november", "december"];

//User select start and end months
var userStartM = "january"; //Jan
var userEndM = "february";   //Feb

//Year
var year = 2007;

//Get the index of the month in array monthNumber
var startMonth = monthNumber.indexOf(userStartM.toLowerCase());
var endMonth = monthNumber.indexOf(userEndM.toLowerCase());

//Convert date to dd/mm/yyyy
var s = new Date(year, startMonth, 1);
var e = new Date(year, endMonth + 1, 0);
// var s = new Date(year, startMonth, 1).toLocaleDateString("en-GB");
// var e = new Date(year, endMonth + 1, 0).toLocaleDateString("en-GB");


//Array for storing dates
var daysOfYear = [];

console.log(s);
console.log(e);

console.log(s.getDate());

for (s; s <= e; s.setDate(s.getDate() + 1)) {
    daysOfYear.push(new Date(s));
}
console.log(daysOfYear);

var numbers = ['10.1111', '10', '30', '40']; 
var sum = 0;
for (var i = 0; i < numbers.length; i++){  
    sum += parseFloat(numbers[i]);
}
console.log(sum);
// var month = 0; // Jan
// var month2 = 1; // Feb
// var year = 2007
// var d = new Date(year, month, 1);
// var e = new Date(year, month2 + 1, 0);
// // console.log("Start date: " + d.toString());
// // console.log("End date: " + e.toString());
// console.log("Start date: " + d.toLocaleDateString('en-GB'));
// console.log("End date: " + e.toLocaleDateString('en-GB'));