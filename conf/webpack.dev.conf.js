'use strict';

// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const HappyPack = require('happypack');
const rootPath = require('app-root-path').path;
const cssLoaders = require('./lib/dev-css-loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
    },
    stats: 'errors-only',
    mode: 'development',
    output: {
        path: path.join(rootPath, 'dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                            ],
                        }},
                    { loader: 'ts-loader' },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader?cacheDirectory',
                options: {
                    plugins: [
                    ],
                }
            },
            {
                test: /\.css$/,
                use: 'happypack/loader?id=css',
            },
            {
                test: /\.less$/,
                use: 'happypack/loader?id=less',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: 'happypack/loader?id=scss',
                exclude: /node_modules/,
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name][hash:5].min.[ext]',
                            // publicPath: 'dist/static/',
                            outputPath: 'img/',
                            useRelativePath: true,
                        },
                    },
                ],
            },
            {
                test: /\.(eot|woff2|woff|ttf|svg)/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name][hash:5].min.[ext]',
                            // publicPath: 'dist/static/',
                            outputPath: 'font/',
                            useRelativePath: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.less', '.scss', '.css', '.jsx', '.tsx', '.ts'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '$src': path.join(rootPath, '/client/src/'),
        },
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new HappyPack({
            loaders: [
                'style-loader',
                {
                    loader: 'css-loader',
                    exclude: /node_modules/,
                    include: [
                    ],
                },
            ],
            id: 'css',
        }),
        new HappyPack({
            loaders: [...cssLoaders, ...['less-loader']],
            id: 'less',
        }),
        new HappyPack({
            loaders: [...cssLoaders, ...['sass-loader']],
            id: 'scss',
        })
    ]
};

