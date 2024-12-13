import fs from 'fs';

//console.time('executionTime');

const input: string = fs.readFileSync('src/2024-day08/input.txt', 'utf8');
const inputArray: string[] = input.split('\n').map((line) => line.trim());

const antenas = new Map;
const antinodeSet = new Set();
const antinodeSet2 = new Set();
const mapWidth = inputArray[0].length;
const mapHeight = inputArray.length;

inputArray.forEach((line,indexX)=> {
    const row = line.split('');
    row.forEach((cell, indexY) => {
        if (!(cell === '.')) {
            if (antenas.has(cell)) {
                antenas.get(cell).push([indexX, indexY]);
            } else {
                antenas.set(cell, [[indexX, indexY]]);
            }
        }
    });
});

// prechadzanie cez vsetky anteny
antenas.forEach((value) => {
    for (let i = 0; i < value.length - 1; i++) {
        for (let j = i + 1; j < value.length; j++) {
            const antena1 = value[i];
            const antena2 = value[j];
            const dRow = antena2[0] - antena1[0];
            const dCol = antena2[1] - antena1[1];
            const antinode1 = [antena1[0] - dRow,antena1[1] - dCol];
            const antinode2 = [antena2[0] + dRow,antena2[1] + dCol];
            if(isInTheMap(antinode1)) antinodeSet.add(`${antinode1[0]},${antinode1[1]}`);
            if(isInTheMap(antinode2)) antinodeSet.add(`${antinode2[0]},${antinode2[1]}`);
        }
    }
});

function isInTheMap([x,y]: number[]){
    return (x >= 0 && x < mapWidth && y >= 0 && y < mapHeight) ? true : false;
}

console.log('Result of part 1:', antinodeSet.size);

//PART 2:
antenas.forEach((value) => {
    for (let i = 0; i < value.length - 1; i++) {
        for (let j = i + 1; j < value.length; j++) {
            const antena1 = value[i];
            const antena2 = value[j];
            antinodeSet2.add(`${antena1[0]},${antena1[1]}`);
            antinodeSet2.add(`${antena2[0]},${antena2[1]}`);
            const dRow = antena2[0] - antena1[0];
            const dCol = antena2[1] - antena1[1];
            let antinode1 = [antena1[0] - dRow,antena1[1] - dCol];
            while(isInTheMap(antinode1)){
                antinodeSet2.add(`${antinode1[0]},${antinode1[1]}`);
                antinode1 = [antinode1[0] - dRow,antinode1[1] - dCol]; 
            };
            let antinode2 = [antena2[0] + dRow,antena2[1] + dCol];
            while(isInTheMap(antinode2)){
                antinodeSet2.add(`${antinode2[0]},${antinode2[1]}`);
                antinode2 = [antinode2[0] + dRow,antinode2[1] + dCol]; 
            };
        }
    }
});
console.log('Result of part 2:', antinodeSet2.size);

//console.timeEnd('executionTime'); 