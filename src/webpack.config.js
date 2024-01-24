const path = require('path');

module.exports = {
  entry: './src/index.css',  // Adjust the entry point accordingly
  output: {
    filename: 'bundle.js',  // Adjust the output filename accordingly
    path: path.resolve(__dirname, 'dist'),  // Adjust the output path accordingly
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',  // or 'production'
};
