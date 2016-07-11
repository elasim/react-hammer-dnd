const path = require('path');

module.exports = {
	entry: './main',
	context: path.join(__dirname, './src'),
	output: {
		publicPath: '/lib/',
		path: path.join(__dirname, './lib'),
		filename: '[name].bundle.js'
	},
	devtool: 'source-maps',
	target: 'web',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: [
					/(node_modules)/
				]
			}
		]
	},
};