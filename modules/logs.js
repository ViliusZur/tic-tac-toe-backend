exports.transformToReadableString = async (square, value) => {
  // transforms square number and its' value into readable position string

  // check for errors
  if (square > 8 || square < 0 || !Number.isInteger(square)) throw new Error('square out of reach');
  if ((value !== 'X' && value !== 'O') || typeof (value) !== 'string') throw new Error('value not X or O');

  const position = [
    'upper left', 'upper middle', 'upper right',
    'middle left', 'center', 'middle right',
    'lower left', 'lower middle', 'lower right',
  ];
  const str = `${value} was placed in the ${position[square]} position`;
  return str;
};

exports.checkForWinner = async (squares) => {
  // checks if current state has a winner

  // check for errors
  const count = this.countFrequency(squares);
  if (count.null === 9) return null;
  if (count.X !== (count.O + 1) && count.X !== count.O) throw new Error('impossible game mechanic: count.X !== count.O + 1 && count.X !== count.O');
  if (!this.containsOnly(squares, ['X', 'O', null])
   && !this.containsOnly(squares, ['X', 'O'])) throw new Error('squares array must contain values that are X and O (or null)');
  if (squares.length !== 9) throw new Error('squares array length is not 9');

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// check if arr1 contains only elements from arr2
exports.containsOnly = (arr1, arr2) => arr2.every((elem) => arr1.includes(elem));

exports.countFrequency = (array) => {
  // counts the frequency of items in the array
  const counts = {};
  for (let i = 0; i < array.length; i += 1) {
    const elem = array[i];
    counts[elem] = counts[elem] ? counts[elem] + 1 : 1;
  }
  return counts;
};
