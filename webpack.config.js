/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
// const slsw = require("serverless-webpack");
// const nodeExternals = require("webpack-node-externals");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

console.log(process.env.NODE_ENV);
module.exports = {
    target: "webworker",
    mode: process.env.NODE_ENV || "development",
    entry: { bundle: path.join(__dirname, "./src/index.ts") },
    devtool: process.env.NODE_ENV != "production" ? "cheap-module-source-map" : null,
    resolve: {
        extensions: [".mjs", ".json", ".ts"],
        symlinks: false,
        cacheWithContext: false,
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    // externals: [nodeExternals()],
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.(tsx?)$/,
                loader: "ts-loader",
                exclude: [
                    [
                        path.resolve(__dirname, "node_modules"),
                        path.resolve(__dirname, ".serverless"),
                        path.resolve(__dirname, ".webpack"),
                    ],
                ],
                options: {
                    transpileOnly: true,
                    experimentalWatchApi: true,
                },
            },
        ],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
            eslintOptions: {
                cache: true,
            },
        }),
    ],
};
