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
								<span class="fenl1">厂家分类</span>
								<div class="yoou">
									<div @click="xinjian">
										<img src="../../assets/img/baijia.png" alt="">
										<span class="span1">新建</span>
									</div>
									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open()">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">

								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-input placeholder="请输入商品分类" size="medium" v-model="name" @change="cjfeilei(0)"></el-input>
									<el-select size="medium" placeholder="状态" v-model="state" @change="cjfeilei(0)">
										<el-option key="1" value="1" label="不显示"></el-option>
										<el-option key="0" value="0" label="显示"></el-option>
									</el-select>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="cjfeilei(0)">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span>重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">
								<el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%"
								 @selection-change="handleSelectionChange" @select="deld" @select-all="quanxuan">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column label="分类名称" width="120" prop="name">
										<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
									</el-table-column>
									<el-table-column prop="seq" label="序号" sortable width="120">

									</el-table-column>
									<el-table-column label="状态">
										<template slot-scope="scope">
											<div>
												<span v-if="scope.row.state==0">
													显示
												</span>
												<span v-if="scope.row.state==1">
													不显示
												</span>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="strAdtime" sortable label="创建时间" show-overflow-tooltip>
									</el-table-column>
									<el-table-column prop="strUptime" sortable label="更新时间" show-overflow-tooltip>
									</el-table-column>
									<el-table-column prop="remarks" label="备注消息" show-overflow-tooltip>
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="120">
										<div class="setbox" slot-scope="scope">
											<div  @click="deleteRow(scope.row)">
												修改
											</div>
										</div>
									</el-table-column>
								</el-table>

							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									总共{{zong.total}}条记录
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :current-page.sync="zong.pageIndex"
									 :total="zong.total" @current-change="handleCurrentChange">
									</el-pagination>
								</div>
							</div>
						</div>


						<!-- <el-dialog title="修改厂家分类信息" :visible.sync="dialogVisible" width="1200px" :before-close="handleClose"> -->
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title" v-if="newss==1">修改厂家分类信息</div>
								<div class="title" v-if="newss==0">新建厂家分类信息</div>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="atr1"><span>分类名称:</span></td>
										<td class="atr2">
											<div class="inputre">
												<el-input v-model="namel" placeholder="请输入内容"></el-input>
											</div>
										</td>
										<td class="atr1"><span>序号:</span></td>
										<td class="atr2">
											<div class="inputre">
												<el-input v-model="seq" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
											</div>
										</td>
									</tr>
									<tr>
										<td class="atr1"><span>状态:</span></td>
										<td class="atr2">
											<div class="inputre">
												<el-select size="medium" v-model="states" placeholder="商品状态">
													<el-option key="1" value="不显示" label="不显示"></el-option>
													<el-option key="0" value="显示" label="显示"></el-option>
												</el-select>
											</div>
										</td>

									</tr>
								</table>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="atr8"><span>备注信息:</span></td>
										<td class="atr3">
											<div class="inputre">
												<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="remarks">
												</el-input>
											</div>
										</td>

									</tr>
								</table>
								<div class="bottom">
									<el-button type="primary" @click='xiugai'>确 定</el-button>
									<el-button @click="quxiao">取 消</el-button>
								</div>

							</div>
						</div>

						<!-- </el-dialog> -->
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
		cjfeilei,
		cjnew,
		cjdel
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
				newss: 1,
				input: '',
				textarea: '',
				dialogVisible: false,
				page: 0,
				pages: 10,
				name: '',
				state: '',
				zong: [],
				shopid: '',
				namel: '',
				seq: '',
				states: '',
				remarks: '',
				pingjiaid: [],
				goodsidlist: [],
				xiugaishuju: [],

				value: '',

				multipleSelection: []

			}
		},
		methods: {
			quxiao(){
				this.dialogVisible = false
				this.shopid = ''
				this.namel = ''
				this.remarks = ''
				this.seq = ''
				this.states=''
			},
			
			xinjian() {
				this.newss = 0
				this.dialogVisible = true
			},
			sousou() {
				this.cjfeilei()

			},
			chongzhi() {
				this.name = ''
				this.state = ''
				this.page = 0;
				this.reload();
				this.cjfeilei();
			},
			cjdel() {
				let params = {
					ids: this.goodsidlist.join(",")
				}
				cjdel('shop/deleteTShopType', params).then(res => {
					console.log(res)
					this.cjfeilei()
				})
			},
			deld(selection, row) {
				// this.goodsidlist = []
				// console.log(selection,"4454")
				let arr = []

				for (let i in selection) {
					arr.push(selection[i].id)
				}
				this.goodsidlist = arr
				// this.goodsidlist.push(row.id)
				console.log(this.goodsidlist)
			},
			quanxuan(selection) {
				this.goodsidlist = []
				let arr = []
				// console.log(selection)
				// console.log(selection)
				for (let i in selection) {
					arr.push(selection[i].id)
				}
				this.goodsidlist = arr
			},
			xiugai() {
				if(this.namel==''){
					this.$message({
						message: "分类名不能为空",
						type: 'error',
						duration: 500
					});
					return
				}else if(this.seq==''){
					this.$message({
						message: "序号不能为空",
						type: 'error',
						duration: 500
					});
					return
				}
				else if(this.states==''){
					this.$message({
						message: "状态不能为空",
						type: 'error',
						duration: 500
					});
					return
				}
				this.dialogVisible = false
				this.cjnew()
			},
			// quanxuan(selection) {

			// 	let arr = []
			// 	// console.log(selection)
			// 	// console.log(selection)
			// 	for (let i in selection) {
			// 		arr.push(selection[i].id)
			// 	}
			// 	this.pingjiaid = arr
			// },
			cjnew() {
				if(this.states=="不显示"){
					this.states=1
				}else if(this.states=="显示"){
					this.states=0
				}
				let params = {
					id: this.shopid,
					name: this.namel,
					seq: this.seq,
					state: this.states,
					remarks: this.remarks
				}
				cjnew('/shop/editTShopType', params).then(res => {
					console.log(res)
					this.shopid = ''
					this.namel = ''
					this.remarks = ''
					this.seq = ''
					this.states=''
					this.cjfeilei()
				})
				
			},
			cjfeilei(e) {
				if (e == 0) {
					this.page = 0
				}
				let params = {
					pageIndex: this.page,
					pageSize: this.pages,
					name: this.name,
					state: this.state
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				cjfeilei('shop/getTShopTypePageList', params).then(res => {
					console.log(res)
					this.tableData = res.resultData.content;
					this.zong = res.resultData;
					if (res.isSuccess) {
						setTimeout(() => {
							loading.close();
						}, 1000);
					}
					if (res.resultData.content) {
						for (let i = 0; i < this.tableData.length; i++) {
							this.tableData[i].seq = this.tableData[i].seq * 1
						}
					} else {
						setTimeout(() => {
							loading.close();
						}, 1000);
					}



				})
			},
			deleteRow(e) {
				console.log(e)
				this.dialogVisible = true
				this.newss = 1
				this.xiugaishuju = e
				
				this.shopid = e.id
				this.namel = e.name
				this.remarks = e.remarks
				this.seq = e.seq
				if(e.state==1){
					this.states='不显示'
				}else{
					this.states='显示'
				}
				// this.states=this.xiugaishuju.state
			},
			xiugaidome() {
				this.dialogVisible = true
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.cjfeilei()
				console.log(`当前页: ${val}`);
			},
			open() {
				this.$confirm('确认要删除该厂家分类记录吗?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.cjdel()

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
		mounted() {
			this.cjfeilei()
		}

	}
</script>
<style scoped="scoped" lang='less'>
	.setbox {
		display: flex;
		cursor: pointer;

		div {
			margin-right: 20px;
			color: #0b9cf4;
			font-size: 16px;
		}
	}

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
		height: 74px;
		align-items: center;
		justify-content: space-between;
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
	}

	.box2 {
		width: 174px;
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
		width: 1060px;
		height: 120px;
		margin-top: 40px;
		align-items: center;
		border: 1px solid #f2f2f2;
		padding-right: 21px;
		box-sizing: border-box;
	}

	.box8 {
		width: 180px;
		height: 100%;
		padding-left: 5%;
		background: #e4e4e4;
		text-align: center;
		margin-right: 10px;

		span {
			line-height: 120px;
		}
	}

	.atr1 {
		width: 180px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
			&::before {
				content: '*';
				color: red;
			}
		}
	}
.atr8 {
		width: 180px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
			
		}
	}
	.atr2 {
		width: 350px;

	}

	.biaoge {
		border-collapse: collapse;
		border-color: #dae3ec;
		border: 1px solid #ccc;
		margin-top: 10px;
		font-size: 18px;
		width: 1060px;

		tr {
			
			height: 60px;
		}
		
		
	}

	.atr3 {
		height: 120px;
	}

	.inputre {
		margin-left: 20px;
		box-sizing: border-box;
		padding-right: 10px;
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
