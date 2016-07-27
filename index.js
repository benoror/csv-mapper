var tableToCsv = require('node-table-to-csv');
var convert = require('./convert');
var fs = require('fs');

var htmlTable = fs.readFileSync('./examples/santander.xls');

csv = tableToCsv(htmlTable);

console.log(csv);

csv2 = convert(htmlTable);

console.log(csv2);
