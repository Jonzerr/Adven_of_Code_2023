import fs from 'fs';

console.time('executionTime');

const input :string = fs.readFileSync('src/day*/inputSample.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());
let lowestLocation = Infinity;




console.log('hello world');
//console.log('Result of part 1:', resultPart1);
//console.log('Result of part 2:', resultPart2);

console.timeEnd('executionTime'); 