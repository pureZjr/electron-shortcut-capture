module.exports = [
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    // disable type checker - we will use it in fork plugin
                    transpileOnly: true,
                    configFile: require('path').join(__dirname, '../../tsconfig.json')
                }
            }
        ]
    }
]
