import fs from 'fs';

//console.time('executionTime');
const input: string = fs.readFileSync('src/2024-day03/input.txt', 'utf8');

const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
const regexPart2 = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g;
const mulInstructions = [...input.matchAll(regex)];
const instructions = [...input.matchAll(regexPart2)];

const result = mulInstructions.reduce((acc, match) => {
    const num1 = +match[1];
    const num2 = +match[2];
    return acc + (num1 * num2);
}, 0); // Inicializácia akumulátora na 0

console.log('Result of part 1:', result);

// --- Part 2 --- //
let handler = true;
let resultPart2 = 0;

instructions.forEach( group => {
    const [instruction, num1, num2] = group;
    if (instruction == 'do()') handler = true;  
    if (instruction == 'don\'t()') handler = false;
    if (instruction.startsWith('mul') && handler == true) resultPart2 += (+num1 * +num2);        
});

console.log('Result of part 2:', resultPart2);

//console.timeEnd('executionTime'); 