import fs from 'fs';

const input = fs.readFileSync('src/day02/input.txt', 'utf8');
const inputArray = input.split('\n').map((line) => line.trim());

function fewestNumberFinder (game: string[]){
    const gameId :number  = Number(game[0].match(/\d+/));
    let blue :number = 0;
    let red :number = 0;
    let green :number = 0;

    for (let i = 1; i <game.length ; i++) {

        const subset  = game[i].matchAll(/(\d+)\s*([a-zA-Z]+)/g);
        const cubes: [string, number][] = Array
            .from(subset, match => [ match[2], Number(match[1])]);

        for(const color of cubes){
            if(color[0]==='blue' && color[1] > blue){
                blue = color[1];
            }
            if(color[0]==='red' && color[1] > red){
                red = color[1];
            }
            if(color[0]==='green' && color[1] > green){
                green = color[1];
            }
        }
    }
    return [gameId, blue, red, green];
}
function gameChecker (gameId :number, blue: number, red: number, green: number){
    
    if(red <= 12 && green <= 13 && blue <= 14){
        return gameId;
    }
    else {
        return 0
    };
}

const resultPart1 = inputArray
    .map((line) => fewestNumberFinder(line.split(/[:;]/)))
    .map((line) => gameChecker(line[0],line[1], line[2], line[3]))
    .reduce((sum, add) => sum + add);;

console.log('Result of part 1:', resultPart1);

// --- Part 2 --- //



const resultPart2 = inputArray.map((line) => {
    let [gameID,red, green, blue] = fewestNumberFinder(line.split(/[:;]/))
    return red * green * blue;
}
    ).reduce((sum, add)=> sum + add, 0);

console.log('Result of part 2:', resultPart2);
