import * as fs from 'fs';

const input :string = fs.readFileSync('src/day05/input.txt', 'utf8');
const inputArray :string[] = input.split('\r\n\r\n').map((line) => line.trim());


const seeds = inputArray.slice(0,1).flatMap(line => line.split(' ').slice(1,).map((Number)));
const maps  = inputArray.slice(1,).map(line => line.split('\r\n').slice(1,).map(line => line.split(' ').map(Number)));

// map contains three numbers: the destination range start, the source range start, and the range length.

function mapping (seed: number){
    let result :number = seed;
    for(let i = 0; i < maps.length; i++) {
        seed = result;
        for (let j = 0; j < maps[i].length; j++) {

            const destination = maps[i][j][0];
            const source = maps[i][j][1];
            const range = maps[i][j][2];
        
            if (seed >= source && seed <= source + (range - 1)){
                result =  (seed - source) + destination;
                break;
            } else{
                result = seed;
            }
        }
    }
    return result;
};

const locations = seeds.map(line => mapping(line)).reduce((min, current) => Math.min(min, current), Infinity);

console.log('Result of part 1:', locations);

// --- Part 2 --- //

console.time('executionTime');
let lowestLocation = Infinity;
for (let i = 0; i < seeds.length; i+=2) {
    const seed = seeds[i];
    const range = seeds[i+1];
    for (let j = 0; j < range; j++){
        const location = mapping(seed + j);
        if(location < lowestLocation){
            lowestLocation = location;
        }
    }
    console.log(`Done ${i/2 + 1} of ${seeds.length / 2}`);
}


console.log('Result of part 2:', lowestLocation );
console.timeEnd('executionTime'); 