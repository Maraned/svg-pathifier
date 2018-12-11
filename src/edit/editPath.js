import React, { Component } from 'react';

export default class EditPath extends Component {
    constructor(props) {
        super(props);

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
            selectedPathUnit: pathUnits[0]
        };
    }

    setSelectedPath = (selectedUnit) => {
        const pathUnits = this.state.pathUnits;
    
        let selectedPathUnit;

        for (let i = 0; i < pathUnits.length; i++) {
            const pathUnit = pathUnits[i];
            pathUnit.selected = pathUnit.unit === selectedUnit;
            if (pathUnit.selected) {
                selectedPathUnit = pathUnit;
            }
        }

        this.setState({ 
            pathUnits: this.sortUnitArray(pathUnits),
            selectedPathUnit
        });

        this.props.setSelectedUnit(selectedUnit);
    }

    sortUnitArray = unitArray => {
        unitArray.sort((a, b) => {
            return a.selected === b.selected ? 0 : a.selected ? -1 : 1;
        })
        return unitArray;
    }

    setPathUnit = (selected, unit) => () => {
        this.setState({ showUnits: !this.state.showUnits });
        if (!selected) {
            this.setSelectedPath(unit);
        }
        else {
            this.props.setSelectedUnit(unit);
        }
    }

    toggleUnitList = () => this.setState({ showUnits: !this.state.showUnits })

    filterPathUnits = (pathUnits, selectedPathUnit) => {
        var filteredPathUnits = [];
        for (let i = 0; i < pathUnits.length; i++) {
            const pathUnit = pathUnits[i];
            if (pathUnit.name !== selectedPathUnit.name) {
                filteredPathUnits.push(pathUnit);
            }  
        }
        return filteredPathUnits;
    }

    render() {
        const {
            path,
            index,
            updateSvgPath,
            ref,
        } = this.props;

        const { 
            showUnits,
            pathUnits,
            selectedPathUnit
        } = this.state;

        const filteredPathUnits = this.filterPathUnits(pathUnits, selectedPathUnit);

        return (
            <div key={`path-${index}`} className="edit-field">
                <div className={"edit-path-units" + (showUnits ? " show-units" : "")}>
                    <div 
                        className="edit-path-unit selected-path-unit"
                        key={selectedPathUnit.unit} 
                        onClick={this.toggleUnitList}
                    >
                        {selectedPathUnit.name}
                    </div>
                    <div className="edit-path-unit-list">
                        {filteredPathUnits.map(svgUnit => {
                            const { name, unit, selected } = svgUnit;
                            return (
                                <div 
                                    key={unit} 
                                    className="edit-path-unit" 
                                    onClick={this.setPathUnit(selected, unit)}
                                >
                                    {name}
                                </div>
                            )
                        })}
                    </div>
                </div>
                
                <input
                    className="edit-path"
                    type="text"
                    value={path} 
                    onChange={updateSvgPath} 
                    data-index={index} 
                    ref={ref}
                />
            </div>
        )
    }
}