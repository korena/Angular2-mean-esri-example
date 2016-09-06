var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    output: {
        filename: './dist/[name].bundle.js',
        publicPath: './',
        libraryTarget: "amd"
    },
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
