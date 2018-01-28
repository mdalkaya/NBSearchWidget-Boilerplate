const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var nodeExternals = require('webpack-node-externals');
var isProduction = process.env.NODE_ENV === 'production';
var isDevelopment = process.env.NODE_ENV === 'development';

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

function getEntries (){
	return fs.readdirSync('./src')
			.filter(
					(file) => file.match(/.*\.js$/)
			)
			.map((file) => {
					return {
							name: file.substring(0, file.length - 3),
							path: './src/' + file
					}
			}).reduce((memo, file) => {
					memo[file.name] = file.path
					return memo;
			}, {})
}


module.exports = merge(common, {
  

  devtool: 'source-map',
  resolve: {
    // Make sure, Webpack finds import'ed and require'd files specified without extension
    // so 'import Bla from './Bla' makes webpack to look for files 'Bla', 'Bla.js' and 'Bla.jsx'
    extensions: [ '.js', '.jsx']
  },
//  entry : getEntries,
 entry: {
//   'vendor': [ 'babel-polyfill'],
    'app': [
 //     'babel-polyfill',
  //    'react-hot-loader/patch',
  //'./src/content/index',
  './src/index'
  
    ]
    
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'

    
  },
  module: {
    rules: [
      { test: /\.js$/,  
        exclude: path.resolve(__dirname, "node_modules"),
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      }
  
    
    ],
    loaders: [
      // JSX/ES6 handling with babel
        // * babel-loader: uses Babel to transform your JSX/ES6 JavaScript to ECMAScript 5
        // * react-hot: Reloads your React Component on code changes without loosing the application state
    //	{	test: /\.js$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?optional[]=es7.functionBind']},
    //		{	test: /\.jsx$/, exclude: /node_modules/, loaders: ['react-hot', 'babel-loader?optional[]=es7.functionBind']},
        // CSS handling
        // * style-loader: Embeds referenced CSS code using a <style>-element in your index.html file
        // * css-loader: Parses the actual CSS files referenced from your code. Modifies url()-statements in your
        //   CSS files to match images handled by url loader (see below)
      //	{ test: /\.js$/, loader: 'babel', query: { presets: ['react', 'es2015'] },
        { test: /\.css$/, loader: 'style!css' },
  
        // Image Handling
        // * url-loader: Returns all referenced png/jpg files up to the specified limit as inline Data Url
        //   or - if above that limit - copies the file to your output directory and returns the url to that copied file
        //   Both values can be used for example for the 'src' attribute on an <img> element
        {	test: /\.(png|jpg)$/,	loader: 'url?limit=25000'	},
  
        // JSon file handling
        // * Enables you to 'require'/'import' json files from your JS files
     //   {	test: /\.json$/, loader: 'json-loader' },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
          }
        },
       // { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
        { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
      ]
    
    /*,
    loaders: [
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader?{ "stage": 0, "optional": ["runtime"] }'
      }
  ]*/
  },

  externals: {

   "react": "React",
   "react-dom": "ReactDOM",
   "lodash": "_",
   'semantic-ui-react': 'semanticUIReact',
  // "javascript-time-ago": "TimeAgo"
 
  },
  plugins: [
 /*   new UglifyJSPlugin({
             sourceMap: true
           }),
   */

      new HtmlWebpackPlugin({
  //      inject: false,
        chunks: ['app'],
        filename: 'index.html',
        template: './content.dev.html'
      }),
/*    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor-bundle1',
      chunks: ['bundle1'],
      filename: 'vendor-bundle1.js',
      minChunks: Infinity
    }),*/
    new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
           }),
    new CopyWebpackPlugin([
          
            // Copy OMWebPluginLib / Client-side SDK libs contents to {output}/
            { from: './src/lib/OMWebPluginLib', to: 'OMWebPluginLib' },
            { from: './src/settings.json' }
    ]),
    new BundleAnalyzer()
  ]
})
