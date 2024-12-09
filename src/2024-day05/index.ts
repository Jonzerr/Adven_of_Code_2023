import fs from 'fs';

//console.time('executionTime');

const input :string = fs.readFileSync('src/2024-day05/input.txt', 'utf8');
const inputArray :string[] = input.split('\n\n').map((line) => line.trim());

let rules = new Map<number, number[]>();
const pageNumbers = inputArray[1].split('\n').map((line) => line.split(',').map(Number));

inputArray[0].split('\n').map((line) => {
    const [x, y] = line.split('|').map(Number);

    // Ak kľúč x ešte neexistuje, inicializujeme pole
    if (!rules.has(x)){
        rules.set(x, []);
    };
    // Pridanie hodnty y do poka podle kluce x
    rules.get(x)?.push(y);
});

function orderCheck (arr: number[],){ 
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        const y = arr.slice(i + 1, arr.length); 
        for (let j = 0; j < y.length; j++){
            const value = y[j];
            if (!rules.get(key)?.includes(value)){
                return false;
            };
        };
    };
    let reversedArr = [...arr].reverse();

    for (let i = 0; i < reversedArr.length; i++) {
        const x = reversedArr[i];
        const y = reversedArr.slice(i + 1, arr.length); 
        for (let j = 0; j < y.length; j++){
            const value = y[j];
            if (rules.get(x)?.includes(value)){
                return false;
            };
        };
    };
    return true;
};

const rightOrder = pageNumbers.filter(x => orderCheck(x));

let resultPart1 = 0;
rightOrder.forEach(element => {
    const middleIndex = (element.length - 1) / 2;
    resultPart1 += element[middleIndex];
});

console.log('Result of part 1:', resultPart1);

//part 2
const wrongOrders = pageNumbers.filter(x => !orderCheck(x));
function calculateInDegree(subgraph: Map<number, number[]>){
    const inDegree = new Map<number, number>();
    // Inicializácia všetkých uzlov na 0
    subgraph.forEach((values, key) => {
        if (!inDegree.has(key)) {
            inDegree.set(key, 0);
        }
        values.forEach(value => {
            if (!inDegree.has(value)) {
                inDegree.set(value, 0);
            }
        });
    });
    // Zvýšenie in-degree pre susedov
    subgraph.forEach((values) => {
        values.forEach(value => {
            inDegree.set(value, (inDegree.get(value) || 0) + 1);
        });
    });

    return inDegree;
};

//Funkce na vytvorenie podGrafu k aktualnej sekvenci stranok
function createSubgraph(sequence: number[]){
    const subGraph  = new Map <number, number[]>();

    sequence.forEach(value =>{
        const relatedPages = rules.get(value);
        if(relatedPages){
            const filteredPages = relatedPages.filter(p => sequence.includes(p)) || [];
            if (filteredPages.length > 0) {
                subGraph.set(value, filteredPages);
            }
        }
    });
    return subGraph;
}



function topologicalSort(sequence: number[]){
    const correctedOrder = new Array<number>;
    const queue: number[] = new Array<number>;
    const subGraph = createSubgraph(sequence);
    const inDegree = calculateInDegree(subGraph);
    
    // Najdenie uzlov s in-degree 0
    inDegree.forEach((value, key) => {
        if (value === 0) {
            queue.push(key);
        }
    });

    while (queue.length > 0) {
        const current: number = queue.shift()?? 0;
        correctedOrder.push(current);

        const values: number[] = subGraph.get(current) || [];
        values.forEach(value => {
                inDegree.set(value, (inDegree.get(value) || 0) - 1);
                if (inDegree.get(value) === 0) {
                    queue.push(value);
                };
            });
    };

    if (correctedOrder.length!== sequence.length) {
        throw new Error('Graph has cycles');
    }
    return correctedOrder;
}

const correctOrder = wrongOrders.map(topologicalSort);

let resultPart2 = 0;
correctOrder.forEach(element => {
    const middleIndex = (element.length - 1) / 2;
    resultPart2 += element[middleIndex];
});

console.log('Result of part 2:', resultPart2);
//console.log('Result of part 2:', resultPart2);

//console.timeEnd('executionTime'); 