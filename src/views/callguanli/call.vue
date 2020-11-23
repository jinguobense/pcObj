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
							<span class="fenl1">通告管理（区域管理员）</span>
							<div class="yoou">
								<div @click="looknewState(1,0)">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="title" placeholder="标题" size="medium" @change='getcallList(0)'></el-input>
								<el-select v-model="type" size="medium" placeholder="类型" @change='getcallList(0)'>
									<el-option key="1" value="1" label="会议通告"></el-option>
									<el-option key="2" value="2" label="奖惩通告"></el-option>
									<el-option key="3" value="3" label="活动公告"></el-option>
								</el-select>
								<!-- <el-select v-model="state" size="medium" placeholder="状态" @change='getcallList(0)'>
									<el-option key="1" value="1" label="发布"></el-option>
									<el-option key="0" value="0" label="草稿"></el-option>
								</el-select> -->
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @change='getcallList(0)'>
								<div class="shuax" @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="callList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column label="标题">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="looknewState(scope.row,1)">{{scope.row.title}}</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="类型" width="120">
									<template slot-scope="scope">
										<div class="setbox">
											<span v-if="scope.row.type == 1">会议通告</span>
											<span v-if="scope.row.type == 2">奖惩通告</span>
											<span v-if="scope.row.type == 3">活动公告</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="content" label="内容">
								</el-table-column>
								<el-table-column label="状态" width="100">
									<template slot-scope="scope">
										<div class="setbox">
											<span v-if="scope.row.status == 1">发布</span>
											<span v-if="scope.row.status == 0" style="color: red;">草稿</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="查阅状态" width="120">
									<template slot-scope="scope">
										<div class="setbox">
											<span>{{scope.row.readNum}}/{{scope.row.readNotNum}}</span>

										</div>
									</template>
								</el-table-column>
								<el-table-column prop="strCreateDate" sortable label="发布时间" width="230">
								</el-table-column>
								<el-table-column label="操作" width="200">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="looknewState(scope.row,2)">修改</div>
											<!-- <div size="mini" style="color: #ff0000;" @click="handleDelete(scope.$index, scope.row)">删除</div> -->

										</div>
									</template>
								</el-table-column>

							</el-table>

						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								总共{{totalpage}}条数据
							</div>
							<div style="display: flex; align-items: center;">
								<span>每页显示</span>
								<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" @current-change='currentclick'
								 :current-page.sync="nowpage" :total="totalpage">
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
			<div class="mask" @click="close"></div>
			<div class="addwrap">
				<div class="title" v-if="looknew == 0">新建通告</div>
				<div class="title" v-if="looknew == 1">查看通告</div>
				<div class="title" v-if="looknew == 2">修改通告</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>

							<td class="text">类型:</td>
							<td>
								<el-select v-model="ntype" placeholder="类型" size="medium" style="width: 200px;" v-if="looknew != 1">
									<el-option key="1" value="1" label="会议通告"></el-option>
									<el-option key="2" value="2" label="奖惩通告"></el-option>
									<el-option key="3" value="3" label="活动公告"></el-option>
								</el-select>
								<!-- <el-input value="草稿" v-if="looknew == 1"></el-input> -->
								<span v-if="looknew == 1 && itemInfo.type == 1">会议通告</span>
								<span v-if="looknew == 1 && itemInfo.type == 2">奖惩通告</span>
								<span v-if="looknew == 1 && itemInfo.type == 3">奖惩通告</span>
							</td>
							<td class="text">状态:</td>
							<td style="width: 400px;">
								<!-- <el-select v-model="nstate" size="medium" placeholder="状态"  v-if="looknew != 1">
									<el-option key="1" value="1" label="发布"></el-option>
									<el-option key="0" value="0" label="草稿"></el-option>
								</el-select> -->
								<el-input value='发布' v-if="looknew != 1" size="medium" disabled></el-input>
								<!-- <span v-if="looknew != 1 ">发布</span> -->
								<!-- <el-input value="奖惩通告" v-if="looknew == 1"></el-input> -->
								<el-input value='发布' v-if="looknew == 1 && itemInfo.status == 1" size="medium" disabled></el-input>
								
								<el-input value='草稿' v-if="looknew == 1 && itemInfo.status == 0" size="medium" disabled></el-input>
								
							</td>
						</tr>

						<tr>
							<td class="text">标题:</td>
							<td colspan="3">
								<el-input v-model="ntitle" v-if="looknew != 1" size="medium" placeholder="请输入内容"></el-input>
								<span v-if="looknew == 1">{{itemInfo.title}}</span>
							</td>

						</tr>
						<tr>
							<td class="text">内容:</td>
							<td colspan="3">
								<div class="value">
									<el-input v-model="ncontent" v-if="looknew != 1" show-word-limit type="textarea" placeholder="请输入内容" :autosize="{ minRows: 5, maxRows: 8}">
									</el-input>

									<el-input v-if="looknew == 1" disabled :value='itemInfo.content' show-word-limit type="textarea" :autosize="{ minRows: 5, maxRows:8}">
									</el-input>

								</div>

							</td>
						</tr>
						<tr>
							<td class="text">接收人:</td>
							<td colspan="3">

								<el-button slot="append" v-if="looknew != 1 && uidList.length==0" type="primary" @click="dianji" style="color: #fff; font-size: 18px;border: none;"
								 icon="el-icon-user-solid">点击选择接收人</el-button>
								 <el-button slot="append" v-if="looknew != 1 && uidList.length>0" type="infor" @click="dianji"
								  icon="el-icon-user-solid">接受人已选择</el-button>


								<el-input v-if="looknew == 1" value='查看功能待定' show-word-limit type="textarea" disabled :autosize="{ minRows: 2, maxRows: 6}">
								</el-input>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" v-if="looknew != 1" @click='addCall'>确定</el-button>
					<el-button type="info" @click="close">关闭</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask" @click="close"></div>
			<div class="addwrap">
				<div class="title">选择接收人</div>

				<div class="searchbox">
					<div class="search" style="width: 800px;">

						<el-select v-model="roleId" size="medium" placeholder="角色" style="width: 20%;" @change="getpeopleList(0)">
							<!-- <el-option key="1" value="1" label="财务"></el-option>
							<el-option key="0" value="0" label="市场"></el-option> -->
							<el-option :key="roleId" :value="roleId" label="区域管理员"></el-option>
						</el-select>

						<el-input v-model="name" placeholder="姓名" size="medium" style="width: 20%;" @change="getpeopleList(0)"></el-input>
						<el-input v-model="mobile" placeholder="手机号" size="medium" style="width: 20%;" @change="getpeopleList(0)"></el-input>
						<el-input v-model="provname" placeholder="省份" size="medium" style="width: 20%;" @change="getpeopleList(0)"></el-input>
						<el-input v-model="cityname" placeholder="市" size="medium" style="width: 20%;" @change="getpeopleList(0)"></el-input>
					</div>
					<div class="btngrap" style="width: 20%;">
						<img src="../../assets/img/sousu.png" alt="">
						<div class="shuax">
							<img src="../../assets/img/shuaxinb.png" alt="">
							<span>重置</span>
						</div>
					</div>
				</div>
				<div class="tablebox">
					<el-table ref="multipleTable" :data="peopleList" tooltip-effect="dark" style="width: 100%" border @select="danxuan"
					 @select-all="quanxuan" @selection-change="handleSelectionChange" :row-key="getRowKey">
						<el-table-column type="selection" :reserve-selection="true">
						</el-table-column>
						<el-table-column prop="roleName" label="角色" width="100">

						</el-table-column>
						<el-table-column prop="loginName" label="登录名">
						</el-table-column>
						<el-table-column prop="name" label="姓名" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="mobile" label="手机号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column label="区域名称" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="setbox">
									<span>{{scope.row.provname}}</span>
									<span style="margin: 0px 10px;">{{scope.row.cityname}}</span>
									<span>{{scope.row.townname}}</span>
								</div>
							</template>
						</el-table-column>
					</el-table>
					<!-- <div style="margin-top: 20px">
						<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
						<el-button @click="toggleSelection()">取消选择</el-button>
					</div> -->
				</div>
				<div class="block" style="display: flex; justify-content: space-between; align-items: center; ">
					<div class="demonstration">
						显示第 {{jnowpage}} 页
					</div>
					<div style="display: flex; align-items: center;">
						<span>每页显示</span>
						<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :current-page.sync="jnowpage" :total="jtotalpage"
						 @current-change='jcurrentclick'>
						</el-pagination>
					</div>
				</div>
				<div class="bottom">
					<!-- <div class="check">
						<el-checkbox v-model="checked">全部</el-checkbox>
						<el-checkbox v-model="checked">财务</el-checkbox>
						<el-checkbox v-model="checked">市场</el-checkbox>
						<el-checkbox v-model="checked">区域管理员</el-checkbox>
					</div> -->
					<!-- <div class="btn"> -->
					<el-button type="primary" v-if="looknew == 0" @click="infobox = false">确定</el-button>
					<el-button type="info" @click="close">取消</el-button>
					<!-- </div> -->
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
		getCallglList,
		getcallPeopleList,
		CreatcallList
	} from '../../request/API/request.js'
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
				looknew: 0, //0新建 1查看
				textarea1: '',
				tableData1: [],

				page: 0,
				pageSize: 10,
				nowpage: '',
				totalpage: '',
				//检索
				title: '',
				type: '', //类型(1:会议通告/2:奖惩通告/3:活动公告)
				state: 1, //状态(0:表示草稿/1:表示发布)
				itemInfo: '',
				//新建通告
				ntype: "",
				nstate: 1,
				ntitle: '',
				ncontent: '',
				uidList: [], //选择的接收人
				callList: [],

				//接收人
				jpage: '',
				jnowpage: '',
				jtotalpage: '',
				//检索
				roleId: "326b345c922d4bd685cf7e60d73d5ee1", //管理员检索
				name: "",
				mobile: '', //手机号
				provname: "", //省
				cityname: '', //市

				peopleList: [],
				multipleSelection:[]

			}

		},
		methods: {
			//取消关闭弹窗
			close(){
				this.infobox = false;
				this.uidList=[];
				this.addbox = false;
				// this.ntype = '';
				this.nstate = '';
				this.ntitle = '';
				this.ncontent = '';
				
			},
			addCall() {
				let _this = this;
				if (_this.ntype == '' || _this.nstate == '' || _this.ntitle == '' || _this.ncontent == '') {
					this.$message({
						message: '请完善新建信息！',
						type: 'warning',
						duration:1500
					});
					return;
				}
				if (_this.uidList.length == 0) {
					this.$message({
						message: '请选择接收人！',
						type: 'warning',
						duration:1500
					});
					return;
				}
				let uidListstr = _this.uidList.join(',')
				let params = {
					type: _this.ntype,
					status: _this.nstate,
					title: _this.ntitle,
					content: _this.ncontent,
					ids: uidListstr,
				}
				CreatcallList('order/editOaNotify',params).then(res => {
					console.log(res);
					if(res.isSuccess){
						this.$message({
							message: res.message,
							type: 'success',
							duration:1000
						});
						_this.addbox = false;
						_this.page = 0
						_this.close()
						_this.getcallList()
					}else{
						this.$message({
							message: res.message,
							type: 'error',
							duration:1500
						});
					}
				})
			},
			//单选
			danxuan(row) {
				let _this = this;
				console.log('单选');
				console.log(row);
				// let selectList = row;
				_this.uidList = []
				let uidarr = [];
				for (let i in row) {
					uidarr.push(row[i].id)
					_this.uidList = uidarr
				}
				console.log(_this.uidList);
			},
			//多选
			quanxuan(row) {
				let _this = this;
				console.log('全选');
				console.log(row);
				// let selectList = row;
				_this.uidList = []
				let uidarr = [];
				for (let i in row) {
					uidarr.push(row[i].id)
					_this.uidList = uidarr
				}

				console.log(_this.uidList);
			},
			getRowKey(row){
				return row.id
			},
			//获取接受人
			getpeopleList(e) {
				let _this = this;
				if (e == 0) {
					_this.jpage = 0
				}
				let params = {
					pageIndex: _this.jpage,
					pageSize: _this.pageSize,
					roleId: _this.roleId,
					name: _this.name,
					mobile: _this.mobile, //手机号
					provname: _this.provname, //省
					cityname: _this.cityname, //市
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getcallPeopleList('platform/selectSysUserNewPageList', params).then(res => {
					console.log(res);
					_this.multipleSelection =[]
					_this.peopleList = res.resultData.content;
					_this.jtotalpage = res.resultData.total;
					_this.jnowpage = res.resultData.pageIndex
					// console.log(_this.totalpage);
					_this.peopleList.forEach((item, i) => {
						this.multipleSelection.forEach((multItem, j) => {
							if (this.tableData[i].id == this.multipleSelection[j].id) {
								this.$refs.multipleTable.toggleRowSelection(this.memberList[i], true); //这步操作是让页面显示选中的数据
							}
						})
					})
					setTimeout(() => {
						loading.close();
					}, 500);
				})

			},
			//重置
			resect() {
				this.title = '';
				this.type = ''; //类型(1:会议通告/2:奖惩通告/3:活动公告)
				this.state = '';
				this.page = 0;
				this.reload()
				this.getcallList()
			},
			
			currentclick(e) {
				this.page = e - 1;
				this.getcallList()
			},
			jcurrentclick(e) {
				this.jpage = e - 1;
				this.getpeopleList()
			},
			//获取信息列表
			getcallList(e) {
				let _this = this;
				if (e == 0) {
					_this.page = 0
				}
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize,
					title: _this.title,
					type: _this.type,
					state: _this.state
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getCallglList('order/selectOaNotifyPageList', params).then(res => {
					console.log(res)
					_this.callList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex
					// console.log(_this.totalpage);
					setTimeout(() => {
						loading.close();
					}, 500);
				})
			},
			dianji() {
				console.log("111点击")
				this.infobox = true;
				this.getpeopleList();
			},
			looknewState(row, e) { //0 新建 1查看 2修改
				this.itemInfo = row;
				this.looknew = e;
				this.addbox = true;
				if(e == 2){
					this.uidList=[];
					this.ntype = row.type;
					this.nstate = row.status;
					this.ntitle = row.title;
					this.ncontent = row.content;
				}
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			}


		},
		mounted() {
			this.getcallList()
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
			// width: 1080px;
			height: 830px;
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
