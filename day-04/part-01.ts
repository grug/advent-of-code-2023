import fs from "fs";
import path from "path";

const answer = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) =>
    line
      .replace(/(^.*: )/, "")
      .trim()
      .split(" | ")
      .map((item) => new Set(item.match(/(\d+)/g)!.map(Number)))
  )
  .reduce((acc, [ticket, winners]) => {
    const intersection = new Set([...ticket].filter((i) => winners.has(i)));

    return intersection.size === 0
      ? acc
      : acc + Math.pow(2, intersection.size - 1);
  }, 0);

console.log(answer);
