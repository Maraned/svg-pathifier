import React, { Component } from 'react';

export default class PreviewPath extends Component {
    hoverPath = hovered => event => {
        const elem = event.target;
        let text = '';
        if (hovered) {
            elem.classList.add('hovered');
            text = this.parsePathText(elem.getAttribute('d'));
        }
        else {
            elem.classList.remove('hovered');
        }
        
        this.updateTooltipPos(text);
    }

    parsePathText = path => {
        const pathParts = path.split(/(?=[a-zA-Z])/);
        return pathParts.join('<br/>');
    }

    updateTooltipPos = (text) => {
        const tooltip = this.props.tooltip.current;
        tooltip.innerHTML = text || this.props.tooltipText;
    }

    render() {
        const {
            path,
            strokeWidth
        } = this.props;

        return (
            <path 
                d={path} 
                stroke="transparent" 
                onMouseOver={this.hoverPath(true)}
                onMouseLeave={this.hoverPath(false)}
                strokeWidth={strokeWidth + 8}
            />
        )
    }
}