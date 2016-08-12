var fs = require('fs');
var dat = fs.readFileSync('read.txt', {encoding:'utf8'});
console.log(dat);


//Async

console.log(2);
fs.readFile('read.txt', {encoding:'utf8'}, function(err, data){
  console.log(3);
  console.log(data);
})

console.log(4);
