import fs from 'fs';

console.time('executionTime');

const input :string = fs.readFileSync('src/day07/inputSample.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());
let lowestLocation = Infinity;

// parsing input
const listOfHands :[string, number][]= inputArray.map((line) => {
    const array = line.split(' ');
    return [array[0], Number(array[1])];
});


const strengthOfCards :string[] = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];

// find out the type: fife of a kind = 6 ... High card = 0,
    


//the first step is to put the hands in order of strength:
//adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.


console.log(listOfHands);
//console.log('Result of part 1:', resultPart1);
//console.log('Result of part 2:', resultPart2);

console.timeEnd('executionTime'); 