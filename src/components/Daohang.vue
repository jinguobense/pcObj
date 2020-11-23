<template>
	<div class="daohang">
		<!-- <div class="box2">
			<i class="el-icon-s-grid"></i>
			<img src="../assets/img/tabbar.png" alt="">
		</div> -->
		<div class="box2" @click="clear">
			<!-- <i class="el-icon-s-grid"></i> -->
			<img src="../assets/img/clear.png" alt="">
		</div>
		<div class="box2" :class="check==1?'active':''" @click="toindex(1)">
			<span>首页</span>
		</div>
		<div class="box3">

			<div class="tabbox">
				<div class="tabwrap">
					<!-- <div class="item" v-for="(item,index) in routerList" :key="index">
						<router-link tag="span"  :to="item.path">
							<span class="s1">{{item.title}}</span>
						</router-link>
						<i class="el-icon-error" @click="deltab(index,item)"></i>
					</div> -->
					<router-link tag='div' :to="item.path" v-for="(item,index) in routerList" :key="index">
						<span class="s1">{{item.title}}</span>
						<i class="el-icon-error" @click.stop="deltab(index)"></i>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '../store/index.js'
	export default {
		name: 'daohang',
		inject:['reload'],
		data() {
			return {
				routerList: [],
				check:''
			}
		},
		watch: {

		},
		methods: {
			clear(){
				window.location.reload()
				// console.log(this.$route.meta.routeList)
			},
			toindex(e) {
				this.check = e
				this.$router.push({ //核心语句
					path: '/index', //跳转的路径
					query: { //路由传参时push和query搭配使用 ，作用时传递参数
						// id:this.id , 
					}
				})
			},
			deltab(i, v) {
				console.log(i, v);
				// this.routerList.splice(i,1)
				this.$route.meta.routeList.splice(i, 1);
				this.$route.meta.titleList.splice(i, 1);
				this.gettab()
			},
			gettab() {
				let pathList = this.$route.meta.routeList;
				let titleList = this.$route.meta.titleList;
				let routerList = []
				for (var i in pathList) {
					//console.log(pathList[i])
					let obj = {
						path: pathList[i],
					}
					routerList.push(obj)
				}

				for (var j in routerList) {
					routerList[j].title = titleList[j]
					// routerList.push(obj)
				}

				
				

				this.routerList = routerList
				// console.log(this.routerList)
				for(var o in this.routerList){
					if(this.routerList[o].path == '/index' || this.routerList[o].path == '/'){
						this.routerList.splice(i, 1)
						this.deltab(i)
					}
					
				}
				// console.log(this.$route.meta.routeList)
			}

		},
		mounted() {
			this.gettab()
			if(this.$route.path == '/index'){
				this.check = 1
			}

		},
		created() {
			
		}


	}
</script>

<style lang="less" scoped>
	.daohang {
		// position: fixed;
		top: 56px;
		right: 0;
		width: 100%;
		height: 43px;
		background-color: #f9f9f9;
		display: flex;
		align-items: center;
		display: flex;
		cursor: pointer;
		border-bottom: 1px solid #0b9cf4;

	}

	.box1 {
		width: 10px;
		height: 43px;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}

	.box2 {
		width: 60px;
		height: 43px;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-left: 1px solid #f6f6f6;
		border-right: 1px solid #f6f6f6;
		font-size: 18px;
		&.active{
			background: #0b9cf4;
			
			span{
				color: #fff;
			}
		}
		// &:hover{
		// 	background: #ccc;
		// 	// color: #fff;
		// }
	}

	.box3 {
		// width: 1200px;
		height: 43px;
		background-color: #ffffff;
		overflow-x: auto;

		.tabbox {
			height: 43px;
			width: 100%;
			// overflow-x: auto;

			.tabwrap {
				overflow-x: auto;
				float: left;

				div {
					// width: 60px;
					float: left;
					height: 43px;
					box-sizing: border-box;
					padding: 0px 15px;
					display: flex;
					// justify-content: space-around;
					align-items: center;
					color: #333;
					background-color: #ffffff;
					border-right: 1px solid #efefef;

					i {
						font-size: 20px;
						color: #a4ddff;
						margin-left: -6px;
						&:hover {
							color: #ccc;
						}
					}
				}

				.router-link-active {
					background: #0b9cf4;

					span {
						color: #fff;
					}
				}

			}

		}

	}

	.s1 {
		margin-right: 15px;
		color: #666666;
		font-size: 18px;
	}
</style>
