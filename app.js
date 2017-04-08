import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Cell from './components/Cell';
import Board from './components/Board';
import Player from './components/Player';

import {Stage, Rect, Layer} from 'react-konva';
import { nextGeneration } from './simulation';
import gen from './generator';
import config from './config';

let nop = _ => _;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      board: gen.generate(config.initialSize, config.initialSize, gen.random),
      timer: null,
      speed: config.speed.X1,
      boardSize: config.initialSize,
      generation: 0,
      isPlaying: false,
    }
    this.stepForward = this.stepForward.bind(this)
    this.cellClicked = this.cellClicked.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.setSpeed = this.setSpeed.bind(this)
    this.clear = this.clear.bind(this)
    this.changeSize = this.changeSize.bind(this)
  }
  componentDidMount() {
    this.play();    
  }
  changeSize(event) {
    let size = +event.target.value
    this.setState({
      board: gen.generate(size, size, gen.random),
      boardSize: size,
      generation: 0,
    }, this.stop)
  }
  clear() {
    this.setState({
      board: gen.generate(this.state.boardSize, this.state.boardSize),
      generation: 0,
    }, this.stop)
  }
  setSpeed(value) {
    var shouldContinue = this.state.isPlaying;
    this.setState({
      speed: config.speed['X' + value]
    }, _ => {
      this.stop(_ => {
        if (shouldContinue) {
          this.play()
        }
      })
    })
  }
  play(callback) {
    callback = callback || nop;
    this.setState({
      isPlaying: true,
      timer: setInterval(_ => {
        this.stepForward()
      }, this.state.speed)
    }, callback)
  }
  stop(callback) {
    callback = callback || nop;
    this.setState({
      timer: clearInterval(this.state.timer),
      isPlaying: false,
    }, callback)
  }
  stepForward() {
    this.setState({
      board: nextGeneration(this.state.board),
      generation: this.state.generation + 1
    })
  }
  cellClicked(cell) {
    let board = this.state.board;
    board[cell.row][cell.col] = (board[cell.row][cell.col] === 0) ? 1 : 0
    this.setState({
      board: board
    })
  }
  render() {
    let stageSize = this.state.boardSize * 22 + 10
    return (
      <div>
        <Player
          handleNext={this.stepForward}
          handleStop={this.stop}
          handlePlay={this.play}
          handleSelect={this.setSpeed}
          handleClear={this.clear}
          handleSizeChange={this.changeSize}
          generation={this.state.generation}
        />
        <Stage width={stageSize} height={stageSize}>
          <Board
            grid={this.state.board}
            cellClickHandler={this.cellClicked}
          />
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
