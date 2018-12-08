import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Edit from './edit/edit';
import Preview from './preview/preview';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      svgPaths: {},
      viewBox: "0 0 200 200",
      stroke: '#222222',
      strokeWidth: 2,
      fill: "#ffffff",
    };
  }

  updatePaths = svgPaths => {
    this.setState({ svgPaths });
  }

  updateViewBox = event => {
    this.setState({ viewBox: event.target.value });
  }

  updateStroke = event => {
    this.setState({ stroke: event.target.value });
  }

  updateStrokeWidth = event => {
    this.setState({ strokeWidth: parseInt(event.target.value, 10) });
  }

  updateFill = event => {
    this.setState({ fill: event.target.value });
  }

  render() {
    const { 
      svgPaths, 
      viewBox, 
      stroke, 
      strokeWidth,
      fill,
    } = this.state;

    return (
      <div className="App">
        <Edit 
          svgPaths={svgPaths}
          viewBox={viewBox}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
          updatePaths={this.updatePaths}
          updateStroke={this.updateStroke}
          updateStrokeWidth={this.updateStrokeWidth}
          updateViewBox={this.updateViewBox}
          updateFill={this.updateFill}
        />
        <Preview
          svgPaths={svgPaths}
          viewBox={viewBox}
          stroke={stroke}
          strokeWidth={strokeWidth}
          fill={fill}
        />
      </div>
    );
  }
}

export default App;
