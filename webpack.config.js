const path = require('path');

const
    NODE_ENV = process.env.NODE_ENV || 'development',
    LISTEN_HOST = process.env.LISTEN_HOST || 'localhost',
    LISTEN_PORT = process.env.LISTEN_PORT || 3030;

const exampleSrc = path.resolve(__dirname, 'example');
const exampleDist = path.resolve(exampleSrc, 'dist');

module.exports = {
    entry: {
        app: './index.jsx'
    },
    context: exampleSrc,
    output: {
        path: exampleDist,
        filename: 'index.js'
    },
    devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,
    devServer: {
        inline: true,
        host: LISTEN_HOST,
        port: LISTEN_PORT,
        contentBase: exampleSrc
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.webpack.js',
            '.jsx',
            '.js'
        ],
        alias: {
            'react-frame-table': path.resolve(__dirname, 'src')
        }
    }
};
