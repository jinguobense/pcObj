<template>
	<div class="home">
		<el-container>
			<el-header>
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

								<span class="fenl1">满减活动列表</span>
								<div class="yoou">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
									<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-input v-model="shopname" size="medium" placeholder="厂家名称" @change='getInfoList(0)'></el-input>

								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @change='getInfoList(0)'>
									<div class="shuax" @click="resect">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">
								<el-table ref="multipleTable" border stripe class="table" :data="manjianList" tooltip-effect="dark" style="width: 100%"
								 @selection-change="handleSelectionChange" @row-dblclick="cliick">
									<el-table-column label="厂家名称">
										<!-- <template slot-scope="scope">{{ scope.row.shopname }}</template> -->
										<template slot-scope="scope">
											<div class="setbox" @click="getitem(scope.row)">
												<div>{{scope.row.shopname}}</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="actdesc" label="活动描述" width="260">
									</el-table-column>
									<el-table-column prop="strStarttime" label="开始时间" sortable width="292">
									</el-table-column>
									<el-table-column prop="strEndtime" label="结束时间" sortable width="290">
									</el-table-column>
									<el-table-column label="状态" width="195">
										<template slot-scope="scope">
											<span v-if="scope.row.state == 1">已结束</span>
											<span v-if="scope.row.state == 0">正常</span>
										</template>
									</el-table-column>
									<el-table-column prop="strAdtime" label="创建时间" sortable width="290">
									</el-table-column>
								</el-table>
							</div>
							<div class="block">
								<div class="demonstration">
									总共{{totalpage}}条数据
									<!-- 	<sapn>显示第 {{nowpage}} 页</sapn> -->
								</div>
								<div style="display: flex; align-items: center;">
									<!-- <span>每页显示</span> -->
									<el-pagination layout="prev, pager, next,jumper" :total="totalpage" :current-page.sync="nowpage"
									 @current-change='currentclick'>
									</el-pagination>
								</div>
							</div>
						</div>
						<div class="addbox" v-if="addbox">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">满减活动详情</div>
								<div class="tablebox">
									<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
										<tr>

											<td class="text">活动类型:</td>
											<td style="width: 748px;">
												满减活动
											</td>
										</tr>

										<tr>
											<td class="text">满多少(元):</td>
											<td style="width: 900px;">
												{{itemInfo.fullprice}}
											</td>

										</tr>
										<tr>

											<td class="text">减多少(元):</td>
											<td style="width: 1000px;">
												{{itemInfo.freeprice}}
											</td>
										</tr>
										<tr>

											<td class="text">开始时间:</td>
											<td style="width: 1000px;">
												{{itemInfo.strStarttime}}
											</td>
										</tr>
										<tr>

											<td class="text">结束时间:</td>
											<td style="width: 1000px;">
												{{itemInfo.strEndtime}}
											</td>
										</tr>
									</table>
								</div>
								<div class="bottom">
									<!-- <el-button type="primary" @click="addguigeItem">确定</el-button> -->
									<el-button type="info" @click="addbox = false">关闭</el-button>
								</div>
							</div>
						</div>
					</el-main>
					<el-footer height='42px'>
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
	import Left from '../../components/Left';
	import {
		getmanjinaList
	} from '../../request/API/request.js'
	export default {
		inject: ['reload'],
		components: {
			Header,
			Footer,
			Daohang,
			Left
		},
		data() {
			return {
				addbox: false,
				shopname: '',
				page: '',
				pageSize: 10,
				totalpage: '',
				manjianList: [],
				itemInfo: "",
				nowpage: ''

			}
		},
		methods: {
			resect() {
				this.shopname = ''
				this.page = 0;
				this.reload()
				this.getInfoList();
			},
			getitem(row) {
				console.log(row)
				this.itemInfo = row;
				this.addbox = true
			},
			currentclick(e) {
				console.log('点击下一页');
				let _this = this;
				console.log(e)
				_this.page = e - 1;
				_this.getInfoList()
			},
			getInfoList(e) {
				let _this = this;
				if (e == 0) {
					_this.page = 0
				}
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize,
					shopname: _this.shopname
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getmanjinaList('shop/getTWsActPageList', params).then(res => {
					console.log(res);
					_this.manjianList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex
					setTimeout(() => {
						loading.close();
					}, 500);
				})

			},
			cliick() {
				this.dialogVisible = true
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
		},
		mounted() {
			this.getInfoList()
		}

	}
</script>
<style scoped="scoped" lang='less'>
	/* .el-main {
		height: 784px;
		padding: 0;
	} */
	.tablebox{
		height: 590px;
	}
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
				width: 240px;
				height: 40px;
				// margin-right: 10px;

			}

			.el-select {
				width: 240px;
				height: 40px;
				// margin-left: 5px;
			}

			.el-date-picker {
				width: 240px;
				height: 40px;
				padding: 0px !important;
				// margin-left: 20px;

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
			width: 1080px;
			height: 780px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.block {
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				box-sizing: border-box;
				padding: 0px 10px;
				bottom: 75px;
				width: 100%;
				background: #fff;
				z-index: 100000;
			}

			.title {
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
			}

			.tablebox {
				height: 480px;
				width: 100%;
				overflow: auto;

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
					height: 60px;

					td {
						box-sizing: border-box;
						padding: 10px;
					}

					.text {
						width: 180px;
						height: 60px;
						background-color: #fafafa;
						font-size: 18px;
						color: #666666;
						text-align: right;
						box-sizing: border-box;
						padding-right: 20px;

						/* &::before {
							content: '*';
							color: red;
						} */
					}

					.value {
						width: 878px;
						height: 178px;
						word-wrap: break-word;
						font-size: 16px;
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
				bottom: 20px;
				left: 0px;
				z-index: 100000;
				background: #fff;

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
</style>
