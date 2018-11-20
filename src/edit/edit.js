import './edit.css';

import React, { Component } from 'react';

export default class Edit extends Component {
    constructor(props) {
        super(props);

        this.focusLastPath = false;
        this.lastInput = React.createRef();
    }

    updateSvgPath = (event) => {
        const { index } = event.target.dataset;
        const { svgPaths } = this.props;
        const value = event.target.value;

        if (index) {
            svgPaths[index] = value;
        }
        else {
            this.focusLastPath = true;
            svgPaths.push(value);
        }

        this.props.updatePaths(svgPaths);
    }

    componentDidUpdate() {
        if (this.focusLastPath) {
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
        
        return (
            <div className="edit">
                <div className="edit-field">
                    <label>Viewbox</label>
                    <input type="text" onChange={updateViewBox} value={viewBox} />
                </div>

                <div className="edit-field">
                    <label>StrokeWidth</label>
                    <input type="range" min="0" max="10" onChange={updateStrokeWidth} value={strokeWidth} />
                </div>

                <div className="edit-field">
                    <label>Stroke</label>
                    <input type="color" onChange={updateStroke} value={stroke} />
                </div>

                <div className="edit-field">
                    <label>Fill</label>
                    <input type="color" onChange={updateFill} value={fill} />
                </div>

                <div className="edit-paths">
                    <label>Paths</label>  
                    
                    {svgPaths.map((path, index) => {
                        return <div key={`path-${index}`} className="edit-field">
                            <input
                                type="text"
                                value={path} 
                                onChange={this.updateSvgPath} 
                                data-index={index} 
                                ref={this.focusLastPath ? this.lastInput : ''}
                            />
                        </div>
                    })}
                    
                    <button 
                        className="edit-add-path" 
                        onClick={this.updateSvgPath} 
                    >
                        Add path
                    </button>
                </div>
            </div>
        );
    }
}