const path = require('path');
const webpack = require('webpack');

let plugins = [
        new webpack.optimize.UglifyJsPlugin()
    ];

module.exports = {
    devtool: 'source-map',
    entry: './js/main',
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: '/node_modules/'
        }]
    },
    output: {
        path: path.resolve(__dirname, 'js/dist'),
        filename: 'bundle.js'
    }
};