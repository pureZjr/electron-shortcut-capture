const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ElectronDevWebpackPlugin = require('electron-dev-webpack-plugin')
const path = require('path')

const jsRules = require('./jsRules')

module.exports = {
    entry: {
        main: path.join(__dirname, '../../src/main/index.ts')
    },
    output: {
        path: path.join(__dirname, '../../dist'),
        filename: '[name].js'
    },
    target: 'electron-main',
    module: {
        rules: [...jsRules]
    },
    mode: 'development',
    watch: true,
    devtool: false,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ElectronDevWebpackPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['Your application main process is running here']
            }
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    node: {
        __dirname: false,
        __filename: false
    }
}