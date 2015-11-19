/*eslint strict:0 */
'use strict';

const fs = require('fs');
const lib = require('../lib/index');
const readmeFilepath = './README.md';
const m1 = '### Example Output\n\n';
const m2 = '\n\n\n### API Documentation';
const input = fs.readFileSync(readmeFilepath, 'utf-8');
const jsonMdTable = function (obj) {
  return JSON.stringify(obj, null, '@')
    .replace(/@/g, '&nbsp;')
    .replace(/\n/g, '<br />');
};

let newContent = `The following table shows you the results of initializing a
stats collector, then running the following statments:

\`\`\`javascript
statsCollector.update([1, 2, 3, 4, 5]);
const results = statsCollector.get();
\`\`\`

|Collector Type|Results|
|--------------|-------|`;

[
  'BaseStatsCollector', 'BasicStatsCollector',
  'StatsCollector', 'AdvancedStatsCollector'
].forEach(function (c) {
  const statCollector = new lib[c]();
  statCollector.update([1, 2, 3, 4, 5]);
  const result = jsonMdTable(statCollector.get());
  newContent += `\n|${c}|${result}|`;
});
const re = RegExp(`${m1}(.|[\r\n])*${m2}`, 'g');
const output = input.replace(re, `${m1}${newContent}${m2}`);
fs.writeFileSync(readmeFilepath, output, 'utf-8');
