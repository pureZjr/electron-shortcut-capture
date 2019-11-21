const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const main = require('./main/webpack.config')
const renderer = require('./renderer/webpack.config')

webpack(main, (err, stats) => {
	if (err) throw err
})

const server = new WebpackDevServer(webpack(renderer))
server.listen(8888)
