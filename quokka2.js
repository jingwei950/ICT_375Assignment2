var requestedMonths = ['Jan', 'Feb'];
var table = '<table id="data"><tr><th></th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th>'
+ '<th>Jul</th><th>Aug</th><th>Sep</th><th>Oct</th><th>Nov</th><th>Dec</th></tr>';

// for(var k = 0; k < requestedMonths.length; k++){
    
//     if(requestedMonths[k] == avgArray[k].Month){
//         table += "<td>" + avgArray[k].WsAvg.toFixed(2) + "</td>";
//     }
//     else{
//         table += "<td></td>";
//     }
// }

// table += '</tr><tr><td>Solar Radiation</td>';
// for(var k = 0; k < requestedMonths.length; k++){
    
//     if(requestedMonths[k] == avgArray[k].Month){
//         table += "<td>" + avgArray[k].SrAvg.toFixed(2) + "</td>";
//     }
//     else{
//         table += "<td></td>";
//     }
// }
// table += '</table>';
// console.log(table);


var requestedMonths = ['Feb', 'Mar', 'Apr', 'May'],
//No Mar and Apr in avrArray
    avgArray = [
        {
            Month: 'Jan',
            Count: 1,
            WsAvg: 6,
            WsSum: 6,
            SrAvg: 447,
            SrSum: 447
          },
          {
            Month: 'Feb',
            Count: 2,
            WsAvg: 7.5,
            WsSum: 15,
            SrAvg: 171,
            SrSum: 342
          },
          {
            Month: 'May',
            Count: 4,
            WsAvg: 13.5,
            WsSum: 54,
            SrAvg: 171,
            SrSum: 684
          },
          {
            Month: 'Jun',
            Count: 3,
            WsAvg: 10,
            WsSum: 30,
            SrAvg: 171,
            SrSum: 513
          },
          {
            Month: 'Jul',
            Count: 4,
            WsAvg: 13.5,
            WsSum: 54,
            SrAvg: 171,
            SrSum: 684
          },
          {
            Month: 'Aug',
            Count: 4,
            WsAvg: 13.5,
            WsSum: 54,
            SrAvg: 171,
            SrSum: 684
          },
    ];

table += '<tr><td>Wind Speed</td>';
avgArray.filter(function(item) {
    if(requestedMonths.includes(item.Month)){
        table += "<td>"+ item.WsAvg +"</td>";
        console.log("<td>" + item.Month + " " + item.WsAvg +"</td>");
    }
    else{
        table += "<td></td>";
        console.log("<td></td>");
    };
});
table += '</tr>';

table += '<tr><td>Wind Speed</td>';
requestedMonths.filter(function(item) {
    if(avgArray.includes(item.Month)){
        table += "<td>"+ item.WsAvg +"</td>";
        console.log("<td>" + item.Month + " " + item.WsAvg +"</td>");
    }
    else{
        table += "<td></td>";
        console.log("<td></td>");
    };
});
table += '</tr>';

// table += '<tr><td>Solar Radiation</td>';
// avgArray.filter(function(item) {
    
//     if(requestedMonths.includes(item.Month)){
//         table += "<td>"+ item.SrAvg +"</td>";
//         console.log("<td>" + item.Month + " " + item.SrAvg +"</td>");
//     }
//     else{
//         table += "<td></td>";
//         console.log("<td></td>");
//     };
//     return  
// });
// table += "</tr></table>"
// console.log(table);
