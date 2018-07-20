const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const bourbon = require('bourbon');

console.log(path.resolve(
    path.join(__dirname,
              '/node_modules/purecss-sass/vendor/assets/stylesheets')));

module.exports = {
    entry: {
        index: './assets/js/index.js'
    },
    output: {
        path: __dirname + "/builtAssets",
        publicPath: "/assets/",
        filename: 'js/[name].js'
    },
    resolve: {
        alias: {
            // seriously: path.join(__dirname, 'lib/seriously/seriously')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.s?css$/,
                loader: ExtractTextPlugin.extract(
                    { fallback: "style-loader",
                      use: ["css-loader",
                            "postcss-loader",
                            {
                                loader: "sass-loader",
                                options: {
                                    includePaths: [
                                        path.resolve(
                                            __dirname,
                                            'node_modules/purecss-sass/vendor/assets/stylesheets'
                                        ),
                                        bourbon.includePaths
                                    ]
                                }
                            }]
                    }
                )
            },
            {
                test: /\.(jpg|gif|png|svg)$/,
                loader: "file-loader?name=img/[name].[ext]"
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=fonts/[name].[ext]&limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[ext]" }
            /*{
              test: /\.(eot|svg|ttf|woff2?)(\?.*)?$/,
              loader: "file?name=builtAssets/fonts/[name].[ext]"
              }*/
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{ from: 'assets/img', to: 'img' }]),
        new ExtractTextPlugin("css/[name].css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [ autoprefixer ];
                }
            }
        }),
        // new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' })
    ]
};
