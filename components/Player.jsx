import React, {Component} from 'react';

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {value: '1'}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    console.log(event.target.value)
    this.setState({value: event.target.value}, _ => {
      this.props.handleSelect(this.state.value)
    })
  }
  render() {
    return (
      <div style={{padding: '10px 0 20px'}}>
        <select onChange={this.props.handleSizeChange}>
          <option value='10'>10×10</option>
          <option value='20'>20×20</option>
          <option value='30'>30×30</option>
          <option value='40'>40×40</option>
          <option value='50'>50×50</option>
          <option value='60'>60×60</option>
          <option value='70'>70×70</option>
          <option value='80'>80×80</option>
          <option value='90'>90×90</option>
          <option value='100'>100×100</option>
        </select>
        <button onClick={this.props.handleNext}>Next (Generation {this.props.generation})</button>
        <button onClick={this.props.handlePlay}>Play</button>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value='1'>1x</option>
          <option value='2'>2x</option>
          <option value='3'>3x</option>
          <option value='4'>4x</option>
          <option value='5'>5x</option>
          <option value='10'>10x</option>
        </select>
        <button onClick={this.props.handleStop}>Stop</button>
        <button onClick={this.props.handleClear}>Clear</button>
        <span> <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">Info</a></span>
      </div>
    )
  }
}

export default Player;
