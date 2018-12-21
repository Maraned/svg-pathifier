import React from 'react';
import PathIcon from './pathIcon';

import './icons.css';

export class AddIcon extends PathIcon {
  renderIcon = () => {
    const { circleCenter, iconSize } = this.state;

    return (
      <g className="add-plus-icon" stroke="white" strokeWidth="2">
        <line
          x1={circleCenter - (iconSize / 2)} y1={circleCenter}
          x2={circleCenter + (iconSize / 2)} y2={circleCenter}></line>
        <line
          x1={circleCenter} y1={circleCenter - (iconSize / 2)}
          x2={circleCenter} y2={circleCenter + (iconSize / 2)}></line>
      </g>
    )
  }
}

export class DeleteIcon extends PathIcon {
  componentDidMount() {
    this.setState({
      circleColor: '#d50000'
    });
  }

  renderIcon = () => {
    const { circleCenter, iconSize } = this.state;

    return (
      <g className="delete-icon" stroke="white" strokeWidth="2">
        <line
          x1={circleCenter - (iconSize / 2)} y1={circleCenter}
          x2={circleCenter + (iconSize / 2)} y2={circleCenter}></line>
        <line
          x1={circleCenter} y1={circleCenter - (iconSize / 2)}
          x2={circleCenter} y2={circleCenter + (iconSize / 2)}></line>
      </g>
    )
  }
}

export class SwitchIcon extends PathIcon {
  componentDidMount() {
    this.setState({
      circleColor: '#ff6d00'
    });
  }

  renderIcon = () => {
    const { circleCenter, iconSize } = this.state;

    return (
      <g className="switch-icon" stroke="white" strokeWidth="2">
        <line
          x1={circleCenter - (iconSize / 2)} y1={circleCenter}
          x2={circleCenter + (iconSize / 2)} y2={circleCenter}></line>
        <line
          x1={circleCenter} y1={circleCenter - (iconSize / 2)}
          x2={circleCenter} y2={circleCenter + (iconSize / 2)}></line>
      </g>
    )
  }
}