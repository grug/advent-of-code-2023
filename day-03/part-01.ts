import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.split(""));

const parts: Array<[string, number[][]]> = [];

const isNumber = (input: string) => !isNaN(+input);

const checkAdjacent = (schematic: string[][], coordsToCheck: number[][]) => {
  let isValid = false;

  coordsToCheck.forEach(([x, y]) => {
    const adjacentCoords = [
      [x - 1, y - 1],
      [x - 1, y],
      [x - 1, y + 1],
      [x, y - 1],
      [x, y + 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x + 1, y - 1],
    ];
    const adjacentValues = adjacentCoords
      .filter(
        ([x, y]) =>
          x >= 0 && x < schematic.length && y >= 0 && y < schematic[0].length
      )
      .map(([x, y]) => schematic[x][y]);

    if (adjacentValues.some((value) => /[^.\d]/.test(value))) {
      isValid = true;
    }
  });

  return isValid;
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

let total = 0;

parts.forEach(([number, coords]) => {
  const isValid = checkAdjacent(input, coords);

  if (isValid) {
    total += +number;
  }
});

console.log(total);
