<template>
	<div id="app">
		<!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
		<router-view v-if="isRouterAlive"></router-view>
		<!-- <img src="./assets/img/shou.png" alt=""> -->
	</div>
</template>
<script>
	// import { SidebarMenu } from 'vue-sidebar-menu'
	export default {
		name: 'App',
		// components: {
		//     SidebarMenu
		// },
		provide() {
			return {
				reload: this.reload
			}
		},
		data() {
			return {
				isRouterAlive: true
			}
		},
		methods: {
			reload() {
				this.isRouterAlive = false
				this.$nextTick(function() {
					this.isRouterAlive = true
				})
			}
		},
		mounted() {
			// var deviceWidth;
			// setHtmlFontSize();
			// if (window.addEventListener) {
			// 	window.addEventListener(
			// 		"resize",
			// 		function() {
			// 			setHtmlFontSize();
			// 		},
			// 		false
			// 	);
			// }

			// function setHtmlFontSize() {
			// 	// 1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
			// 	deviceWidth =
			// 		document.documentElement.clientWidth > 1920 ?
			// 		1920 :
			// 		document.documentElement.clientWidth;
			// 	document.getElementsByTagName("html")[0].style.cssText =
			// 		"font-size:" + deviceWidth / 19.2 + "px !important";
			// }
		}
	}
