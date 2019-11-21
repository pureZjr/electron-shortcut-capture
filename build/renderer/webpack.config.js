const jsRules = require('./jsRules')
const styleRules = require('./styleRules')
const fileRules = require('./fileRules')
const plugins = require('./plugins')
const { mode, resolveUnderRootDir } = require('../utils')

module.exports = {
	mode,
	entry: {
		app: resolveUnderRootDir('src/renderer')
	},
	output: {
		path: resolveUnderRootDir('dist/renderer'),
		filename: '[name].js',
		globalObject: 'this'
	},
	target: 'electron-renderer',
	module: {
		rules: [...jsRules, ...styleRules, ...fileRules]
	},
	plugins: [...plugins],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx', 'png']
	},
	devtool: false,
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}
