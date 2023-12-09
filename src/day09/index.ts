import fs from 'fs';

//console.time('executionTime');

const input: string = fs.readFileSync('src/day09/input.txt', 'utf8');
const inputArray: string[] = input.split('\n').map((line) => line.trim());

const oasisData: number[][] = inputArray.map((line) => line.split(' ').map(Number));

function predictionDataGenerator ( values: number[], type: string) {
    const predictions: number[] = [];
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    let d :number = 0;

    for(let i = 0; i < values.length - 1; i++) {
        predictions.push(values[i + 1] - values[i]);
    }
    if (!predictions.every(v => v === 0)){
        d =  predictionDataGenerator(predictions, type);
    } 
    if (type == 'first')
    {
        return firstValue - d;
    } else{
        return d + lastValue;
    }
}

const resultPart1 = oasisData.map(line => predictionDataGenerator(line, 'last')).reduce((sum,add)=>sum + add,0);

console.log('Result of part 1:', resultPart1);

/// --- Part 2 --- //
const resultPart2 = oasisData.map(line => predictionDataGenerator(line, 'first')).reduce((sum,add)=>sum + add,0);
console.log('Result of part 2:', resultPart2);

//