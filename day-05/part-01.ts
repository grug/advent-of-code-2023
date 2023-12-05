import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n\n");

const seeds = input[0].match(/(\d+)/g)!.map(Number);
const maps = input.slice(1).map((m) =>
  m
    .split("\n")
    .slice(1)
    .map((m) => m.match(/(\d+)/g)!.map(Number))
);

const locations = seeds.map((seed) => {
  let curr = seed;

  maps.forEach((map) => {
    for (const m of map) {
      const [destination, source, range] = m;

      if (curr >= source && curr < source + range) {
        curr = curr - source + destination;
        break;
      }
    }
  });

  return curr;
});

console.log(Math.min(...locations));
