<template>
	<el-container>
		<el-header height="56px">
			<Header></Header>
		</el-header>
		<el-container>
			<el-aside width="190px">
				<Left></Left>
			</el-aside>
			<el-container>
				<el-main>
					<Daohang></Daohang>

					<div class="content">
						<div class="titlebar">
							<span class="fenl1">已退款订单列表</span>
							<div class="yoou">
								<!-- <div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div> -->
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input placeholder="订单号" size="medium" v-model="orderno" @change="sousu"></el-input>
								<el-input placeholder="收货地址" size="medium" v-model="receaddr" style="margin-right: 10px;" @change="sousu"></el-input>
								<span style="line-height:48px;font-size:16px;margin-right:20px;">下单时间</span>
								<el-date-picker v-model="creteome" type="daterange" size="medium" range-separator="至" start-placeholder="开始时间"
								 end-placeholder="结束时间" @change="sousu">
								</el-date-picker>


							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @click="sousu">
								<div class="shuax" @click="chongzhi">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>

						<div class="tablebox">
							<div class="ddheji">
								<span>订单金额合计：{{tjhj.totalGpriceid}}</span>
								<span>运费合计：{{tjhj.totalDelivcost}}</span>

								<span>支付金额合计：{{tjhj.totalAmount}}</span>
								<span>厂家收入合计：{{tjhj.totalSamount}}</span>
								<span>平台抽成合计：{{tjhj.totalPamount}}</span>
							</div>
							<el-table :data="tableData1" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column label="订单号" width="220" @row-click="lookinfo">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="xiuga(scope.row.id)">{{scope.row.orderno}}</div>


										</div>
									</template>
								</el-table-column>
								<el-table-column label="活动类型" width="100px">
									<div class="setbox" slot-scope="scope">
										<span v-if=" scope.row.wssubtype==0">传统批发</span>
										<span v-if=" scope.row.wssubtype==4">满减专区</span>
										<span v-if=" scope.row.wssubtype==5">满送专区</span>
										<span v-if=" scope.row.wssubtype==6">限时折扣</span>
										<span v-if=" scope.row.wssubtype==7">大众拼团</span>
										<span v-if=" scope.row.wssubtype==8">两人拼</span>
									</div>
								</el-table-column>
								<el-table-column label="商品名称" width="200">
									<template slot-scope="scope">
										<span style=" width: 195px; display: block;height: 20px; line-height: 24px;">
											{{ scope.row.goodsname }}
										</span>
									</template>
								</el-table-column>
								<el-table-column label="商品规格" width="200">
									<template slot-scope="scope" >
										
										<div class="guige">
									
										<span style="line-height:20px;display:black" v-for="(item,index) in scope.row.tOrderGoodsDetail" :key="index">
											{{item.value1}}
										</span>
											</div>
									</template>
								</el-table-column>
								<el-table-column label="购买数量" width="100px">
									<template slot-scope="scope">
										
										<div class="guige">
											<span style="line-height:20px" v-for="(item,index) in scope.row.tOrderGoodsDetail" :key="index">
												{{item.num}}
											</span>
										</div>
										
									</template>
								</el-table-column>
								<el-table-column prop="strAdtime" label="下单时间" width="120">
								</el-table-column>
								<el-table-column prop="gprice" label="订单金额(元)" width="100">
								</el-table-column>
								<el-table-column prop="delivcost" label="含运费(元)" width="100">
								</el-table-column>
								<el-table-column prop="amount" label="支付金额(元)" width="100">
								</el-table-column>
								<el-table-column prop="recename" label="收货人" width="90">
								</el-table-column>
								<el-table-column prop="recephone" label="手机" width="120">
								</el-table-column>
								<el-table-column prop="isshare" label="收货地址" width="170">
									<template slot-scope="scope">
										<span style=" width: 170px; display: block;height: 20px; line-height: 24px;">
											{{ scope.row.receaddr }}
										</span>
									</template>
								</el-table-column>
								<el-table-column label="分账状态">
									<div class="blockbox" slot-scope="scope">
										<span v-if="scope.row.isshare==0">未分账</span>
										<span v-if="scope.row.isshare==1">已分账</span>
									</div>
								</el-table-column>
								<el-table-column prop="strStime" label="分账时间" width="100">
								</el-table-column>
								<el-table-column prop="samount" label="厂家收入" width="100">
								</el-table-column>
								<el-table-column prop="leavemsg" label="用户留言" width="240">
								</el-table-column>

							</el-table>

						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center; ">
							<div class="demonstration">
								总共{{zong.total}}条数据
							</div>
							<div style="display: flex; align-items: center;">
								<span>每页显示</span>
								<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="zong.total" @current-change="handleCurrentChange"
								 :current-page.sync="zong.pageIndex">
								</el-pagination>
							</div>
						</div>
					</div>
				</el-main>
				<el-footer height="42px">
					<Footer></Footer>
				</el-footer>
			</el-container>
		</el-container>
		<div class="addbox" v-if="addbox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">查看订单详情</div>
				<div class="tablebox" >
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">用户名(购买者):</td>
							<td style="width: 400px;">
								{{dantian.userNice}}
							</td>
							<td class="text">用户手机:</td>
							<td style="width: 400px;">
								{{dantian.phoneNum}}
							</td>
						</tr>
						<tr>
							<td class="text">订单号:</td>
							<td>
								{{dantian.orderno}}
							</td>
							<!-- <td class="text">商品分类:</td>
							<td>
								{{dantian}}
							</td> -->

						</tr>

					</table>
					<div style="font-size: 18px; text-align: center; margin: 20px auto;">订单商品详情</div>
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">厂家名称:</td>
							<td style="width: 400px;">
								{{dantian.shopname}}
							</td>
							<td class="text">厂家电话:</td>
							<td colspan="2" style="width: 400px;">
								{{dantian.shopphone}}
							</td>

						</tr>


					</table>
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px" v-for="(item,index) in dantian.goods"
					 :key="index">
						<tr>
							<td rowspan="3" class="text">
								<div class="tdimg">
									<img :src="item.img" alt="">
								</div>
							</td>
							<td style="background: #fafafa; width: 998px;" colspan="4">商品名称:{{item.name}}</td>


						</tr>
						<tr>
							<td colspan="2" rowspan="2">
								<div class="tdbox" v-for="(iten,indes) in item.tOrderGoodsSku" :key="indes">
									<span>商品规格：{{iten.value1}} 购买单价：{{iten.price}} 购买数量：{{iten.num}}</span>
								</div>
							</td>

							<td rowspan="2">
								<div class="tdbox">
									<span>平台提成比例：{{item.pratio}}</span>
									<!-- <span>本厂收入（元）：{{item.pratio}}</span>
									<span>平台抽成（元）：{{item.pratio}}</span> -->
									<span v-if="item.fcstate== 1">参与部分商品优惠状态：参与</span>
									<span v-if="item.fcstate==0">参与部分商品优惠状态：不参与</span>
								</div>
							</td>

						</tr>
						<tr></tr>
					</table>
					<table class="table" style="margin-bottom: 20px;" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">订单总价格(元):</td>
							<td style="width: 400px;">
								{{dantian.gprice}}
							</td>
							<td class="text">优惠类型:</td>
							<td colspan="2" style="width: 400px;">
								<span v-if="dantian.freetype==0">全部商品优惠</span>
								<span v-if="dantian.freetype==1">部分商品优惠</span>
							</td>

						</tr>
						<tr>
							<td class="text">运费(元):</td>
							<td style="width: 400px;">
								{{dantian.delivcost}}
							</td>
							<td class="text">优惠金额(元):</td>
							<td colspan="2" style="width: 400px;">
								{{dantian.freeprice}}
							</td>

						</tr>
						<tr>
							<td class="text">支付金额(元):</td>
							<td style="width: 400px;">
								{{dantian.amount}}
							</td>
							<td class="text">活动描述(元):</td>
							<td colspan="2" style="width: 400px;">
								{{dantian.givedesc}}
							</td>

						</tr>
						<tr>
							<td class="text">本厂收入(元):</td>
							<td style="width: 400px;">
								{{dantian.samount}}
							</td>
							<td class="text">平台收入(元):</td>
							<td colspan="2" style="width: 400px;">
								{{dantian.pamount}}
							</td>

						</tr>

					</table>
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">订单状态:</td>
							<td colspan="3" style="color: red;">
								<span v-if="dantian.state==0">待付款</span>
								<span v-if="dantian.state==1">待发货</span>
								<span v-if="dantian.state==3">已完成</span>
								<span v-if="dantian.state==4">已退款</span>
								<span v-if="dantian.state==5">已取消</span>
								<span v-if="dantian.state==10">拼团中</span>
								<span v-if="dantian.state==2">待收货</span>
							</td>

						</tr>
						<tr>
							<td class="text">支付时间:</td>
							<td style="width: 400px;">
								{{dantian.strPaytime}}
							</td>
							<td class="text">交易渠道:</td>
							<td style="width: 400px;">
								{{dantian.channel}}
							</td>
						</tr>
						<tr>
							<td class="text">配送类型:</td>
							<td colspan="3">
								<span v-if="dantian.delivtype==0">到店取货</span>
								<span v-if="dantian.delivtype==1">送货上门</span>
							</td>
						</tr>
						<tr>
							<td class="text">收货人:</td>
							<td style="width: 400px;">
								{{dantian.recename}}
							</td>
							<td class="text">收货手机号:</td>
							<td style="width: 400px;">
								{{dantian.recephone}}
							</td>
						</tr>
						<tr>
							<td class="text">收货地址:</td>
							<td colspan="3">
								{{dantian.receaddr}}
							</td>
						</tr>
						<tr>
							<td class="text">发货时间:</td>
							<td style="width: 400px;">
								{{dantian.strDelivtime}}
							</td>
							<td class="text">物流名称:</td>
							<td style="width: 400px;">
								{{dantian.loginame}}
							</td>
						</tr>
						<tr>
							<td class="text">物流单号:</td>
							<td colspan="3">
								{{dantian.logino}}
							</td>
						</tr>
						<tr>
							<td class="text">收货时间:</td>
							<td style="width: 400px;" colspan="3">
								{{dantian.strTrtime}}
							</td>
							<!-- <td class="text">收货单据凭证图片:</td>
							<td style="width: 400px;">
								<img src="../../assets/logo.png" alt="" style="height: 40px; width: 40px;">
							</td> -->
						</tr>
						<tr>
							<td class="text">申请退款状态:</td>
							<td colspan="3">
								<span v-if="dantian.rfstate==0">申请退款中</span>
								<span v-if="dantian.rfstate==1">同意退款</span>
								<span v-if="dantian.rfstate==2">拒绝退款</span>
							</td>
						</tr>
						<tr>
							<td class="text">申请退款时间:</td>
							<td style="width: 400px;">
								{{dantian.strApplydtime}}
							</td>
							<td class="text">退款时间:</td>
							<td style="width: 400px;">
								{{dantian.strApplyUptime}}
							</td>
						</tr>
						<tr>
							<td class="text">申请退款原因:</td>
							<td colspan="3">
								{{dantian.reason}}
							</td>
						</tr>
						<tr>
							<td class="text">退款处理意见:</td>
							<td colspan="3">
								{{dantian.advice}}
							</td>
						</tr>
						<tr>
							<td class="text">评价内容:</td>
							<td colspan="3">
								{{dantian.cmtContent}}
							</td>
						</tr>
						<tr>
							<td class="text">备注信息:</td>
							<td colspan="3">
								{{dantian.remarks}}
							</td>
						</tr>
					</table>
					<div class="bottom">
						<!-- <el-button type="primary">确定</el-button> -->
						<el-button type="info" @click="addbox = false">关闭</el-button>
					</div>
				</div>

			</div>
		</div>
	</el-container>
