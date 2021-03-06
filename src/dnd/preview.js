import React, { Component, PropTypes } from 'react';

export default class HammerPreview extends Component {
	static contextTypes = {
		hammer: PropTypes.object,
	}
	componentWillMount() {
		this.state = {
			view: null
		};
	}
	componentDidMount() {
		this.disposeHook = this.context.hammer.createHook(
			this::start,
			this::move,
			this::end,
		);
	}
	componentWillUnmount() {
		this.context.hammer.setPreviewContainer(null);
		this.disposeHook();
	}
	render() {
		const { view } = this.state;
		if (view) {
			let position;
			let offset;
			if (this.state.initial) {
				const {x, y} = this.state.initial;
				position = {
					position: 'fixed',
					top: `${x}px`,
					left: `${y}px`,
				};
			}
			if (this.state.offset) {
				const {x, y} = this.state.offset;
				const transform = `translate(${x}px, ${y}px)`;
				offset = {
					'MSTransform': transform,
					'WebkitTransform': transform,
					'MozTransform': transform,
					'OTransform': transform,
					transform,
				};
			}
			return React.cloneElement(view, {
				style: Object.assign(
					// @TODO: Need workaround to support old browser
					{ pointerEvents: 'none' },
					position,
					offset,
				)
			});
		}
		return null;
	}
}

function start({ descriptor }) {
	const { element, source } = descriptor;
	if (source.props.preview) {
		const rect = element.getBoundingClientRect();
		this.setState({
			view: source.props.preview,
			initial: {
				x: rect.top,
				y: rect.left,
			}
		});
	}
}

function move({ event }) {
	this.setState({
		offset: {
			x: event.deltaX,
			y: event.deltaY,
		}
	});
}

function end() {
	this.setState({
		view: null,
		initial: null,
		offset: null
	});
}
