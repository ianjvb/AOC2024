import { readFileSync } from 'fs';

function main()
{
    const input = readFileSync("./input.txt");
    const array1: number[][] = [];
    const lines = input.toString().split("\n");
    for (let i = 0; i < lines.length; i++)
    {
        console.log(lines[i]);
        const splitLine = lines[i].split(" ");
        const numbers = splitLine.map((str) => {
            return Number.parseInt(str);
        })
        array1[i] = [];
        array1[i].push(...numbers);
    }
    let overallSafeLines = 0;
    for (let lineNo = 0; lineNo < array1.length; lineNo++)
    {
        let isIncreasing = false;
        let isDecreasing = false;
        const currLine = array1[lineNo];
        for (let linePos = 0; linePos < currLine.length - 1; linePos++)
        {
            const curr = currLine[linePos];
            const next = currLine[linePos + 1];
            const diff = Math.abs(curr - next);
            console.log(`${curr} ${next} ${diff}`)
            // diff is too much
            if (diff < 1 || diff > 3)
            {
                console.log(`diff too much: ${diff}`)
                break;
            }
            const currIncreasing = (curr - next) < 0;
            if (linePos === 0)
            {
                isIncreasing = currIncreasing;
                isDecreasing = !currIncreasing;
            }
            else if (currIncreasing && isDecreasing)
            {
                console.log(`currInc too much: ${diff}`)
                break;
            }
            else if (!currIncreasing && isIncreasing)
            {
                console.log(`currDec too much: ${diff}`)
                break;
            }
            else if (linePos === currLine.length - 2)
            {
                overallSafeLines += 1
            }
        }
    }
    console.log(`overall safe lines: ${overallSafeLines}`);
}
main();