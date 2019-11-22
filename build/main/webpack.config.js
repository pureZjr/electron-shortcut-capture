const path = require('path')

const jsRules = require('./jsRules')
const { mode, resolveUnderRootDir } = require('../utils')
const plugins = require('./plugins')

const entry =
	process.env.NODE_ENV === 'development'
		? resolveUnderRootDir('src/main')
		: resolveUnderRootDir('src/main/electron-shortcut-capture.ts')

module.exports = {
	mode,
	entry: {
		main: entry
	},
	output: {
		path: resolveUnderRootDir('dist/main'),
		filename: '[name].js',
		library: 'ElectronShortcutCapture',
		libraryExport: 'default',
		libraryTarget: 'commonjs2'
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
