/**
 * Created by zuozhuo on 2017/6/22.
 */
'use strict'
const eslintFriendlyFormatter = require('eslint-friendly-formatter');
const webpack = require('webpack');
const path = require('path');

const config = {
    devtool: 'source-map',
    cache: true,
    resolve: {
        // default file extension when import or require modules
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    node: {
        // 避免某些npm包（例如browserslist）的代码中使用了node的fs模块，
        // 但是在浏览器环境中是没有fs模块的，导致浏览器中抛错
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    entry: {
        reactLazyHtmlView: path.join(__dirname, 'src/index.js'),
    },
    output: {
        path: path.join(__dirname, 'dist'),

        // library:'',
        // libraryExport: [],
        libraryTarget: 'umd',
        umdNamedDefine: true,

        filename: '[name].min.js',
        sourceMapFilename: '[file].map',
    },

    externals: {
        react:{
            commonjs: "react",
            commonjs2: "react",
            amd: "react",
            root: "React"
        },
    },

    module: {
        // keep empty array here
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     use: [
            //         {
            //             loader: 'eslint-loader',
            //             options: {
            //                 formatter: eslintFriendlyFormatter,
            //             },
            //         }
            //     ],
            // },

            {
                test: /\.js(x?)$/,
                exclude: [
                    // 排除非node_modules/xmui的node_modules
                    // /node_modules\/(?!xmui)/
                    /node_modules/,
                ],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: false,
                            cacheDirectory: true,
                        },
                    }
                ],
            },

            {
                test: /\.module\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                            autoprefixer: false,
                            restructuring: false,
                            importLoaders: 1,
                            modules: true,
                            localIdentName: '[hash:base64]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                ]
            }
        ],
    },
    // keep empty array here
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ // 压缩JS
            sourceMap: false,
            output: {
                comments: false,     // remove all comments
            },
            compress: {
                warnings: false,
            },
        }),
    ],
};

module.exports = config;