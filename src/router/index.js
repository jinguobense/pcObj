import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue';
import Index from '../views/index.vue'
// 平台管理
import Goodsfenlei from '../views/platguanli/goodsfenlei.vue'
import Pinwuliu from '../views/platguanli/wuliu.vue';
import Pintongzhi from '../views/platguanli/tongzhi.vue'
import Pinaboutus from '../views/platguanli/abouus.vue'
import Pinbusiness from '../views/platguanli/busines.vue'
import Pinedition from '../views/platguanli/editionguanli.vue' //版本管理
import Pinguige from '../views/platguanli/guigeguanli.vue'
import Pinidea from '../views/platguanli/ideafankui.vue'
import Pinproblem from '../views/platguanli/problem.vue' //常见问题解答
import Pinshenshu from '../views/platguanli/shenshugoods.vue'

//会员管理
import Member from '../views/memberguanli/memberguanli.vue'

//系统监控
import Xtjktime from '../views/systemjiankong/timeout.vue'
import Xtjkrizhi from '../views/systemjiankong/rizhisearch.vue';

//通告管理
import Tongcall from '../views/callguanli/call.vue';
//通告
import Call from '../views/call/call.vue'

//订单管理
import Ddpay from '../views/ddguanli/daipay.vue'
import Ddfahuo from '../views/ddguanli/daifahuo.vue'
import Ddpin from '../views/ddguanli/daipin.vue';
import Ddpingjia from '../views/ddguanli/daipingjia.vue';
import Ddshouhuo from '../views/ddguanli/daishouhuo.vue';
import Ddshentui from '../views/ddguanli/shentuikuan.vue';
import Ddyixiao from '../views/ddguanli/yiquxiao.vue';
import Ddyitui from '../views/ddguanli/yituikuan.vue';
import Ddyiwan from '../views/ddguanli/yiwancheng.vue';

//我的
import Mine from '../views/mine/mine.vue'

//区域管理
import Quyu from "../views/quyuguanli/quyu.vue"


import Factoryguanli from '../views/factoryguanli/factoryfenlei.vue'
import Factoryxinxi from '../views/factoryguanli/factoryxinxi.vue'
import Factorydoods from '../views/factoryguanli/factorydoods.vue'
import Factorytixian from '../views/factoryguanli/factorytixian.vue'

import Xiaotuan from '../views/commodity/xiaotuan.vue'
import Datuan from '../views/commodity/datuan.vue'
import Manjian from '../views/commodity/manjian.vue'
import Mansong from '../views/commodity/mansong.vue'
import Xianshiqg from '../views/commodity/xianshiqg.vue'
import Putong from '../views/commodity/putong.vue'
import Pingjia from '../views/commodity/pingjia.vue'

import Manjianshezhi from '../views/manjianshezhi/manjianshezhi.vue'

import Dingdantj from '../views/tongjibaobiao/dingdantj.vue'
import Caiwutj from '../views/tongjibaobiao/caiwutj.vue'
import Shoptj from '../views/tongjibaobiao/shoptj.vue'
import Fenjian from '../views/huoyun/fenjian.vue'
import Ruku from '../views/huoyun/ruku.vue'
import Shopqd from '../views/huoyun/shopqd.vue'

import Towrengg from '../views/guanggao/towrengg.vue'
import Datuangg from '../views/guanggao/datuangg.vue'
import Indexgg from '../views/guanggao/indexgg.vue'
import Manjiangg from '../views/guanggao/manjiangg.vue'
import Mansonggg from '../views/guanggao/mansonggg.vue'
import Shopgg from '../views/guanggao/shopgg.vue'

import Xianshigg from '../views/guanggao/xianshigg.vue'
import Login from '../views/login.vue'

import Quyuguanli from '../views/quyuguanlixinxi/quyuguanli.vue'


//案例
import demomenu from '../demoMenu.vue'
// import login from '../views/login.vue'

