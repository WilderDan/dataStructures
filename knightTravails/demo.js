import { KnightPosition, knightMoves } from "./knightTravails.js";

const start = KnightPosition(3, 3);
const end = KnightPosition(0, 0);
const path = knightMoves(start, end);

console.log(path);
