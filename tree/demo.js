import Tree from "./tree.js";

const TEST_ARRAY = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const root = Tree(TEST_ARRAY);

root.prettyPrint();
console.log(root.isBalanced());

root.insert(6666);
root.prettyPrint();
console.log(root.isBalanced());

root.rebalance();
root.prettyPrint();
console.log(root.isBalanced());
