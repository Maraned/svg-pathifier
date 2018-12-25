import React, { Component } from 'react';

import './tooltip.css'; 

export default class Tooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paths: [],
      visible: false,
    }
  }
 
  render() {
    const {  paths, visible } = this.state;
    
    return visible && (
      <div className="tooltip">
        { paths.map((path, index) => {
          return (
            <div key={`tooltip-${index}`} style={{color: path.color}}>
              {path.path}
              
            </div>
          )
        })}
      </div>
    )
  }
}