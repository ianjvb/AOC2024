import { readFileSync, writeFileSync } from 'fs';

function main()
{
    const input = readFileSync("./input.txt");
    const lines = input.toString().split("\n");
    const pageRules: PageRule[] = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const split = line.split("|");
      if (split.length > 1) {
        pageRules.push({
          firstPage: Number.parseInt(split[0]),
          secondPage: Number.parseInt(split[1])
        })
      }
    }

    let overallVal = 0;
    // iterate over comma lines
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const splitCommas = line.split(",");
      if (splitCommas.length < 2) {
        continue;
      }
      const numberArray = splitCommas.map((val) => {
        return Number.parseInt(val);
      });
      let allLinesValid = true;
      for (let j = 0; j < numberArray.length; j++) {
        const isCorrect = verifyPageRule(numberArray, j, pageRules);
        if (!isCorrect) {
          allLinesValid = false;
        }
      }
      if (allLinesValid) {
        console.log("valid line: " + line);
        const middle = Math.floor(numberArray.length / 2);
        const middleValue = numberArray[middle] // is this right? Lol
        overallVal += middleValue;
      }
    }
    console.log(overallVal);
}

function verifyPageRule(arr: number[], idx: number, pageRules: PageRule[]) {
  const curr = arr[idx];
  const previousValues = arr.slice(0, idx);
  const nextValues = arr.slice(idx + 1);
  for (let i = 0; i < pageRules.length; i++) {
    const pageRule = pageRules[i];
    if (pageRule.firstPage === curr) {
      // verify no previousValues are the secondPage in the pageRule
      const badVal = previousValues.find((val) => val === pageRule.secondPage);
      if (badVal) {
        console.log(`invalid page line, found ${curr} had ${badVal} before it`)
        return false;
      }
    }
    if (pageRule.secondPage === curr) {
      // verify no nextVals are the firstPage in the pageRule
      const badVal = nextValues.find((val) => val === pageRule.firstPage);
      if (badVal) {
        console.log(`invalid page line, found ${curr} had ${badVal} after it`)
        return false;
      }
    }
  }
  return true;
}

interface PageRule {
  firstPage: number;
  secondPage: number;
}

main();