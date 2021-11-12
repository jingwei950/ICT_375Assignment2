// table[1][1].push("<td>hi</td>");

// var table1 = [
//     //[0][0]
//     ['<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th><th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>'],
//     //[1][0] WindSpeed
//     [
//         ['<tr><td>WindSpeed</td>'],
//         ['<td>2</td>'],
//         ['<td>2</td>'],
//         ['<td>3</td>'],
//         ['<td>4</td>'],
//         ['<td>5</td>'],
//         ['<td>6</td>'],
//         ['<td>7</td>'],
//         ['<td>8</td>'],
//         ['<td>9</td>'],
//         ['<td>10</td>'],
//         ['<td>11</td>'],
//         ['<td>12</td>'],
//         ['</tr>']
//     ],
//     //[2][0] Solar Radiation
//     [
//         ['<tr><td>Solar Radiation</td>'],
//         ['<td>1</td>'],
//         ['<td>2</td>'],
//         ['<td>3</td>'],
//         ['<td>4</td>'],
//         ['<td>5</td>'],
//         ['<td>6</td>'],
//         ['<td>7</td>'],
//         ['<td>8</td>'],
//         ['<td>9</td>'],
//         ['<td>10</td>'],
//         ['<td>11</td>'],
//         ['<td>12</td>'],
//         ['</tr>']
//     ]
// ];

// console.log(table.map(function(item){
//     return item.join(''); 
// }).join(''));

//After generated
//No Mar and Apr in avrArray
// var  avgArray = [
//     {
//         Month: 'Jan',
//         Count: 1,
//         WsAvg: 6,
//         WsSum: 6,
//         SrAvg: 447,
//         SrSum: 447
//       },
//       {
//         Month: 'Feb',
//         Count: 2,
//         WsAvg: 7.5,
//         WsSum: 15,
//         SrAvg: 171,
//         SrSum: 342
//       },
//       {
//         Month: 'May',
//         Count: 4,
//         WsAvg: 13.5,
//         WsSum: 54,
//         SrAvg: 171,
//         SrSum: 684
//       },
//       {
//         Month: 'Jun',
//         Count: 3,
//         WsAvg: 10,
//         WsSum: 30,
//         SrAvg: 171,
//         SrSum: 513
//       },
//       {
//         Month: 'Jul',
//         Count: 4,
//         WsAvg: 13.5,
//         WsSum: 54,
//         SrAvg: 171,
//         SrSum: 684
//       },
//       {
//         Month: 'Aug',
//         Count: 4,
//         WsAvg: 13.5,
//         WsSum: 54,
//         SrAvg: 171,
//         SrSum: 684
//       }
//     ];

// var requestedMonths = ['Feb', 'Mar', 'Apr', 'May'];
// var allMonths = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
//     "Jul", "Aug","Sep", "Oct", "Nov", "Dec"
// ];
// var table = [
//     //[0][0]
//     ['<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th><th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>'],
//     //[1][0] WindSpeed
//     [
//         '<tr><td>WindSpeed</td>'
        
//     ],
//     //[2][0] Solar Radiation
//     // [
//     //     '<tr><td>Solar Radiation</td>'
//     // ]
// ];

// // console.log(avgArray);

// var test = avgArray.filter(function (item) {
//     // if(allMonths == requestedMonths){
//         // if (requestedMonths.includes(item.Month)) {
//         //     table[1].push("<td>" + item.WsAvg + "</td>");
//         //     console.log(item.WsAvg);
//         // } else {
//         //     table[1].push("<td></td>");
//         //     // console.log("<td></td>");
//         // };
//     // }
    
//     if (requestedMonths.includes(item.Month)) {
//         console.log(item.Month);
//         for(var i = 0; i < allMonths.length; i++){
//             if(allMonths[i] != item.Month){
//                 console.log("empty data")
//                 table[1].push("<td></td>");
//             }
//             else{
//                 table[1].push("<td>" + item.WsAvg + "</td>");
//             }
//         }
        
//     }

// });

// console.log(table);
// table += '</tr>';

// table += '<tr><td>Solar Radiation</td>';
// avgArray.filter(function (item) {

//     if (requestedMonths.includes(item.Month)) {
//         table += "<td>" + item.SrAvg.toFixed(2) + "</td>";
//         console.log("<td>" + item.SrAvg + "</td>");
//     } else {
//         table += "<td></td>";
//         console.log("<td></td>");
//     };
//     return
// });
// table += "</tr></table>"
// console.log(table);


var requestedRec = [
    {Month: 'Jan', Ws:4, Sr: 23},
    {Month: 'Jan', Ws:4, Sr: 23},
    {Month: 'Jan', Ws:4, Sr: 23},
    {Month: 'Feb', Ws: 3, Sr: 34},
    {Month: 'Feb', Ws: 3, Sr: 34},
    {Month: 'Mar', Ws: 0, Sr: 0 },
    {Month: 'Mar', Ws: 0, Sr: 0 },
    {Month: 'Apr', Ws: 0, Sr: 0 },
    {Month: 'Apr', Ws: 0, Sr: 0 },
    {Month: 'May', Ws: 3, Sr: 34},
    {Month: 'May', Ws: 3, Sr: 34},
    {Month: 'Jun', Ws: 4, Sr: 30},
    {Month: 'Jul', Ws: 4, Sr: 30},
    {Month: 'Aug', Ws: 4, Sr: 30},
    {Month: 'Sep', Ws: 4, Sr: 30},
    {Month: 'Oct', Ws: 4, Sr: 30},
    {Month: 'Nov', Ws: 4, Sr: 30},
    {Month: 'Dec', Ws: 4, Sr: 30},

]
let avgArray = [];
requestedRec.reduce(function (res, {Month, Ws, Sr}) {
    //If there is no month exist in array push empty record
    if (!res[Month]) {
        res[Month] = {
            Month: Month,
            Count: 0,
            WsAvg: 0,
            WsSum: 0,
            SrAvg: 0,
            SrSum: 0
        };
        avgArray.push(res[Month]);
    }
    //If there is month exist append these
    res[Month].Count += 1;
    res[Month].WsSum += Ws;                            
    res[Month].WsAvg = res[Month].WsSum / res[Month].Count;
    res[Month].SrSum += Sr;
    res[Month].SrAvg = res[Month].SrSum / res[Month].Count
    return res;
}, {});

console.log(avgArray);
var table = '<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>'
+ '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>';
table += '<tr><td>Wind Speed</td>';

var requestedMonths = ['Feb', 'Mar', 'Apr', 'May']

avgArray.filter(function(item) {
    if(requestedMonths.includes(item.Month)){
        table += "<td>"+ item.WsAvg.toFixed(2) +"</td>";
        console.log("<td>"+ item.WsAvg +"</td>");
    }
    else{
        table += "<td></td>";
        console.log("<td></td>");
    };
});
table += '</tr>';

console.log(table);


const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const array1 = [{Month: 'Jan', WsAvg: 10, SrAvg: 10},{Month: 'Feb', WsAvg: 20, SrAvg: 20},
{Month: 'May', WsAvg: 50, SrAvg: 50},{Month: 'Jun', WsAvg: 60, SrAvg: 60}];

const result = months.map( m => array1.find(a => a.Month === m)??{Month: m, Avg: 0});

console.log(result);

const result1 = months.map(function(m){
    return array1.find(function(a){ 
        if(a.Month != undefined && a.Month != null){
            return a.Month === m
        }
    })||{Month: m, WsAvg: 0, SrAvg: 0} //if return undefined make 
});

console.log(result1);