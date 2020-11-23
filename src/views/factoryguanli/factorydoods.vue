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
								<span class="fenl1">厂家商品分类列表</span>
								<div class="yoou">

									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">
									
								</div>
							</div>

							<div class="searchbox">
								<div class="search">
									<el-input placeholder="厂家名称" size="medium" v-model="state" @change="shopfl(0)"></el-input>
									<el-input placeholder="分类名称" size="medium" v-model="name" @change="shopfl(0)"></el-input>

								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="shopfl(0)">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span>重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">
								<el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" @selection-change="handleSelectionChange"
								 @select="deld" @select-all="quanxuan">
									<el-table-column type="selection" width="55">
									</el-table-column>
									<el-table-column label="厂家名称" prop="shopname">

									</el-table-column>
									<el-table-column prop="name" label="分类名称">
									</el-table-column>
									<el-table-column prop="seq" sortable label="序号">
									</el-table-column>
									<el-table-column prop="strAdtime" sortable label="创建时间">
									</el-table-column>
									<el-table-column prop="strUptime" sortable label="更新时间">
									</el-table-column>
									<el-table-column prop="remarks" label="备注消息">
									</el-table-column>
								</el-table>
								
							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									显示第 {{changjiafenl.pageIndex}} 页
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10]" :current-page.sync="changjiafenl.pageIndex" layout="sizes, prev, pager, next,jumper" :total="changjiafenl.total"
									 @current-change="handleCurrentChange">
									</el-pagination>
								</div>
							</div>


						</div>



						<el-dialog title="修改厂家分类信息" :visible.sync="dialogVisible" width="1200px" height="860px" :before-close="handleClose">

							<div class="boxx">
								<div class="box1">
									<div class="box5">
										<span>分类名称:</span>
									</div>
									<el-input v-model="input" placeholder="请输入内容"></el-input>
								</div>
								<div class="box1">
									<div class="box5">
										<span>序号:</span>
									</div>
									<el-input v-model="input" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
								</div>
								<div class="box1">
									<div class="box5">
										<span>状态:</span>
									</div>
									<el-select v-model="value" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
							</div>
							<div class="box4">
								<div class="box8">
									<span>备注信息</span>
								</div>
								<el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea">
								</el-input>
							</div>

							<span slot="footer" class="dialog-footer">
								<el-button @click="dialogVisible = false">取 消</el-button>
								<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
							</span>
						</el-dialog>
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
		shopfl,
		cjshopdel
	} from '../../request/API/request.js'
	export default {
		inject:['reload'],
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
				addbox: false,
				dialogVisible: false,
				page: 0,
				pageS: '',
				name: '',
				state: '',
				goodsidlist: [],
				
				value: '',
				tableData: [],
				changjiafenl: [],
				
				multipleSelection: []

			}	
		},
		methods: {
			
			sousou(){
				this.shopfl()
				
			},
			chongzhi(){
				this.name=''
				this.state=''
				this.page = 0
				this.shopfl();
				this.reload()
			},
			shopfl(e) {
				if(e == 0){
					this.page = 0;
					// this.reload()
				}
				let params = {
					pageIndex: this.page,
					pageSize: this.pageS,
					name: this.name,
					shopname: this.state
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				shopfl('shop/getTGoodsTypePageList', params).then(res => {
					console.log(res, "4687456")
					this.tableData = res.resultData.content;
					if(res.isSuccess){
						setTimeout(() => {
							loading.close();
						}, 1000);
					}
					if(res.resultData.content){
						for(let i = 0;i<this.tableData.length;i++ ){
							this.tableData[i].seq = this.tableData[i].seq*1
						}
					}else{
						setTimeout(() => {
							loading.close();
						}, 1000);
					}
					
					this.changjiafenl = res.resultData;
					
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
			deleteRow() {

			},
			cjshopdel() {
				let params = {
					ids: this.goodsidlist.join(",")
				}
				console.log(params)
				cjshopdel('shop/editTGoodsType', params).then(res => {
					console.log(res)
					if (res.isSuccess == true) {
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.shopfl()
					} else {
						this.$message({
							type: 'success',
							message: '删除失败!',
						});
					}


				})

			},

			xiugaidome() {
				this.dialogVisible = true
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.page = val - 1
				this.shopfl()
			},
			open() {
				this.$confirm('确认要删除该厂家分类记录吗?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.cjshopdel()

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
		mounted() {
			this.shopfl()
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
</style>
