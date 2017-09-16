const webpack = require('webpack');
const path = require('path');
// make webpack-dev-server actually write files
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'js/frontend.js',
    path: path.resolve(__dirname, 'public'),
  },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: "babel-loader",
                options: {
                    presets: ["react", "es2016"]
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{
                loader: "style-loader" // creates style nodes from JS strings
                },
                {
                loader: "css-loader" // translates CSS into CommonJS
                },
                {
                loader: "sass-loader" // compiles Sass to CSS
            }]
            }
        ]
    },
    plugins : [
        // new WriteFilePlugin()
    ]
};
