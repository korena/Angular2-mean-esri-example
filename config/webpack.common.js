var webpack = require("webpack");
var helpers = require('./helpers');
var CopyWebpackPlugin = (CopyWebpackPlugin = require('copy-webpack-plugin'), CopyWebpackPlugin.default || CopyWebpackPlugin);
module.exports = {
    entry: {
        main: [
            './client/boot.ts' // entry point for your application code
        ],
        vendor: [
            // put your third party libs here
            "core-js",
            "reflect-metadata", // order is important here
            "rxjs",
            "zone.js",
            '@angular/core',
            "@angular/compiler",
            "@angular/core",
            "@angular/http",
            "@angular/platform-browser",
            "@angular/platform-browser-dynamic",
            "@angular/router",
            "@angular/router-deprecated",
            "@angular/upgrade"
        ]
    },

    resolve: {
        root: helpers.root('client'),
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        // Remove other default values
        modulesDirectories: ['node_modules'],


        fallback: helpers.root("node_modules")
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loaders: ['ts-loader', 'angular2-template-loader'],
            exclude: ''
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new CopyWebpackPlugin([{
            from: 'client/styles/main.css',
            to: 'dist/assets/main.css'
        }]),
        new CopyWebpackPlugin([{
            from: 'client/index.html',
            to: 'dist/'
        }], { flatten: true })
    ],
    externals: [
        function(context, request, callback) {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, "amd " + request);
            }
            callback();
        }
    ]
};
