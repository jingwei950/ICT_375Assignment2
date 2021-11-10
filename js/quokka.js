// var wsArray = [];
// var srArray = [];
// var count = 0;

// var year = "2007";

// var monthNumber = ["january", "february", "march", "april", "may", "june", "july", "august", 
// "september", "october", "november", "december"];
// var start = "january";
// var end = "february";
// var startMonth = monthNumber.indexOf(start.toLowerCase());
// var endMonth = monthNumber.indexOf(end.toLowerCase());

// var startDate = new Date(year, startMonth, 1);
// var endDate = new Date(year, endMonth + 1, 0);
// var currentDate = new Date("01/01/2007");

// for(var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)){
// dataArray.forEach(obj =>{
//     console.log(obj.date);
//         if(obj.date.match(currentDate.toLocaleDateString("en-GB"))){
//             wsArray.push(Number(obj.windspeed));
//             srArray.push(Number(obj.radiation));
//             console.log(obj.windspeed);
//             console.log(obj.radiation);
//             count++;
//         }
//     });
// }
// function add (previousValue, currentValue){
//     return previousValue + currentValue
// };
// console.log(wsArray.reduce(add)/count);
// console.log(srArray.reduce(add)/count);

// var months = [1,2,3,4,5,6,7,8,9,10,11,12];
// var firstDay = new Date("2007", 0, 1);
// var count = 0;

// var monthIndex = ["january", "february", "march", "april", "may", "june", "july", "august", 
// "september", "october", "november", "december"];

// var inputStartM = "january";
// var inputEndM = "february";
// var year = "2007";
// var startMonth = monthIndex.indexOf(inputStartM.toLowerCase());
// var endMonth = monthIndex.indexOf(inputEndM.toLowerCase());

// var startDate = new Date(year, startMonth, 1);
// var endDate = new Date(year, endMonth + 1, 0);
// var currentDate = new Date("01/01/2007").toLocaleString();

// console.log(currentDate);


// var resultArray = [];

// for(var currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)){
//     console.log(currentDate);
    
// }

// var testDate = "01/01/2007";
// var mydate = new Date(testDate);
// console.log(mydate.toDateString());
// console.log(mydate.toLocaleDateString());
// console.log()
// if(mydate.toLocaleString().match("1/1/2007")){
//     console.log("match");
// };
// let options = {
//     year: '2-digit',
//     day: '2-digit',
//     month: '2-digit'
    
// };

// var results = dataArray.filter(function(e){
//     var convertDate = new Date(e.date).toLocaleDateString('en-AU');
//     var testDate1 = mydate.toLocaleDateString('en-US');
//     console.log(convertDate);
//     return e.date == testDate1;
// });
// console.log(results);


// console.log(dataArray[1].date);
// console.log(dataArray.length);


//TRY USING THIS
var dataArray = [
    {
        date: '01/01/2007',
        time: '16:30',
        windspeed: '3',
        radiation: '16',
    },
    {
        date: '01/01/2007',
        time: '16:30',
        windspeed: '4',
        radiation: '16',
    },
    {
        date: '01/01/2007',
        time: '16:30',
        windspeed: '5',
        radiation: '16',
    },
    {
        date: '02/02/2007',
        time: '16:30',
        windspeed: '2',
        radiation: '15',
    },
    {
        date: '03/02/2007',
        time: '17:30',
        windspeed: '11',
        radiation: '14',
    },
    {
        date: '20/03/2007',
        time: '18:30',
        windspeed: '4',
        radiation: '13',
    }

];
var monthNumber = ["january", "february", "march", "april", "may", "june", "july", "august", 
"september", "october", "november", "december"];
var start = "january";
var end = "february";
var startMonth = monthNumber.indexOf(start.toLowerCase()) + 1;
var endMonth = monthNumber.indexOf(end.toLowerCase()) + 1;
var count = 0;

var wsArray = [];
var sum = 0;
var calculation = 0;
for(var i = 0; i < dataArray.length; i++){
    if(dataArray[i].date.includes("/01/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }else if(dataArray[i].date.includes("/02/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/03/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/04/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/05/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/06/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/07/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/08/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/09/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/10/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/11/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    else if(dataArray[i].date.includes("/12/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
    }
    
}

console.log(sum);
calculation = sum/count;
wsArray.push({ Month : "Jan", AverageWS : calculation});
console.log(wsArray);
console.log(calculation);