import { readFileSync, writeFileSync } from 'fs';

interface Position {
  x?: number;
  y?: number;
}
function main()
{
    const input = readFileSync("./input.txt");
    const lines = input.toString().split("\n");
    const dot = ".";
    const hashtag = "#";
    const visited = "L";
    const board: string[][] = [];
    // assemble the array
    let initialPosition: Position = {};
    let initialDirection = 1; // 1 up 2 right 3 down 4 left
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      board[i] = [];
      for (let j = 0; j < line.length; j++) {
        board[i][j] = line[j];
        if (line[j] === '^') {
          initialPosition = {
            x: j,
            y: i
          }
        }
      }
    }
    let inMap = true;
    let currPos = initialPosition;
    let currDirection = initialDirection;
    let count = 1;
    while(inMap && count < 100000) {
      count += 1;
      if (currPos.x < 0 || currPos.y < 0 || currPos.x > board[0].length || currPos.y > lines.length) {
        inMap = false;
        break;
      }
      board[currPos.y][currPos.x] = visited;
      // move up
      if (currDirection === 1 && currPos.y > 0)
      {
        //const whatsUp = board[currPos.x][currPos.y - 1];
        const whatsUp = board[currPos.y - 1][currPos.x];
        if (whatsUp === hashtag) {
          currDirection += 1;
          continue;
        }
        currPos = {
          x: currPos.x,
          y: currPos.y - 1
        }
      }
      // move right
      else if (currDirection === 2 && currPos.x < lines[0].length)
      {
        const whatsUp = board[currPos.y][currPos.x + 1];
        if (whatsUp === hashtag) {
          currDirection += 1;
          continue;
        }
        currPos = {
          x: currPos.x + 1,
          y: currPos.y
        }
      }
      // move down
      else if (currDirection === 3 && currPos.y < lines.length)
      {
        const whatsUp = board[currPos.y + 1][currPos.x];
        if (whatsUp === hashtag) {
          currDirection += 1;
          continue;
        }
        currPos = {
          x: currPos.x,
          y: currPos.y + 1
        }
      }
      // move left
      else if (currDirection === 4 && currPos.x > 0)
      {
        const whatsUp = board[currPos.y][currPos.x - 1];
        if (whatsUp === hashtag) {
          currDirection = 1;
          continue;
        }
        currPos = {
          x: currPos.x - 1,
          y: currPos.y
        }
      }

    }

    let visitedCount = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = board[i].join("");
      console.log(line);
      for (let j = 0; j < line.length; j++) {
        if (board[i][j] === visited)
          visitedCount += 1;

      }
    }
    console.log(visitedCount);
}
main();