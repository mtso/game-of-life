import React, { Component } from 'react';
import {Rect} from 'react-konva';

class Cell extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick({
      row: this.props.row,
      col: this.props.col,
    })
  }
  render() {
    let size = 20
    let padding = 2
    let x = this.props.col * (size + padding)
    let y = this.props.row * (size + padding)
    return (
      <Rect x={x} y={y} width={size} height={size}
        fill={this.props.color} onClick={this.handleClick}
      />
    )
  }
}

export default Cell;
