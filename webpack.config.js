var webpack = require("webpack");
var helpers = require('./config/helpers');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
switch (process.env.NODE_ENV) {
    case 'prod':
    case 'production':
        module.exports = require('./config/webpack.prod');
        break;
    case 'test':
    case 'testing':
        module.exports = require('./config/webpack.test');
        break;
    case 'dev':
    case 'development':
    default:
        module.exports = require ('./config/webpack.dev');
}