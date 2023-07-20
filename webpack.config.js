const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('@cactuslab/mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const OUTPUT_PATH = 'dist/'

const context = path.resolve(__dirname, './src/')

module.exports = (env, argv) => {
	const useSourceMaps = false
	
	return {
		mode: 'production',
		bail: true,
		context: context,
		devtool: useSourceMaps ? 'source-map' : false,
		entry: {
			'styles': ['./static/css/main.less'],
			'debug-grid': ['../debug-grid.js'],
		},
		resolve: {
			extensions: [ '.js' ],
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, OUTPUT_PATH),
			assetModuleFilename: '[path][name][ext]',
		},
		watchOptions: {
			ignored: '/node_modules/'
		},
		devServer: {
			static: [path.join(__dirname, 'dist')],
			compress: true,
			port: 9000,
			hot: false,
		},
		performance: {
			hints: false,
		},
		optimization: {
			minimizer: [
				new TerserPlugin(),
				new CssMinimizerPlugin({
					test: /\.(css)$/,
				}),
			],
		},
		plugins: [
			/* https://github.com/johnagan/clean-webpack-plugin */
			new CleanWebpackPlugin({
				cleanStaleWebpackAssets: false,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: './*.html',
						to: './[path][name][ext]'
					}
				]
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
			// new ImageMinimizerPlugin({
			// 	minimizerOptions: {
			// 		plugins: [
			// 			['gifsicle', { interlaced: true }],
			// 			['jpegtran', { progressive: true }],
			// 			['optipng', { optimizationLevel: 5 }],
			// 			[
			// 				'svgo',
			// 				{
			// 					plugins: [
			// 						{
			// 							name: 'removeViewBox',
			// 							active: false,
			// 						},
			// 					],
			// 				},
			// 			],
			// 		],
			// 	},
			// }),
		],
		stats: {
			all: false,
			builtAt: true,
			errors: true,
			errorDetails: true,
			timings: true,
			warnings: true,
		},
		module: {
			rules: [
				{
					test: [/\.js$/],
					use: ["source-map-loader"],
					enforce: "pre"
				},
				{
					oneOf: [
						{
							test: [/modernizrrc\.js/],
							loader: 'webpack-modernizr-loader',
						},
						{
							test: [/\.js$/, /\.jsx$/],
							exclude: /node_modules/,
							use: {
								loader: 'babel-loader'
							}
						},
						// {
						// 	test: [/\.tsx?$/],
						// 	exclude: /node_modules/,
						// 	use: {
						// 		loader: 'ts-loader',
						// 	},
						// },
						{
							test: /\.(less|css)$/,
							use: [
								{
									loader: MiniCssExtractPlugin.loader,
								},
								{
									/* https://github.com/webpack-contrib/css-loader */
									loader: 'css-loader',
									options: {
										importLoaders: 1,
										import: false, /* So we don't resolve @imports in css files, as they should refer to files that will exist. */
										sourceMap: useSourceMaps,
									}
								},
								{
									loader: 'postcss-loader',
									options: {
										postcssOptions: {
											ident: 'postcss',
											plugins: [
												['autoprefixer', {}],
											],
										},
										sourceMap: useSourceMaps,
									}
								},
								{
									loader: 'less-loader',
									options: {
										lessOptions: {
											javascriptEnabled: true,
											strictMath: false,
											noIeCompat: true,
											relativeUrls: false, /* Necessary to resolve images? */
											sourceMap: useSourceMaps,
										},
									}
								}
							]
						},
						/* Don't hash fonts */
						{
							test: [/\/font?\//],
							exclude: /node_modules/,
							type: 'asset/resource',
							generator: {
								filename: '[path][name][ext]',
							},
						},
						/* Copy and hash other files */
						{
							exclude: /node_modules/,
							type: 'asset/resource',
						},
					]
				}
			]
		}
	}
}