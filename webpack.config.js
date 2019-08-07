const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DEV_MODE = process.env.NODE_ENV === 'development';
console.log(`DEV_MODE:${DEV_MODE}`);

const getLocalhostIPAddress = () => {
  const ifs = require('os').networkInterfaces();
  const host = `${Object.keys(ifs).map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0]).filter(x => x)[0].address}`;
  return host || 'localhost';
};


module.exports = {
  context: path.resolve('src'),
  mode: process.env.NODE_ENV,
  entry: {
    app: ['./index.js'],
  },
  devtool: DEV_MODE ? 'inline-source-map' : false,
  output: {
    filename: 'app.js',
    path: path.resolve('dist'),
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: { loader: 'babel-loader' },
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: [
          { loader: 'html-loader' },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: DEV_MODE,
              data: {
                DEV_MODE,
                weinreScript: process.env.WEINRE ? `http://${getLocalhostIPAddress()}:8000/target/target-script-min.js#anonymous` : false,
              },
            },
          },
        ],
        include: path.resolve('src/html'),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './html/index.pug',
      filename: 'index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,   
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};
