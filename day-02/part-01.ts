import fs from "fs";
import path from "path";

const maximums: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const lines = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n");

const total = (lines.length * (lines.length + 1)) / 2;

const invalidGames = new Set<number>();

lines
  .map((line) => line.replace(/^.*: /, "").split(";"))
  .map((line, idx) =>
    line.forEach((item) =>
      item.split(",").map((item) => {
        const [value, colour] = item.trim().split(" ");
        if (parseInt(value, 10) > maximums[colour]) {
          invalidGames.add(idx + 1);
        }
        return [parseInt(value, 10), colour];
      })
    )
  );

const answer = Array.from(invalidGames).reduce(
  (acc, curr) => acc - curr,
  total
);

console.log(answer);
