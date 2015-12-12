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
stats.processAll([1, 2, 3, 4, 5]);
const results = stats.get();
\`\`\`

|Collector Type|Results|
|--------------|-------|`;

[
  'BaseStats', 'BasicNumberStats',
  'NumberStats', 'AdvancedNumberStats'
].forEach(function (c) {
  const stats = new lib[c]();
  stats.processAll([1, 2, 3, 4, 5]);
  const result = jsonMdTable(stats.get());
  newContent += `\n|${c}|${result}|`;
});
const re = RegExp(`${m1}(.|[\r\n])*${m2}`, 'g');
const output = input.replace(re, `${m1}${newContent}${m2}`);
fs.writeFileSync(readmeFilepath, output, 'utf-8');
