import fs from 'fs';

//console.time('executionTime');

const input :string = fs.readFileSync('src/2024-day04/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());

const strings = [...inputArray];
const word = 'XMAS';
const reversedWord = word.split("").reverse().join(""); 
const wordRegex = new RegExp(word, 'g');
const reversedWordRegex = new RegExp(reversedWord, 'g');

// ziskanie  horizontalnych retazcov
for ( let col = 0; col < inputArray[0].length; col++ ) {
    let verticalString  = '';
    for ( let row = 0; row < inputArray.length; row++ ) {
        verticalString  += inputArray[row][col];
    }
    strings.push(verticalString );
}

//ziskanie  hlavnych diagonalnych retazcov
for (let diff = -inputArray.length + 1 ; diff < inputArray.length; diff++) {
    let mainDiagonalString = '';
    for ( let row = 0; row < inputArray.length; row++){
        const col = row - diff;
        const char = inputArray[row][col];
        if (char !== undefined) {
            mainDiagonalString += char;
        }
    }
    strings.push(mainDiagonalString);
}
//ziskanie  vedlajsich diagonalnych retazcov
for (let sum = 0; sum < 2*inputArray.length - 1 ; sum++) {
    let secondaryDiagonalString = '';
    for ( let row = 0; row < inputArray.length; row++){
        const col = sum - row;
        const char = inputArray[row][col];
        if (char !== undefined) {
            secondaryDiagonalString += char;
        }
    }
    strings.push(secondaryDiagonalString);
}
// prehladavanie vsech retazcvov a najdenie poctu vyskytu hladaneho vyrazu
let count = 0;

for (const str of strings) {
    const matches = str.match(wordRegex);
    const reversedMatches = str.match(reversedWordRegex);

    count += matches ? matches.length : 0;
    count += reversedMatches ? reversedMatches.length : 0;
}

console.log('Result of part 1:', count);

// PART 2:
let countPart2 = 0;
for (let row = 1; row < inputArray.length - 1; row++){
    for (let col = 1; col < inputArray.length - 1; col ++){
        const char = inputArray[row][col];
        if (char == 'A'){
            const neighbors = {
                leftUp: inputArray[row - 1][col - 1],
                rightDown: inputArray[row + 1][col + 1],
                rightUp: inputArray[row - 1][col + 1],
                leftDown: inputArray[row + 1][col - 1]
            };
            if (
                ((neighbors.leftUp === 'S' && neighbors.rightDown === 'M') ||
                 (neighbors.leftUp === 'M' && neighbors.rightDown === 'S')) &&
                ((neighbors.rightUp === 'S' && neighbors.leftDown === 'M') ||
                 (neighbors.rightUp === 'M' && neighbors.leftDown === 'S'))
            ) {
                countPart2++;
            }
        }
    }
}
console.log('Result of part 2:', countPart2);

//console.timeEnd('executionTime'); 