</template>

<script>
	import Left from '../../components/Left.vue'
	import Header from '../../components/Header.vue'
	import Footer from '../../components/Footer.vue'
	import Daohang from '../../components/Daohang.vue'
	import {
		oderxq,
		oderonexq,
		chengeTime,
		odertj
	} from '../../request/API/request.js'
	export default {
		components: {
			Header,
			Left,
			Footer,
			Daohang,

		},
		data() {
			return {
				infobox: false,
				addbox: false,
				orderno: '',
				receaddr: '',
				creteome: '',
				page: 0,
				pages: 10,
				dantian: [],
				oderid: '',
				zong: [],
				tjhj: [],
				chantime: '',

				tableData1: [{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					price: '11.00'
				}, {
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄',
					price: '11.00'
				}, {
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					price: '11.00'
				}, {
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄',
					price: '11.00'
				}]
			}

		},
		methods: {
			sousu() {
				this.page = 0
				let arrtime = this.creteome
				let ktime
				let jtime
				let ztime
				if (arrtime == '') {
					ktime = ''
					jtime = ''
					ztime = ''
				} else {
					ktime = chengeTime(arrtime[0])
					jtime = chengeTime(arrtime[1])
					ztime = ktime + ',' + jtime
				}
				this.chantime = ztime
				this.oderxq()

			},
			chongzhi() {
				this.creteome = ''
				this.orderno = ''
				this.receaddr = ''
				this.chantime = ''
				this.page = 0
				this.oderxq()
			},
			xiuga(e) {
				console.log(e)
				this.addbox = true
				this.oderid = e
				this.oderonexq()
			},
			oderonexq() {
				let params = {
					id: this.oderid
				}
				oderonexq('order/getOrderDetailInfo', params).then(res => {
					console.log(res)
					this.dantian = res.resultData
				})
			},
			odertj() {
				let params = {
					business: 4,
					orderno: this.orderno,
					receaddr: this.receaddr,
					createTime: this.chantime,
					pageIndex: this.page,
					pageSize: this.pages,
				}
				odertj('order/getOrderTotalData', params).then(res => {
					console.log(res, "5555555555")
					this.tjhj = res.resultData
				})
			},
			oderxq() {
				let _this = this
				let params = {
					business: 4,
					orderno: this.orderno,
					receaddr: this.receaddr,
					createTime: this.chantime,
					pageIndex: this.page,
					pageSize: this.pages,

				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				oderxq('order/getTShopTypePageList', params).then(res => {
					console.log(res)
					this.tableData1 = res.resultData.content
					this.zong = res.resultData;
					setTimeout(() => {
						loading.close();
					}, 500);
					_this.odertj()
				})
			},
			lookinfo() {
				// console.log("111")
			},
			handleEdit(index, row) {
				// console.log(index, row);
			},
			handleDelete(index, row) {
				// console.log(index, row);
			},

			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.page = val - 1
				this.oderxq()
			},
		},
		mounted() {
			this.oderxq()
			this.odertj()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.nobefor {
		&::before {
			content: '' !important;
		}
	}

	.el-aside,
	.el-header {
		padding: 0px;
	}



	.el-footer {
		padding: 0px;
		height: 42px;
		line-height: 42px;
	}

	.content {
		box-sizing: border-box;
		padding: 10px;
	}

	// .el-table {
	// 	// margin-top: 10px;
	// 	z-index: 10;

	// 	th>.cell {
	// 		color: #333 !important;
	// 		font-size: 16px;
	// 		height: 100%;
	// 	}

	// 	td {
	// 		height: 48px !important;
	// 	}
	// }

	// .el-table .cell {
	// 	color: #333 !important;
	// 	font-size: 16px;
		
	// }
	.el-table .cell {
	    font-size: 0.833vw;
	    height: 100% ;
	    line-height: 2.5vw !important;
	}

	.setbox {
		display: flex;
		cursor: pointer;

		div {
			margin-right: 20px;
			color: #0b9cf4;
		}

		span {

			color: #333;
		}
	}

	.blockbox {
		display: flex;
		flex-direction: column;
		width: 150px;
		height: 66px;
		overflow: auto;
		// cursor: pointer;

		div {
			margin-right: 20px;
			color: #333;

			&:hover {
				color: #0b9cf4;
			}
		}

		span {
			margin-right: 20px;
			color: #333;
		}
	}

	.searchbox {
		height: 80px;
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
				width: 240px;
				height: 40px;
				margin-left: 10px;

			}

			.el-select {
				width: 240px;
				height: 40px;
				margin: 0px 10px;

			}

			.el-date-picker {


				width: 240px;
				height: 40px;

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
			width: 1200px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			height: 720px;

			// overflow-y: auto;
			.title {
				width: 1200px;
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
			}

			.table {
				border-collapse: collapse;
				border-color: #dae3ec;
				border: 1px solid #ccc;
				// margin: 20px auto;
				font-size: 18px;

				tr {
					width: 100%;
					border-color: #dae3ec;
					height: 64px;

					td {
						box-sizing: border-box;
						padding: 10px;
					}

					.tdbox {
						display: flex;
						flex-direction: column;
						margin-bottom: 10px;
					}

					.tdimg {
						width: 140px;
						// height: 140px;
						text-align: center;
						overflow: hidden;

						img {
							width: 100%;
							height: 100%;
						}
					}

					.text {
						width: 180px;
						height: 64px;
						background-color: #fafafa;
						font-size: 18px;
						color: #666666;
						text-align: right;
						box-sizing: border-box;
						padding-right: 20px;

						// &::before {
						// 	content: '*';
						// 	color: red;
						// }
					}

					.value {
						width: 748px;
						height: 178px;
						word-wrap: break-word
					}

					.img {
						width: 90px;
						// height: 90px;
						border: solid 1px #e4e4e4;
						overflow: hidden;

						img {
							height: 100%;
							width: 100%;
						}
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
							border-radius: 50%;
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
				left: 0px;
				bottom: 0px;

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}

	.jsjd {
		display: flex;
		background: #fff;

		span {
			line-height: 34px;
			font-size: 16px;
			margin-left: 20px;
		}
	}
	.guige{
		height:100%;
		width:190PX;
		overflow:hidden;	
		 overflow-y: scroll;
		display:flex;
		flex-direction:column
	}
</style>
