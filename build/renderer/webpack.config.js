const path = require('path')

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
		extensions: ['.ts', '.tsx', '.js', 'jsx', 'png'],
		alias: {
			'@assets': path.resolve(
				__dirname,
				'../../src/renderer/screenShortcut/assets'
			),
			'@utils': path.resolve(
				__dirname,
				'../../src/renderer/screenShortcut/utils'
			),
			'@constant': path.resolve(__dirname, '../../src/constant')
		}
	},
	devtool: false,
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}
