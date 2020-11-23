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

								<span class="fenl1">厂家提现列表</span>
								<div class="yoou">

									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">

								</div>

							</div>
							<div class="searchbox">
								<div class="search">
									<el-input v-model="shopname" placeholder="厂家" @change="gettixianListpage"></el-input>
									<el-input v-model="realname" placeholder="提现用户" @change="gettixianListpage"></el-input>
									<el-input v-model="orderno" placeholder="提现用户" @change="gettixianListpage"></el-input>
									
									<el-select v-model="state" placeholder="提现状态" @change="gettixianListpage">
										<el-option key="0" value="0" label="未提现"></el-option>
										<el-option key="1" value="1" label="审核中"></el-option>
										<el-option key="2" value="2" label="已提现"></el-option>
										<el-option key="3" value="3" label="拒绝提现"></el-option>
									</el-select>
									<!-- <el-select v-model="state" size="medium" placeholder="状态" @change="getshenshuListpage(0)">
										<el-option key="0" value="0" label="待处理"></el-option>
										<el-option key="1" value="1" label="已处理"></el-option>
									</el-select> -->

									<el-input v-model="bankname" placeholder="资金账号" @change="gettixianListpage"></el-input>

								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>

							</div>


							<div class="tablebox">
								<div style="margin: 10px 0px;">
									<span class="tixianxinxi">提现记录数：{{totalpage}}条  提现金额合计：{{moenytotal}}元 手续费合计：{{moneyshouxu}}元 </span>
								</div>
								<el-table ref="multipleTable" :data="tixianList" stripe tooltip-effect="dark" border style="width: 100%"
								 @selection-change="handleSelectionChange">
									<el-table-column prop="shopname" label="厂家名称" width="230">
										<!-- <template slot-scope="scope">
											<div class="setbox">
												<span>{{scope.row.shopName}}</span>

											</div>
										</template> -->
									</el-table-column>
									<el-table-column label="提现用户" width="120">
										<template slot-scope="scope">{{ scope.row.realname }}</template>
									</el-table-column>
									<el-table-column prop="orderno" label="提现流水号" width="230">
									</el-table-column>
									<el-table-column prop="amount" label="提现金额(元)" width="120">
									</el-table-column>
									<el-table-column prop="cmmsamt" label="手续费(元)" width="120">
									</el-table-column>
									<el-table-column prop="id" label="账户余额(元)" width="120">
									</el-table-column>
									<el-table-column label="提现状态" width="120">
										<template slot-scope="scope">
											<span v-if="scope.row.state == 0">未提现</span>
											<span v-if="scope.row.state == 1">审核中</span>
											<span v-if="scope.row.state == 2">已提现</span>
											<span v-if="scope.row.state == 3">拒绝提现</span>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="资金账号类型" width="120">
										<template slot-scope="scope">
											<span v-if="scope.row.acctype == 0">支付宝</span>
											<span v-if="scope.row.acctype == 1">银行卡</span>
											<span v-if="scope.row.acctype == 2">微信</span>
										</template>
									</el-table-column>
									<el-table-column prop="account" label="资金账号" width="230">
									</el-table-column>
									<el-table-column prop="bankname" label="银行名称" width="200">
									</el-table-column>
									<el-table-column prop="accname" label="资金账户用户名" width="200">
									</el-table-column>
									<el-table-column prop="strAdtime" label="创建时间" sortable width="230">
									</el-table-column>
									<el-table-column prop="strUptime" label="更新时间" width="230">
									</el-table-column>
									<el-table-column prop="remarks" label="备注信息" width="200">
									</el-table-column>
									<el-table-column prop="operationName" label="操作人" width="120">
									</el-table-column>
									<el-table-column fixed="right" prop="" label="操作" width="180">
										<template slot-scope="scope">
											<!-- slot-scope="scope" -->
											<div class="setbox" v-if="scope.row.state == 0 || scope.row.state == 1">
												<el-button type="primary" size="small" @click="agreexian(scope.row)" style="height: 30px; line-height: 30px; color: #FFFFFF;margin-top: 13px;">
													<span>
														同意
													</span>
												</el-button>
												<el-button type="danger" size="small" @click="refusexian(scope.row)" style="height: 30px; line-height: 30px; color: #FFFFFF; margin-top: 13px;">
													<span>
														拒绝
													</span>
												</el-button>
											</div>
											<div class="setbox" v-if="scope.row.state == 2">
												<el-button disabled type="info" size="small"  style="height: 30px; line-height: 30px; color: #FFFFFF; margin-top: 13px;">
													<span>
														已提现
													</span>
												</el-button>
											</div>
											<div class="setbox" v-if="scope.row.state == 3">
												<el-button disabled type="info" size="small"  style="height: 30px; line-height: 30px; color: #FFFFFF; margin-top: 13px;">
													<span>
														已拒绝
													</span>
												</el-button>
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
									<el-pagination :page-sizes="[10,]" layout="sizes, prev, pager, next,jumper" :total="totalpage" :current-page.sync="nowpage" @current-change='currentclick'>
									</el-pagination>
								</div>
							</div>

						</div>



					</el-main>
					<el-footer>
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
		gettixianList,
		agreexian,
		refusexian
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
				addbox: false,
				page: 0,
				size:'', //记录条数
				pageSize: 10,
				totalpage: '',
				nowpage: '',
				tixianList: [],
				itemInfo: "",
				id: '',
				moenytotal:'', //提现总金额
				moneyshouxu:'', //手续费
				//检索字段
				shopname: '', //厂家名称
				realname: '', //提现用户
				orderno: '', //流水号
				state: '', //提现状态(0:未提现/1:审核中/2:已提现/3:拒绝提现)
				acctype: '', //资金账号类型(0支付宝/1银行卡/2微信)
				bankname: '' //资金账号

			}
		},
		methods: {
			//分页
			currentclick(e){
				let _this = this;
				_this.page = e-1
				_this.getshenshuListpage()
			},
			//重置
			chongzhi(){
				this.page = 0
				this.shopname = '' //厂家名称
				this.realname = '' //提现用户
				this.orderno = '' //流水号
				this.state = '' //提现状态(0:未提现/1:审核中/2:已提现/3:拒绝提现)
				this.acctype = '' //资金账号类型(0支付宝/1银行卡/2微信)
				this.bankname = '' //资金账号
				
				this.gettixianListpage()
			},
			//同意提现
			agreexian(row) {
				let _this = this;
				console.log(row.amount)
				let id = row.id
				const h = this.$createElement;
				this.$msgbox({
					title: '消息',
					message: h('p', null, [
						h('span', null, '确认要同意提现给用户,向账户'),
						h('span', {
							style: 'color: #333'
						}, '[' + row.orderno + ']' + "打款" + '[' + row.amount + ']' + '元吗？(银行卡提现会扣除手续费,一般会及时到账,请勿频繁)')
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(() => {

								let params = {
									id: id
								}
								agreexian('order/agreeToWithdraw', params).then(res => {
									console.log(res)
									if (res.isSuccess) {
										setTimeout(() => {
											instance.confirmButtonLoading = false;
										}, 300);
										done();
										this.$message({
											type: 'success',
											message: res.message
										});
										_this.gettixianListpage()
									} else {
										this.$message({
											type: 'error',
											message: res.message
										});
									}

								})

							}, 3000);
						} else {
							done();
						}
					}
				})
			},
			//拒绝提现
			refusexian(row) {
				let _this = this
				console.log(row.amount)
				let id = row.id
				const h = this.$createElement;
				this.$msgbox({
					title: '消息',
					message: h('p', null, [
						h('span', null, '确认要拒绝提现并退还金额到账户吗？'),
						h('span', {
							style: 'color: #333'
						}, '("已申请"可操作;"审核中"请慎重操作，确保用户未提现成功再退还)')
					]),
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					beforeClose: (action, instance, done) => {
						if (action === 'confirm') {
							instance.confirmButtonLoading = true;
							instance.confirmButtonText = '执行中...';
							setTimeout(() => {

								let params = {
									id: id
								}
								refusexian('order/refuseToWithdraw', params).then(res => {
									console.log(res)
									if (res.isSuccess) {
										setTimeout(() => {
											instance.confirmButtonLoading = false;
										}, 300);
										done();
										this.$message({
											type: 'success',
											message: res.message
										});
										_this.gettixianListpage()
									} else {
										this.$message({
											type: 'error',
											message: res.message
										});
									}

								})

							}, 3000);
						} else {
							done();
						}
					}
				})
			},
			gettixianListpage(e) {
				let _this = this;
				if (e == 0) {
					_this.page = 0
				}
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize,
					shopname: _this.shopname, //厂家名称
					realname: _this.realname, //提现用户
					orderno: _this.orderno, //流水号
					state: _this.state, //提现状态(0:未提现/1:审核中/2:已提现/3:拒绝提现)
					acctype: _this.acctype, //资金账号类型(0支付宝/1银行卡/2微信)
					bankname: _this.bankname //资金账号
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				gettixianList('order/selectTShopWhdPageList', params).then(res => {
					console.log(res, '提现列表');
					let msgList = res.resultData.content
					_this.tixianList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
					
					
					var arr = [];
					var shouxuArr = [];
					for(let i in msgList){
						if(msgList[i].state == 2){
							// var arr = []
							arr.push(msgList[i].amount)
							if(msgList[i].cmmsamt == undefined){
								msgList[i].cmmsamt = 0
							}
							shouxuArr.push(msgList[i].cmmsamt)
						}
					}
					// console.log(arr);
					// console.log(shouxuArr)
					var sum = 0  //提现总金额
					for (var i = 0, len = arr.length; i < len; i++) {
					        sum += arr[i]
					}
					
					var shouxuSunm = 0 //手续费总额
					for (var j = 0, leng = shouxuArr.length; j < leng; j++) {
					        shouxuSunm += shouxuArr[j]
					}
					
					console.log(sum,'提现总金额');
					console.log(shouxuSunm,'手续费总额');
					_this.moenytotal = sum;
					_this.moneyshouxu = shouxuSunm
					
					
					setTimeout(() => {
						loading.close();
					}, 500);
				})

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
				this.page = 0
				this.gettixianListpage()
			},
		},
		mounted() {
			this.gettixianListpage()
		}

	}
