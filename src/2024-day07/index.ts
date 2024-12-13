import fs from 'fs';

//console.time('executionTime');

const input: string = fs.readFileSync('src/2024-day07/input.txt', 'utf8');
const inputArray: string[] = input.split('\n').map((line) => line.trim());

const testValues: number[] = []
const numbers: number[][]= [];
type operators = "+" | "*"| "||";

inputArray.forEach((line) => {
    const [key, value] = line.split(':');
    testValues.push(Number(key.trim()));
    numbers.push(value.trim().split(' ').map(Number));
});

const correctValues = testValues.filter((value,index)=>{
    const operators: operators[][] = generateOperators(numbers[index].length - 1)
    for( let i = 0; i < operators.length; i++){
        const result = applyOperators(numbers[index], operators[i]);
        if(result === value){{
             return value;
        }}
        
    }
}).reduce((sum,value) => sum + value, 0);

function applyOperators(numbers: number[], operators: operators[]): number {
    let result = numbers[0]; // Začneme s prvým číslom

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        } else {
            result = Number(result.toString() + numbers[i + 1].toString());
        }
    }

    return result;
}
function generateOperators(length: number){
    const combinations= [];
    const numCombinations: number = Math.pow(3, length); // 2^(n-1)
    for (let i = 0; i < numCombinations; i++) {
        // Konvertuj číslo na binárny reťazec
        const binaryString = i.toString(3).padStart(length, '0');

        // Nahraď `0` za `+` a `1` za `*`
        const operators: operators[] = binaryString.split('').map(bit => {
            if (bit === '0'){
                return '+';
            } else if (bit === '1'){
                return '*'}
            else return '||'});
        combinations.push(operators);
    }

    return combinations;
}


console.log('Result:', correctValues);


//console.timeEnd('executionTime'); 