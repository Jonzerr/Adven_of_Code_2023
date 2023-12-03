import fs from 'fs';

const input = fs.readFileSync('src/day01/input.txt', 'utf8');
const inputArray = input.split('\n').map((line) => line.trim());


const dataPart1 :(number[] | undefined) [] = inputArray.map(line => line.match(/\d/g)?.map(Number));
function calibration(value :number[]) {
    let finalNumber  :number;
    
    if (value.length < 2){
        finalNumber = parseInt(value.toString() + value.toString() , 10);
    }
    else {
        const firstNumber :number = value[0];
        const lastNumber :number = value[value.length - 1];
        finalNumber =  parseInt(firstNumber.toString() + lastNumber.toString() , 10);
    }
    return finalNumber;
}

const resultPart1: number = dataPart1
    .filter((item): item is number[] => item !== undefined)
    .map(calibration)
    .reduce((sum :number, index :number) => sum + index, 0);


console.log('Result of part 1:', resultPart1);

// --- Part 2 --- //
const dataPart2 : string[] = inputArray;

const strNumber: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9
};

function findNumber(value: string){
    
    let firstWord :string = value[0];
    let lastWord :string = value[value.length - 1];
    let firstNumber :number = 0;
    let lastNumber :number = 0;

   outerLoop: for(let i = 0; i < value.length; i++){

        if (!isNaN(Number(firstWord[firstWord.length - 1]))){
            firstNumber =  parseInt(firstWord[firstWord.length - 1]);
            break;
        }
        for(let key in strNumber){
            if (firstWord.includes(key)){
                firstNumber =  strNumber[key];
                break outerLoop;
            }
        }
        firstWord += value[i+1]; 
    }
    let helperIndex = 0;
    outerLoop: for(let j = value.length - 1; j >= 0; j--){
       if(!isNaN(Number(lastWord[(lastWord.length - 1) - helperIndex]))){
            lastNumber = parseInt(lastWord[(lastWord.length - 1) - helperIndex]);
            break;
       } 
       for(let key in strNumber){
            if (lastWord.includes(key)){
                lastNumber =  strNumber[key];
                break outerLoop;
            }
       }
       lastWord = value[j-1] + lastWord;
       helperIndex ++;
    };

    return parseInt(firstNumber.toString() + lastNumber.toString() , 10);

};

 const resultPart2: number = dataPart2
    .map(findNumber)
    .reduce((sum :number, index :number) => sum + index, 0);

console.log('Result of part 2:', resultPart2 );



