const { resolveUnderRootDir } = require('../utils')

module.exports = [
	{
		test: /\.scss$/,
		include: [resolveUnderRootDir('src/renderer')],
		use: ['style-loader', 'css-loader', 'sass-loader']
	}
]
