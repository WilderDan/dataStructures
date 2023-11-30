class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  get head() {
    return this._head;
  }

  set head(value) {
    this._head = value;
  }

  get tail() {
    return this._tail;
  }

  set tail(value) {
    this._tail = value;
  }

  get size() {
    let count = 0;
    let node = this.head;

    while (node) {
      ++count;
      node = node.nextNode;
    }

    return count;
  }

  append(value) {
    const node = new Node(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.prevNode = this.tail;
      this.tail.nextNode = node;
      this.tail = node;
    }

    return node;
  }

  prepend(value) {
    const node = new Node(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.nextNode = this.head;
      this.head.prevNode = node;
      this.head = node;
    }

    return node;
  }

  at(index) {
    let node = index >= 0 ? this.head : null;

    for (let i = 0; i < index; i++) {
      if (node === null) break;
      node = node.nextNode;
    }

    return node;
  }

  pop() {
    const node = this.tail;

    this.tail = this.tail.prevNode;
    this.tail.nextNode = null;

    return node;
  }

  contains(value) {
    for (let node = this.head; node; node = node.nextNode)
      if (node.value === value) return true;
    return false;
  }

  find(value) {
    for (let node = this.head, i = 0; node; node = node.nextNode, i++)
      if (node.value === value) return i;
    return null;
  }

  insertAt(value, index) {
    let count = 0;

    for (let node = this.head, i = 0; node; node = node.nextNode, i++) {
      count = i;

      if (i === index) {
        if (node === this.head) {
          return this.prepend(value);
        } else {
          const newNode = new Node(value);

          newNode.prevNode = node.prevNode;
          newNode.nextNode = node;
          newNode.prevNode.nextNode = newNode;

          node.prevNode = newNode;

          return newNode;
        }
      }
    }

    if (index === count + 1) {
      return this.append(value);
    }

    return null;
  }

  removeAt(index) {
    for (let node = this.head, i = 0; node; node = node.nextNode, i++) {
      if (i === index) {
        if (node.prevNode) {
          node.prevNode.nextNode = node.nextNode;
        } else {
          this.head = node.nextNode;
        }

        if (node.nextNode) {
          node.nextNode.prevNode = node.prevNode;
        } else {
          this.tail = node.prevNode;
        }
      }
    }
  }

  toString() {
    let string = "";
    let node = this.head;

    while (node) {
      string += `( ${node.value} ) <--> `;
      node = node.nextNode;
    }

    string += "null";
    return string;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
    this.prevNode = null;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get nextNode() {
    return this._nextNode;
  }

  set nextNode(value) {
    this._nextNode = value;
  }

  get prevNode() {
    return this._prevNode;
  }

  set prevNode(value) {
    this._prevNode = value;
  }
}

export default LinkedList;
