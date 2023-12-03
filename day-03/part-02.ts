import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.split(""));

const isNumber = (input: string) => !isNaN(+input);

const parts: Array<[string, number[][]]> = [];
const getAdjacentValues = (
  schematic: string[][],
  row: number,
  col: number,
  parts: Array<[string, number[][]]>
) => {
  const adjacentValues: number[] = [];
  const numStrToCoords = new Map();

  for (const [numStr, coords] of parts) {
    coords.forEach((coord) => {
      numStrToCoords.set(coord.toString(), numStr);
    });
  }

  const adjacentCoords = [
    [row - 1, col - 1],
    [row - 1, col],
    [row - 1, col + 1],
    [row, col - 1],
    [row, col + 1],
    [row + 1, col - 1],
    [row + 1, col],
    [row + 1, col + 1],
  ];

  adjacentCoords
    .filter(
      ([x, y]) =>
        x >= 0 && x < schematic.length && y >= 0 && y < schematic[0].length
    )
    .forEach(([x, y]) => {
      if (isNumber(schematic[x][y])) {
        const numStr = numStrToCoords.get(`${x},${y}`);
        if (numStr && !adjacentValues.includes(+numStr)) {
          adjacentValues.push(+numStr);
        }
      }
    });

  return adjacentValues;
};

for (let row = 0; row < input.length; row++) {
  let currentNum = "";
  let currentNumCoords: number[][] = [];

  for (let col = 0; col < input[row].length; col++) {
    if (isNumber(input[row][col])) {
      currentNum += input[row][col];
      currentNumCoords.push([row, col]);
    } else {
      if (currentNum) {
        parts.push([currentNum, currentNumCoords]);
        currentNum = "";
        currentNumCoords = [];
      }
    }
  }

  if (currentNum) {
    parts.push([currentNum, currentNumCoords]);
  }
}

const processed: number[] = [];

for (let row = 0; row < input.length; row++) {
  for (let col = 0; col < input[row].length; col++) {
    if (input[row][col] === "*") {
      const adjacentValues: number[] = getAdjacentValues(
        input,
        row,
        col,
        parts
      );

      if (adjacentValues.length === 2) {
        processed.push(adjacentValues[0] * adjacentValues[1]);
      }
    }
  }
}

console.log(processed.reduce((a, b) => a + b, 0));
