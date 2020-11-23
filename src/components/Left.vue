<template>
	<div class="left">
		<!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
		  <el-radio-button :label="false">展开</el-radio-button>
		  <el-radio-button :label="true">收起</el-radio-button>
		</el-radio-group> :default-active="$route.path"-->
		<el-menu style="width: 178px; border: none;" @select='selectItem' router :default-active="$route.path" text-color="#333"
		 active-text-color="#0b9cf4" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
			<router-link class="toux" tag="div" to="/mine" title="点击查看个人资料">
				<div class="img">
					<img :src="denglu.photo" alt="头像">
				</div>
				<span>admin</span>
			</router-link>
			<!-- <el-menu-item index="/">
		    <i>首页</i>
		  	<span slot="title">首页</span>
		  </el-menu-item>
		  -->
			<el-submenu index="1">

				<template slot="title">
					<i :class="checkIndex ===1 ? 'active': ''">平台运营</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/pingoods">平台商品分类</el-menu-item>
					<el-menu-item index="/pinguige">规格单位</el-menu-item>
					<el-menu-item index="/pintongzhi">平台通知</el-menu-item>
					<el-menu-item index="/pinwuliu">平台物流</el-menu-item>
					<el-menu-item index="/pinshenshu">申述商品信息</el-menu-item>
					<el-menu-item index="/pinidea">意见反馈</el-menu-item>
					<el-menu-item index="/pinbusiness">商务合作信息</el-menu-item>
					<el-menu-item index="/pinproblem">常见问题解答</el-menu-item>
					<el-menu-item index="/pinedition">版本管理</el-menu-item>
					<el-menu-item index="/pinaboutus">关于我们</el-menu-item>

				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i :class="checkIndex==2 ? 'active': ''">厂家管理</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/factoryguanli">厂家分类</el-menu-item>
					<el-menu-item index="/factoryxinxi">厂家信息</el-menu-item>
					<el-menu-item index="/factorydoods">厂家商品分类</el-menu-item>
					<el-menu-item index="/factorytixian">厂家提现</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="/quyuguanli">
				<i :class="path=='/quyuguanli' ? 'active': ''">区域管理员信息</i>
			</el-menu-item>
			<el-menu-item index="/member">
				<i :class="path=='/member' ? 'active': ''">会员管理</i>
			</el-menu-item>

			<el-submenu index="3">
				<template slot="title">
					<i :class="checkIndex==3 ? 'active': ''">商品管理</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/putong">普通商品</el-menu-item>

					<el-menu-item index="/datuan">大众拼团</el-menu-item>
					<el-menu-item index="/xiaotuan">2人团</el-menu-item>
					<el-menu-item index="/xianshiqg">限时抢购</el-menu-item>
					<el-menu-item index="/manjian">满减商品</el-menu-item>
					<el-menu-item index="/mansong">满送商品</el-menu-item>
					<el-menu-item index="/pingjia">商品评价</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="/manjianshezhi">
				<i :class="path=='/manjianshezhi' ? 'active': ''">满减活动设置</i>

			</el-menu-item>
			<el-submenu index="4">
				<template slot="title">
					<i :class="checkIndex==4 ? 'active': ''">广告设置</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/indexgg">首页轮播广告</el-menu-item>
					<el-menu-item index="/shopgg">商品分类广告</el-menu-item>
					<el-menu-item index="/manjiangg">满减专区轮播</el-menu-item>
					<el-menu-item index="/mansonggg">满送专区轮播</el-menu-item>
					<el-menu-item index="/xianshigg">限时抢购轮播</el-menu-item>
					<el-menu-item index="/datuangg">大众拼团轮播</el-menu-item>
					<el-menu-item index="/towrengg">2人团轮播</el-menu-item>


				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="5">
				<template slot="title">
					<i :class="checkIndex==5 ? 'active': ''">订单管理</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/ddpay">待付款</el-menu-item>
					<el-menu-item index="/ddpin">拼团中</el-menu-item>
					<el-menu-item index="/ddfahuo">待发货</el-menu-item>
					<el-menu-item index="/ddshouhuo">待收货</el-menu-item>
					<el-menu-item index="/ddpingjia">待评价</el-menu-item>
					<el-menu-item index="/ddyiwan">已完成</el-menu-item>
					<el-menu-item index="/ddyitui">已退款</el-menu-item>
					<el-menu-item index="/ddyixiao">已取消</el-menu-item>
					<el-menu-item index="/ddshentui">申请退款中</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="6">
				<template slot="title">
					<i :class="checkIndex==6 ? 'active': ''">货运统计</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/ruku">入库运单</el-menu-item>
					<el-menu-item index="/fenjian">分拣订单</el-menu-item>
					<el-menu-item index="/shopqd">商品清单</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="7">
				<template slot="title">
					<i :class="checkIndex==7 ? 'active': ''">统计报表</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/dingdantj">订单统计</el-menu-item>
					<el-menu-item index="/shoptj">商品统计</el-menu-item>
					<el-menu-item index="/caiwutj">厂家财务明细</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<!-- <el-menu-item index="/quyu">
				<i :class="path=='/quyu' ? 'active': ''">区域管理</i>
				<span slot="title">区域管理</span>
			</el-menu-item> -->

			<el-submenu index="8">
				<template slot="title">
					<i :class="checkIndex==8 ? 'active': ''">系统监控</i>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/xtjkrizhi">日志查询</el-menu-item>
					<el-menu-item index="/xtjktime">定时任务</el-menu-item>

				</el-menu-item-group>
			</el-submenu>

			<el-menu-item index="/tongcall">
				<i :class="path=='/tongcall' ? 'active': ''">通告管理</i>
			</el-menu-item>
			<el-menu-item index="/call">
				<i :class="path=='/call' ? 'active': ''">通告</i>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: true,
				tabList: [],
				checkIndex:'',
				path:'',
				img:'',
				denglu:[],
				
			};
		},
		methods: {
			selectItem(key, keyPath) {
				// console.log(key, keyPath);
				console.log(key)
				console.log(keyPath)
				this.checkIndex = keyPath[0] * 1;
				console.log(keyPath[0])
				console.log(this.checkIndex)

			},
			handleOpen(key, keyPath) {
				// console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				// console.log(key, keyPath);
			},
			// tab(key, keyPath){
			// console.log(key, keyPath);
			// },

		},
		mounted() {
			console.log(this.$route.path);
			if(this.$route.path == '/quyuguanli'){
				this.path = '/quyuguanli'
			}
			if(this.$route.path == '/member'){
				this.path = '/member'
			}
			if(this.$route.path == '/manjianshezhi'){
				this.path = '/manjianshezhi'
			}
			if(this.$route.path == '/quyu'){
				this.path = '/quyu'
			}
			if(this.$route.path == '/tongcall'){
				this.path = '/tongcall'
			}
			if(this.$route.path == '/call'){
				this.path = '/call'
			}
			
			
			if(this.$route.path == '/pingoods' || 
			this.$route.path == '/pinguige'||
			this.$route.path == '/pintongzhi'||
			this.$route.path == '/pinwuliu'||
			this.$route.path == '/pinshenshu'||
			this.$route.path == '/pinidea'||
			this.$route.path == '/pinbusiness'||
			this.$route.path == '/pinproblem'||
			this.$route.path == '/pinedition'||
			this.$route.path == '/pinaboutus'){
				this.checkIndex =1
			}
			if(this.$route.path == '/factoryguanli' ||
			this.$route.path == '/factoryxinxi'||
			this.$route.path == '/factorydoods'||
			this.$route.path == '/factorytixian'){
				this.checkIndex =2
			}
			if(this.$route.path == '/putong' ||
			this.$route.path == '/datuan'||
			this.$route.path == '/xiaotuan'||
			this.$route.path == '/xianshiqg'||
			this.$route.path == '/manjian'||
			this.$route.path == '/mansong'||
			this.$route.path == '/pingjia'){
				this.checkIndex =3
			}
			if(this.$route.path == '/indexgg' ||
			this.$route.path == '/shopgg'||
			this.$route.path == '/manjiangg'||
			this.$route.path == '/mansonggg'||
			this.$route.path == '/xianshigg'||
			this.$route.path == '/datuangg'||
			this.$route.path == '/towrengg'){
				this.checkIndex =4
			}
			if(this.$route.path == '/ddpay' ||
			this.$route.path == '/ddpin'||
			this.$route.path == '/ddfahuo'||
			this.$route.path == '/ddshouhuo'||
			this.$route.path == '/ddpingjia'||
			this.$route.path == '/ddyiwan'||
			this.$route.path == '/ddyitui' ||
			this.$route.path == '/ddyixiao'||
			this.$route.path == '/ddshentui'){
				this.checkIndex =5
			}
			if(this.$route.path == '/ruku' ||
			this.$route.path == '/fenjian'||
			this.$route.path == '/shopqd'){
				this.checkIndex = 6
			}
			if(this.$route.path == '/dingdantj' ||
			this.$route.path == '/shoptj'||
			this.$route.path == '/caiwutj'){
				this.checkIndex = 7
			}
			if(this.$route.path == '/xtjkrizhi' ||
			this.$route.path == '/xtjktime'){
				this.checkIndex = 8
			}
			
			this.denglu=JSON.parse(sessionStorage.getItem("dengluxinxi"))
		},
		
	}
