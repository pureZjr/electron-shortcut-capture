const path = require('path')

module.exports = [{
    test: /\.(png|jpg|gif|ico)$/i,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 8192
        }
    }]
}]