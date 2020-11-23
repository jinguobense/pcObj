<template>
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
							<span class="fenl1">商务合作信息</span>
							<div class="yoou">
								<!-- <div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div> -->
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="name" placeholder="姓名" size="medium"></el-input>
								<el-input v-model="tel" placeholder="手机号" size="medium"></el-input>
								<!-- <el-select v-model="type" size="medium" placeholder="处理方式">
									<el-option key="1" value="1" label="待处理"></el-option>
									<el-option key="0" value="0" label="已处理"></el-option>
								</el-select> -->
								
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" @click="getbusinesListpage" alt="">
								<div class="shuax"  @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="businesList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<!-- <el-table-column prop="date" label="合作区域(管理员)">
								</el-table-column> -->
								<el-table-column prop="name" label="姓名" >
								</el-table-column>
								<el-table-column prop="telinfo" label="手机号">
								</el-table-column>
								<!-- <el-table-column prop="address" label="联系地址" width="250">
								</el-table-column> -->
								<el-table-column prop="content" label="详细内容"  width="350">
								</el-table-column>
								<el-table-column prop="strUptime" label="处理时间">
								</el-table-column>
								<el-table-column prop="remarks" label="备注信息">
								</el-table-column>
								<el-table-column  label="操作">
									<template slot-scope="scope">
										<div class="setbox">
											<!-- <div>待处理</div> -->
											<!-- <div>已完成</div> -->
											<!-- <div @click="handleEdit(scope.$index, scope.row)">修改</div> -->
											<div size="mini" style="color: #ff0000;" type="danger" @click="delbusines(scope.row)">删除</div>
											
										</div>
									</template>
								</el-table-column>
								
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								总共{{totalpage}}条记录
							</div>
							<div style="display: flex; align-items: center;">
								<el-pagination   layout="prev, pager, next,jumper" :total="totalpage" @current-change='currentclick'>
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
				<div class="title">新建系统消息</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							
							<td class="text">用户类型:</td>
							<td>
								<el-select size="mini" placeholder="消息标题" style="width: 200px;">
									<el-option key="1" value="1" label="是"></el-option>
									<el-option key="0" value="0" label="否"></el-option>
								</el-select>
							</td>
						</tr>
						
						<tr>
							<td class="text">用户:</td>
							<td>
								<el-input placeholder="请输入内容"></el-input>
							</td>
							
						</tr>
						<tr>
							<td class="text">备注信息:</td>
							<td colspan="3">
								<div class="value">
									这是一个非常牛的厂家这是一个非常牛的厂家这是一个非常牛的厂家这是一个非常牛的厂家这是一个非常牛的厂家
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">新建系统消息</div>
				<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
					<tr>
						<td class="text">分类名称:</td>
						<td>
							<el-input placeholder="请输入内容"></el-input>
						</td>
						
					</tr>
					<tr>
						<td class="text nobefor">上级分类</td>
						<td>
							<el-input placeholder="请输入内容" disabled></el-input>
						</td>
					</tr>
					<tr>
						<td class="text">推送内容:</td>
						<td>
							<div style="height: 100px; width: 255px;">
								这是一个非常牛的厂家这是一个非常牛的厂家这是一个非常牛的厂家这是一个非常牛的厂家这是一个非常牛的厂家
							</div>
						</td>

					</tr>

				</table>
				<div class="bottom">
					<el-button type="primary">确定</el-button>
					<el-button type="info" @click="infobox = false">取消</el-button>
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
	import {getbusinesList,Delbusines} from '../../request/API/request.js'
	export default {
		inject:['reload'],
		components: {
			Header,
			Left,
			Footer,
			Daohang
		},
		data() {
			return {
				infobox: false,
				addbox: false,
				page:0,
				pageSize:10,
				totalpage:'',
				cooptype:'', //合作类型
				businesList: [],
				nowpage:'',
				name:'',
				tel:''
				
			}

		},
		methods: {
			resect(){
				this.page = ''
				this.pageSize = ''
				this.cooptype = ''
				this.page = 0;
				this.reload()
				this.getbusinesListpage();
				
			},
			currentclick(e){
				let _this = this;
				_this.page = e-1
				_this.getbusinesListpage()
			},
			//删除
			delbusines(row){
				console.log(row);
				let _this = this;
				let id = row.id;
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params ={
						id:id,
						delFlag:1
					}
					Delbusines('platform/updateTBusicoop',params).then(res => {
						if (res.isSuccess) {
							_this.$message({
								message: "删除成功!",
								type: 'success',
								duration: 500
							});
							
							_this.getbusinesListpage()
											
						} else {
							_this.$message({
								message: res.resultData,
								type: 'error',
								duration: 500
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
				
				
			},
			getbusinesListpage(){
				let _this = this;
				let params = {
					pageIndex:_this.page,
					pageSize:_this.pageSize,
					cooptype:_this.cooptype,
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getbusinesList('platform/getTBusicoopPageList',params).then(res => {
					console.log(res);
					_this.businesList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
					setTimeout(() => {
						loading.close();
					}, 1000);
				})
			},
			
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}


		},
		mounted() {
			this.getbusinesListpage()
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

	.el-main {
		height: 818px;
		padding: 0px;
		background: #f6fcff;
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

	.el-table {
		// margin-top: 10px;
		z-index: 10;

		th>.cell {
			color: #333 !important;
			font-size: 16px;
		}
		td{
			height: 48px !important;
		}
	}

	.el-table th.cell {
		color: #333 !important;
		font-size: 16px;
	}

	.setbox {
		display: flex;
		cursor: pointer;

		div {
			margin-right: 20px;
			color: #0b9cf4;
		}
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
		.btngrap{
			height: 60px;
			width: 200px;
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #0b9cf4;
			cursor: pointer;
			.shuax{
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
				img{
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
			width: 1000px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.title {
				width: 1000px;
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
				margin: 20px auto;
				font-size: 18px;

				tr {
					width: 100%;
					border-color: #dae3ec;
					height: 64px;

					td {
						box-sizing: border-box;
						padding: 10px;
					}

					.text {
						width: 183px;
						height: 64px;
						background-color: #fafafa;
						font-size: 18px;
						color: #666666;
						text-align: right;
						box-sizing: border-box;
						padding-right: 20px;

						&::before {
							content: '*';
							color: red;
						}
					}

					.value {
						width: 748px;
						height: 178px;
						word-wrap: break-word
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

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}
</style>
