const path = require('path');
const webpack = require('webpack');

module.exports = {
    // Other webpack configuration settings...

    resolve: {
        fallback: {
            "assert": require.resolve("assert/"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "path": require.resolve("path-browserify"),
            "http": require.resolve("stream-http"),
            "os": require.resolve("os-browserify/browser"),
            "buffer": require.resolve("buffer/"),
            "querystring": require.resolve("querystring-es3"),
            "tls": require.resolve("https-browserify"),
            "https": require.resolve("https-browserify"),
            "fs": false,
            "zlib": require.resolve("browserify-zlib"),
            "url": require.resolve("url/")
        }
    }
};
