const glob = require("glob");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const data = require("../src/data/boot")
const configJson = require("../config")
const config = {
  assetsHash: configJson.assetsHash,
  data: data,
  paths: {
    mock: path.join(__dirname, configJson.paths.mock),
    src: path.join(__dirname, configJson.paths.src),
    dist: path.join(__dirname, configJson.paths.dist),
    assets: configJson.paths.assets,
  },
};

getEntry = function (rule) {
  var result = {};
  var paths = glob.sync(rule);

  paths.forEach(function (path) {
    var filename = path.split("/").slice(-1)[0];
    var entry = filename.split(".").slice(0, -1).join(".");

    if (entry.charAt(0) !== "!") {
      result[entry] = path;
    }
  });
  return result;
};

let pluginsOptions = [];

Object.keys(getEntry(config.paths.src + "/pages/**/*.pug")).forEach((page) => {
  pluginsOptions.push(
    new HtmlWebpackPlugin({
      title: "Index",
      template: config.paths.src + "/pages/" + page + "/" + page + ".pug",
      filename: "./" + page + ".html",
      chunks: [page],
      inject: "body",
      minify: false,
    })
  );
});

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
  },
  stats: {
    children: false,
    assets: false,
    entrypoints: false,
  },
  entry: getEntry(config.paths.src + "/pages/**/*.js"),
  output: {
    path: config.paths.dist,
    filename: `${config.paths.assets}/js/${
      config.assetsHash ? "[id].[hash:8]" : "[name]"
    }.bundle.js`,
    chunkFilename: `${config.paths.assets}/js/${
      config.assetsHash ? "[id].[hash:8]" : "[name]"
    }.chunk.js`,
    publicPath: "/",
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: "all",
          test: /node_modules/,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: "css-loader" }],
      },
      {
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: "babel-loader",
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "raw-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
              data: config.data,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [path.resolve("node_modules")],
        loader: "svg-sprite-loader",
        options: {
          extract: true,
          spriteFilename: `./${config.paths.assets}/images/icons.svg`,
          runtimeCompat: true,
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: [path.resolve("src/assets/icons")],
        loader: "file-loader",
        options: {
          name: `${config.paths.assets}/images/[name].[ext]`,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...pluginsOptions,
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: `${config.paths.assets}/css/${
        config.assetsHash ? "[id].[hash:8]" : "[name]"
      }.bundle.css`,
      chunkFilename: `${config.paths.assets}/css/${
        config.assetsHash ? "[id].[hash:8]" : "[name]"
      }.chunk.css`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: config.paths.src + "/public", to: config.paths.dist },
        { from: config.paths.mock + '/api', to: config.paths.dist + '/api' },
      ],
    }),
  ],
};
