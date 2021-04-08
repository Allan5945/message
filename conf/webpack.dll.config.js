const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
const rootPath = require('app-root-path').path;
module.exports = {
    entry: {
        react: ['react', 'react-dom', 'redux', 'react-redux', 'react-transition-group', 'react-router-dom', 'classnames'],
        utils: ['moment', 'axios'],
    },
    output: {
        filename: '[name].dll.js',
        path: path.join(rootPath, 'dist/static/js'),
        library: '_dll_[name]',
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.join(rootPath, 'client', 'dll/[name].manifest.json'),
        }),
    ],
};
