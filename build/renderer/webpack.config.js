const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsRules = require("./jsRules");
const styleRules = require("./styleRules");
const fileRules = require("./fileRules");
const plugins = require("./plugins");

module.exports = {
    entry: {
        app: path.join(__dirname, "../../src/renderer/index.tsx")
    },
    output: {
        path: path.join(__dirname, "../../dist"),
        filename: "[name].js"
    },
    target: "electron-renderer",
    module: {
        rules: [...jsRules, ...styleRules, ...fileRules]
    },
    plugins: [...plugins],
    resolve: {
        extensions: [".ts", ".tsx", ".js", "jsx", "png"]
    },
    node: {
        fs: "empty"
    },
    externals: {
        fs: 'require("fs")'
    }
};