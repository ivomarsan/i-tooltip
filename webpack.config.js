const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var config = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.sass$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
            sass: [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax',
            ],
          },
          // other vue-loader options go here
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  externals: {
    vue: 'vue',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false,
      },
    }),
  ],
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
      filename: 'i-tooltip.min.js',
      libraryTarget: 'window',
      library: 'iTooltip',
    },
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/iTooltip.vue'),
    output: {
      filename: 'i-tooltip.js',
      libraryTarget: 'umd',
      library: 'i-tooltip',
      umdNamedDefine: true,
    },
  }),
];
