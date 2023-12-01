import fs from "fs";
import path from "path";

const output = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line: string) => {
    const firstDigit = line.match(/^\D*(\d)/)![1];
    const lastDigit = line.match(/^.*(\d)\D*$/)![1];
    return `${firstDigit}${lastDigit}`;
  })
  .map(Number)
  .reduce((a, b) => a + b, 0);

console.log(output);
