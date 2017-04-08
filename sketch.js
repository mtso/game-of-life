var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (line) => {
  if (line.trim() === 'exit') {
    process.exit()
  } else {
    board = stepForward(board);
    print(board)
  }
})

function neighbors(grid, row, col) {
  let nop = _ => _;
  let nb = [];
  let above = grid[row - 1];
  let below = grid[row + 1];
  // check the three cols in the row above
  if (above) {
    (above[col-1]) ? nb.push(above[col-1]) : nop;
    (above[col]) ? nb.push(above[col]) : nop;
    (above[col+1]) ? nb.push(above[col+1]) : nop;
  }
  // check left and right
  (grid[row][col-1]) ? nb.push(grid[row][col-1]) : nop;
  (grid[row][col+1]) ? nb.push(grid[row][col+1]) : nop;
  // check the three cols in the row below
  if (below) {
    (below[col-1]) ? nb.push(below[col-1]) : nop;
    (below[col]) ? nb.push(below[col]) : nop;
    (below[col+1]) ? nb.push(below[col+1]) : nop;
  }
  return nb;
}

function stepForward(grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let next = [];
  for (var row = 0; row < rows; row++) {
    let cells = [];
    for (var col = 0; col < cols; col++) {
      let nb = neighbors(grid, row, col).filter(n => n === 1);
      let current = grid[row][col];
      var isAlive = (current === 1) ?
        nb.length === 2 || nb.length === 3 :
        nb.length === 3;
      cells.push(isAlive ? 1 : 0)
    }
    next.push(cells)
  }
  return next
}

function print(grid) {
  grid.forEach(row => {
    row = row.map(col => col === 0 ? '.' : 'O')
    console.log(row.join(' '))
  })
}

let board = [
  [1, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

print(board)
