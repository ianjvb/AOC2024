import { readFileSync, writeFileSync } from 'fs';

function main()
{
    const input = readFileSync("./input.txt");
    const lines = input.toString().split("\n");
    const linesArray = lines.map((str) => {
        return Array.from(str);
    })
    const originalMatches = calculateMatches(linesArray);
    writeFileSync("./original.txt", linesArray.toString());

    const rotated = rotateArray45(linesArray);
    const rotatedMatches = calculateMatches(rotated);
    writeFileSync("./rotated45.txt", rotated.toString());

    const rotated90 = rotateArray90(linesArray);
    const rotated90Matches = calculateMatches(rotated90);
    writeFileSync("./rotated90.txt", rotated90.toString());

    const rotated135 = rotateArray45(linesArray);
    const rotated135Matches = calculateMatches(rotated135);
    writeFileSync("./rotated135.txt", rotated135.toString());


    console.log("orig: " + originalMatches);
    console.log("rot: " + rotatedMatches);
    console.log("rot90: " + rotated90Matches);
    console.log("rot135: " + rotated135Matches);
    console.log(originalMatches + rotatedMatches + rotated90Matches + rotated135Matches);
}

function calculateMatches(linesArray: string[][])
{
    let overallMatches = 0;
    for (let i = 0; i < linesArray.length; i++)
    {
        const line = linesArray[i].join("");
        //console.log(line)
        for (let j = 0; j < line.length; j++)
        {
            const curr = line[j];
            //console.log(curr);
            if (curr == "A" && i - 1 >= 0 && i + 1 < linesArray.length && j - 1 >= 0 && j + 1 < line.length) {
                if (linesArray[i-1][j-1] == "M" && linesArray[i-1][j+1] == "S" &&
                    linesArray[i+1][j-1] == "M" && linesArray[i+1][j+1] == "S"
                ) {
                    overallMatches += 1;
                    //console.log("match" + test);
                }
                else if (linesArray[i-1][j-1] == "S" && linesArray[i-1][j+1] == "M" &&
                    linesArray[i+1][j-1] == "S" && linesArray[i+1][j+1] == "M"
                ) {
                    overallMatches += 1;
                    //console.log("match" + test);
                }
            }
        }
        var hi = 1;
    }
    return overallMatches;
}


// Function to rotate a 2D array clockwise by 90 degrees
function rotateArray90(matrix: string[][]) {
    //console.log(matrix);
    // Transpose the matrix
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i; j < matrix[0].length; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }
  
    // Reverse each row
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].reverse();
    }
  
    return matrix;
  }

  function rotateArray45(matrix: string[][]): string[][]
  {
    var summax = matrix.length + matrix[0].length - 1; // max index of diagonal matrix
    var rotated = []; // initialize to an empty matrix of the right size
    for( var i=0 ; i<summax ; ++i ) rotated.push([]);
    // Fill it up by partitioning the original matrix.
    for( var j=0 ; j<matrix[0].length ; ++j )
        for( var i=0 ; i<matrix.length ; ++i ) rotated[i+j].push(matrix[i][j]);
    // Print it out.
    //for( var i=0 ; i<summax ; ++i ) console.log(rotated[i].join(' '))

    return rotated;
  }


main();