</script>
<style scoped="scoped" lang='less'>
		
	.tablebox{
		height: 580px;
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
		background: #fff;
		align-items: center;
		justify-content: space-between;
		padding-top: 10px;
		box-sizing: border-box;
		padding-left: 10px;
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

		img {}
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



	.demo-image__preview {
		img {
			width: 60px;
			height: 60px;
		}

	}

	/* 	.dox1 {
		display: flex;
		width: 100%;
	}

	.dox2 {
		width: 50%;

	}

	.dox3 {
		display: flex;
		border: 1px solid #e4e4e4;
		height: 120px;
	}

	.xox1 {
		width: 30%;
		background-color: #fafafa;
		height: 100%;

		span {
			font-size: 18px;
			color: #333333;
			line-height: 120px;
			margin-left: 20px;
		}
	}

	.b1 {
		display: block;
		margin-bottom: 10px;
		margin-left: 23px;
		background-color: #0b9cf4;
		border: 1px solid #e4e4e4;
		border-radius: 3px;

		width: 80px;
		height: 36px;
	}

	.b2 {
		background-color: #fafafa;
		margin-bottom: 10px;
		margin-left: 23px;
		border: 1px solid #e4e4e4;
		width: 80px;
		height: 36px;
	}

	.xox2 {
		display: flex;
		align-items: center;

		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin-left: 20px;
		}
	}

	.dox4 {
		display: flex;
		height: 60px;
		border: 1px solid #e4e4e4;

		.a1 {
			width: 30%;
			height: 60px;
			background-color: #fafafa;
			line-height: 60px;
		}

		.a2 {

			height: 60px;
			margin-left: 20px;
			line-height: 60px;
		}
	}

	.quxian {
		display: flex;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;

		.quxian1 {
			width: 15%;
			height: 60px;
			background-color: #fafafa;
			line-height: 60px;

			span {
				float: right;
				margin-right: 20px;

			}
		}

		.quxian2 {
			line-height: 60px;
			display: flex;
			width: 75%;
			align-items: center;

			span {
				width: 17%;
				height: 36px;
				background-color: #fafafa;
				margin-left: 20px;
				line-height: 36px;
				padding-left: 3%;
			}
		}
	}

	.dizhi {
		display: flex;
		border: 1px solid #e4e4e4;

		.dizhi1 {
			width: 15%;
			height: 60px;
			background-color: #fafafa;
			line-height: 60px;

			span {
				float: right;
				margin-right: 20PX;
			}
		}

		.dizhi2 {
			line-height: 60px;
			display: flex;
			width: 75%;
			align-items: center;

			span {

				margin-left: 20px;
			}
		}
	}

	.zhaopian {
		display: flex;
		width: 100%;

		.yingye {
			display: flex;
			width: 50%;
			border-left: 1px solid #e4e4e4;
			border-right: 1px solid #e4e4e4;

			.yingye1 {
				width: 30%;
				height: 150px;
				background-color: #fafafa;
				line-height: 150px;

				span {
					float: right;
					margin-right: 20px;
				}
			}

			.yingye2 {
				img {
					width: 160px;
					height: 100px;
					margin-left: 20px;
					margin-top: 22px;
					background-color: #e4e4e4;
				}
			}
		}

		.shenfen {
			display: flex;
			width: 50%;

			border-right: 1px solid #e4e4e4;

			.shenfen1 {
				width: 30%;
				height: 150px;
				background-color: #fafafa;
				line-height: 150px;

				span {
					float: right;
					margin-right: 20px;
				}
			}

			.shenfen2 {
				display: flex;

				img {
					width: 160px;
					height: 100px;
					margin-left: 20px;
					margin-top: 22px;
					background-color: #e4e4e4;
				}
			}
		}

	}

	.zhuantai {
		margin: auto;
	}

	.beizhu {
		display: flex;
		width: 100%;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;

		.beizhu1 {
			width: 15%;
			height: 120px;
			background-color: #fafafa;
			line-height: 120px;

			span {
				float: right;
				margin-right: 20px;
			}

		}

		.beizhu2 {
			width: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	} */
	.tixianxinxi {
		font-size: 16px;
		color: #333333;
	}

	.tishi {
		width: 100%;
		height: 60px;
		background-color: #e4e4e4;
		margin-top: 10px;
		margin-bottom: 10px;

		span {
			line-height: 60px;
			color: #ff0000;
			margin-left: 30px;
			font-size: 18px;
		}
	}

	.yue {
		display: flex;
		width: 100%;
		height: 60px;
		border: 1px solid #e4e4e4;

		.yue1 {
			width: 20%;

			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.yue2 {
			width: 79%;
			line-height: 60px;
			padding-left: 1%;
		}
	}

	.tixianjin {
		display: flex;
		width: 100%;
		height: 60px;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;

		.tixianjin1 {
			width: 20%;

			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.tixianjin2 {

			.el-input {
				width: 700px;
				padding: 10px;
			}
		}
	}

	.zijinl {
		display: flex;
		width: 100%;
		height: 60px;
		border: 1px solid #e4e4e4;

		.zijinl1 {
			width: 20%;

			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.zijinl2 {
			.el-select {
				width: 700px;
				padding: 10px;
			}
		}
	}

	.zijinyh {
		display: flex;
		width: 100%;
		height: 60px;
		border: 1px solid #e4e4e4;

		.zijinyh1 {
			width: 20%;

			background-color: #fafafa;

			span {
				line-height: 60px;
				float: right;
				margin-right: 20px;
			}
		}

		.zijinyh2 {
			.el-input {
				width: 700px;
				padding: 10px;
			}
		}
	}

	.beizhuxin {
		display: flex;
		width: 100%;
		height: 120px;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;

		.beizhuxin1 {
			width: 20%;

			background-color: #fafafa;

			span {
				line-height: 120px;
				float: right;
				margin-right: 20px;
			}
		}

		.beizhuxin2 {
			width: 700px;
			margin: auto;
		}
	}

	.setbox {
		span {
			color: #FFFFFF;
			line-height: 0.5vw;
		}
	}
</style>
