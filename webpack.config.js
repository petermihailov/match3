const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const scss = {
  production: {
    test: /\.s?css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: '[hash:base64:5]',
          minimize: true,
          sourceMap: false
        }
      },
      "postcss-loader"
    ]
  },
  development: {
    test: /\.s?css$/,
    use: [
      'style-loader',
      {
        loader: "css-loader",
        options: {
          modules: true,
          localIdentName: '[path][name]__[local]--[hash:base64:5]',
          minimize: false,
          sourceMap: true
        }
      },
      "postcss-loader"
    ]
  }
};

module.exports = (env, argv) => {
  return ({
    entry: ['babel-polyfill', './src/main.js'],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: {minimize: false}
            }
          ]
        },
        scss[argv.mode]
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        hash: true
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
  });
};