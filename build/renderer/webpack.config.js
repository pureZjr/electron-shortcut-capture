const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const jsRules = require('./jsRules')
const styleRules = require('./styleRules')
const fileRules = require('./fileRules')

module.exports = {
    entry: {
        app: path.join(__dirname, '../../src/renderer/index.tsx')
    },
    output: {
        path: path.join(__dirname, '../../dist'),
        filename: '[name].js'
    },
    target: 'electron-renderer',
    module: {
        rules: [...jsRules, ...styleRules, ...fileRules]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../../src/renderer/index.html')
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', 'png']
    },
    node: {
        fs: 'empty'
    },
    externals: {
        fs: 'require("fs")'
    }
}