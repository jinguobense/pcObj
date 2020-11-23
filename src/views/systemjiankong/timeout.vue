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
							<span class="fenl1">定时任务</span>
							<div class="yoou">
								<div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click='resect'>
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="tablebox650">
							<el-table :data="timeoutList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column label="任务名">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItem(scope.row)">{{scope.row.name}}</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="任务组" width="200">
									<template slot-scope="scope">
										<div class="setbox">
											<span v-if="scope.row.tGroup == 0">订单处理</span>
											<span v-if="scope.row.tGroup == 1">测试任务</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="expression" label="定时规则">
								</el-table-column>
								<el-table-column label="启动状态" width="150">
									<template slot-scope="scope">
										<div class="setbox">
											<span v-if="scope.row.status == 0">已暂停</span>
											<span v-if="scope.row.status == 1">已启动</span>
										</div>
									</template>
								</el-table-column>
								<!-- <el-table-column prop="date" label="通知用户">
								</el-table-column> -->
								<el-table-column prop="classname" label="任务类" width="500">
								</el-table-column>
								<el-table-column prop="description" label="描述" width="400">
								</el-table-column>
								<el-table-column label="操作" width="300">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="upTimeout(scope.row)">启动</div>
											<div @click="downTimeout(scope.row)">暂停</div>
											<div @click="uponeTimeout(scope.row)">立即启动一次</div>

										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								数据总条数：{{totalpage}}
							</div>
							<div style="display: flex; align-items: center;">
								<span>每页显示</span>
								<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="totalpage" @current-change='currentclick'>
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
				<div class="title">新建定时任务</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">任务名:</td>
							<td>
								<el-input v-model="name" placeholder="请输入内容"></el-input>
							</td>
							<td class="text">任务组:</td>
							<td>
								<el-select v-model="tGroup" size="medium" placeholder="请选择">
									<el-option key="1" value="1" label="测试任务"></el-option>
									<el-option key="0" value="0" label="订单处理"></el-option>
								</el-select>
							</td>

						</tr>
						<tr>
							<td class="text">定时规则:</td>
							<td colspan="3" style="width: 990px;">
								<el-input v-model="expression" placeholder="请输入内容"></el-input>
							</td>

						</tr>
						<tr>
							<td class="text">启动状态:</td>
							<td>
								<el-select v-model="status" size="medium" placeholder="请选择">
									<el-option key="1" value="1" label="启用"></el-option>
									<el-option key="0" value="0" label="暂停"></el-option>
								</el-select>
							</td>
							<td class="text nobefor">通知用户:</td>
							<td>
								<el-select size="medium" placeholder="功能暂无" disabled="">
									<el-option key="1" value="1" label="超级管理员"></el-option>
									<el-option key="0" value="0" label="所用用户"></el-option>
								</el-select>
							</td>

						</tr>
						<tr>
							<td class="text">任务类:</td>
							<td colspan="3">
								<el-input v-model="classname" placeholder="请输入内容"></el-input>
							</td>

						</tr>
						<tr>
							<td class="text nobefor">任务描述:</td>
							<td colspan="3">

								<el-input show-word-limit type="textarea" placeholder="请输入内容" v-model="description" :autosize="{ minRows: 1, maxRows: 3}">
								</el-input>

							</td>

						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click='createTimeoutpage'>确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">查看定时任务详情</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text nobefor">任务名:</td>
							<td>
								{{itemInfo.name}}
								<!-- <el-input :value='itemInfo.name' placeholder="请输入内容"></el-input> -->
							</td>
							<td class="text nobefor">任务组:</td>
							<td>
								<!-- <el-input placeholder="请输入内容"></el-input> -->
								<span v-if="itemInfo.tGroup == 1">测试任务</span>
								<span v-if="itemInfo.tGroup == 0">订单任务</span>
							</td>

						</tr>
						<tr>
							<td class="text nobefor">定时规则:</td>
							<td colspan="3">
								<!-- <el-input placeholder="请输入内容" disabled></el-input> -->
								{{itemInfo.expression}}
							</td>

						</tr>
						<tr>
							<td class="text">启动状态:</td>
							<td>
								<!-- <el-input placeholder="启动"></el-input> -->
								<span v-if="itemInfo.status == 0">暂停</span>
								<span v-if="itemInfo.status == 1">启动</span>
							</td>
							<td class="text">通知用户:</td>
							<td>
								暂无（死数据）
								<!-- <el-input placeholder="超级管理员"></el-input> -->
							</td>

						</tr>
						<tr>
							<td class="text nobefor">任务类:</td>
							<td colspan="3">
								{{itemInfo.classname}}
								<!-- <el-input placeholder="请输入内容" disabled></el-input> -->
							</td>

						</tr>
						<tr>
							<td class="text nobefor">任务描述:</td>
							<td colspan="3" style="width: 990px;">
								{{itemInfo.description}}
								<!-- <el-input placeholder="订单完成" disabled></el-input> -->
							</td>

						</tr>

					</table>
				</div>
				<div class="bottom">
					<!-- <el-button type="primary">确定</el-button> -->
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
	import {
		getTimeout,
		CreatTimeout,
		DelTimeout,
		postTimeout,
		postdownTimeout,
		postTimeoutone
	} from '../../request/API/request.js'
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
				textarea1: '',
				tableData1: [],

				page: 0,
				pageSize: 10,
				totalpage: '',
				//新建
				name: '',
				tGroup: '',
				expression: '', //定时规则
				status: '', //状态
				classname: '', //任务类
				description: '', //描述
				// 修改
				id: '',
				timeoutList: [],
				itemInfo:''
			}

		},
		methods: {
			resect(){
				this.page = 0;
				this.reload()
				this.getTimeoutList()
			},
			currentclick(e){
				console.log(e)
				this.page = e-1;
				this.getTimeoutList()
			},
			//查看
			getItem(row){
				this.itemInfo = row;
				this.infobox = true
			},
			//暂停
			downTimeout(row){
				let id = row.id;
				this.$confirm('此操作将暂停该定时任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: id
					};
					postdownTimeout('order/stopSysSchedule', params).then(res => {
						console.log(res);
						if(res.isSuccess){
							this.$message({
								type: 'success',
								message: '该任务已暂停',
								duration:500
							});
							this.getTimeoutList()
						}else{
							this.$message({
								type: 'error',
								message: res.message,
								duration:1500
							});
						}
						
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
			},
			//启动一次
			uponeTimeout(row){
				let id = row.id;
				this.$confirm('此操作将启动该定时任务一次, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: id
					};
					postTimeoutone('order/startNowSysSchedule',params).then(res => {
						console.log(res);
						if(res.isSuccess){
							this.$message({
								type: 'success',
								message: '启动一次成功!',
								duration:500
							});
							this.getTimeoutList()
						}else{
							this.$message({
								type: 'error',
								message: res.message,
								duration:1500
							});
						}
						
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
				
			},
			//启动
			upTimeout(row) {
				console.log(row);
				let id = row.id;
				this.$confirm('此操作将启动该定时任务, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: id
					};
					postTimeout('order/resumeSysSchedule', params).then(res => {
						console.log(res);
						if(res.isSuccess){
							this.$message({
								type: 'success',
								message: '启动成功!',
								duration:500
							});
							this.getTimeoutList()
						}else{
							this.$message({
								type: 'error',
								message: res.message,
								duration:1500
							});
						}
						
					})
					
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消操作'
					});
				});
				

			},
			//新建定时
			createTimeoutpage() {
				let _this = this;
				let params = {
					id: '',
					name: _this.name,
					tGroup: _this.tGroup,
					expression: _this.expression, //定时规则
					status: _this.status, //状态
					classname: _this.classname, //任务类
					description: _this.description, //描述
				};

				CreatTimeout('order/editSysSchedule', params).then(res => {
					console.log(res);
					
					if(res.isSuccess){
						this.$message({
							type: 'success',
							message: res.message,
							duration:500
						});
						this.addbox = false;
						this.getTimeoutList()
					}else{
						this.$message({
							type: 'error',
							message: res.message,
							duration:1500
						});
					}
				})
			},
			//删除
			delTimeout(e) {
				let _this = this;
				let params = {

				}
			},
			getTimeoutList() {
				let _this = this;
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getTimeout('order/selectSysSchedulePageList', params).then(res => {
					console.log(res);
					_this.timeoutList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					setTimeout(() => {
						loading.close();
					}, 500);
				})
			},
			lookinfo() {
				console.log("111")
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}


		},
		mounted() {
			this.getTimeoutList()
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


	.el-table {
		margin-top: 10px;
		z-index: 10;

		th>.cell {
			color: #333 !important;
			font-size: 16px;
		}
	}

	.tdimg {
		height: 40px;
		width: 40px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
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
			// width: 1080px;
			// height: 780px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.title {
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

						&::before {
							content: '*';
							color: red;
						}
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

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}
</style>
