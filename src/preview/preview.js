import './preview.css';

import React, { Component } from 'react';
import PreviewPath from './previewPath';
import CornerElements from './cornerElements';
import Tooltip from './tooltip';

export default class Preview extends Component {
    constructor(props) {
        super(props);


        this.paths = this.constructSvgPath(props.svgPaths)
        this.hoverPaths = this.createHoverPaths(Object.values(this.paths));

        this.tooltip = React.createRef();
        this.tooltipText = 'Hover over path to see info';
    }

    componentWillUpdate(props) {
        this.paths = this.constructSvgPath(props.svgPaths)
        this.hoverPaths = this.createHoverPaths(Object.values(this.paths));
    }

    constructSvgPath(svgPaths) {
        let paths = {};
        // for (let index in svgPaths) {
        for (let index = 0; index < svgPaths.length; index++) {
            const { unit, path } = svgPaths[index];
            const isValidPath = this.isValidPath(path);
            if (isValidPath) {
                if (unit === 'path') {
                    if (paths[unit]) {
                        paths['path'] += ` ${path}`;
                    }
                    else {
                        paths['path'] = path;
                    }
                }
                else {
                    paths[`${unit}-${index}`] = path;
                }
            }
        }
        return paths;
    }

    unitPropertyLengths = {
        z: 0,
        h: 1,
        v: 1,
        m: 2,
        l: 2,
        t: 2,
        s: 4,
        q: 4,
        a: 7,
        c: 6,
    }

    isValidPath = path => {
        const unitMatch = path.match(/([mlhvcsqtazMLHVCSQTAZ])/);
        if (unitMatch) {
            const unit = unitMatch[0].toLowerCase();
            const unitPropertyLength = this.unitPropertyLengths[unit];
            const propertyLengthMatch = path.match(/(\d+\.?\d*)/g);
            const propertyLength = propertyLengthMatch ? propertyLengthMatch.length : 0;
            return unitPropertyLength === propertyLength;
        }
        return false;
    }

    createHoverPaths = svgPaths => {
        const hoverPaths = [];
        let previousPath = { x: 0, y: 0 };
        for (let i = 0; i < svgPaths.length; i++) {
            const svgPath = svgPaths[i];
            const paths = svgPath.split(/(?=[a-zA-Z])/);
            for (let j = 0; j < paths.length; j++) {
                const path = paths[j];
                const { x, y } = this.getXAndYPosition(path);
                if (j !== 0) { // start point m at index 0
                    const createdPath = this.createPathElem(path, previousPath);
                    hoverPaths.push(createdPath);
                }
                previousPath.x += parseInt(x, 10);
                previousPath.y += parseInt(y, 10);
            }
        }
        return hoverPaths;
    }

    createPathElem = (path, previousPath) => {
        const startPoint = previousPath ? `m ${previousPath.x} ${previousPath.y}` : '';
        return `${startPoint} ${path}`;
    }

    getXAndYPosition = path => {
        const pathRegex = /\w\s+(\d+)\s+(\d+)/;
        const match = path.match(pathRegex)
        if (match) {
            const [full, x, y] = match;
            return { x, y };
        }
        return { x: 0, y: 0 }
    }

    getViewBoxDimensions(viewBox) {
        const [ x, y, height, width ] = viewBox.split(' ');
        return {
            height,
            width,
        }
    }

    getSvgViewBox = viewBox => {
        const viewBoxPropertyLength = viewBox.match(/(\d+\.?\d*)/g);
        if (viewBoxPropertyLength.length === 4) {
            return viewBox;
        }
        else {
            const diff = 4 - viewBoxPropertyLength.length;
            for (let i = 0; i < diff; i++) {
                viewBox += ' 0';
            }
            return viewBox;
        }
    }

    getSvgViewBoxPosition = (width, height) => {
        if (!this.svgViewBoxElement) {
            return;
        }

        const { x, y } = this.svgViewBoxElement.getBoundingClientRect();

        return { x, y, maxX: width, maxY: height };
    }

    pathUpdated = (index, path) => {
        const { svgPaths, updatePaths } = this.props;
        const modifiedPath = svgPaths[index];

        modifiedPath.path = path; 
        svgPaths[index] = modifiedPath;

        updatePaths(svgPaths);
    }

    render() {
        const {
            viewBox,
            stroke,
            strokeWidth,
            fill,
        } = this.props;
        const { width, height } = this.getViewBoxDimensions(viewBox);

        const paths = this.paths;
        const svgViewBox = this.getSvgViewBox(viewBox);
        const svgViewBoxPosition = this.getSvgViewBoxPosition(width, height);

        return (
            <div className="preview">
                <div className="svg-container" style={{ "width": `${width || 0}px`, "height": `${height || 0}px` }}> 
                    <CornerElements width={width} height={height} />

                    <Tooltip ref={input => this.tooltip = input} />

                    <svg
                        width={width || 0}
                        height={height || 0}
                        viewBox={svgViewBox}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        fill={fill}
                        ref={svg => this.svgViewBoxElement = svg}
                    >
                        {Object.keys(paths).map(unitWithSuffix => {
                            const [unit, suffix] = unitWithSuffix.split('-');
                            const path = paths[unitWithSuffix]
                            const UnitTag = unit === 'path' ? 'path' : unit;
                            return unit === 'path' ? (
                                    <UnitTag key={unitWithSuffix} d={path} />
                                ) : (
                                    <UnitTag key={unitWithSuffix} {...path} />
                                )
                        })}
                        {this.hoverPaths.map((path, index) => (
                            <PreviewPath 
                                key={`pp-${index}`} 
                                path={path} 
                                index={index}  
                                strokeWidth={strokeWidth}
                                tooltip={this.tooltip}
                                svgViewBoxPosition={svgViewBoxPosition}
                                pathUpdated={this.pathUpdated}
                            />
                        ))}
                    </svg>
                </div>


                {/* { tooltipVisible && ( */}
                {/* )} */}

                {/* <div className="tooltip" ref={this.tooltip} data-origin-text={this.tooltipText}>
                    {this.tooltipText}
                </div> */}
            </div>
        );
    }
}