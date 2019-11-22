var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/OverlappingMarkup.js',
  output: {
    path: path.resolve('dist'),
    filename: 'OverlappingMarkup.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: "react",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  }
};
