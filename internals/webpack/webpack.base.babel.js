/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const envConfig = require('config');

module.exports = options => ({
    mode: options.mode,
    entry: options.entry,
    output: {
        // Compile into js/build.js
        path: path.resolve(process.cwd(), 'build'),
        publicPath: '/',
        ...options.output,
    }, // Merge with env dependent settings
    optimization: options.optimization,
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: options.babelQuery,
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [
                        { search: '{_env}', replace: envConfig.get('env'), flags: 'g' },
                        { search: '{_imgCdnUrl}', replace: envConfig.get('cdnImgUrl'), flags: 'g' },
                        { search: '{_apiUrl}', replace: envConfig.get('api.url'), flags: 'g' },
                        { search: '{_platform}', replace: envConfig.get('platform'), flags: 'g' },
                        { search: '{_domain}', replace: envConfig.get('domain'), flags: 'g' },
                    ],
                },
            },
            {
                // Preprocess our own .css files
                // This is the place to add your own loaders (e.g. sass/less etc.)
                // for a list of loaders, see https://webpack.js.org/loaders/#styling
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                // Preprocess 3rd party .css files located in node_modules
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(eot|otf|ttf|woff|woff2)$/,
                use: 'file-loader',
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            // Inline files smaller than 10 kB
                            limit: 10 * 1024,
                            noquotes: true,
                        },
                    },
                ],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },
    plugins: options.plugins.concat([
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; Terser will automatically
        // drop any unreachable code.
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
        }),
    ]),
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.react.js'],
        mainFields: ['browser', 'jsnext:main', 'main'],
    },
    devtool: options.devtool,
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: options.performance || {},
});
