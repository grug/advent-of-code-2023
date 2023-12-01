import fs from "fs";
import path from "path";

const isNumber = (input: string) => !isNaN(+input);

const numberMap: any = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const output = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line: string) => {
    const firstDigit = line.match(
      /^.*?(\d|one|two|three|four|five|six|seven|eight|nine)/
    )![1];
    const lastDigit = line.match(
      /.*(\d|one|two|three|four|five|six|seven|eight|nine)\D*$/
    )![1];
    return `${isNumber(firstDigit) ? firstDigit : numberMap[firstDigit]}${
      isNumber(lastDigit) ? lastDigit : numberMap[lastDigit]
    }`;
  })
  .map(Number)
  .reduce((a, b) => a + b, 0);

console.log(output);
