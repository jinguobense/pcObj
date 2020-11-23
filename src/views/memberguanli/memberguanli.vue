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
							<span class="fenl1">会员管理</span>
							<div class="yoou">
								<!-- <div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div> -->
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click='resect'>
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="userNo" placeholder="用户编码" size="medium" @change='getmemberListpage(0)'></el-input>
								<el-input v-model="nickName" placeholder="用户昵称" size="medium" @change='getmemberListpage(0)'></el-input>
								<el-input v-model="phoneNum" placeholder="手机号" size="medium" @change='getmemberListpage(0)'></el-input>
								<el-select v-model="gender" size="medium" placeholder="性别" @change='getmemberListpage(0)'>
									<el-option key="1" value="1" label="男"></el-option>
									<el-option key="0" value="0" label="女"></el-option>
								</el-select>
								<el-select v-model="state" size="medium" placeholder="状态" @change='getmemberListpage(0)'>
									<el-option key="1" value="1" label="已启用"></el-option>
									<el-option key="0" value="0" label="已冻结"></el-option>
								</el-select>
								<el-date-picker v-model="createTime" value-format="timestamp" style="margin-right: 20px;" type="datetimerange"
								 size="medium" range-separator="至" start-placeholder="创建时间" end-placeholder="创建时间" @change='getmemberListpage(0)'>
								</el-date-picker>
								<el-date-picker v-model="updateTime" value-format="timestamp" type="datetimerange" size="medium"
								 range-separator="至" start-placeholder="更新时间" end-placeholder="更新时间" @change='getmemberListpage(0)'>
								</el-date-picker>
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @click='getmemberListpage(0)'>
								<div class="shuax" @click='resect'>
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox620" >
							<el-table :data="memberList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="userNo" label="用户编号" @row-click="lookinfo">
								</el-table-column>
								<el-table-column prop="nickName" label="用户昵称">
								</el-table-column>
								<el-table-column prop="phoneNum" label="手机号">
								</el-table-column>
								<el-table-column label="用户头像">
									<template slot-scope="scope">
										<div class="img" style="height: 40px; width: 40px; overflow: hidden;">
											<img :src="scope.row.userIcon" style="height: 100%; width: 100%;">
										</div>
									</template>
								</el-table-column>
								<el-table-column label="性别">
									<template slot-scope="scope">
										<span v-if="scope.row.gender == 0">女</span>
										<span v-if="scope.row.gender == 1">男</span>
									</template>
								</el-table-column>
								<el-table-column label="状态">
									<template slot-scope="scope">
										<div class="setbox">
											<div v-if="scope.row.state == 1" @click="dongjie(scope.row)">已启用</div>
											<div v-if="scope.row.state == 0" @click="qiyong(scope.row)" style="color: red;">已冻结</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="strAdtime" sortable label="创建时间">
								</el-table-column>
								<el-table-column prop="strUptime" sortable label="更新时间">
								</el-table-column>
								<el-table-column prop="name" label="操作人">
								</el-table-column>
							</el-table>
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								总共{{totalpage}}条数据
							</div>
							<div style="display: flex; align-items: center;">

								<el-pagination layout="prev, pager, next,jumper" :current-page.sync="nowpage" :total="totalpage" @current-change='currentclick'>
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
								<el-input show-word-limit type="textarea" placeholder="请输入内容" v-model="textarea1" :autosize="{ minRows: 5, maxRows: 6}">
								</el-input>
							</div>
						</td>
					</tr>
				</table>
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
	import Daohang from '../../components/Daohang.vue';
	import {
		getMemberList,
		changeTime,
		postmerDong
	} from "../../request/API/request.js"
	export default {
		inject: ['reload'],
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
				memberList: [],
				totalpage: '',
				nowpage: '',
				//检索字段
				userNo: '',
				phoneNum: '',
				nickName: '',
				gender: '', //性别 (0:女/1:男)
				state: '', //状态(0:禁用/1:可用)
				createTime: '', //创建时间
				updateTime: '', //更新时间


			}

		},
		methods: {
			//启用
			qiyong(row){
				console.log(row)
				let id = row.id;
				this.$confirm('确定要启用该会员吗？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: id,
						state: 1
					}
					postmerDong('platform/updateTMember', params).then(res => {
						console.log(res);
						if(res.isSuccess){
							this.$message({
								type: 'success',
								message: '启用成功!',
								duration:1000
							});
							this.getmemberListpage()
						}else{
							this.$message({
								type: 'error',
								message: res.message,
								duration:1000
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
			dongjie(row) {
				console.log(row)
				let id = row.id;
				this.$confirm('确定要冻结该会员吗？, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id: id,
						state: 0
					}
					postmerDong('platform/updateTMember', params).then(res => {
						console.log(res);
						if(res.isSuccess){
							this.$message({
								type: 'success',
								message: '冻结成功!',
								duration:1000
							});
							this.getmemberListpage()
						}else{
							this.$message({
								type: 'error',
								message: res.message,
								duration:1000
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
			//重置
			resect() {
				this.userNo = '';
				this.phoneNum = '';
				this.nickName = '';
				this.gender = ''; //性别 (0:女/1:男)
				this.state = ''; //状态(0:禁用/1:可用)
				this.createTime = ''; //创建时间
				this.updateTime = ''; //更新时间
				this.page = 0;
				this.reload()
				this.getmemberListpage();
			},
			currentclick(e) {
				let _this = this;
				_this.page = e - 1;
				this.getmemberListpage()
			},
			//获取会员列表
			getmemberListpage(e) {
				let _this = this;
				if(e == 0){
					_this.page = 0
				}
				let timeArr = _this.createTime;
				let uptimeArr = _this.updateTime
				let Timearr
				let upTimearr
				if (timeArr == '') {
					let sTime = ''
					let endTime = ''
					Timearr = '';

				} else {
					let sTime = changeTime(timeArr[0]);
					let endTime = changeTime(timeArr[1]);
					Timearr = sTime + ',' + endTime;

				}
				if (uptimeArr == '') {
					let upsTime = ''
					let upendTime = ''
					upTimearr = '';

				} else {
					let upsTime = changeTime(uptimeArr[0]);
					let upendTime = changeTime(uptimeArr[1]);
					upTimearr = upsTime + ',' + upendTime;

				}
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize,
					userNo: _this.userNo,
					phoneNum: _this.phoneNum,
					nickName: _this.nickName,
					gender: _this.gender, //性别 (0:女/1:男)
					state: _this.state, //状态(0:禁用/1:可用)
					createTime: Timearr, //创建时间
					updateTime: upTimearr, //更新时间

				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getMemberList('platform/selectTMemberPageList', params).then(res => {
					console.log(res, "会员列表");
					_this.memberList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
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
			this.getmemberListpage();
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

	// .el-main {
	// 	height: 818px;
	// 	padding: 0px;
	// 	background: #f6fcff;
	// }

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

		td {
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
		height: 100px;
		width: 100%;
		display: flex;
		// align-items: center;
		justify-content: space-between;
		background: #fff;

		.search {
			height: 100px;
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding-left: 10px;

			.el-input {
				width: 240px;
				height: 40px;
				margin-right: 10px;
				margin-left: 0;

			}

			.el-select {
				width: 240px;
				height: 40px;
				margin-right: 10px;
				// margin-left: 0;

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
			width: 1000px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			height: 680px;

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
				left: 0;

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}
</style>
