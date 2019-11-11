const path = require('path')

module.exports = [{
    test: /\.scss$/,
    include: [path.join(__dirname, '../../src/renderer')],
    use: ['style-loader', 'css-loader', 'sass-loader']
}]