</script>
<style lang="less">
	#app {
		min-width: 800px;
		height: 100%;
		min-height: 500px;
		position: relative;
	}
	.el-header{
		height: 50px;
	}
	.nobefor {
		&::before {
			content: '' !important;
		}
	}
	.yesbefor {
		&::before {
			content: '*' !important;
			color: red;
		}
	}
	.touxset {
		.img {
			height: 90px;
			width: 90px;
			// border-radius: 50%;
			overflow: hidden;
			border: 1px dashed #efefef;
		
			img {
				height: 100%;
				width: 100%;
			}
		}
	}
	.setbox {
		display: flex;
		cursor: pointer;
		// width: 100%;
		align-items: center;
		line-height: 48px ;
		div {
			margin-right: 20px;
			color: #0b9cf4;
			font-size: 16px;
			// width: 100%;
			word-wrap: break-word;
			line-height: 48px ;
		}
		span{
			color: #333;
			font-size: 16px;
			// width: 100%;
			display: flex;
			// line-height: 24px;
			line-height: 48px ;
			word-wrap: break-word;
			
		}
	}
	//有子节点 且未展开  //平台商品分类
	.el-table/deep/ .el-icon-arrow-right:before {
	  background: url('./assets/img/shou.png') no-repeat 0 3px;
	  content: '';
	  display: block;
	  width: 15px;
	  height: 22px;
	  font-size: 16px;
	  // background-size: 16px;
	}
	//有子节点 且已展开
	.el-table/deep/ .el-table__expand-icon--expanded {
	  .el-icon-arrow-right:before {
	    background: url('./assets/img/zhan.png') no-repeat 0 3px;
	    content: '';
	    display: block;
	    width: 12px;
	    height: 16px;
	    font-size: 16px;
	    background-size: 16px;
	  }
	}
	// .el-table--small td{
	// 	padding: 0px !important;
	// }
	.ddheji {
		display: flex;
		background: #fff;
		height: 40px;
		box-sizing: border-box;
		padding: 12px 10px;
		span {
			line-height: 34px;
			font-size: 18px !important;
			margin-right: 20px;
		}
	}

	.xuanzbox {
		margin-left: 20px;
	}

	.el-upload {

		display: flex !important;
		align-items: center;
	}

	/*包含以下四种的链接*/
	a {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/*正常的未被访问过的链接*/
	a:link {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/*已经访问过的链接*/
	a:visited {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/*鼠标划过(停留)的链接*/
	a:hover {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/* 正在点击的链接*/
	a:active {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	.el-table th.gutter {
		display: table-cell !important;

	}

	.el-table .cell {
		font-size: 16px;
		height: 48px;
		line-height: 48px !important;
		
	}

	.el-table th>.cell {
		font-size: 16px;
		color: #333;
		line-height: 48px ;
	}
	
	.content {
		box-sizing: border-box;
		padding: 10px;
		// position: relative;

	}

	.block {
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		// margin-top: 20px;
		position: relative;
		box-sizing: border-box;
		padding: 0px 10px;
		bottom: 10px;
		width: 100%;
		background: #fff;
		// z-index: 100000;
	}

	.el-main {
		height: 100%;
		padding: 0px !important;
		background: #f6fcff;
		position: relative;
		display: flex;
	}

	.tablebox {
		box-sizing: border-box;
		padding: 10px;
		background: #fff;
		height: 600px;
		overflow-y: auto;
	}
	.tablebox500 {
		box-sizing: border-box;
		padding: 10px;
		background: #fff;
		height: 500px;
		overflow-y: auto;
	}
	.tablebox620 {
		box-sizing: border-box;
		padding: 10px;
		background: #fff;
		height: 560px;
		overflow-y: auto;
	}
	.tablebox650 {
		box-sizing: border-box;
		padding: 10px;
		background: #fff;
		height: 650px;
		overflow-y: auto;
	}
	.tablebox700{
		box-sizing: border-box;
		padding: 10px;
		background: #fff;
		height: 700px;
		overflow-y: auto;
	}
	//分页



	.searchbox {
		height: 60px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #fff;

		.search {
			height: 60px;
			width: 100%;
			display: flex;
			align-items: center;

			.el-input {
				// width: 240px;
				height: 40px;
				margin-left: 10px;

			}

			.el-select {
				width: 240px;
				height: 40px;
				// margin: 0px 10px;

			}

			.el-date-picker {
				width: 240px;
				// height: 40px;
				margin-top: -8px ;
			}
		}

		.btngrap {
			height: 60px;
			width: 200px;
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #0b9cf4;
			cursor: pointer;

			.shuax {
				width: 120px;
				height: 40px;
				background-color: #ffffff;
				border-radius: 20px;
				border: solid 1px #0b9cf4;
				box-sizing: border-box;
				padding: 0px 20px;
				display: flex;
				align-items: center;
				margin-left: 20px;

				img {
					width: 24px;
					height: 22px;
					margin-right: 10px;
				}
			}
		}
	}

	.nobefor {
		&::before {
			content: '' !important;
		}
	}

	.addbox {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 100;

		.mask {
			height: 100%;
			width: 100%;
			background: rgba(0, 0, 0, 0.3);
			position: fixed;
			top: 0px;
			left: 0px;
			z-index: 100;
		}

		.addwrap {
			height: 780px;
			margin-bottom: 20px;
			width: 1080px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.title {
				width: 100%;
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
			}

			.touxset {
				height: 146px;
				width: 220px;
				margin: 0px auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.img {
					height: 90px;
					width: 90px;
					// border-radius: 50%;
					overflow: hidden;

					img {
						height: 100%;
						width: 100%;
					}
				}

				.xuanzbox {
					width: 100px;
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
					margin-left: 20px;

					.el-button {
						width: 80px;
						height: 36px;
						font-size: 16px;
						margin-top: 20px;
						margin-left: 0px;
						z-index: 10;

					}

					input {
						position: absolute;
						top: 20px;
						left: 0px;
						width: 80px;
						height: 36px;
						opacity: 0;
						z-index: 100;
						cursor: pointer;

					}
				}
			}

			.bottom {
				height: 60px;
				width: 100%;
				box-sizing: border-box;
				padding: 20px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				position: absolute;
				left: 0;
				bottom: 20px;

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}
	}



	.titlebar {

		height: 46px;
		background-color: #0b9cf4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 21px;
		padding-right: 21px;

		.yoou {

			display: flex;
			align-items: center;
			cursor: pointer;

			div {
				display: flex;
				align-items: center;
			}

			.span1 {
				font-size: 22px;
				color: #FFFFFF;
				margin-right: 22px;
				margin-left: 12px;
			}

			.imgone {
				width: 22px;
				height: 22px;
				margin-right: 22px;
			}

			.imgone1 {
				width: 26px;
				height: 22px;
				margin-right: 22px;
			}
		}

		.fenl1 {
			font-size: 22px;
			color: #ffffff;
		}
	}

	// #nav {
	//   padding: 30px;

	//   a {
	//     font-weight: bold;
	//     color: #2c3e50;

	//     &.router-link-exact-active {
	//       color: #42b983;
	//     }
	//   }
	// }
</style>
