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
								<span class="fenl1">商品清单(待配送)</span>
								<div class="yoou">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="sousu">
									<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
								</div>
							</div>
							<div style="font-size: 18px;color: #333333;line-height: 50px; background-color: #fff; height: 50px;text-indent: 36px;">商品总数量：{{zong.goodsNum}}
								&nbsp; 商品规格总数：{{zong.goodsSkuNum}}</div>
							<div class="tablebox650">
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge1">
									<thead>
										<tr>
											<th class="biaoyou">
												<span>
													商品名称
												</span>
											</th>
											<th class="biaoyou">
												<span>
													商品规格
												</span>
											</th>
											<th class="biaoyou">
												<span>
													商品数量
												</span>
											</th>
										</tr>
									</thead>
									<tbody v-for="(item,index) in tableData" :key='index' class="trs">
										<tr>
											<td rowspan="4" class="biaoyou">
												<span>
													{{item.name}}
												</span>
											</td>
											<td class="biaoyou">
												<div v-for="(item1,indes) in item.tGoodsSkuBo" :key='indes' class="asbox">
													<span>
														{{item1.value1}}
													</span>
												</div>
											</td>
											<td class="biaoyou">
												<div v-for="(item1,indes) in item.tGoodsSkuBo" :key='indes' class="asbox">
													<span>
														{{item1.num}}
													</span>
												</div>
											</td>

										</tr>
									</tbody>
								</table>
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
		Hygoodsqd
	} from '../../request/API/request.js'
	export default {

		components: {
			Header,
			Footer,
			Daohang,
			Left,

		},
		data() {
			return {
				input: '',
				textarea: '',
				fenggeadd: 1,
				shenhe: false,
				dialogVisible: false,
				value1: '',
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
				zong: '',
				multipleSelection: []

			}
		},
		methods: {
			Hygoodsqd() {
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				Hygoodsqd('order/getTGoodsDetailed').then(res => {
					console.log(res)
					this.zong = res.resultData
					this.tableData = res.resultData.goods
					setTimeout(() => {
						loading.close();
					}, 1000);

				})
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
			},
			sousu() {

				this.Hygoodsqd()
			},
		},
		mounted() {
			this.Hygoodsqd()
		}

	}
</script>
<style scoped="scoped" lang='less'>
	.biaoyou{
		word-break: break-all; 
		 width: 400px;
	}
	table {
		border-collapse: collapse;
		white-space: nowrap;
		width: 100%;


		.sort-th {
			display: flex;
			justify-content: space-between;
			align-items: center;

			img {
				display: block;
				width: 12px;
				height: 6px;
				margin: 2px;
				margin-right: 17px;

				&:hover {
					transform: scale(1.2);
				}
			}
		}

		td,
		th {

			font-family: SourceHanSansCN-Regular;
			font-size: 16px;
			font-weight: bold;
			letter-spacing: 0px;
			color: #333333;
			width: 33%;
			height: 55px;
			background-color: #ffffff;
			border: solid 1px #999999;
			text-align: left;

			box-sizing: border-box;
			text-indent: 12px;
		}

		td {
			cursor: pointer;

			div {
				height: 54px;
				line-height: 54px;
				border-bottom: 1px solid #999;
			}

			div:last-child {
				border-bottom: none;
			}

		}



		td {
			font-weight: normal;
			background-color: #ffffff;

			.detail {
				color: #333;
				cursor: pointer;
				font-size: 16px;

			}

		}

		

	}
</style>
