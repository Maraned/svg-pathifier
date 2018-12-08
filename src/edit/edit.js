import './edit.css';

import React, { Component } from 'react';

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.focusLastPath = false;
        this.lastInput = React.createRef();

        const pathUnits = [
            { name: 'Path', unit: 'path', selected: true},
            { name: 'Line', unit: 'line'},
            { name: 'Rectangle', unit: 'rect'},
            { name: 'Circle', unit: 'circle'},
            { name: 'Ellipse', unit: 'ellipse'},
            { name: 'Polyline', unit: 'polyline'},
            { name: 'Polygon', unit: 'polygon'},
        ];

        this.state = {
            showUnits: false,
            pathUnits,
            selectedUnit: pathUnits[0].unit
        };
    }

    updateSvgPath = (event) => {
        const { index } = event.target.dataset;
        const { svgPaths } = this.props;
        const path = event.target.value;

        let svgPath = svgPaths[index];

        if (svgPath) {
            svgPath.path = path;
        }
        else {
            this.focusLastPath = true;
            svgPath = { 
                path,
                unit: this.state.selectedUnit
            };
            svgPaths[index] = svgPath;
        }

        this.props.updatePaths(svgPaths);
    }

    setSelectedPath = (selectedUnit) => {
        const pathUnits = this.state.pathUnits;
        
        for (let i = 0; i < pathUnits.length; i++) {
            const pathUnit = pathUnits[i];
            pathUnit.selected = pathUnit.name === selectedUnit;
        }

        this.setState({ 
            selectedUnit,
            pathUnits: this.sortUnitArray(pathUnits)
        });
    }

    setPathUnit = event => {
        const { selected } = event.target.dataset;
        if (selected) {
            this.setState({ showUnits: true });
        }
        else {
            this.setSelectedPath();
            this.setState({ showUnits: false });
        }
    }

    sortUnitArray = unitArray => {
        unitArray.sort((a, b) => {
            return a.selected > b.selected;
        })
        return unitArray;
    }

    componentDidUpdate() {
        if (this.focusLastPath && this.lastInput.current) {
            this.lastInput.current.focus();
            this.focusLastPath = false;
        }
    }

    render() {
        const { 
            svgPaths, 
            updateViewBox, 
            viewBox,
            stroke,
            updateStroke,
            strokeWidth,
            updateStrokeWidth,
            fill,
            updateFill,
        } = this.props;

        const {
            pathUnits,
            showUnits
        } = this.state;

        const svgPathKeys = Object.keys(svgPaths);

        return (
            <div className="edit">
                <div className="edit-field">
                    <label>Viewbox</label>
                    <input type="text" onChange={updateViewBox} value={viewBox} />
                </div>

                <div className="edit-field">
                    <label>StrokeWidth</label>
                    <input type="range" min="0" max="10" onChange={updateStrokeWidth} value={strokeWidth} />
                    <span>{strokeWidth}</span>
                </div>

                <div className="edit-field">
                    <label>Stroke</label>
                    <input type="color" onChange={updateStroke} value={stroke} />
                </div>

                <div className="edit-field">
                    <label>Fill</label>
                    <input type="color" onChange={updateFill} value={fill}  />
                </div>

                <div className="edit-paths">
                    <label>Paths</label>  
                    
                    {svgPathKeys.map(index => {
                        const { path } = svgPaths[index];
                        return <div key={`path-${index}`} className="edit-field">
                            <div className={"edit-path-units" + (showUnits ? " show-units" : "")}>
                                {pathUnits.map(svgUnit => {
                                    const { name, unit, selected } = svgUnit;
                                    return (
                                        <div 
                                            key={unit} 
                                            className="edit-path-unit" 
                                            data-unit={unit}
                                            onClick={this.setPathUnit}
                                            data-selected={selected}
                                        >
                                            {name}
                                        </div>
                                    )
                                })}
                            </div>
                            <input
                                className="edit-path"
                                type="text"
                                value={path} 
                                onChange={this.updateSvgPath} 
                                data-index={index} 
                                ref={this.lastInput}
                            />
                        </div>
                    })}
                    
                    <button 
                        className="edit-add-path" 
                        onClick={this.updateSvgPath} 
                        data-index={svgPathKeys.length}
                    >
                        Add path
                    </button>
                </div>
            </div>
        );
    }
}