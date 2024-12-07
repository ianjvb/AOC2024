import { readFileSync } from 'fs';

function main()
{
    const input = readFileSync("./input.txt");
    const array1: number[] = [];
    const array2: number[] = [];
    const lines = input.toString().split("\n");
    for (let i = 0; i < lines.length; i++)
    {
        console.log(lines[i]);
        const splitLine = lines[i].split("   ");
        const number1 = Number.parseInt(splitLine[0]);
        const number2 = Number.parseInt(splitLine[1]);
        array1.push(number1);
        array2.push(number2);
    }
    const sortedArray1 = array1.sort();
    const sortedArray2 = array2.sort();
    let overallSimilarityScore = 0;
    for (let j = 0; j < sortedArray1.length; j++)
    {
        const leftListNumber = sortedArray1[j];
        let rightListCount = 0;
        sortedArray2.forEach((num: number) => {
            if (num === leftListNumber) {
                rightListCount += 1;
            }
        })
        overallSimilarityScore += (rightListCount * leftListNumber);
    }
    console.log(`overall similarity score: ${overallSimilarityScore}`);
}
main();