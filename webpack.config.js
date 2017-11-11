const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry:{
		index:'./src/js/index.js',
		detail:'./src/js/detail.js',
		filmer:'./src/js/filmer.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'js/[name]-[chunkhash].js'
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use:ExtractTextPlugin.extract({
					fallback:'style-loader',
					use:'css-loader'
				})
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				exclude:path.resolve(__dirname,'node_modules'),
				include:path.resolve(__dirname,'src')
			},
			{
				test:/\.ico$/,
				use:{
					loader:'file-loader'
				}
			}
		]
	},
	resolve:{
		"extensions":['.css','.js']
	},
	devtool:"source-map",
	plugins:[
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'src/index.html',
			favicon:'src/favicon.ico',
			minify:{
				removeComments:true,
				collapseInlineTagWhitespace:true,
				minifyCSS:true
			},
			chunks:['index']
		}),
		new HtmlWebpackPlugin({
			filename:'detail.html',
			template:'src/detail.html',
			favicon:'src/favicon.ico',
			minify:{
				removeComments:true,
				collapseInlineTagWhitespace:true,
				minifyCSS:true
			},
			chunks:['detail']
		}),
		new HtmlWebpackPlugin({
			filename:'filmer.html',
			template:'src/filmer.html',
			favicon:'src/favicon.ico',
			minify:{
				removeComments:true,
				collapseInlineTagWhitespace:true,
				minifyCSS:true
			},
			chunks:['filmer']
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin("css/[name].css")
	]

}