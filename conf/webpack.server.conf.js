'use strict';

const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const rootPath = require('app-root-path').path;
const HappyPack = require('happypack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const LoadablePlugin = require('@loadable/webpack-plugin');
const cssLoader = require('./lib/prod-css-loaders');

module.exports = [
    {
        node: {
            fs: 'empty',
        },
        target: 'node',
        stats: 'errors-only',
        mode: 'production',
        devtool: 'none',
        entry: [
            path.join(rootPath, 'server/main.ts'),
        ],
        output: {
            path: path.join(rootPath, 'dist/static'),
            filename: '../server/[name].js',
            chunkFilename: 'js/chunk.[chunkhash:8].js',
            globalObject: 'this',
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    loaders: ['babel-loader', 'ts-loader'],
                },
                {
                    test: /\.(js|jsx)$/,
                    use: 'happypack/loader?id=jsx',
                },
                {
                    test: /\.css$/,
                    loaders: [
                        MiniCssExtractPlugin.loader,
                        ...cssLoader,
                    ],
                },
                {
                    test: /\.less$/,
                    loaders: [
                        MiniCssExtractPlugin.loader,
                        ...cssLoader,
                        { loader: 'less-loader', options: { javascriptEnabled: true } },
                    ],
                },
                {
                    test: /\.scss$/,
                    loaders: [
                        MiniCssExtractPlugin.loader,
                        ...cssLoader,
                        'sass-loader',
                    ],
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: 'img/[name][hash:5].min.[ext]',
                                publicPath: '../',
                            },
                        },
                    ],
                },
                {
                    test: /\.(eot|woff2|woff|ttf|svg)/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'font/[name][hash:5].min.[ext]',
                                publicPath: '../',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ProgressBarPlugin({summary: true}),
            new MiniCssExtractPlugin({
                filename: 'css/[contenthash:8].[name].css',
            }),
            new HappyPack({
                loaders: ['babel-loader'],
                id: 'jsx',
            }),
        ],
        externals: fs
            .readdirSync(path.resolve(__dirname, '../node_modules'))
            .filter((filename) => !filename.includes('.bin'))
            .reduce((externals, filename) => {
                externals[filename] = `commonjs ${filename}`;
                return externals;
            }, {}),
        resolve: {
            extensions: ['.js', '.less', '.scss', '.css', '.jsx', '.tsx', '.ts'],
            alias: {
                'react-dom': '@hot-loader/react-dom',
                '$src': path.join(rootPath, '/client/src/'),
            },
        },
    },
];
