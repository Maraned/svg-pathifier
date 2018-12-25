import React, { Component } from 'react';

export default class PathPoint extends Component {
  static getDerivedStateFromProps(props, current_state) {
    if (current_state.position !== props.point) {
      return {
        position: props.point,
      }
    }
    return null
  }

  constructor(props) {
    super(props);

    this.state = {
      dragging: false,
      position: props.point,
      svgViewBoxPosition: props.svgViewBoxPosition
    }
  }

  onMouseDown = event => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.onMouseUp)

    this.setState({ dragging: true });
  }

  onMouseUp = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ dragging: false });

    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.onMouseUp)
  }
  
  onMouseMove = event => {
    event.preventDefault();
    event.stopPropagation();

    const { dragging, position } = this.state;
    const { svgViewBoxPosition, index } = this.props;

    if (!dragging) {
      return;
    }

    const velocity = {
      x: Math.ceil(event.pageX - svgViewBoxPosition.x - position.x),
      y: Math.ceil(event.pageY - svgViewBoxPosition.y - position.y),
    }

    const newPoints = {
      x: velocity.x + position.x,
      y: velocity.y + position.y,
    }

    const withinXBounds = newPoints.x <= svgViewBoxPosition.maxX
      && newPoints.x >= 0;
    const withinYBounds = newPoints.y <= svgViewBoxPosition.maxY
      && newPoints.y >= 0;

    if (!withinXBounds || !withinYBounds) {
      return;
    }

    this.props.pointsUpdated(index, newPoints);
  }

  render() {
    const { color } = this.props;
    const { position } = this.state;

    return (
      <circle 
        className="pathPoint"
        cx={position.x} 
        cy={position.y} 
        r={5} 
        fill={color}
        onMouseDown={this.onMouseDown}
      />
    )
  }
}