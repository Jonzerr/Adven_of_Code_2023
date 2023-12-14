import fs from 'fs';

console.time('executionTime');

const input :string = fs.readFileSync('src/day07/input.txt', 'utf8');
const inputArray :string[] = input.split('\n').map((line) => line.trim());


// parsing input
const listOfHands :[string, number][]= inputArray.map((line) => {
    const array = line.split(' ');
    return [array[0], Number(array[1])];
});

const strengthOfCardsPart1 :string[] = ['2','3','4','5','6','7','8','9','T','J','Q','K','A'];

// where index 0 is lowest and  highest index
const orderOfHandsStrengthPart1 :[string, number][] = [];

// find out the type: fife of a kind = 6 ... High card = 0,
function HandsType(hand :string, part:number){
    const parseHand:  { [key: string]: number }= {};
    
    for (const char of hand){
        if (char in parseHand){
            parseHand[char] += 1;
            continue;
        }
        parseHand[char] = 1;    
    }
    let handValue :number[] = [];
    
    switch(part){
        case 1:
            handValue = Object.values(parseHand).sort().reverse();
            break; 
        case 2: 
            if (Object.hasOwn(parseHand,'J') && parseHand['J'] !== 5){
                const numberOfJ = parseHand['J'];
                delete parseHand['J'];
                handValue = Object.values(parseHand).sort().reverse();
                handValue[0] += numberOfJ; 
                break;
            } else {
                 handValue = Object.values(parseHand).sort().reverse(); 
                 break;
            };
            
    }

    const type: number =  handValue[0] === 5 ?  6 : 
                          handValue[0] === 4 ?  5 : 
                          handValue[0] === 3 && handValue[1] === 2 ?  4 :
                          handValue[0] === 3 ? 3 :
                          handValue[0] === 2 && handValue[1] === 2 ?  2 :  
                          handValue[0] === 2 && handValue[1] === 1 ?  1 : 0;
    return type;
}

function compareHand(a: string, b: string, part: number) {
    const TypeA = HandsType(a,part);
    const TypeB = HandsType(b,part);

    if (TypeA > TypeB){
        return true;
    } else if (TypeA < TypeB){
        return false;
    }

    for(let i = 0; i < a.length; i++){
        if (a[i] === b[i]){
           continue; 
        } else {
            switch (part){
                case 1:
                    if (strengthOfCardsPart1.indexOf(a[i]) > strengthOfCardsPart1.indexOf(b[i])){
                        return true  
                    } else return false;
                case 2:
                    if (strengthOfCardsPart2.indexOf(a[i]) > strengthOfCardsPart2.indexOf(b[i])){
                        return true  
                    } else return false;
            }
        }  
    }
}

for (const hand of  listOfHands){
    if (orderOfHandsStrengthPart1.length === 0){
        orderOfHandsStrengthPart1.push(hand);
    } else {
        for (let i = orderOfHandsStrengthPart1.length - 1 ; i >= 0; i--){
            const HandIsBigger = compareHand(hand[0], orderOfHandsStrengthPart1[i][0],1);
            if (HandIsBigger){
                orderOfHandsStrengthPart1.splice(i + 1,0 ,hand);
                break;
            } else if (i === 0){
                orderOfHandsStrengthPart1.splice(0,0,hand);
            }
        }
    }
};

//adding up the result of multiplying each hand's bid with its rank (765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5). So the total winnings in this example are 6440.
const totalWinningsPart1 = orderOfHandsStrengthPart1
    .map((hand, index) => (index + 1) * hand[1])
    .reduce((sum, add) => sum + add,0);

console.log('Result of part 1:', totalWinningsPart1);

// --- Part 2 --- //

const strengthOfCardsPart2:string[] = ['J','2','3','4','5','6','7','8','9','T','Q','K','A'];
const orderOfHandsStrengthPart2 :[string, number][] = [];

for (const hand of  listOfHands){
    if (orderOfHandsStrengthPart2.length === 0){
        orderOfHandsStrengthPart2.push(hand);
    } else {
        for (let i = orderOfHandsStrengthPart2.length - 1 ; i >= 0; i--){
            const HandIsBigger = compareHand(hand[0], orderOfHandsStrengthPart2[i][0],2);
            if (HandIsBigger){
                orderOfHandsStrengthPart2.splice(i + 1,0 ,hand);
                break;
            } else if (i === 0){
                orderOfHandsStrengthPart2.splice(0,0,hand);
            }
        }
    }
};
const totalWinningsPart2 = orderOfHandsStrengthPart2
    .map((hand, index) => (index + 1) * hand[1])
    .reduce((sum, add) => sum + add,0);
console.log('Result of part 2:', totalWinningsPart2);

console.timeEnd('executionTime'); 