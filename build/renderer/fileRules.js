const { resolveUnderRootDir } = require('../utils')

module.exports = [
	{
		test: /\.svg$/,
		loader: '@svgr/webpack',
		include: resolveUnderRootDir('src')
	},
	{
		test: /\.(png|jpg|gif|ico)$/i,
		use: [
			{
				loader: 'url-loader',
				options: {
					limit: 8192
				}
			}
		]
	}
]
