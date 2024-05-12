const path = require("path"); 
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 
module.exports = { 
  mode: "development", //development production 
 
  entry: { 
    app: path.resolve(__dirname, "src/index.js"), 
  }, 
  output: { 
    filename: "app.js", 
    path: path.resolve(__dirname, "./build"), 
    assetModuleFilename: "[name][ext]", 
  }, 
  module: { 
    rules: [ 
      { 
        test: /\.s[ac]ss$/i, 
        use: [ 
          MiniCssExtractPlugin.loader, 
          "css-loader", 
          "sass-loader", 
          { 
            loader: "postcss-loader", 
            options: { 
              postcssOptions: { 
                config: path.resolve(__dirname, "postcss.config.js"), 
              }, 
            }, 
          }, 
        ], 
      }, 
      { test: /\.css$/i, 
      use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      } 
    ], 
  }, 
 
  devServer: { 
    client: { 
      overlay: true, 
    }, 
  }, 
  plugins: [ 
    new HtmlWebpackPlugin({ 
      title: "New page", 
      filename: "index.html", 
      template: "./src/index.html", 
    }), 
    new MiniCssExtractPlugin({ filename: "[name].css" }), 
    new CleanWebpackPlugin(), 
  ], 
};