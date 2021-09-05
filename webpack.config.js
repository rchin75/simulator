const path = require( 'path' );

// Configuration for running in a browser.
const clientConfig = {
    // bundling mode
    mode: 'development',
    // entry files
    entry: './src/index.ts',
    devtool: 'source-map',
    // Either web or node
    target: 'web',
    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'simulator.js',
        library: {
            //name: 'simulator',
            type: 'module', // alternative: 'umd'
            //umdNamedDefine: true
       },
    },
    // Required to allow library.type: 'module'
    experiments: {
        outputModule: true
    },
    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    optimization: {
        runtimeChunk: false // when true it does not work for some reason.
    }
};

// Configuration for running on node js.
const serverConfig = {
    // bundling mode
    mode: 'development',
    // entry files
    entry: './src/index.ts',
    devtool: 'source-map',
    // Either web or node
    target: 'node',
    // output bundles (location)
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'simulator-node.js',
        library: {
            name: 'simulator',
            type: 'umd',
            umdNamedDefine: true
        },
    },
    // file resolutions
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    // loaders
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    optimization: {
        runtimeChunk: false // when true it does not work for some reason.
    }
};

module.exports = [clientConfig, serverConfig];