</script>

<style scoped="scoped" lang="less">
	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}

	.toux {
		height: 140px;
		width: 80px;
		font-size: 16px;
		font-weight: bold;
		color: #303133;
		margin: 0px auto;
		margin-bottom: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;

		.img {
			height: 80px;
			width: 80px;
			border-radius: 50%;
			overflow: hidden;
			text-align: center;
			cursor: pointer;

			img {
				width: 100%;
				height: 100%;
			}
		}
		span{
			line-height: 40px;
		}
	}

	i {
		font-style: normal;
		color: #333 !important;

		&.active {
			color: #0b9cf4 !important;
		}
	}

	// .el-submenu{
	//  height: 45px;
	//  line-height: 45px;
	//  text-align: left;
	//  text-indent: 30px;
	// }

	// .el-submenu__title{
	//  height: 45px;
	//  line-height: 45px;
	//  text-align: left;
	//  text-indent: 30px;
	// }

	.el-menu-item {
		height: 45px;
		line-height: 45px;
		text-align: left;
		text-indent: 15px;
		font-size: 14px;
	}

	.el-menu/deep/.el-submenu .el-submenu__title {
		height: 45px;
		line-height: 45px;
		height: 45px;
		line-height: 45px;
		text-align: left;
		text-indent: 15px;
		font-size: 14px;
	}
	.el-menu/deep/.el-submenu .el-submenu__title i{
		color: red;
	}
	.el-menu/deep/.el-submenu .el-submenu__title i.active {
		color: #0b9cf4 !important;
	}
</style>
