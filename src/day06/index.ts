import fs from 'fs';

console.time('executionTime');

const input :string = fs.readFileSync('src/day06/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

const regex = /\d+/g;

const times :number[] = (inputArray[0].match(regex) || []).map(Number);
const distances :number[] = (inputArray[1].match(regex) || []).map(Number);
const recordBeaten :number[] = [];

function race (time :number, distance :number){
    let numberOfWaysToWin = 0;
    for (let i = 0; i < time ; i++) {
        
        const speed :number = i;
        const remainingTime :number = time - i;
        const actualDistance :number = speed * remainingTime;
        
        actualDistance > distance ? numberOfWaysToWin ++ : 0;
    }
    return numberOfWaysToWin;
}


for (let i = 0; i < times.length; i++) {
    recordBeaten.push(race(times[i], distances[i]));
}

const resultPart1 :number = recordBeaten.reduce((accumulator, currentValue) => accumulator * currentValue, 1);

console.log('Result of part 1:', resultPart1);

// --- part 2 --- //
const time :number = parseInt(times.join(''));
const distance :number = parseInt(distances.join(''));

console.log('Result of part 2:', race(time,distance));

console.timeEnd('executionTime');