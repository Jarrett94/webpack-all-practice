const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const PurifyCSSPlugin = require('purifycss-webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const extractTextPlugin = require("extract-text-webpack-plugin")
const setIterm2Badge = require('set-iterm2-badge')
const merge = require("webpack-merge")
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 根据参数动态拉配置
const argv = require("yargs-parser")(process.argv.slice(2))
const __mode = argv.mode || "development"
const __modeflag = (__mode === "production" ? true : false)
const __mergeConfig = require(`./config/${__mode}.js`)

const glob = require("glob")
const {
	join
} = require("path")

setIterm2Badge("Spa Webpack")

const webpackConfig = {
	module: {
		rules: [
			{
			test: /\.css$/,
			use: [{
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: '../'
				}
			}, {
				// loader: "css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]"
				loader: "css-loader"
			}]
		}]
	},
	devServer: {
		port: 3000,
		// hot: true
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					name: "common",
					minChunks: 1,
					maxInitialRequests: 5,
					minSize: 0
				}
			}
		},
		runtimeChunk: {
			name: "runtime"
		}
	},
	plugins: [
		new CleanWebpackPlugin(["dist"]),
		// new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "src/index.html"
		}),
		new MiniCssExtractPlugin({
			filename: __modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
			chunkFilename: __modeflag ? "styles/[id].[hash:5].css" : "styles/[id].css"
		}),
		// 深度 Tree Shaking, 针对javascript
		new WebpackDeepScopeAnalysisPlugin(),
		// new PurifyCSSPlugin({
		//     paths: glob.sync(join(__dirname, './dist/*.html')),
		// })
	]
}

module.exports = merge(__mergeConfig, webpackConfig)