import demo from '../views/demo.vue'
Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: '登录',
		component: Login,
	},
	{
			path: '/demo',
			name: 'demo',
			component: demo,
		},
	{
		path: '/index',
		name: '首页',
		component: Index,
		meta: {
			title: "首页"
		},
	},
	{
		path: '/demo001',
		name: 'Demomenu',
		component: demomenu,
		meta: {
			title: "demomenu"
		},
	},

	{
		path: '/quyu',
		name: '区域管理',
		component: Quyu,
		meta: {
			title: "区域管理"
		},
	},
	{
		path: '/quyuguanli',
		name: '区域管理员信息',
		component: Quyuguanli,
		meta: {
			title: "区域管理员信息"
		},
	},
	{
		path: '/mine',
		name: '我的',
		component: Mine,
		meta: {
			title: "我的"
		},
	},
	{
		path: '/pingoods',
		name: '平台商品分类',
		component: Goodsfenlei,
		meta: {
			title: "平台商品分类"
		},
	},
	{
		path: '/pintongzhi',
		name: '平台通知',
		component: Pintongzhi,
		meta: {
			title: "平台通知"
		},
	},
	{
		path: '/pinwuliu',
		name: '平台物流',
		component: Pinwuliu,
		meta: {
			title: "平台物流"
		},
	},
	{
		path: '/pinaboutus',
		name: '关于我们',
		component: Pinaboutus,
		meta: {
			title: "关于我们"
		},
	},
	{
		path: '/pinbusiness',
		name: '商务合作信息',
		component: Pinbusiness,
		meta: {
			title: "商务合作信息"
		},
	},
	{
		path: '/pinedition', //版本管理
		name: '版本管理',
		component: Pinedition,
		meta: {
			title: "版本管理"
		},
	},
	{
		path: '/pinguige',
		name: '规格单位',
		component: Pinguige,
		meta: {
			title: "规格单位"
		},
	},
	{
		path: '/pinidea', //意见反馈
		name: '意见反馈',
		component: Pinidea,
		meta: {
			title: "意见反馈"
		},
	},
	{
		path: '/pinproblem', //常见问题解答
		name: '常见问题解答',
		component: Pinproblem,
		meta: {
			title: "常见问题解答"
		}
	},
	{
		path: '/pinshenshu',
		name: '申诉商品信息',
		component: Pinshenshu,
		meta: {
			title: "申诉商品信息"
		},

	},
	{
		path: '/member',
		name: '会员管理',
		component: Member,
		meta: {
			title: "会员管理"
		},
	},
	{
		path: '/xtjktime', //系统监测
		name: '定时任务',
		component: Xtjktime,
		meta: {
			title: "定时任务"
		},
	},
	{
		path: '/xtjkrizhi',
		name: '日志查询',
		component: Xtjkrizhi,
		meta: {
			title: "日志查询"
		},
	},
	{
		path: '/tongcall', //通告管理
		name: '通告管理',
		component: Tongcall,
		meta: {
			title: "通告管理"
		},
	},
	{
		path: '/call', //通告
		name: '通告',
		component: Call,
		meta: {
			title: "通告"
		},
	},
	{
		path: '/ddpay', //订单
		name: '待付款订单',
		component: Ddpay,
		meta: {
			title: "待付款订单"
		},
	},
	{
		path: '/ddfahuo',
		name: '待发货订单',
		component: Ddfahuo,
		meta: {
			title: "待发货订单"
		},
	},
	{
		path: '/ddpin',
		name: '拼团中订单',
		component: Ddpin,
		meta: {
			title: "拼团中订单"
		},
	},
	{
		path: '/ddpingjia',
		name: '待评价订单',
		component: Ddpingjia,
		meta: {
			title: "待评价订单"
		},
	},
	{
		path: '/ddshouhuo',
		name: '待收货订单',
		component: Ddshouhuo,
		meta: {
			title: "待收货订单"
		},
	},
	{
		path: '/ddshentui',
		name: '申请退款中订单',
		component: Ddshentui,
		meta: {
			title: "申请退款中订单"
		},
	},
	{
		path: '/ddyixiao',
		name: '已取消订单',
		component: Ddyixiao,
		meta: {
			title: "已取消订单"
		},
	},
	{
		path: '/ddyitui',
		name: '已退款订单',
		component: Ddyitui,
		meta: {
			title: "已退款订单"
		},
	},
	{
		path: '/ddyiwan',
		name: '已完成订单',
		component: Ddyiwan,
		meta: {
			title: "已完成订单"
		},
	},
	{
		path: '/factoryguanli',
		name: '厂家分类',
		component: Factoryguanli,
		meta: {
			title: "厂家分类"
		},
	},
	{
		path: '/factoryxinxi',
		name: '厂家信息',
		component: Factoryxinxi,
		meta: {
			title: "厂家信息"
		},
	},
	{
		path: '/factorydoods',
		name: '厂家商品分类',
		component: Factorydoods,
		meta: {
			title: "厂家商品分类"
		},
	},
	{
		path: '/factorytixian',
		name: '厂家提现',
		component: Factorytixian,
		meta: {
			title: "厂家提现"
		},
	},
	{
		path: '/xiaotuan',
		name: '2人团',
		component: Xiaotuan,
		meta: {
			title: "2人团"
		},
	},
	{
		path: '/datuan',
		name: '大众拼团',
		component: Datuan,
		meta: {
			title: "大众拼团"
		},
	},
	{
		path: '/manjian',
		name: '满减商品',
		component: Manjian,
		meta: {
			title: "满减商品"
		},
	},
	{
		path: '/mansong',
		name: '满送商品',
		component: Mansong,
		meta: {
			title: "满送商品"
		},
	},
	{
		path: '/xianshiqg',
		name: '限时抢购',
		component: Xianshiqg,
		meta: {
			title: "限时抢购"
		},
	},
	{
		path: '/putong',
		name: '普通商品',
		component: Putong,
		meta: {
			title: "普通商品"
		},
	},
	{
		path: '/pingjia',
		name: '商品评价',
		component: Pingjia,
		meta: {
			title: "商品评价"
		},
	},
	{
		path: '/manjianshezhi',
		name: '满减活动',
		component: Manjianshezhi,
		meta: {
			title: "满减活动"
		},
	},
	{
		path: '/dingdantj',
		name: '订单统计',
		component: Dingdantj,
		meta: {
			title: "订单统计"
		},
	},
	{
		path: '/caiwutj',
		name: '财务明细',
		component: Caiwutj,
		meta: {
			title: "财务明细"
		},
	},
	{
		path: '/Shoptj',
		name: '商品统计',
		component: Shoptj,
		meta: {
			title: "商品统计"
		},
	},
	{
		path: '/fenjian',
		name: '分拣订单',
		component: Fenjian,
		meta: {
			title: "分拣订单"
		},
	},
	{
		path: '/ruku',
		name: '入库运单',
		component: Ruku,
		meta: {
			title: "入库运单"
		},
	},
	{
		path: '/shopqd',
		name: '商品清单',
		component: Shopqd,
		meta: {
			title: "商品清单"
		},
	},
	{
		path: '/towrengg',
		name: '2人团轮播',
		component: Towrengg,
		meta: {
			title: "2人团轮播"
		},
	},
	{
		path: '/datuangg',
		name: '大众拼团轮播',
		component: Datuangg,
		meta: {
			title: "大众拼团轮播"
		},
	},
	{
		path: '/indexgg',
		name: '首页轮播广告',
		component: Indexgg,
		meta: {
			title: "首页轮播广告"
		},
	},
	{
		path: '/manjiangg',
		name: '满减专区轮播',
		component: Manjiangg,
		meta: {
			title: "满减专区轮播"
		},
	},
	{
		path: '/mansonggg',
		name: '满送专区轮播',
		component: Mansonggg,
		meta: {
			title: "满送专区轮播"
		},
	}, {
		path: '/shopgg',
		name: '商品分类广告',
		component: Shopgg,
		meta: {
			title: "商品分类广告"
		},
	},
	{
		path: '/xianshigg',
		name: '限时抢购轮播',
		component: Xianshigg,
		meta: {
			title: "限时抢购轮播"
		},
	},
	{
		path: '/home',
		name: 'Home',
		component: Home
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	}
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes
})
var routeList = [];
var titleList = [];
router.beforeEach((to, from, next) => {
	// console.log(to, from, next);


	var psths = to.path;


	var index = routeList.indexOf(to.path);

	var name = titleList.indexOf(to.name)
	if (index != -1) {
		routeList = to.meta.routeList
		titleList = to.meta.titleList
	} else {
		routeList.push(to.path);
		titleList.push(to.name);
	}
	to.meta.routeList = routeList
	to.meta.titleList = titleList
	// console.log(to.meta.routeList)
	// console.log(to.meta.titleList)
	next()
})
// this.$router.beforeEach((to, from, next) => {
// 					var psths = to.path
// 					console.log(psths)
// 					// var str = psths.split('').reverse().join('') // 字符串反转
// 					// var doc1 = str.split('/')[0].split('') // 截取.
// 					// var routerpath = doc1.reverse().join('') // 字符串再次反转
// 					var index = {
// 						title: to.meta.title,
// 						path: psths
// 					}
// 					for (var i = 0; i < _this.noticeList.length; i++) {
// 						if (_this.noticeList[i].title === index.title) {
// 							_this.noticeList.splice(i)
// 						}
// 					}
// 					store.dispatch('noticeList',_this.noticeList)
// 					_this.noticeList.push(index)
// 					console.log(_this.noticeList)
// 					next()
// 				})

export default router
