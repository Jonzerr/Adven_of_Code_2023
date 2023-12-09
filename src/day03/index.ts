import fs from 'fs';

const input :string = fs.readFileSync('src/day03/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

const numbers = [];

function scanning (i:number, j :number){
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          if (
            x >= 0 &&
            x < inputArray.length &&
            y >= 0 &&
            y < inputArray[i].length &&
            (x !== i || y !== j)
          ) {
            const sign = inputArray[x][y];
            if (sign !== '.' && !/^\d+$/.test(sign)) {
                return true;
            }
          }
        }
    }
    return false;
}

for (let i = 0; i < inputArray.length; i++){
    for (let j = 0; j < inputArray[i].length; j++){
        
        let wholeNumber = inputArray[i][j]; 
        
        if (!isNaN(Number(wholeNumber))){
            
            let hasSign = scanning(i,j);
            
            for (let k = j + 1; k < inputArray[i].length; k++) {
            
                const nextNumber = inputArray[i][k];
                
                if (!isNaN(Number(nextNumber))) {
                    wholeNumber = wholeNumber + nextNumber;
                } else {
                    break;
                }
                
                if (!hasSign){
                    hasSign = scanning(i,k);
                }
            }
            
            if(hasSign){
                numbers.push(Number(wholeNumber));
            }

            j += wholeNumber.length - 1;
        }
    }
}

const resultPart1 = numbers.reduce((sum,add)=> sum + add,0);

console.log('Result of part 1:', resultPart1);

// --- Part 2 --- //
let sumAllGearRatio :number = 0;

for (let i = 0; i < inputArray.length; i++){
    for (let j = 0; j < inputArray[i].length; j++){
        let current :string = inputArray[i][j];
        if(current === '*'){
            const numbers :number[][] = scan(i,j);
            let fNumber :number[] = [];
        for (const num of numbers){
            addUniqueNumber(fNumber, fillNumber([num[0],num[1],num[2]]));
        }
        if(fNumber.length > 1){
            const gearRatio :number = fNumber[0] * fNumber[1];
            sumAllGearRatio += gearRatio;
        }
       }
    }
}
console.log('Result of part 2:', sumAllGearRatio);
function scan (i:number, j :number){
    let findingNumbers : number[][] = [];
    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          if (
            x >= 0 &&
            x < inputArray.length &&
            y >= 0 &&
            y < inputArray[i].length &&
            (x !== i || y !== j)
          ) {
            const sign = inputArray[x][y];
            if (!isNaN(Number(sign))) {
                findingNumbers.push([Number(sign), x , y]);
            }
          }
        }
    }
    return findingNumbers;
}

function fillNumber ([num, x, y]: [number, number, number]) {
    let n: string = num.toString();
    if(y >= 0 && y < inputArray[0].length ){
        let left = 1;
        let right = 1;
        let nL = parseInt(inputArray[x][y-left]);
        let nR = parseInt(inputArray[x][y+right]);
        while(!isNaN(nL)){
            n = nL + n;
            left ++;
            if(y-left >= 0 && y < inputArray[0].length ){
                nL= Number(inputArray[x][y-left]);
            } else{
                break;
            }
        }
        while(!isNaN(nR)){
            n = n + nR;
            right ++;
            if(y+right >= 0 && y < inputArray[0].length ){
                nR= Number(inputArray[x][y+right]);
            } else{
                break;
            }
        }      
    }
    return Number(n);
}

function addUniqueNumber(arr: number[], num: number): void {
    if (arr.indexOf(num) === -1) {
        arr.push(num);
    }
}