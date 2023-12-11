import fs from 'fs';

//console.time('executionTime');

const input :string = fs.readFileSync('src/day10/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

// Find the starting point "S"
const startingPoint: number[] = inputArray
    .map((line, index) => [index,line.includes('S') ? line.indexOf('S') : 0.1])
    .filter(([_,y])=> y !== 0.1).flatMap(line => line);

const coordinates :number[][] = [[-1, 0], 
                                 [ 0, 1], 
                                 [ 1, 0],
                                 [ 0, -1]];

const allowedChar: string[][] = [['7','|','F'],['7','-','J'],['|','J','L'],['-','F','L']];

function path (point:number[]){

};

function loopTraverse ([x,y]:number[], [oldX,oldY]:number[]){
    let step:number = 0 
    for (let i = 0; i < 4; i++){
        const newX = x + coordinates[i][0];
        const newY = y + coordinates[i][1];
        if( newX >= 0 && newX < inputArray.length && newY >= 0 && newY < inputArray[0].length){
            const newChar :string = inputArray[newX][newY]; 
            const newPoint :number [] = [newX,newY]; 
            if(startingPoint.toString() == newPoint.toString()){
                break;
            }
            if (allowedChar[i].includes(newChar) && ([newX, newY].toString() !== [oldX, oldY].toString())){
                oldX = x;
                oldY = y
                step = loopTraverse([newX,newY],[oldX,oldY]);
                break;
            }
        }
    }
    return  step + 1;
};


/* .....
   .S-7.
   .|.|.
   .L-J.
   ..... */



console.log(loopTraverse(startingPoint,startingPoint) / 2);
//console.log('Result of part 1:', resultPart1);
//console.log('Result of part 2:', resultPart2);

//console.timeEnd('executionTime'); 