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
    let overallDiff = 0;
    for (let j = 0; j < sortedArray1.length; j++)
    {
        const diff = Math.abs(sortedArray1[j] - sortedArray2[j]);
        console.log(`diff between ${sortedArray1[j]} and ${sortedArray2[j]} is ${diff}`)
        overallDiff += diff;
    }
    console.log(`overall diff: ${overallDiff}`);
}
main();