const HtmlWebpackPlugin = require('html-webpack-plugin')

const { resolveUnderRootDir } = require('../utils')

const plugin =
	process.env.NODE_ENV === 'development'
		? new HtmlWebpackPlugin({
				template: resolveUnderRootDir('src/renderer/index.html')
		  })
		: new HtmlWebpackPlugin({
				filename: resolveUnderRootDir('dist/renderer/index.html'),
				template: resolveUnderRootDir('src/renderer/index.html')
		  })
module.exports = [plugin]
