import fs from "fs";
import path from "path";

const [times, distance] = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.match(/\d+/g)!.map(Number));

const winningStrategies: number[] = [];

for (let i = 0; i < times.length; i++) {
  const time = times[i];
  const recordDistance = distance[i];
  let val = 0;

  for (let j = 0; j < time; j++) {
    if (j * (time - j) > recordDistance) {
      val++;
    }
  }

  winningStrategies.push(val);
}

console.log(winningStrategies.reduce((a, b) => a * b, 1));
