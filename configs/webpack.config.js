const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
	assetsHash: true,
	paths: {
		mocks: path.join(__dirname, '../mocks'),
		src: path.join(__dirname, '../src'),
		dist: path.join(__dirname, '../dist')
	}
}

getEntry = function (rule) {
	var result = {};
	var paths = glob.sync(rule);

	paths.forEach(function (path) {
		var filename = path.split('/').slice(-1)[0];
		var entry = filename.split('.').slice(0, -1).join('.');

		if (entry.charAt(0) !== '!') {
			result[entry] = path;
		}
	});
	return result;
}

let pluginsOptions = [];

Object.keys(getEntry(config.paths.src + '/pages/**/*.pug')).forEach(page => {
	pluginsOptions.push(
		new HtmlWebpackPlugin({
			title: 'Index',
			template: config.paths.src + '/pages/' + page + '/' + page + '.pug',
			filename: './' + page + '.html',
			chunks: [page],
			inject: 'body',
			minify: false,
		})
	);
});

module.exports = {
	stats: {
		children: false,
		assets: false,
		entrypoints: false
	},
	entry: getEntry(config.paths.src + '/pages/**/*.js'),
	output: {
		path: config.paths.dist,
		filename: (config.assetsHash) ? 'assets/js/[id].[hash:8].bundle.js' : 'assets/js/[name].bundle.js',
		chunkFilename: (config.assetsHash) ? 'assets/js/[id].[hash:8].chunk.js' : 'assets/js/[name].chunk.js',
		publicPath: './'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				vendors: false,
				vendor: {
					chunks: 'all',
					test: /node_modules/
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.js$/,
				exclude: '/node_modules/',
				loader: 'babel-loader'
			},
			{
				test: /\.pug$/,
				use: [
					{
						loader: 'raw-loader'
					},
					{
						loader: 'pug-html-loader',
						options: {
							pretty: true,
							data: require(config.paths.src + '/data/data.json')
						}
					}
				],
			},
			{
				test: /\.svg$/,
				exclude: [path.resolve('node_modules')],
				loader: 'svg-sprite-loader',
				options: {
					extract: true,
					spriteFilename: './assets/images/icons.svg',
					runtimeCompat: true
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				exclude: [path.resolve('src/static/icons')],
				loader: 'file-loader',
				options: {
					name: 'assets/images/[name].[ext]'
				}
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		...pluginsOptions,
		new SpriteLoaderPlugin({
			plainSprite: true
		}),
		new HtmlWebpackPugPlugin(),
		new MiniCssExtractPlugin({
			filename: (config.assetsHash) ? 'assets/css/[id].[hash:8].bundle.css' : 'assets/css/[name].bundle.css',
			chunkFilename: (config.assetsHash) ? 'assets/css/[id].[hash:8].chunk.css' : 'assets/css/[name].chunk.css'
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: config.paths.src + '/static/images', to: config.paths.dist + '/assets/images' },
				{ from: config.paths.src + '/static/favicon', to: config.paths.dist + '/assets/images/favicon' },
				{ from: config.paths.src + '/static/fonts', to: config.paths.dist + '/assets/fonts' },
				{ from: config.paths.src + '/static/robots.txt', to: config.paths.dist + '/' },
				{ from: config.paths.src + '/static/.htaccess', to: config.paths.dist + '/' },
				{ from: config.paths.mocks + '/api', to: config.paths.dist + '/api' },
			]
		}),
	]
}
