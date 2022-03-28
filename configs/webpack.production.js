// const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const PurgecssPlugin = require('purgecss-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
					compress: {
						booleans: true,
						drop_console: true
					}
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
		// new PurgecssPlugin({
		// 	paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, { nodir: true }),
		// }),
		new AssetsPlugin({
			filename: './dist/assets/assets.json',
			prettyPrint: true,
			includeAllFileTypes: false,
			entrypoints: true,
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
		}),
	],
});
