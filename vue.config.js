
module.exports = {
	// 基本路径
	publicPath: './',
	// 输出文件目录
	outputDir: 'dist',
	assetsDir:'static',
	// webpack-dev-server 相关配置
	devServer: {
	  port: 9527,
	},
	chainWebpack: config => {
	    config.module
	      .rule("vue")
	      .use("vue-loader")
	      .loader("vue-loader")
	      .tap(options =>
	        Object.assign(options, {
	          transformAssetUrls: {
	            audio: "src"
	          }
	        })
	      );
	},
	pwa:{
		iconPaths: {
		  favicon32: 'favicon.ico',
		  favicon16: 'favicon.ico',
		  appleTouchIcon: 'favicon.ico',
		  maskIcon: 'favicon.ico',
		  msTileImage: 'favicon.ico'
		}
		
	},
	chainWebpack: config => {
	    config.module
	      .rule('css')
	      .test(/\.css$/)
	      .oneOf('vue')
	      .resourceQuery(/\?vue/)
	      .use('px2rem')
	      .loader('px2rem-loader')
	      .options({
	        remUnit: 192   //代表的是 1rem = ？px  这里假设设计稿是 1920px ，那么这里的比例就是 1/10
	      })
	      .end()
	  },
	css: {
		extract: false, //false表示开发环境,true表示生成环境
		sourceMap: false,
		loaderOptions: {
			postcss: {
				plugins: [
					require("postcss-px-to-viewport")({
						unitToConvert: "px", // 需要转换的单位，默认为"px"
						viewportWidth: 1920, // 视窗的宽度，对应pc设计稿的宽度，一般是1920
						viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度,我做的是大屏监控,高度就是1080
						unitPrecision: 3, // 单位转换后保留的精度
						propList: [ // 能转化为vw的属性列表
							"*"
						],
						viewportUnit: "vw", // 希望使用的视口单位
						fontViewportUnit: "vw", // 字体使用的视口单位
						selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
						minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
						mediaQuery: false, // 媒体查询里的单位是否需要转换单位
						replace: true, // 是否直接更换属性值，而不添加备用属性
						exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
					})
				]
			}
		}
	}
};
