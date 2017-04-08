function generate(width, height, filler) {
  let board = [];
  for (var r = 0; r < width; r++) {
    let row = [];
    for (var c = 0; c < height; c++) {
      row.push(filler ? filler() : 0)
    }
    board.push(row)
  }
  return board
}

function random() {
  return Math.floor(Math.random() * 2)
}

module.exports = {
  generate,
  random,
}
