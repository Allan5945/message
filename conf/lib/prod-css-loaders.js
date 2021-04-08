
module.exports = [
    {
        loader: 'css-loader',
        options: {
            modules: {
                mode: 'local',
                localIdentName: '[hash:base64:5]',
            },
        },
    },
    'postcss-loader'
];