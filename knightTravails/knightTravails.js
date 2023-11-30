function KnightPosition(x, y) {
  if (!isValid(x, y)) return null;

  const _x = x;
  const _y = y;

  function getCoordinates() {
    return [_x, _y];
  }

  function getValidMovePositions() {
    const positions = [];

    pushNewPosition(_x + 2, _y + 1);
    pushNewPosition(_x + 1, _y + 2);
    pushNewPosition(_x + 2, _y - 1);
    pushNewPosition(_x + 1, _y - 2);
    pushNewPosition(_x - 2, _y + 1);
    pushNewPosition(_x - 1, _y + 2);
    pushNewPosition(_x - 2, _y - 1);
    pushNewPosition(_x - 1, _y - 2);

    return positions;

    function pushNewPosition(x, y) {
      if (isValid(x, y)) {
        const newPosition = KnightPosition(x, y);
        positions.push(newPosition);
      }
    }
  }

  function getValidMoveCoordinates() {
    return getValidMovePositions().map((position) => position.getCoordinates());
  }

  function toString() {
    return _x.toString() + _y.toString();
  }

  function equals(position) {
    return toString() === position.toString();
  }

  function isValid(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  const api = {
    getCoordinates,
    getValidMovePositions,
    getValidMoveCoordinates,
    toString,
    equals,
  };

  return api;
}

function knightMoves(start, end) {
  if (!start || !end) return null;

  const path = [start];
  const queue = [path];

  while (queue.length > 0) {
    const currentPath = queue.shift();
    const current = currentPath[currentPath.length - 1];

    if (current.equals(end))
      return currentPath.map((position) => position.getCoordinates());

    const validMoves = current.getValidMovePositions();
    validMoves.forEach((move) => {
      const newPath = [...currentPath];
      newPath.push(move);
      queue.push(newPath);
    });
  }
}

export { KnightPosition, knightMoves };
