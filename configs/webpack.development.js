const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const mocks = require('../mocks/mocks.js');

module.exports = merge(config, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		overlay: false,
		open: false,
		publicPath: '/',
		hot: true,
		before: function (app) {
			mocks.forEach(route => {
				app.all(route, function (req, res) {
					setTimeout(() => { // Simulating server response delay 300ms
						res.json(require('../mocks' + route + '/data.json'));
					}, 300);
				});
			});
		},
		https: true,
		host: '0.0.0.0',
		port: 8080,
		disableHostCheck: true,
		watchContentBase: true,
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
	}
});
