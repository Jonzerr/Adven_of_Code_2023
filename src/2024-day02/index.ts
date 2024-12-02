import fs from 'fs';

//console.time('executionTime');

const input :string = fs.readFileSync('src/2024-day02/input.txt', 'utf8');
const reports :number[][] = input.split('\n').map((line) => line.split(' ').map(Number));


function safetyCheck(input :number[]){
    const isValid = (arr: number[]):boolean => {

        let increasing = false;
        let decreasing = false;

        for (let i = 0; i < arr.length - 1; i++){
            const diff = arr[i] - arr[i+1];

            if (Math.abs(diff) > 3) return false; // Rozdíl větší než 3
            if (diff > 0) decreasing = true;     // Pokles
            if (diff < 0) increasing = true;     // Rust
            if (diff === 0)  return false; // Rovnost mezi sousedy není povolena 
            if (increasing && decreasing) return false; // Smíšený trend
        }
        return true; // Splňuje podmínky
    };

    if (isValid(input)) return true;
    // Pokus se odstranit každý prvek a zkontrolovat
    for (let i = 0; i < input.length; i++) {
        const modifiedArray = [...input]; // Kopie pole
        modifiedArray.splice(i, 1); // Odstraň jeden prvek

        if (isValid(modifiedArray)) return true; // Splněno po odstranění
    }

    return false; // Ani jedno odstranění nepomohlo
}


const resultPart1 = reports.map(safetyCheck).filter(element => element == true).length;
console.log('Result of part 1:', resultPart1);

//  PART 2:

//console.log('Result of part 2:', resultPart2);

//console.timeEnd('executionTime'); 