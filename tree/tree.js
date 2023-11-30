import Node from "./node.js";

function Tree(array = []) {
  const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
  let root = buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);

  function buildTree(array, start, end) {
    if (start > end) return null;

    const midPoint = Math.floor((start + end) / 2);

    const root = Node(array[midPoint]);
    root.left = buildTree(array, start, midPoint - 1);
    root.right = buildTree(array, midPoint + 1, end);

    return root;
  }

  function insert(value, node = root) {
    if (node === null) return Node(value);
    if (value === node.data) return node;

    if (value < node.data) node.left = insert(value, node.left);
    else node.right = insert(value, node.right);

    return node;
  }

  function deleteValue(value, node = root) {
    // Value not found
    if (node === null) return null;

    // Found value to delete
    if (value === node.data) {
      // No children
      if (node.left === null && node.right === null) {
        //return null;
        node = null;
      }

      // Both children
      else if (node.left !== null && node.right !== null) {
        let succParent = node;

        // Find successor
        let succ = node.right;
        while (succ.left !== null) {
          succParent = succ;
          succ = succ.left;
        }

        if (succParent !== node) {
          succParent.left = succ.right;
        } else {
          succParent.right = succ.right;
        }
        node.data = succ.data;
      }

      // One child
      else {
        const singleChild = node.left ? node.left : node.right;
        node = singleChild;
      }
    }
    // Continue looking for value to delete
    else if (value < node.data) node.left = deleteValue(value, node.left);
    else node.right = deleteValue(value, node.right);

    return node;
  }

  function find(value, node = root) {
    if (node === null) return null;
    if (value === node.data) return node;

    if (value < node.data) return find(value, node.left);
    else return find(value, node.right);
  }

  function levelOrder(callback = (node) => node.data, node = root) {
    const result = [];

    const queue = [];
    queue.push(node);

    while (queue.length > 0) {
      const turn = queue.shift();

      result.push(callback(turn));

      if (turn.left) queue.push(turn.left);
      if (turn.right) queue.push(turn.right);
    }

    return result;
  }

  function inOrder(callback = (node) => node.data, node = root, result = []) {
    if (node === null) return null;

    inOrder(callback, node.left, result);
    result.push(callback(node));
    inOrder(callback, node.right, result);

    return result;
  }

  function preOrder(callback = (node) => node.data, node = root, result = []) {
    if (node === null) return null;

    result.push(callback(node));
    preOrder(callback, node.left, result);
    preOrder(callback, node.right, result);

    return result;
  }

  function postOrder(callback = (node) => node.data, node = root, result = []) {
    if (node === null) return null;

    postOrder(callback, node.left, result);
    postOrder(callback, node.right, result);
    result.push(callback(node));

    return result;
  }

  function height(node = root) {
    if (node === null) return -1;

    return max(height(node.left), height(node.right)) + 1;

    function max(a, b) {
      return a > b ? a : b;
    }
  }

  function depth(node) {
    if (node === null) return -1;
    return height(root) - height(node);
  }

  function isBalanced(node = root) {
    if (node === null) return true;

    return (
      Math.abs(height(node.left) - height(node.right)) <= 1 &&
      isBalanced(node.left) &&
      isBalanced(node.right)
    );
  }

  function rebalance(node = root) {
    const array = inOrder();
    root = buildTree(array, 0, array.length - 1);
  }

  function prettyPrint(node = root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  return {
    insert,
    deleteValue,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
    prettyPrint,
  };
}

export default Tree;
