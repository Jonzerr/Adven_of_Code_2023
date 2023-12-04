import fs from 'fs';

const input :string = fs.readFileSync('src/day04/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

const positionOfDivider = inputArray[0].indexOf('|');
const scratchcards: number[] = Array(inputArray.length).fill(1);

const winningsNumbers = inputArray.map((line) => line
.slice(line.indexOf(':') + 2, positionOfDivider - 1)
.split(' ').filter(str => str !== '').map(Number)
);

const myNumbers = inputArray.map((line) => line
    .slice(positionOfDivider + 1).split(' ').filter(str => str !== '').map(Number)
);

let points :number = 0;

for (let i = 0; i < myNumbers.length; i++){

    let winNumbers :number = 0;

    for(let num of myNumbers[i]){
        if (winningsNumbers[i].includes(num)){
            winNumbers ++;
        }
    }

    // logic part 1
    if (!(winNumbers === 0)){
        points += 2 ** (winNumbers - 1);
    }

    // logic part 2
    for (let j = i; j < i + winNumbers ; j++){
        scratchcards[j + 1]  += scratchcards[i];
    }
}
const totalScratchcards = scratchcards.reduce((sum,add)=>sum + add,0);



console.log('Result of part 1:', points);
console.log('Result of part 2:', totalScratchcards);