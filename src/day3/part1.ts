import { readFileSync } from 'fs';

function main()
{
    const input = readFileSync("./input.txt");
    const inputString = input.toString();
    const regex = /mul\((\d*),(\d*)\)/g;
    const found = inputString.match(regex);
    let overall = 0;
    found.forEach((val) => {
        console.log(val);
        const commaIndex = val.indexOf(",");
        const val1 = Number.parseInt(val.slice(4, commaIndex));
        const val2 = Number.parseInt(val.slice(commaIndex + 1, val.indexOf(")")));
        const multiplied = val1 * val2;
        overall += multiplied;
    })
    console.log(overall);
}
main();