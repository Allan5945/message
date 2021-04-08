module.exports = [
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                // localIdentName: '[hash:base64:5]',
            },
        },
    }
];
