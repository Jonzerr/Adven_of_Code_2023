import fs from 'fs';

console.time('executionTime');

const input :string = fs.readFileSync('src/day08/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

const instructions :number[] = inputArray.
        slice(0,1)
        .flatMap((line) => line.split(''))
        .map((line) => line === 'L'? 0:1);

const regex :RegExp = /(\w+)\s*=\s*\((\w+),\s*(\w+)\)/;

const elements: { [key: string]: string[] } = inputArray
    .slice(2)
    .reduce((result, line) => {
        const match = line.match(regex);
        if (match !== null) {
            const [, key, value1, value2] = match;
            result[key] = [value1, value2];
        }
        return result;
        }, {} as { [key: string]: string[] });

let steps: number = 0;
let element: string = 'AAA';

do {
    const index: number =  steps % instructions.length; 
    const operator: number = instructions[index];
    element = elements[element][operator];
    steps ++;
} while (element !== 'ZZZ'); 


console.log('Result of part 1:', steps);

// --- part 2 --- //
let stepsOfNodes: number[] = Object.keys(elements)
    .filter(line => line[2] === 'A')
    .map(line => stepsFinder(line));

const resultPart2: number = lcmArray(stepsOfNodes);
function stepsFinder (start: string){
    let steps: number = 0;
    let node: string = start; 
    do {
        const index: number =  steps % instructions.length; 
        const operator: number = instructions[index];
        node = elements[node][operator]; 
        steps++; 
    } while ('Z' !== node[2]);
    return steps;
}

function gcd(a: number, b: number) {
    if (b === 0){
        return a;
    }
    return gcd(b, a % b);
}

function lcm(a: number, b: number){
    return Math.abs(a * b) / gcd(a, b);
}

function lcmArray(numbers: number[]){
    let result = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        result = lcm(result, numbers[i]);
    }
    return result;
}

console.log('Result of part 2:', resultPart2);

console.timeEnd('executionTime'); 