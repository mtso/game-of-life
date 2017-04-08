import React from 'react';
import ReactDOM from 'react-dom';
import Cell from './components/Cell';
import Board from './components/Board';

import {Stage, Rect, Layer} from 'react-konva';
import { nextGeneration } from './simulation';
import gen from './generator';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: gen.generate(10, 10, gen.random),
      timer: null,
    }
    this.stepForward = this.stepForward.bind(this)
    this.cellClicked = this.cellClicked.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
  }
  play() {
    this.setState({
      timer: setInterval(_ => {
        this.stepForward()
      }, 1000)
    })
  }
  stop() {
    this.setState({
      timer: clearInterval(this.state.timer)
    })
  }
  stepForward() {
    this.setState({
      board: nextGeneration(this.state.board)
    })
  }
  cellClicked(cell) {
    let board = this.state.board;
    board[cell.row][cell.col] = (board[cell.row][cell.col] === 1) ? 0 : 1
    this.setState({
      board: board
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.stepForward}>Next Generation</button>
        <button onClick={this.play}>Play</button>
        <button onClick={this.stop}>Stop</button>
        <Stage width={700} height={700}>
          <Board grid={this.state.board} cellClickHandler={this.cellClicked} />
        </Stage>
      </div>
    )
  }
}

// Render into index.
let container = document.createElement('div');
container.setAttribute('id', 'container')
let body = document.getElementsByTagName('body')[0];
body.appendChild(container)
ReactDOM.render(<App />, container);
