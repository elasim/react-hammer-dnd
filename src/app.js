import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

import HammerContainer from './dnd/container';
import HammerPreview from './dnd/preview';
import Draggable from './dnd/draggable';
import Droppable from './dnd/droppable';

class App extends Component {
	static childContextTypes = {
		abc: PropTypes.string,
	};
	getChildContext() {
		return {
			abc: 'Hello World'
		};
	}
	render() {
		const dropBox = [];
		for (let i = 0; i < 200; ++i) {
			dropBox.push(<Droppable key={i} render={(props, state) => (
				<div style={{
					width: 500,
					height: 25,
					backgroundColor: state.isHover ? 'red' : 'green'
				}} onDoubleClick={e => { e.target.contentEditable = true; e.target.focus(); }}
				onBlur={e => { e.target.contentEditable = false; }}>
					Dropbox
				</div>
			)} />);
		}
		return (
			<HammerContainer>
				<div style={{
					height: 4000,
					paddingLeft: 100,
					backgroundColor: '#fcf'
				}}>
					<HammerPreview />
					<Bingo />
					<Draggable>
						<div>Without Preview</div>
					</Draggable>
					<Draggable preview={<div>MyPreview</div>}>
						<div>Draggable Object</div>
					</Draggable>
					<div>Fixed Object</div>
					{dropBox}
				</div>
			</HammerContainer>
		);
	}
}

export default App;

function Bingo(props, context) {
	return <div>{context.abc}</div>;
}
Bingo.contextTypes = {
	abc: PropTypes.string,
};