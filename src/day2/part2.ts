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
        const currLine = array1[lineNo];
        const safeLine = lineIsSafe(currLine);
        if (safeLine) {
            console.log("safe line")
            console.log(currLine);
            overallSafeLines += 1;
        }
        else {
            //console.log("line was unsafe, using fallback")
            //console.log(currLine);
            // see if removing any of the numbers in the line ends up with a safe line
            for (let linePos = 0; linePos < currLine.length; linePos++)
            {
                // copy the current line, removing the current linePos
                const copy = currLine.slice();
                copy.splice(linePos, 1);
                const safeLine = lineIsSafe(copy);
                if (safeLine)
                {
                    //console.log("safe line")
                    //console.log(copy);
                    overallSafeLines += 1;
                    break;
                }
            }

        }
    }
    console.log(`overall safe lines: ${overallSafeLines}`);
}

function lineIsSafe(currLine: number[])
{
    let isIncreasing = false;
    let isDecreasing = false;
    for (let linePos = 0; linePos < currLine.length - 1; linePos++)
    {
        const curr = currLine[linePos];
        const next = currLine[linePos + 1];
        const currIncreasing = (curr - next) < 0;
        if (linePos === 0)
        {
            isIncreasing = currIncreasing;
            isDecreasing = !currIncreasing;
        }
        const currDiffIsSafe = levelIsSafe(curr, next, isIncreasing, isDecreasing, currIncreasing);
        if (!currDiffIsSafe)
        {
            return false;
        }
    }
    return true;
}

function levelIsSafe(curr: number, next: number, isIncreasing: boolean, isDecreasing: boolean, currIncreasing: boolean)
{
    const diff = Math.abs(curr - next);
    // diff is too much
    if (diff < 1 || diff > 3)
    {
        //console.log(`diff too much: ${diff}`)
        return false;
    }
    if (currIncreasing && isDecreasing)
    {
        //console.log(`currInc too much: ${diff}`)
        return false;
    }
    if (!currIncreasing && isIncreasing)
    {
        //console.log(`currDec too much: ${diff}`)
        return false;
    }
    return true;
}


main();