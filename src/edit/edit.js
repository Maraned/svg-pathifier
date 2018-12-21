import './edit.css';

import React, { Component } from 'react';

import EditPath from './editPath';
import { AddIcon, DeleteIcon } from './pathIcons/icons';

export default class Edit extends Component {
	constructor(props) {
		super(props);

		this.focusLastPath = false;
		this.lastInput = React.createRef();

		this.state = {
			selectedUnit: 'path',
			previousActions: [],
		};
	}

	createAction = (action, path, index) => {
		return {
			action,
			path,
			index
		}
	}

	setSvgPath = (index, insertAtIndex, path) => {
		const { svgPaths } = this.props;

		let svgPath = svgPaths[index];
		
		if (svgPath && !insertAtIndex) {
			svgPath.path = path;
		}
		else {
			this.focusLastPath = true;
			svgPath = {
				path,
				unit: this.state.selectedUnit
			};
			if (insertAtIndex) {
				svgPaths.splice(index, 0, svgPath);
			}
			else {
				svgPaths[index] = svgPath;
			}
		}

		this.props.updatePaths(svgPaths);

	}

	updateSvgPath = (index, insertAtIndex = false, sentInPath) => event => {
		const path = event.target.value || '';
		this.setSvgPath(index, insertAtIndex, path);
	}

	setSelectedUnit = selectedUnit => this.setState({ selectedUnit })

	componentDidUpdate() {
		if (this.focusLastPath && this.lastInput.current) {
			// this.lastInput.current.focus(); 
			this.focusLastPath = false;
		}
	}

	undoAction = () => {
		const { previousActions } = this.state;
		const { action, path, index } = previousActions.pop();

		switch(action) {
			case 'delete': 
				this.setSvgPath(index, true, path.path)
				break;
		}
	}

	deleteSvgPath = index => () => {
		const { svgPaths } = this.props;
		const { previousActions } = this.state;

		const path = svgPaths.splice(index + 1, 1)[0];

		previousActions.push(this.createAction('delete', path, index + 1));

		this.props.updatePaths(svgPaths);
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
			showUnits,
			previousActions
		} = this.state;

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
					<input type="color" onChange={updateFill} value={fill} />
				</div>

				<div className="edit-paths">
					<label>Paths</label>
					<div className="edit-paths-list">
						{/* {svgPathKeys.map(index => { */}
						{svgPaths.map((svgPath, index) => {
							const { path } = svgPath;

							return <>
								<EditPath
									key={`edit-path-${index}`}
									path={path}
									index={index}
									updateSvgPath={this.updateSvgPath(index)}
									ref={index === svgPaths.length - 1 ? this.lastInput : null}
									setSelectedUnit={this.setSelectedUnit}
								/>
								{index < svgPaths.length - 1 && (
									<div className="icons">
										<AddIcon onClick={this.updateSvgPath(index + 1, true)} />

										<DeleteIcon onClick={this.deleteSvgPath(index)} />
									</div>
								)}
							</>
						})}
					</div>

					<div className="button-container">
						<button
							className="edit-add-path"
							onClick={this.updateSvgPath(svgPaths.length)}
						>
							Add path
						</button>

						<button
							className="edit-undo-action"
							onClick={this.undoAction}
							disabled={!previousActions.length}
						>
							Undo
						</button>
					</div>
				</div>
			</div>
		);
	}
}