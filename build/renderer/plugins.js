const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "../../src/renderer/index.html")
    })
];