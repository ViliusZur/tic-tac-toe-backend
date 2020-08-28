exports.transformToReadableString = async (square, value) => {
  // transforms square number and its' value into readable position string
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
