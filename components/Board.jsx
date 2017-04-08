import React, { Component } from 'react';
import {Layer} from 'react-konva';
import Cell from './Cell';
import config from '../config';

class Board extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let board = this.props.grid.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        let colorIndex = Math.min(config.colors.length, cell) - 1
        let color = cell === 0 ? 'black' : config.colors[colorIndex];
        return <Cell color={color} col={colIndex} row={rowIndex} onClick={this.props.cellClickHandler} />
      })
    })
    return (
      <Layer>
        {board}
      </Layer>
    )
  }
}

export default Board;
