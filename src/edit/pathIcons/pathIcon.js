import React, { Component } from 'react';

export default class PathIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            circleRadius: 25,
            iconSize: 30,
            circleCenter: 50,
            circleColor: '#558b2f',
        }
    }

    onMouseOver = () => this.setState({ 
        circleRadius: 40,
        iconSize: 40,

    })
    onMouseLeave = () => this.setState({ 
        circleRadius: 25, 
        iconSize: 30,
    })

    render() { 
        return this.renderPath(this.renderIcon)
    }

    renderPath = iconRenderFunction => {
        const { onClick } = this.props;
        const { 
            circleRadius, 
            circleCenter, 
            className,
            circleColor
        } = this.state;

        return (
            <svg 
                className={className} 
                viewBox="0 0 100 100" 
                width="30" 
                height="30"
                onClick={onClick}
            >
                <line 
                    x1="50" 
                    y1="0" 
                    x2="50" 
                    y2="25" 
                    stroke="#222" 
                    strokeWidth="20"
                ></line>

                <line 
                    x1="50" 
                    y1="75" 
                    x2="50" 
                    y2="100" 
                    stroke="#222" 
                    strokeWidth="20"
                ></line>

                <circle 
                    onMouseOver={this.onMouseOver} 
                    onMouseLeave={this.onMouseLeave}
                    cx={circleCenter}
                    cy={circleCenter}
                    fill={circleColor}
                    r={circleRadius}
                ></circle>

                {iconRenderFunction()}
            </svg>
        )
    }
}
