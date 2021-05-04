const HtmlWebpackPlugin = require('html-webpack-plugin');		//引入插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports={
  mode: "development",
  entry: './src/main.js',
  output:{
    filename:'[name].[chunkhash:8].js',    //输入的文件名是什么，生成的文件名也是什么
    path:path.resolve(__dirname,'./dist') //指定生成的文件目录
  },
  module: {
    rules: [
      { 
				test: /\.js$/,
				use: {
					loader: 'babel-loader',		//用babel-loader把 es6 -> es5
					options: {
						presets: [
							'@babel/preset-env'			//根据你支持的环境自动决定适合你的babel插件
						],
						plugins: [		// plugin 是需要的插件
							[ '@babel/plugin-proposal-decorators', { 'legacy': true } ],
							[ '@babel/plugin-proposal-class-properties', { 'loose': true } ],
							'@babel/plugin-transform-runtime'
						]
					},
				},
				include: path.resolve(__dirname,'src'),		//指定处理文件，优化处理速度
				exclude: /node_modules/		//不处理node_modules,优化处理速度
			},
      {test: /\.css$/, use: [ "style-loader", "css-loader"]},
      {test: /\.less$/, use: [ "style-loader", "css-loader", "less-loader"]},
      { 
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                //当加载的图片小于limit时，会将图片编译成base64字符串的形式,
                //当图片大于这个limit，会用file-loader进行加载
                limit: 40* 1024,
                //在webpack4.x必须显式的指定fallback备用方法，这里指定为file-loader
                fallback: require.resolve('file-loader'),
                encoding: "base64",
                //这个表示在打包生成的文件的名字，如果不配置这个，会根据hash生成一个名字，这个配置就是自定义命名规则
                //这个表示会在输出文件夹dist下创建一个img文件夹，所有的文件会以 “原名字+hash值8位+文件扩展名”生成最终的文件来供使用
                name: "images/[name].[hash:8].[ext]",
                esModule:false
            },
          }
        ],
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {test: /\.html$/, loader: "html-loader"}
    ]
  },
  devServer: {
		open: true,		//输入命令后自动打开默认浏览器
		hot: true,		//重新加载组件改变部分（而不是重新加载整个页面）
		inline: true,		//刷新浏览器，如果添加了hot，在热加载失败后才会刷新浏览器
		contentBase: 'src',		//本地服务器所加载的页面所在的目录
		host: '127.0.0.1',		//设置端口号
    port: 9001,
		compress: true		//对所有的服务器资源采用gzip压缩
	},
  plugins: [		//所有插件的配置节点
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({		//打包输出HTML
        title: 'This is title',		//生成html文件的标题
        filename: 'index.html',		//输出html的文件名称
        template: './public/index.html',	//模板文件
        minify: {		//压缩HTML文件
          removeComment: true,		//移除HTML中得注释
          collapseWitespace: true,		//删除空白字符与换行
          minifyCSS: true			//压缩内联CSS
        }
      })
  ]
}