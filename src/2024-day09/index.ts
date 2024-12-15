import fs from 'fs';

//console.time('executionTime');

const input: string = fs.readFileSync('src/2024-day09/input.txt', 'utf8');
const inputArray: string[] = input.split('\n').map((line) => line.trim());

const diskMap: number[] = inputArray.flatMap(n => n.split('').map(Number));

let checkSum: number = 0;
let checkSumPosition = 0;
let frontDiskPosition: number = 0;
let backFilePosition: number = diskMap.length - 1;
let fileID = 0;
let lastFileID = (diskMap.length - 1) / 2;
// pocet suborov na konci disku ktore jeste neboli presunute
let lastNumberOfFiles: number = diskMap[backFilePosition]; 

while(frontDiskPosition < backFilePosition){
    if(frontDiskPosition % 2 === 0){ // pokus  je front position parne jedna sa o file
        
        let numberOfFiles = diskMap[frontDiskPosition];
        while(numberOfFiles !== 0){
            
            numberOfFiles --;
            checkSum += fileID * checkSumPosition;
            checkSumPosition ++;
        }
        fileID ++;
    } else  if(frontDiskPosition % 2 !== 0){ // pokus  je front position neparne jedna sa o mezeru
        
        let numberOfSpaces = diskMap[frontDiskPosition];
        
        while(numberOfSpaces !== 0){
            while(lastNumberOfFiles !== 0){
                checkSum += lastFileID * checkSumPosition;
                lastNumberOfFiles --;
                checkSumPosition ++;
                numberOfSpaces --;
                if (numberOfSpaces === 0){
                    break;
                }
            }
            if (lastNumberOfFiles === 0){
                backFilePosition -= 2;
                lastFileID --;
                lastNumberOfFiles = diskMap[backFilePosition];
            }
        }
    }
    frontDiskPosition ++;
}
while(lastNumberOfFiles !== 0){
    checkSum += lastFileID * checkSumPosition;
    lastNumberOfFiles --;
    checkSumPosition ++;
}

console.log('Result of part 1:', checkSum);
//console.log('Result of part 2:', resultPart2);

//console.timeEnd('executionTime'); 