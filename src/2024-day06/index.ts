import fs from 'fs';

console.time('executionTime');

const input: string = fs.readFileSync('src/2024-day06/input.txt', 'utf8');
const inputArray: string[] = input.split('\n').map((line) => line.trim());

const mapsWidth = inputArray[0].length;
const mapsHeight = inputArray.length;
const startPosition = findStartingPoint(inputArray) || [0,0];
type Direction = "up" | "right" | "down" | "left";

function findStartingPoint (map: string[]){
    for (let y = 0; y < mapsHeight; y++) {
        for (let x = 0; x < mapsWidth; x++) {
            if (map[y][x] === '^') {
                return [x, y];
            }
        }
    }
}

function turnRight(direction: Direction): Direction {
    const directions: Direction[] = ["up", "right", "down", "left"];
    const currentIndex = directions.indexOf(direction);
    return directions[(currentIndex + 1) % 4];
}

function visitedCount (){
    let [row,col] = startPosition;
    let directionKey: Direction = 'up';
    const visited = new Set<string>();
    
    const moves: Record<Direction, [number, number]> = {
        'up': [-1, 0],
        'right': [0, 1],
        'down': [1, 0],
        'left': [0, -1],
    }

    while (true) {
        visited.add(`${row} ${col}`);
        const [dCol, dRow] = moves[directionKey];
        const nextRow = row + dRow;
        const nextCol = col + dCol;
        
        if (nextRow < 0 || nextRow >= mapsHeight || nextCol < 0 || nextCol >= mapsWidth) {
            break;
        }

        const nextfield = inputArray[nextCol][nextRow];
        if ( nextfield === '#'){
            directionKey = turnRight(directionKey);
        } else {
            row = nextRow;
            col = nextCol;
        }

    }
    return visited.size;
}
function loopchecker(){
    let [row,col] = startPosition;
    let directionKey: Direction = 'up';
    const visited = new Set<string>();
    
    const moves: Record<Direction, [number, number]> = {
        'up': [-1, 0],
        'right': [0, 1],
        'down': [1, 0],
        'left': [0, -1],
    }

    while (true) {
        const step = `${row} ${col} ${directionKey}`;
        if(visited.has(step)){
            return true;
        }
        visited.add(step);
        const [dCol, dRow] = moves[directionKey];
        const nextRow = row + dRow;
        const nextCol = col + dCol;
        
        if (nextRow < 0 || nextRow >= mapsHeight || nextCol < 0 || nextCol >= mapsWidth) {
            return false;
        }
        
        const nextfield = map[nextCol][nextRow];
        if ( nextfield === '#'){
            directionKey = turnRight(directionKey);
        } else {
            row = nextRow;
            col = nextCol;
        }
    }
}


console.log('Result of part 1:', visitedCount());

//Part 2:
const map = inputArray.map(line => line.split(''));

function countObstructionPosition( start: number[]): number {
    let loopcount = 0;
    for (let row = 0; row < mapsWidth; row++) {
        for (let col = 0; col < mapsHeight; col++) {
            if (map[row][col] === '.' && !(row === start[0] && col === start[1])) {
                // Dočasne pridaj prekážku
                map[row][col] = '#';
                // Spusti simuláciu
                if (loopchecker()){
                    loopcount++;
                }
                // Vráť mapu do pôvodného stavu
                map[row][col] = '.';
            }
        }
    }
    return loopcount;
}


const resultPart2 = countObstructionPosition(startPosition);
console.log('Result of part 2:', resultPart2);
console.timeEnd('executionTime'); 