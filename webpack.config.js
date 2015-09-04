// webpack.config.js
// webpack是run在node.js上的 所以可以用CommonJS的語法抓到我們在本地裝的webpack

var webpack = require('webpack');
var Path = require('path'); // path是node原生提供的
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//exports 一個物件
module.exports = {
	// entry 是webpack的入口檔案
	entry: {
		bundle: ["./app/js/boot.jsx"] 
		//這邊的bundle可以自己命名，會影響下面的output的輸出 
	},
	module: {
		loaders:[
			{
				test:/\.jsx?$/, // 這是JS的正則表示式，這裡他會抓到所有副檔名是.js或.jsx的檔案
				exclude:[/node_modules/],
				loaders:['react-hot', 'babel-loader'] //loaders後面要接陣列

			},
			{
				test:/\.sass$/,
				loader: ExtractTextPlugin.extract('css?sourceMap!autoprefixer-loader?browsers=last 2 versions!sass?indentedSyntax&sourceMap=true&sourceMapContents=true')
				// *-loader 可寫可不寫 css == css-loader
 				// loader會由右到左 所以會先執行 sass-loader、autoprefixer-loader、css-loader
				// sass-loader加上indentedSyntax才能寫sass的語法 sourceMap由這裡開始
				// autoprefixer-loader 後面browser參數可以加上支援到第幾版的瀏覽器
				// css-loader sourceMap結束 
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('./assets/css/main.css')
    ],
    output: {
		path: Path.resolve(__dirname,'./build'),
		filename: '[name].js' 
		// [name]會對應到上面entry的key，所以這個例子最後產出的就是bundle.js，也可以寫死，例如: filename: 'will.js'，這樣最後產出的就是will.js
	},
	devtool: '#sourcemap',
    devServer: {
        contentBase: Path.resolve(__dirname, "./build/"),
        filename: '[name].js',
        publicPath: '/',
        hot: true, //需搭配HotModuleReplacementPluging使用
        inline: true, 
        quiet: true,  
        noInfo: true,
        lazy: false,  
        stats: { colors: true }
    }
};