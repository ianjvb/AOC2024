import { readFileSync } from 'fs';

function main()
{
    const input = readFileSync("./input.txt");
    const inputString = input.toString();
    const regex = /((mul\((\d*),(\d*)\))|(do\(\))|(don\'t\(\)))/gm;
    const matches = Array.from(inputString.matchAll(regex));
    let overall = 0;
    let enabled = true;
    for (const match of matches) {
        if (match[0] === "do()")
        {
            enabled = true;
            continue;
        }
        if (match[0] === "don't()")
        {
            enabled = false;
        }
        if (!enabled)
        {
            continue;
        }
        //console.log(match);
        const commaIndex = match[0].indexOf(",");
        const val1 = Number.parseInt(match[0].slice(4, commaIndex));
        const val2 = Number.parseInt(match[0].slice(commaIndex + 1, match[0].indexOf(")")));
        const multiplied = val1 * val2;
        overall += multiplied;
      }
    console.log(overall);
}
main();