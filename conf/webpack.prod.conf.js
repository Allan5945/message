'use strict';

const path = require('path');
const rootPath = require('app-root-path').path;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const cssLoader = require('./lib/prod-css-loaders');
// const reactManifest = require('../client/dll/react.manifest.json');

let config = {
    stats: 'errors-only',
    mode: 'production',
    devtool: 'none',
    entry: {
        home: ['./client/page/home/main.tsx'],
    },
    output: {
        path: path.join(rootPath, 'dist/static'),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk.[chunkhash:8].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader?cacheDirectory',
                        options: {

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
                },
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    ...[
                        'css-loader',
                        'postcss-loader',
                    ],
                ],
            },
            {
                test: /\.less$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    ...cssLoader,
                    { loader: 'less-loader' },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        },
                    },
                    ...cssLoader,
                    'sass-loader',
                ],
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
                            name: 'img/[name][hash:5].min.[ext]',
                            useRelativePath: false,
                            publicPath: '../',
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
                            name: 'font/[name][hash:5].min.[ext]',
                            publicPath: '../',
                            useRelativePath: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ProgressBarPlugin({ summary: true }),
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash:8].[name].css',
        }),
        new HtmlWebpackPlugin({
            root: '<%- root %>',
            template: path.join(rootPath, '/client/page/home/index.html'),
            chunksSortMode: 'none',
            chunks: ['home'],
            filename: 'views/home.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.less', '.scss', '.css', '.jsx', '.tsx', '.ts'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            '$src': path.join(rootPath, ''),
        },
    },
};


module.exports = config;
