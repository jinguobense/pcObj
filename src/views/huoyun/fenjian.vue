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
								<span class="fenl1">分拣订单列表</span>
								<div class="yoou">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
									<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-input v-model="orderno" size="medium" placeholder="请输入订单号" @change="resect"></el-input>
									<el-select v-model="state" size="medium" placeholder="订单状态"  @change="resect">
										<!-- <el-option key="0" value="0" label="无轨迹"></el-option> -->
										<el-option key="1" value="1" label="待配送"></el-option>
										<el-option key="2" value="2" label="配送中"></el-option>
										<el-option key="3" value="3" label="已签收"></el-option>
										<!-- <el-option key="4" value="4" label="问题件"></el-option> -->
									</el-select>
									<span style="font-size: 16px;color: #333333;margin:0px 10px 0px 20px;">签收时间</span>
									<el-date-picker v-model="createTime" size="medium" type="datetimerange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
									 @change="resect">
									</el-date-picker>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="resect">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="" >
										<span class="">重置</span>
									</div>
								</div>
							</div>
							
							<div class="tablebox">
								<el-table ref="multipleTable" :data="fenjianList" border tooltip-effect="dark" style="width: 100%" >
									<el-table-column label="订单号" width="215">
										<template slot-scope="scope">
											<div class="setbox">
												<div @click="getItem(scope.row,0)">{{scope.row.orderno}}</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="recename" label="收货人" width="100">
									</el-table-column>
									<el-table-column prop="receaddr" label="收货地址" width="500">
										<template slot-scope="scope">
											<div class="setbox">
												<!-- <span style="margin-right: 10px;">{{scope.row.goodsNum}}</span> -->
												<div style="color: #333;">{{scope.row.receaddr}}</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="recephone" label="手机号" width="200">
									</el-table-column>
									<el-table-column prop="amount" label="订单金额(元)" width="120">
									</el-table-column>
								
									<el-table-column label="订单状态" width="110">
										<template slot-scope="scope">
											<span v-if="scope.row.plstate == 0">无轨迹</span>
											<span v-if="scope.row.plstate == 1">待配送</span>
											<span v-if="scope.row.plstate == 2">配送中</span>
											<span v-if="scope.row.plstate == 3">已签收</span>
											<span v-if="scope.row.plstate == 4">问题件</span>
										</template>
									</el-table-column>
									
									<el-table-column prop="strDetime" sortable label="配送时间" width="180">
									</el-table-column>
									<el-table-column prop="strSigntime" sortable label="签收时间" width="230">
									</el-table-column>
									
									<el-table-column prop="operationName" label="操作人" width="120">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<div class="setbox">
												<div v-if="scope.row.plstate == 1"  type="text" size="small" @click="getItem(scope.row,1)">
													去配送
												</div>
												<span v-if="scope.row.plstate == 0">无轨迹</span>
												<!-- <span v-if="scope.row.plstate == 1">已揽收</span> -->
												<span v-if="scope.row.plstate == 2">配送中</span>
												<span v-if="scope.row.plstate == 3">已签收</span>
												<span v-if="scope.row.plstate == 4">问题件</span>
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
									<el-pagination layout="prev, pager, next,jumper" :total="totalpage" @current-change="currentpage" :current-page.sync="nowpage">
									</el-pagination>
								</div>
							</div>
						</div>

						<div class="addbox" v-if="dialogVisible">
							<div class="mask">
							</div>
							<div class="addwrap">
								<div class="title" v-if="type == 0">
									查看分拣订单
								</div>
								<div class="title" v-if="type == 1">
									配送分拣订单
								</div>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="yetoubufen">
											<span>订单号:</span>
										</td>
										<td class="haolang" colspan="3">
											<span>{{itemInfo.orderno}}</span>
										</td>
									</tr>
									<tr>
										<td class="yetoubufen">
											<span>配送人:</span>
										</td>
										<td class="haoduan">
											<span>XXXXXXXXXXXX</span>
										</td>
										<td class="yetoubufen">
											<span>联系方式:</span>
										</td>
										<td class="haoduan">
											<span>XXXXXXXXXXXXXX</span>
										</td>
									</tr>
									<tr>
										<td class="yetoubufen">
											<span>收货人:</span>
										</td>
										<td class="haoduan">
											<span>{{itemInfo.recename}}</span>
										</td>
										<td class="yetoubufen">
											<span>联系方式:</span>
										</td>
										<td class="haoduan">
											<span>{{itemInfo.recephone}}</span>
										</td>
									</tr>

									<tr>
										<td class="yetoubufen">
											<span>收货地址:</span>
										</td>
										<td class="haolang" colspan="3">
											<span>{{itemInfo.receaddr}}</span>
										</td>
									</tr>
								</table>
								<table v-for="(item,index) in itemInfo.goods" :key='index' align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="yetoubufen">
											<span>商品名称:</span>
										</td>
										<td class="haolang" colspan="3">
											<span>{{item.name}}</span>
										</td>
									</tr>
									<tr v-for='(cess,index) in item.tGoodsSkuBo' :key='index'>
										<td class="yetoubufen">
											<span>规格:</span>
										</td>
										<td class="haoduan">
											<span>{{cess.value1}}</span>
										</td>
										<td class="yetoubufen">
											<span>数量:</span>
										</td>
										<td class="haoduan">
											<span>{{cess.num}}</span>
										</td>
									</tr>
									
								</table>
								
								<div class="bottom">
								     <el-button type="primary" v-if="type == 1" @click='SurepeiSong'>确定</el-button>
								     <el-button type="info" @click="dialogVisible = false">关闭</el-button>
									 
								</div>
							</div>
							
						</div>

						<!-- 	</el-dialog> -->
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
	import Left from '../../components/Left'
	import {changeTime,getFenjianList,getFenjianInfo,postSurePeisong} from '../../request/API/request.js'
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
				
				nowpage:'',
				page:0,
				pageSize:10,
				totalpage:'',
				//检索字段
				orderno:'', //运单号
				state:'', //状态 (0:已揽收(已发货)/1:配送中/2:已签收/3:已完成)
				createTime:'', //入库时间
				fenjianList:[],
				itemInfo:'',
				type:'',  //0查看 1配送
				
				orderid:''

			}
		},
		methods: {
			resect(){
				// this.orderno = '' //登录名
				// this.state=''
				this.page = 0
				// this.createTime=''
				this.getFenjianListpage()
			},
			//确定配送
			SurepeiSong(){
				let _this = this;
				
				
				this.$confirm('此操作将配送该订单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						orderid:_this.orderid,
					}
					postSurePeisong('order/updatePflexpressAndTraces',params).then(res => {
						if(res.isSuccess){
							_this.$message({
								message: "订单配送成功!",
								type: 'success',
								duration: 1000
							});
							_this.dialogVisible = false;
							_this.getFenjianListpage() //重置
						}else{
							_this.$message({
								message: res.message,
								type: 'success',
								duration: 1000
							});
						}
					})
					
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消配送'
					});
				});
				
			},
			//订单详情
			getfenjianXq(){
				let _this = this;
				let params = {
					orderid:_this.orderid
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getFenjianInfo('order/getPflexpressDetail',params).then(res => {
					console.log(res);
					if (res.isSuccess) {
						_this.itemInfo = res.resultData;
						setTimeout(() => {
							loading.close();
						}, 500);
					} else {
						_this.$message({
							message: res.message,
							type: 'error',
							duration: 1000
						});
					}
				})
				
			},
			getItem(row,e){
				let _this = this;
				console.log(row)
				_this.type = e; //0查看 1配送
				_this.orderid = row.id
				_this.dialogVisible = true;
				_this.getfenjianXq()
				
			},
			currentpage(e){
				this.page = e - 1;
				this.getFenjianListpage()
			},
			getFenjianListpage(){
				let _this = this;
				let timeArr = _this.createTime;
				let Timearr 
				if(timeArr == ''){
					let sTime = ''
					let endTime = ''
					Timearr = '';
					
				}else{
					let sTime = changeTime(timeArr[0]);
					let endTime = changeTime(timeArr[1]);
					Timearr = sTime+','+endTime;
					
					
				}
				// console.log(_this.createTime)
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				let params = {
					pageIndex:_this.page,
					pageSize:_this.pageSize,
					orderno:_this.orderno, //运单号
					plstate:_this.state, //状态 (0:已揽收(已发货)/1:配送中/2:已签收/3:已完成)
					createTime:Timearr, //入库时间
				}
				getFenjianList('order/getTOrderPflexpressPageList',params).then(res => {
					console.log(res);
					_this.fenjianList = res.resultData.content;
					_this.nowpage = res.resultData.pageIndex;
					_this.totalpage = res.resultData.total;
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
			},
			chongzhi(){
			this.orderno = '' //登录名
			this.state=''
			this.page = 0
			this.createTime=''
			this.getFenjianListpage()
			},
		},
		mounted() {
			this.getFenjianListpage()
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
			width: 100%;
			/* line-height: 48px; */
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

	.shuxin {}

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

	.yetoubufen {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.haolang {
		width: 878px;
		height: 60px;

		span {
			margin-left: 20px;
		}
	}

	.haoduan {
		width:350px;
		height: 60px;

		span {
			margin-left: 20px;
		}
	}
.addbox{
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
		.addwrap{
			height: 780px;
			margin-bottom: 20px;
			width: 1080px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			.title{
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
