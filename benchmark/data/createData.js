'use strict';
const fs = require('fs');

function writeData(num) {
  const arr = [];
  for (let i = 0; i <= num; i++) {
    arr.push(Math.random());
  }
  fs.writeFileSync(
    `${__dirname}/data${num}.json`,
    JSON.stringify(arr, null, '  '),
    'utf-8'
  );
}

writeData(10);
writeData(1000);
