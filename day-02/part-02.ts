import fs from "fs";
import path from "path";

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

let powers: number[] = [];

lines
  .map((line) => line.replace(/^.*: /, ""))
  .map((line) => line.split(";"))
  .map((line) => {
    let maxRed = -Infinity;
    let maxGreen = -Infinity;
    let maxBlue = -Infinity;

    line.map((item) => {
      item.split(",").map((item) => {
        const [value, colour] = item.trim().split(" ");
        switch (colour) {
          case "red":
            maxRed = Math.max(maxRed, parseInt(value, 10));
            break;
          case "green":
            maxGreen = Math.max(maxGreen, parseInt(value, 10));
            break;
          case "blue":
            maxBlue = Math.max(maxBlue, parseInt(value, 10));
            break;
        }
        return [parseInt(value, 10), colour];
      });
    });
    powers.push(maxRed * maxGreen * maxBlue);
  });

console.log(powers.reduce((acc, curr) => acc + curr, 0));
