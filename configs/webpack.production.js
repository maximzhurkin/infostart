const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin(),
			new UglifyJsPlugin({
				uglifyOptions: {
					output: { comments: false },
					compress: { booleans: true }
				}
			})
		],
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							url: false
						}
					},
					{ loader: 'postcss-loader' },
					{
						loader: 'stylus-loader',
						options: {
							import: [
								path.join(__dirname, '../src/components/app/config.styl'),
								path.join(__dirname, '../src/components/app/mixins.styl'),
							],
						}
					}
				]
			}
		]
	},
	plugins: [
		new AssetsPlugin({
			filename: './dist/assets/assets.json',
			prettyPrint: true,
			includeAllFileTypes: false,
			entrypoints: true,
		}),
	],
});
