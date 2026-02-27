const path = require('path');

module.exports = {
  entry: './demo.jsx',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'public'),
  },
  // mode: 'development',
  // devtool: 'source-map',
  // optimization: {
  //   minimize: false
  // },
  // // Development server configuration
  // devServer: {
  //   // Serve files from this directory
  //   static: ['./', './public'],
  //   // Port number
  //   port: 3000,
  //   // Open browser automatically
  //   open: false,
  //   // Enable hot module replacement
  //   hot: true,
  //   // Enable gzip compression
  //   compress: true,
  //   // Handle client-side routing
  //   historyApiFallback: true,
  //   // Show errors as overlay in browser
  //   client: {
  //     overlay: {
  //       errors: true,
  //       warnings: false
  //     }
  //   }
  // },
  mode: 'production',
  module: {
    rules: [
      // css-loader for react-datepicker
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /(\.es6$|\.jsx$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  targets: "defaults",
                  corejs: 3
                }
              ],
              "@babel/preset-react"
            ],
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  absoluteRuntime: false,
                  corejs: false,
                  helpers: true,
                  regenerator: true,
                  useESModules: true,
                  version: "^7.29.0"
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
