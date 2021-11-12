var array = [{
    Username: 'user1',
    Balance: '123',
    Another: '222'
  }, {
    Username: 'user2',
    Balance: '213',
    Another: '111'
  }, {
    Username: 'user1',
    Balance: '424',
    Another: '121'
  }]
  
  // Add elements to this array if you need to handle more properties
  var properties = ['Balance', 'Another']
  
  var map = array.reduce(function (map, e) {
    map[e.Username] = properties.map(function (property, i) {
      return +e[property] + ((map[e.Username] || [])[i] || 0)
    })
    return map
  }, {})
  
  var result = Object.keys(map).map(function (k) {
    return map[k].reduce(function (object, e, i) {
      object[properties[i]] = e
      return object
    }, { Username: k })
  })
  
  console.log(result)

  const totalProduct = [{name: "A", string: "Hello"}, {name: "A", string: "Hello"}, {name: "B", string: "Hey"}];

let counts = {};
for (const i in totalProduct) {
  const nameObject = totalProduct[i].name;
  const stringObject = totalProduct[i].string;
  const prevObj = counts[nameObject]
  counts[nameObject] = [(prevObj ? prevObj[0] : 0) + 1, stringObject];
}
console.log(counts);



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

var monthlyArray = [];
var sum = 0;
var calculation = 0;
for(var i = 0; i < dataArray.length; i++){
    if(dataArray[i].date.includes("/01/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
        monthlyArray.push({Month: 'Jan', ws: Number(dataArray[i].windspeed)});
    }else if(dataArray[i].date.includes("/02/")){
        console.log("match");
        count++;
        console.log(dataArray[i].windspeed);
        sum += Number(dataArray[i].windspeed);
        monthlyArray.push({Month: 'Feb', ws: Number(dataArray[i].windspeed)});
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
// monthlyArray.push({ Month : "Jan", AverageWS : calculation});
// console.log(monthlyArray[]);
console.log(monthlyArray);
console.log(calculation);


var array = [
    {
        Month: 'jan',
        ws: 3
    }, 
    {
        Month: 'jan',
        ws: 1
    }, 
    {
        Month: 'apr',
        ws: 1
    },
];
  
  var val = array.reduce(function(previousValue, currentValue) {
    console.log({Month: previousValue.Month = currentValue.Month});
    console.log({Month: currentValue.Month});
    return {
        Month: previousValue.Month = currentValue.Month,
        ws: previousValue.ws + currentValue.ws 
    }
  });
  console.log(val);

console.log(val.ws / monthlyArray.length);
console.log(val.Month == 'Feb');
console.log(monthlyArray);


const people = [{name:'Sarah', gender:'female', age:25}, {name:'Tom', gender:'male', age:18}, {name:'Tim', gender:'male', age:65}, {name:'Kim', gender:'female', age:58}];

const females = people.filter(person => person.gender === 'female');

const average = females.reduce((total, next) => total + next.age, 0) / females.length;

console.log(females)
console.log(average);


var arrayObj = {
    weather:{
        record:[{
            date: ['01/01/2007'],
            month: ['Jan'],
            ws: ['6'],
            sr: ['9']
        },
        {
            date: ['01/01/2007'],
            month: ['Jan'],
            ws: ['7'],
            sr: ['10']
        },
        {
            date: ['01/02/2007'],
            month: ['Feb'],
            ws: ['5'],
            sr: ['8']
        },
        {
            date: ['01/02/2007'],
            month: ['Feb'],
            ws: ['4'],
            sr: ['7']
        }]
    }
};

var records = arrayObj.weather.record;
console.log(records[0].date[0]);

console.log(records.length);

for(var j = 0; j < records.length; j++){
    if(records[j].date[0].includes("/01/")){
        console.log("match");
    }else{
        console.log("dont match");
    }
}


for(var i = 0; i < arrayObj.length; i++){
    if(arrayObj[i].date.includes('/01/')){
        console.log("match");
    }
    else{
        console.log("Don't match")
    }
}




let testArray = [
    { Month: 'Jan', ws: '10' },
    { Month: 'Apr', ws: '20' },
    { Month: 'Jan', ws: '10' },
    { Month: 'Apr', ws: '20' },
    { Month: 'Jan', ws: '10' },
    { Month: 'Apr', ws: '20' },
  ];
  

  let resultObj = testArray.reduce((result, item) => {
    console.log(result[item.Month] = (result[item.Month] || 0) + (Number(item.ws) || 0));
    return result;
  }, {});

  console.log(resultObj);
  
  let resultArray = Object.getOwnPropertyNames(resultObj).map(Month => {
      console.log(count)
    return {Month, ws: resultObj[Month]}
  })
  
  console.log(resultArray);

  var wsAvg = [];
  var count = 0;
  var sum = 0;
  for(var k = 0; k < testArray.length; k++){
      if(testArray[k].Month.includes('Jan')){
        count++;
        console.log(Number(testArray[k].ws));
        sum += Number(testArray[k].ws);
        console.log("match");
      }
      else if(testArray[k].Month.includes('Apr')){
        count++;
        console.log(Number(testArray[k].ws));
        sum += Number(testArray[k].ws);
        console.log("match");
      }
  }
wsAvg.push({Month:'Jan', WsAvg: sum/count});
wsAvg.push({Month:'Apr', WsAvg: sum/count});
console.log(wsAvg);


let arr = [
    [ 2020, 1, 2, 1058 ],
    [ 2020, 1, 8, 1055 ],
    [ 2020, 1, 12, 1058 ],
    [ 2020, 1, 23, 1049 ],
    [ 2020, 1, 24, 1050 ],
    [ 2020, 1, 29, 1057 ],
    [ 2020, 2, 1, 1088 ],
    [ 2020, 2, 5, 1087 ],
    [ 2020, 2, 13, 1101 ],
    [ 2020, 2, 26, 1108 ],
    [ 2020, 4, 25, 1119 ],
    [ 2020, 8, 24, 1178 ],
    [ 2020, 8, 25, 1196 ],
    [ 2020, 9, 29, 1214 ],
    [ 2020, 9, 31, 1230 ],
    [ 2020, 10, 20, 1259 ],
    [ 2020, 11, 18, 1276 ]
  ];
  console.log(arr);
  let result1 = [];
  let result2 = arr.reduce((res, [year, month, day, value]) => {
    if (!res[month]) {
      res[month] = { month: month, avg: 0, count: 0, sum: 0 };
      result1.push(res[month])//remove this if you are satisfied with the result in result2;
    }
    res[month].sum += value;
    res[month].count +=1;
    res[month].avg = res[month].sum/res[month].count;
    return res;
  } , {});
  console.log('array of objects {[month, sum, count, avg]}', result1);
  console.log('object with values {month: {month, sum, count, avg}}', result2);

