import React, { Component } from 'react';
import PathPoint from './pathPoint';

export default class PreviewPath extends Component {
    constructor(props) {
        super(props);

        this.state = {
            points: [],
            visible: false,
        }
    }

    colors = [
        '#ff8f00',
        '#0277bd',
        '#c62828'
    ]

    hoverPath = hovered => event => {
        const { tooltip } = this.props;
        const elem = event.target;
        if (hovered) {
            elem.classList.add('hovered');
            tooltip.setState({
                visible: true,
                paths: this.parsePathText(elem.getAttribute('d')),
            });

            this.setState({ visible: true });
        }
        else {
            elem.classList.remove('hovered');
            tooltip.setState({ visible: false });
            this.setState({ visible: false });
        }
    }

    parsePathText = path => {
        const pathParts = path.split(/(?=[a-zA-Z])/);
        const texts = [];
        const points = [];

        let prevX = 0;
        let prevY = 0;

        for (let i = 0; i < pathParts.length; i++) {
            const part = pathParts[i];
            const [point, text] = this.createStyledPart(part, i);
            texts.push(text);
            points.push({
                x: parseInt(point.x, 10) + parseInt(prevX, 10),
                y: parseInt(point.y) + parseInt(prevY, 10),
            });

            prevX = point.x;
            prevY = point.y;
        }

        this.setState({ points });
        return texts; 
    }

    createStyledPart = (path, index) => {
        const unitRegex = /([a-zA-Z])\s(.*)/;
        const [noOpt, unit, point] = path.match(unitRegex);
        const [x, y] = point.split(/\s+/);

        switch(unit) {
            case 'm':
                return [
                    { x, y },
                    { color: this.colors[index], path }
                ]
            case 'l':
                return [
                    { x, y },
                    { color: this.colors[index], path }
                ]
        }
    }

    pointsUpdated = (index, newPoints) => {
        const { points } = this.state;
        points[index] = newPoints;
        this.setState({ points });

        const { path } = this.props;
        const pathParts = path.split(/(?=[a-zA-Z])/s);
        const movedPart = pathParts[index];
        const unitRegex = /([a-zA-Z])\s/;
        const [noOpt, unit] = movedPart.match(unitRegex);
        const newPath = `${unit} ${newPoints.x} ${newPoints.y}`;

        this.props.pathUpdated(this.props.index + 1, newPath);        

        pathParts[index] = newPath;

        this.parsePathText(pathParts.join(' '))

    }

    render() {
        const {
            path,
            strokeWidth,
            svgViewBoxPosition,
        } = this.props;

        const { points } = this.state;

        return (
            <>
                {/* {visible && points.map((point, index) => ( */}
                {points.map((point, index) => (
                    <PathPoint 
                        key={`point-${index}`} 
                        color={this.colors[index]}
                        point={point}
                        index={index}
                        pointsUpdated={this.pointsUpdated}
                        svgViewBoxPosition={svgViewBoxPosition}
                    />
                ))}
                <path 
                    d={path} 
                    stroke="transparent" 
                    onMouseOver={this.hoverPath(true)}
                    onMouseLeave={this.hoverPath(false)}
                    strokeWidth={strokeWidth + 8}
                />
            </>
        )
    }
}