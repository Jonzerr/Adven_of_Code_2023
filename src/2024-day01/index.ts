import fs from 'fs';

//console.time('executionTime');

const input: string = fs.readFileSync('src/2024-day01/input.txt', 'utf8');
const inputArray = input.split('\n').map((line) => line.split('   ').map(Number));

// PART 1   
const group1: number[] = inputArray.map(line => line[0]);
const group2: number[] = inputArray.map(line => line[1]);
const sortedGroup1: number[] = [...group1].sort((a, b) => a - b);
const sortedGroup2: number[] = [...group2].sort((a, b) => a - b);

const distances = sortedGroup1.map((value, index) => Math.abs(value - sortedGroup2[index]));
const resultPart1 = distances.reduce((a, b) => a + b);

console.log('Result of part 1:', resultPart1);

// PART 2:
const similarityScore = group1.map(value => value * countOccurrences(group2, value)).reduce((a, b) => a + b);
function countOccurrences(array: number[], target: number): number {
    return array.filter(element => element === target).length;
}

console.log('Result of part 2:', similarityScore);

//console.timeEnd('executionTime'); 