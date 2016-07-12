import React from 'react';
import { render } from 'react-dom';
import App from './app';
import 'core-js/fn/array/find-index';
import 'core-js/fn/object/assign';

render(<App/>, document.getElementById('root'));

if (module.hot) {
	module.hot.accept();
}