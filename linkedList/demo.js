import LinkedList from "./linkedList.js";

const list = new LinkedList();
display("New List");

list.append(1);
list.append(2);
list.append(3);

display("Appending 3x values");

list.pop();
list.prepend(4);
list.prepend(5);
display("Pop and 2x prepend");

list.insertAt(6, 2);
list.insertAt(7, 0);
list.insertAt(8, list.size);
display("Insert at begin, middle, end indexes");

list.removeAt(3);
list.removeAt(0);
list.removeAt(list.size - 1);
display("Remove those same insertions");

const foundFour = list.find(4);
display(`Found value 4 at index ${foundFour}`);

const foundEight = list.find(8);
display(`Found value 8 at index ${foundEight}`);

display(`Value at index 3 is ${list.at(3)?.value}`);

display(`Value at index 6(out of bounds) is ${list.at(6)?.value}`);

function display(message) {
  console.log(`\n${message}:`);
  console.log(list.toString());
}
