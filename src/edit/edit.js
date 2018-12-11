import './edit.css';

import React, { Component } from 'react';

import EditPath from './editPath';

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.focusLastPath = false;
        this.lastInput = React.createRef();

        this.state = {
            selectedUnit: 'path',
        };

        const ShowUnitsContext = React.createContext()
    }

    updateSvgPath = event => {
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

    setSelectedUnit = selectedUnit => this.setState({ selectedUnit })

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
                        return <EditPath 
                            key={index} 
                            path={path} 
                            index={index} 
                            updateSvgPath={this.updateSvgPath}
                            ref={index === svgPaths.length - 1 ? this.lastInput : null}
                            setSelectedUnit={this.setSelectedUnit}
                        />
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