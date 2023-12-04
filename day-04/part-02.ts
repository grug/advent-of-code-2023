import fs from "fs";
import path from "path";

const getNumberOfWinners = (ticket: Set<number>, winners: Set<number>) =>
  new Set([...ticket].filter((i) => winners.has(i))).size;

const getNextXIndexes = (startIndex: number, count: number) =>
  Array.from({ length: count }, (_, i) => startIndex + i + 1);

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) =>
    line
      .replace(/(^.*: )/, "")
      .trim()
      .split(" | ")
      .map((item) => new Set(item.match(/(\d+)/g)!.map(Number)))
  );

const scoreboard: Record<number, number> = Object.fromEntries(
  Array.from({ length: input.length }, (_, i) => [i + 1, 1])
);

input.forEach(([ticket, winners], idx) => {
  const score = getNumberOfWinners(ticket, winners);

  if (score === 0) {
    return;
  }

  getNextXIndexes(idx + 1, score).forEach((i) => {
    scoreboard[i] += scoreboard[idx + 1];
  });
});

const answer = Object.values(scoreboard).reduce((acc, i) => acc + i, 0);

console.log(answer);
