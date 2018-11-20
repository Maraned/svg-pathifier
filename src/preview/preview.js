import './preview.css';

import React, { Component } from 'react';

export default class Preview extends Component {
    constructor(props) {
        super(props);
    }

    constructSvgPath(paths) {
        return paths.join(' ');
    }

    getViewBoxDimensions(viewBox) {
        const [ x, y, height, width ] = viewBox.split(' ');
        return {
            height,
            width,
        }
    }

    render() {
        const { 
            viewBox, 
            svgPaths,
            stroke,
            strokeWidth,
            fill,
        } = this.props;
        const { width, height } = this.getViewBoxDimensions(viewBox);

        return (
            <svg 
                width={width} 
                height={height} 
                viewBox={viewBox} 
                stroke={stroke} 
                strokeWidth={strokeWidth}
                fill={fill}
            >
                <path d={this.constructSvgPath(svgPaths)} />
            </svg>
        );
    }
}