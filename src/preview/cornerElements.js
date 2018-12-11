import React, { Component } from 'react';

export default class CornerElements extends Component {
    cornerPosition = (vertical, horizontal, x, y) => {
        return (
            <div className={`${vertical}-${horizontal}-pos corner-pos`}>
                <span className="horizontal-pos">{x}</span>
                <span className="vertical-pos">{y}</span>
            </div>
        )
    }

    render() {
        const { width, height } = this.props;

        return (
            <>
                {this.cornerPosition('top', 'left', 0, 0)}
                {this.cornerPosition('top', 'right', width, 0)}
                {this.cornerPosition('bottom', 'left', 0, height)}
                {this.cornerPosition('bottom', 'right', width, height)}
            </>
        )
    }
}