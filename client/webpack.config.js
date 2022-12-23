const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Text Editor',
      }),

      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 

      new WebpackPwaManifest({
          inject: true,
          name: 'Text Editor Application',
          short_name: 'Text Editor',
          description: 'Edit your text!',
          background_color: '#31a9e1',
          theme_color: '#31a9e1',
          start_url: '/',
          publicPath: '/',
          icons: [
            {
              src: path.resolve('src/images/icon_144x144.ab7efc9f581cc30e64e4f939fafc9b57.png'),
              sizes: [144],
              purpose: 'any',
              destination: path.join('assets', 'icons'),
            },
            
          ],
        }), 
        
      ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};