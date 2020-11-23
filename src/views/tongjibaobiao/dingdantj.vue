<template>
	<div class="home">
		<el-container>
			<el-header>
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
								<span class="fenl1">订单统计列表</span>
								<div class="yoou">
							
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi"	 >
									<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
								</div>
							</div>
							<div class="searchbox">
								<div>
									<div class="search">
										<el-date-picker size="medium" v-model="creteome" type="month" placeholder="选择月" @change="sousou">
										</el-date-picker>
									</div>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="sousou">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox650">
								<div class="eachertop">
									<div class="eachertop1">
										<div class="xiaodian1">
										</div>
										<span>月订单数量(个)：{{tableData.monthOrderNum}}</span>
									</div>
									<div class="eachertop2">
										<div class="xiaodian2">
										</div>
										<span> 月销售额(元)：{{tableData.monthPayNum}}</span>
									</div>
									<div class="eachertop3">
										<div class="xiaodian3">
										</div>
										<span>月发货量(件)：{{tableData.monthDeliverNum}}</span>
									</div>
								</div>
								<div>
									<div style="width:1668px;height:650px" ref="chart"></div>
								</div>
							</div>
						</div>
					</el-main>
					<el-footer height="42px">
						<Footer></Footer>
					</el-footer>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	// @ is an alias to /src
	import Header from '../../components/Header'
	import Footer from '../../components/Footer'
	import Daohang from '../../components/Daohang'
	import Left from '../../components/Left'
	import {
		tjddlist,
		changeYue
	} from '../../request/API/request.js'
	export default {

		components: {
			Header,
			Footer,
			Daohang,
			Left
		},
		data() {
			return {
				input: '',
				textarea: '',
				fenggeadd: 1,
				shenhe: false,
				dialogVisible: false,
				options: [],
				value: '',
				tableData: [],
				multipleSelection: [],
				xinxi: [],
				creteome: '',


			}
		},
		methods: {
			chongzhi() {
				this.creteome = ''
				// this.tjddlist()
				this.initCharts();
			},
			sousou() {
				let arrtime = this.creteome
				let ktime
				let jtime
				let ztime
				if (arrtime == '') {
					ktime = ''

				} else {
					ktime = changeYue(arrtime)
					ztime = ktime
				}
				this.creteome = ztime
				console.log(this.creteome)
				// this.tjddlist()
				this.initCharts();
			},
			tjddlist() {
				let params = {
					month: this.creteome
				}
				tjddlist('order/getTOrderTotalPageList', params).then(res => {
					console.log(res)
					this.tableData = res.resultData
					this.xinxi = res.resultData.orderDay
					console.log(this.xinxi)

					let arr = []

					for (let i in res.resultData.orderDay) {
						arr.push(res.resultData.orderDay[i].dayOrderNum)
					}
					console.log(arr, "4444")
					this.xinxi = arr
				})

			},
			initCharts() {

				let myChart = this.$echarts.init(this.$refs.chart);

				// 绘制图表
				let params = {
					month: this.creteome
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				tjddlist('order/getTOrderTotalPageList', params).then(res => {

					// console.log(res)
					this.tableData = res.resultData
					this.xinxi = res.resultData.orderDay
					// console.log(this.xinxi)

					let arr = []

					for (let i in res.resultData.orderDay) {
						arr.push(res.resultData.orderDay[i].dayOrderNum)
					}
					let brr = []

					for (let i in res.resultData.orderDay) {
						brr.push(res.resultData.orderDay[i].dayPayNum)
					}
					let crr = []

					for (let i in res.resultData.orderDay) {
						crr.push(res.resultData.orderDay[i].dayDeliverNum)
					}
					let drr = []

					for (let i in res.resultData.orderDay) {
						drr.push(res.resultData.orderDay[i].day)
					}
					console.log(arr, "4444")
					// this.xinxi=arr
					myChart.setOption({

						tooltip: {
							trigger: 'axis'
						},

						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: drr
						},
						yAxis: {
							type: 'value'
						},
						series: [{
								name: '日订单数',
								type: 'line',
								stack: '总量',
								data: arr
							},
							{
								name: '日销售额',
								type: 'line',
								stack: '总量',
								data: brr
							},
							{
								name: '日发货',
								type: 'line',
								stack: '总量',
								data: crr
							}
						]
					});
					setTimeout(() => {
						loading.close();
					}, 500);
				})

			}
		},
		mounted() {
			// this.tjddlist()
			this.initCharts();
		},
		deleteRow() {

		},
		xiugaidome() {
			this.shenhe = true
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		open() {
			this.$confirm('确认要删除该厂家分类记录吗?', '系统提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		}
	}
</script>
<style scoped="scoped" lang='less'>
	/* .el-main {
		height: 784px;
		padding: 0;
	} */

	.jia {
		width: 13px;
		height: 11px;
		background-color: #ffffff;
		color: #0b9cf4;
		margin: auto;
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

			.span1 {
				font-size: 22px;
				color: #FFFFFF;
				margin-right: 22px;
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


	.fenye {
		height: 81px;
		line-height: 81px;

	}

	.hezi {
		display: flex;

		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
	}

	.el-input {
		width: 280px;
		height: 40px;
		border-radius: 20px;
		margin-right: 10px;
	}

	.el-select {
		width: 280px;
		height: 40px;
		margin-right: 10px;
	}

	.box2 {
		width: 174px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 40px;

	}

	.box3 {
		width: 100px;
		height: 40px;
		border: 1px solid #0B9CF4;
		border-radius: 20px;
		display: flex;
		align-items: center;
		padding-left: 10px;
		padding-right: 10px;
		justify-content: space-between;
	}

	.boxx {
		display: flex;
		flex-wrap: wrap;
	}

	.box1 {
		display: flex;
		width: 50%;
		height: 60px;
		align-items: center;
		border: 1px solid #f2f2f2;
		box-sizing: border-box;
	}

	.box5 {
		width: 20%;
		height: 100%;
		padding-left: 5%;
		background: #e4e4e4;
		text-align: center;
		margin-right: 10px;

		span {
			display: block;
			line-height: 60px;

		}
	}

	.box4 {
		display: flex;
		width: 100%;
		height: 120px;
		margin-top: 40px;
		align-items: center;
		border: 1px solid #f2f2f2;
		padding-right: 21px;
		box-sizing: border-box;
	}

	.box8 {
		width: 20%;
		height: 100%;
		padding-left: 5%;
		background: #e4e4e4;
		text-align: center;
		margin-right: 10px;

		span {
			line-height: 120px;
		}
	}

	.yetou {
		display: flex;
		background-color: #fafafa;
		margin-bottom: 10px;

		span {
			width: 140px;
			height: 48px;
			line-height: 48px;
			text-align: center;
		}
	}

	.inter {
		display: flex;

		.fentu {
			display: flex;
			width: 50%;
			height: 120px;
			border: 1px solid #e4e4e4;

			.fentu1 {
				line-height: 120px;
				width: 190px;
				background-color: #fafafa;

				span {
					float: right;
					margin-right: 20px;
				}
			}

			.fentu2 {

				img {
					width: 90px;
					height: 90px;
					margin-top: 20px;
					margin-left: 20px;
				}
			}
		}

		.changjianame {
			display: flex;
			/* width: 50%; */
			height: 60px;
			border: 1px solid #e4e4e4;

			.changjianame1 {
				width: 190px;
				height: 60px;
				background-color: #fafafa;

				span {
					float: right;
					margin-right: 20px;
					line-height: 60px;
				}
			}

			.changjianame2 {
				width: 400px;

				span {
					line-height: 60px;
					margin-left: 20px;
				}
			}
		}
	}

	.shopname {
		display: flex;
		width: 100%;
		height: 60px;
		border-bottom: 1px solid #e4e4e4;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;

		.shopname1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				float: right;
				margin-right: 20px;
				line-height: 60px;
			}
		}

		.shopname2 {
			span {
				line-height: 60px;
				margin-left: 20px;

			}
		}
	}

	.shopdanwei {
		display: flex;
		width: 100%;
		height: 60px;
		border: 1px solid #e4e4e4;
		margin-top: 9px;

		.shopdanwei1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				float: right;
				margin-right: 20px;
				line-height: 60px;
			}
		}

		.shopdanwei2 {
			line-height: 60px;
			margin-left: 20px;
		}
	}

	.iners {
		display: flex;
	}

	.kaishi {
		height: 60px;
		display: flex;
		border-left: 1px solid #e4e4e4;

		.kaishi1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				float: right;
				margin-right: 20px;
				line-height: 60px;
			}

		}

		.kaishi2 {
			width: 380px;

			span {
				line-height: 60px;
				margin-left: 20px;
			}


		}
	}

	.yunfei {
		height: 60px;
		display: flex;
		border-left: 1px solid #e4e4e4;

		border-top: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;

		.yunfei1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				float: right;
				margin-right: 20px;
				line-height: 60px;
			}

		}

		.yunfei2 {
			width: 380px;

			span {
				line-height: 60px;
				margin-left: 20px;
			}


		}
	}

	.timelang {
		height: 60px;
		display: flex;
		border-left: 1px solid #e4e4e4;

		border-right: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;

		.timelang1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				float: right;
				margin-right: 20px;
				line-height: 60px;
			}

		}

		.timelang2 {
			width: 380px;

			span {
				line-height: 60px;
				margin-left: 20px;
			}


		}
	}

	.geshu {
		height: 60px;
		display: flex;
		border-left: 1px solid #e4e4e4;

		border-right: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;

		.geshu1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				float: right;
				margin-right: 20px;
				line-height: 60px;
			}

		}

		.geshu2 {
			width: 400px;

			span {
				line-height: 60px;
				margin-left: 20px;
			}


		}
	}

	.biaoge {
		border-collapse: collapse;
		border-color: #dae3ec;
		border: 1px solid #ccc;
		margin-top: 10px;
		font-size: 18px;
	}

	.oneli {

		height: 60px;
	}

	.touone {
		width: 300px;
		padding-left: 50px;
		box-sizing: border-box;
		background-color: #fafafa;
	}

	.toutow {
		width: 1000px;
		padding-left: 50px;
		box-sizing: border-box;
	}

	.posiu {
		span {
			line-height: 60px;
			font-size: 18px;

		}
	}



	.shuxin1 {
		line-height: 60px;
		width: 320px;
		padding-left: 50px;
		box-sizing: border-box;
		background-color: #fafafa;
	}

	.shuxin2 {
		line-height: 60px;
		width: 320px;
		padding-left: 50px;
		box-sizing: border-box;

	}

	.sspl {
		width: 40px;
		height: 40px;


	}

	.tuzhaoc {
		width: 320px;
		height: 60px;
		padding-top: 10px;
		box-sizing: border-box;
	}

	.lunbotu {
		width: 1150px;
		height: 300px;
		border: 1px solid #e4e4e4;
		padding-top: 20px;
		padding-left: 20px;
		box-sizing: border-box;
		margin-bottom: 200px;

		img {
			width: 150px;
			height: 150px;
			margin-right: 20px;
		}
	}

	.xqtu {
		width: 1150px;
		height: 100%;
		border: 1px solid #e4e4e4;
		padding-top: 20px;
		padding-left: 20px;
		padding-bottom: 20px;
		box-sizing: border-box;

		img {
			width: 300px;


		}
	}

	.topjia {
		margin-right: 20px;
	}

	.cllss {
		width: 590px;
		height: 250px;
	}

	.cllss1 {
		width: 190px;
		height: 250px;
		background-color: #fafafa;
	}

	.cllss2 {
		width: 350px;
		height: 250px;

		img {
			width: 120px;
			height: 206px;
			margin-left: 20px;
		}
	}

	.fdfds {
		display: flex;
	}

	.pingtai {
		display: flex;
		width: 490px;
		height: 60px;
		border: 1px solid #e4e4e4;

		.pingtai1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.pingtai2 {
			width: 300px;
			height: 60px;
			margin-top: 15px;
			margin-left: 10px;
		}
	}

	.xuhao {
		display: flex;
		width: 490px;
		height: 60px;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;

		.xuhao1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.xuhao2 {
			width: 300px;
			height: 60px;
			margin-top: 15px;
			margin-left: 10px;
		}
	}

	.shenghezhuangtai {
		display: flex;
		width: 490px;
		height: 60px;
		border: 1px solid #e4e4e4;

		.shenghezhuangtai1 {
			width: 190px;
			height: 60px;
			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.shenghezhuangtai2 {
			width: 300px;
			height: 60px;
			margin-top: 15px;
			margin-left: 10px;
		}
	}

	.ijfisa {
		margin-top: 15px;
	}

	.eachertop {
		display: flex;

		.eachertop1 {
			display: flex;
			align-items: center;

			.xiaodian1 {
				width: 16px;
				height: 16px;
				background-color: #0b9cf4;
				border-radius: 100%;
				margin-left: 20px;
				margin-right: 10px;
			}

			span {
				font-size: 16px;
				color: #333333;
			}
		}

		.eachertop2 {
			display: flex;
			align-items: center;

			.xiaodian2 {
				width: 16px;
				height: 16px;
				background-color: #e60012;
				border-radius: 100%;
				margin-left: 20px;
				margin-right: 10px;
			}

			span {
				font-size: 16px;
				color: #333333;
			}
		}

		.eachertop3 {
			display: flex;
			align-items: center;

			.xiaodian3 {
				width: 16px;
				height: 16px;
				background-color: #22ac38;
				border-radius: 100%;
				margin-left: 20px;
				margin-right: 10px;
			}

			span {
				font-size: 16px;
				color: #333333;
			}
		}
	}
</style>
