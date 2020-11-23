<template>

	<div class="home">
		<el-container>
			<el-header height="56px">
				<Header></Header>
			</el-header>
			<el-container>
				<el-aside width="180px">
					<Left></Left>
				</el-aside>
				<el-container>
					<el-main>
						<Daohang></Daohang>
						<div class="content">
							<div class="titlebar">
								<span class="fenl1">商品评价列表</span>
								<div class="yoou">
									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open()">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">
								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-input placeholder="订单号" size="medium" type="" v-model="diangdanhao"  @change="sousu"></el-input>
									<el-input placeholder="厂家名称" size="medium"  v-model="shopnameL"  @change="sousu"></el-input>
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
								<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
								  @select="deld" @select-all="quanxuan" stripe >
									<el-table-column type="selection" width="50">
									</el-table-column>
									<el-table-column label="订单号" prop="orderno" >
										<template slot-scope="scope">
											<div class="setbox">
												<div @click="cliick(scope.row)" >
													{{ scope.row.orderno }}
												</div>
											</div>
										
										</template>
									</el-table-column>
									<el-table-column prop="goodsName" label="商品名称" >
									</el-table-column>
									<el-table-column prop="shopName" label="厂家名称" >
									</el-table-column>
									<el-table-column prop="mnickname" label="用户昵称" >
									</el-table-column>
									<el-table-column prop="content" label="评价内容" width="510">
									</el-table-column>
									<el-table-column prop="star" label="评分" width="100">
									</el-table-column>
									<!-- <el-table-column prop="address" label="操作人" width="126">
									</el-table-column> -->
									<el-table-column prop="strAdtime" sortable label="创建时间" width="230">
									</el-table-column>
								</el-table>
								

							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									总共{{qinlun.total}}条数据
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10, 20, 300, 400]" layout="sizes, prev, pager, next,jumper" :total="qinlun.total"
									 @current-change="handleCurrentChange" :current-page.sync="qinlun.pageIndex">
									</el-pagination>
								</div>
							</div>
						</div>


						<!-- <el-dialog title="修改厂家分类信息" :visible.sync="dialogVisible" width="1200px" height="840px" :before-close="handleClose"> -->
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">评价详情</div>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="xiaotou">
											<span>
												商品名称:
											</span>

										</td>
										<td class="zuichang">
											<span>
												{{xqlist.goodsName}}
											</span>
										</td>
									</tr>
								</table>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">

									<tr>
										<td class="xiaotou"><span>
												订单号:
											</span></td>
										<td class="langzi"><span>
												{{xqlist.orderno}}
											</span></td>
										<td class="xiaotou"><span>
												厂家名称:
											</span></td>
										<td class="langzi"><span>
												{{xqlist.shopName}}:
											</span></td>
									</tr>
									<tr>
										<td class="xiaotou"><span>
												用户昵称:
											</span></td>
										<td class="langzi"><span>
												{{xqlist.mnickname}}
											</span></td>
										<td class="xiaotou"><span>
												创建时间:
											</span></td>
										<td class="langzi"><span>
												{{xqlist.strAdtime}}
											</span></td>
									</tr>

									<tr>
										<td class="xiaotou"><span>
												评分:
											</span></td>
										<td class="langzi"><span>
												{{xqlist.star}}
											</span></td>

									</tr>

								</table>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="yreus"><span>
												评价内容:
											</span></td>
										<td class="yreus2"><span>
												{{xqlist.content}}
											</span></td>
									</tr>
								</table>
								<div class="bottom">
									<el-button @click="dialogVisible = false">关 闭</el-button>
								</div>

							</div>
						</div>

						<!-- 	</el-dialog> -->
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
		shopqingjia,
		pingjiadel,
		sousupj
		
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
				fenggeadd: 4,
				shenhe: false,
				dialogVisible: false,
				qinlun: [],
				page: 0,
				xqlist: [],
				pingjiaid: [],
				diangdanhao:'',
				shopnameL:'',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				tableData: [],
				// tableData: [{
				// 		date: '2016-05-03',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	}, {
				// 		date: '2016-05-02',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	}, {
				// 		date: '2016-05-04',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	}, {
				// 		date: '2016-05-01',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	}, {
				// 		date: '2016-05-08',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	}, {
				// 		date: '2016-05-06',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	}, {
				// 		date: '2016-05-07',
				// 		name: '王小虎',
				// 		address: ' 1518 弄'
				// 	},

				// ],
				multipleSelection: []

			}
		},
		methods: {
			quanxuan(selection) {
				this.pingjiaid = []
				let arr = []
				// console.log(selection)
				// console.log(selection)
				for (let i in selection) {
					arr.push(selection[i].id)
				}
				this.pingjiaid = arr
			},
			// sousupj(){
			// 	let params={
					
			// 	}
			// 	sousupj().then(res=>{
					
			// 	})
			// },
			dels() {
				this.shopqingjia()
			},
			sousu(){
				this.page=0
				this.shopqingjia()
				
			},
			chongzhi(){
				this.shopnameL=''
				this.diangdanhao=''
				this.page = 0
				this.shopqingjia()
			},
			pingjiadel() {
				let params = {
					ids: this.pingjiaid.join(",")
				}
				pingjiadel('shop/deleteTGoodsCmt', params).then(res => {
					console.log(res, "44546545")
					if (res.isSuccess == true) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.shopqingjia()
					} else {
						this.$message({
							type: 'success',
							message: '删除失败!',
						});
					}

				})

			},
			shopqingjia() {
				let params = {
					pageIndex: this.page,
					pageSize: 15,
					orderno:this.diangdanhao,
					shopName:this.shopnameL
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				shopqingjia('shop/getTGoodsCmtPageList', params).then(res => {

					this.tableData = res.resultData.content
					console.log(this.tableData)
					this.qinlun = res.resultData;
					setTimeout(() => {
						loading.close();
					}, 1000);
				})
			},
			cliick(row) {
				this.xqlist = row
				console.log(row)
				this.dialogVisible = true
			},
			deleteRow() {

			},
			xiugaidome() {
				this.shenhe = true
			},
			deld(selection, row) {
				// this.goodsidlist = []
				// console.log(selection,"4454")
				let arr = []
				
				for (let i in selection) {
					arr.push(selection[i].id)
				}
				this.pingjiaid = arr
				// this.goodsidlist.push(row.id)
				// console.log(this.goodsidlist)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.shopqingjia()
				console.log(`当前页: ${val}`);
			},
			open() {
				if(this.pingjiaid==''){
					return
				}else{
					this.$confirm('确认要删除该厂家商品记录吗?', '系统提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.pingjiadel()
					
						}).catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				}
		},
		mounted() {
			this.shopqingjia()
		}

	}
</script>
<style scoped="scoped" lang='less'>
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
		width: 274px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 40px;

	}

	.box3 {
		width: 120px;
		height: 40px;
		border: 1px solid #0B9CF4;
		border-radius: 20px;
		display: flex;
		align-items: center;
		padding-left: 30px;
		padding-right: 30px;
		justify-content: space-between;
		box-sizing: border-box;
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
		width: 1060px;

		tr {
			/* width: 1060px; */
			height: 60px;
		}
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

	.xiaotou {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}

	}

	.zuichang {
		width: 878px;
		height: 60px;

		span {
			margin-left: 20px;
		}
	}

	.langzi {
		width: 350px;
		height: 60px;

		span {
			margin-left: 20px;
		}
	}

	.yreus {
		width: 180px;
		height: 120px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.yreus2 {
		width: 878px;
		height: 120px;

		span {
			margin-left: 20px;
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
</style>
