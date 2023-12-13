import fs from 'fs';

//console.time('executionTime');

const input :string = fs.readFileSync('src/day10/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

// Find the starting point "S"
const startingPoint: number[] = inputArray
    .map((line, index) => [index,line.includes('S') ? line.indexOf('S') : 0.1])
    .filter(([_,y])=> y !== 0.1).flatMap(line => line);

const coordinates :number[][] = [[-1, 0],  //north
                                 [ 0, 1],  // east
                                 [ 1, 0],  //south
                                 [ 0, -1]]; //west

const allowedChar: string[][] = [['7','|','F'], //north
                                 ['7','-','J'], // east
                                 ['|','J','L'], //south
                                 ['-','F','L']]; //west
                            
// going thru the pipe and count the steps
function pipePath (startingPoint:number[]){
        let steps: number = 1;
        let point :number[][] = pointFinder(startingPoint,startingPoint);
        while ((startingPoint.toString() !== point[0].toString())){
            steps++;
            point = pointFinder(point[0],point[1]);
        } 
        return steps;
};

//find the correct point
function pointFinder ([x,y]:number[], [oldX,oldY]:number[]){
    for (let i = 0; i < 4; i++){
        const newX = x + coordinates[i][0];
        const newY = y + coordinates[i][1];
        if ( newX >= 0 && newX < inputArray.length && newY >= 0 && newY < inputArray[0].length){
            const newChar :string = inputArray[newX][newY]; 
            const newPoint :number [] = [newX,newY];
            const char: string = inputArray[x][y];
            switch (char){
                case 'S': break;   
                case 'F': if(i === 1 || i === 2){ break } continue
                case '7': if(i === 2 || i === 3){ break } continue
                case 'L': if(i === 0 || i === 1){ break } continue
                case '|': if(i === 0 || i === 2){ break } continue
                case '-': if(i === 1 || i === 3){ break } continue
                case 'J': if(i === 0 || i === 3){ break } continue};
            if (allowedChar[i].includes(newChar) && ([newX, newY].toString() !== [oldX, oldY].toString())){
                oldX = x;
                oldY = y;
                const oldPoint :number[] = [oldX,oldY];
                return [newPoint, oldPoint];
            } else {
                if (newChar === 'S' ){
                    return [startingPoint,[0,0]];
                }
            }
        }
    }
    return [startingPoint,[0,0]];
};

// result part 1
const resultPart1: number= (pipePath(startingPoint) / 2);
console.log('Result of part 1:', resultPart1);

//console.log('Result of part 2:', resultPart2);

//console.timeEnd('executionTime'); 