import fs from 'fs';

const input :string = fs.readFileSync('src/day03/inputSample.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());


for(let i = 0; i < inputArray.length; i++){
    for(let j = 0; j < inputArray.length; j++) {
       console.log(inputArray[i][j])
    }
}





