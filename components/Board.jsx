import React, { Component } from 'react';
import {Layer} from 'react-konva';
import Cell from './Cell';

class Board extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.grid)
    let board = this.props.grid.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        let color = col === 1 ? 'lightGray' : 'black';
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
