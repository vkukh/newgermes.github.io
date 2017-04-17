const path = require('path');
const webpack = require('webpack');

let plugins = [
        new webpack.optimize.UglifyJsPlugin()
    ];

module.exports = {
    devtool: 'source-map',
    entry: './src/js/main',
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: '/node_modules/'
        },
        {
            test: /\.css$/,
            exclude: '/node_modules/',
            loader: 'style-loader!css-loader'
        }]
    },
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'bundle.js'
    }
};