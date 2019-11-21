const path = require('path')

const jsRules = require('./jsRules')
const { mode, resolveUnderRootDir } = require('../utils')
const plugins = require('./plugins')

module.exports = {
	mode,
	entry: {
		main: resolveUnderRootDir('src/main')
	},
	output: {
		path: resolveUnderRootDir('dist/main'),
		filename: '[name].js'
	},
	target: 'electron-main',
	module: {
		rules: [...jsRules]
	},
	watch: mode === 'development' ? true : false,
	devtool: false,
	plugins: [...plugins],
	resolve: {
		extensions: ['.ts', '.js', '.json']
	},
	node: {
		__dirname: false,
		__filename: false
	}
}
