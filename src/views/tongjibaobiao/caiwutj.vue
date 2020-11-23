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
								<span class="fenl1">厂家财务明细列表</span>
								<div class="yoou">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
									<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<!-- <el-select v-model="shopid" size="medium" placeholder="类型" @change='getmingxiListpage(0)'>
										<el-option key="1" value="1" label="会议通告"></el-option>
										<el-option key="2" value="2" label="奖惩通告"></el-option>
										<el-option key="3" value="3" label="活动公告"></el-option>
									</el-select> -->
									<el-button type='primary' @click="infobox = true" v-if="!shopid" plain size="medium" style="width: 200px; font-size: 16px; margin: 0px 10px;">选择厂家</el-button>
									<el-button type='info' @click="infobox = true" v-if="shopid" plain size="medium" style="width: 200px; font-size: 16px; margin: 0px 10px;">{{showshopname}}</el-button>
									<span style="margin-left: 10px;">统计时间：</span>
									<el-date-picker v-model="createTime" type="datetimerange" size="medium" range-separator="至" start-placeholder="开始时间"
									 end-placeholder="开始时间" value-format="timestamp" style="margin-left: 20px;" @change="getmingxiListpage(0)">
									</el-date-picker>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="getmingxiListpage(0)">
									<div class="shuax" @click="resect">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">
								<div class="zongji">
									<span>
										记录数：{{totalpage}}
									</span>
									<span>
										分账收入合计：{{amountTotalOne}}
									</span>
									<span>
										提现支出合计：{{amountTotalTwo}}
									</span>
								</div>
								<el-table ref="multipleTable" :data="caiwuList" tooltip-effect="dark" style="width: 100%" stripe border>
									<el-table-column label="业务类型" width="257">
										<template slot-scope="scope">
											<span v-if="scope.row.type == 0">分账</span>
											<span v-if="scope.row.type == 1">提现</span>
										</template>
									</el-table-column>
									<el-table-column prop="prevbalance" label="分账前金额(元)">
									</el-table-column>
									<el-table-column prop="amount" label="收支金额(元)">
									</el-table-column>
									<el-table-column prop="aftbalance" label="分账后金额(元)">
									</el-table-column>
									<el-table-column prop="orderNo" label="关联订单号">
									</el-table-column>
									<el-table-column prop="strAdtime" sortable label="记录时间">

									</el-table-column>
								</el-table>
							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									总共{{totalpage}}条记录
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10,]" layout="sizes, prev, pager, next,jumper" :total="totalpage"
									 :current-page.sync="nowpage" @current-change='currentclick'>
									</el-pagination>
								</div>
							</div>

						</div>
					</el-main>
					<el-footer height='42px'>
						<Footer></Footer>
					</el-footer>
				</el-container>
			</el-container>
			<div class="addbox" v-if="infobox">
				<div class="mask" @click="infobox = false"></div>
				<div class="addwrap">
					<div class="title">选择厂家</div>
			
					<div class="searchbox">
						<div class="search" style="width: 800px;">
							<!-- <div style="width: 160px;">
								<el-select size="medium" placeholder="角色" style="width: 100%;">
									<el-option key="1" value="1" label="财务"></el-option>
									<el-option key="0" value="0" label="市场"></el-option>
									<el-option key="2" value="2" label="区域管理员"></el-option>
								</el-select>
							</div> -->
							<el-input v-model="shopname" placeholder="厂家名称" size="medium" style="width: 30%;" @change="getshopinfo(0)"></el-input>
							<el-input v-model="shoptel" placeholder="联系电话" size="medium" style="width: 30%;" @change="getshopinfo(0)"></el-input>
							<!-- <el-input v-model="shopcode" placeholder="唯一社会信用代码" size="medium" style="width: 30%;" @change="getshopinfo(0)"></el-input> -->
						</div>
						<div class="btngrap" style="width: 20%;">
							<img src="../../assets/img/sousu.png" alt=""  @click="getshopinfo(0)">
							<div class="shuax" @click="shopresect">
								<img src="../../assets/img/shuaxinb.png" alt="" @click="shopresect">
								<span>重置</span>
							</div>
						</div>
					</div>
					<div class="tablebox620">
						<el-table ref="multipleTable" :data="shopList" tooltip-effect="dark" style="width: 100%" border
						@row-click="handleRowClick" @selection-change="handleSelectionChange">
							<!-- @select="danxuan"
							 @select-all="quanxuan" -->
							<el-table-column type="selection" :reserve-selection="true">
							</el-table-column>
							<el-table-column prop="shopname" label="厂家名称">
								<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
							</el-table-column>
							<el-table-column prop="shoptypename" label="分类名称">
							</el-table-column>
							<el-table-column prop="provname" label="省份" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="cityname" label="城市" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="townname" label="区县" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="detailaddr" label="详细地址" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="telephone" label="手机号" show-overflow-tooltip>
							</el-table-column>
							<el-table-column prop="creditcode" label="唯一社会信用代码" show-overflow-tooltip>
							</el-table-column>
						</el-table>
					</div>
					<div class="block">
						<div class="demonstration">
							<sapn>总共{{shoptotalpage}}条记录</sapn>
						</div>
						<div style="display: flex; align-items: center;">
							<!-- <span>每页显示</span> -->
							<el-pagination layout="prev, pager, next,jumper" :total="shoptotalpage" 
							 :current-page.sync="shopnowpage" @current-change='shopcurrentclick'>
							</el-pagination>
			
						</div>
					</div>
					<div class="bottom">
			
						<el-button type="primary" @click="infobox = false">确定</el-button>
						<el-button type="info" @click="close">取消</el-button>
			
					</div>
			
				</div>
			</div>
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
		getCaiwuList,
		changeTime,
		getCaiwuprice,
		cjxx
	} from '../../request/API/request.js'
	export default {
		inject: ['reload'],
		components: {
			Header,
			Footer,
			Daohang,
			Left,

		},
		data() {
			return {
				infobox:false,
				page: 0,
				totalpage: '',
				nowpage: '',
				pageSize: 10,
				shopid: '',
				createTime: '',
				caiwuList: [],
				amountTotalOne: "", //分账收入合计
				amountTotalTwo: '', //提现支出合计
				shopList: [],
				
				shoppage:0,
				shoptotalpage:'',
				shopnowpage:'',
				
				//厂家检索
				shopname:"",
				shoptel:'',
				shopcode:'',
				multipleSelection:[],
				showshopname:''
			}
		},
		methods: {
			close(){
				this.shopname = '';
				this.shoptel = '';
				this.infobox = false;
				this.shopid = '';
				this.multipleSelection = []
			},
				
			//重置
			resect() {
				this.page = '';
				this.createTime = '';
				this.shopid = ''
				this.showshopname = ''
				this.reload()
				this.getmingxiListpage()
			},
			shopresect(){
				this.shopname = '';
				this.shoptel = '';
				this.shopcode = '';
				this.getshopinfo()
			},
			currentclick(e) {
				this.page = e - 1;
				this.getmingxiListpage()
			},
			shopcurrentclick(e){
				this.shoppage = e-1;
				console.log(e)
				this.getshopinfo()
			},
			handleRowClick(row){
				this.$refs.multipleTable.toggleRowSelection(row)
			},
			handleSelectionChange(val){
				if(val.length > 1){
					this.$refs.multipleTable.clearSelection()
					this.$refs.multipleTable.toggleRowSelection(val.pop())
				}else{
					this.multipleSelection = val.pop()
					this.shopid = this.multipleSelection.id
					this.showshopname = this.multipleSelection.shopname
				}
			},
			
			//获取厂家信息列表
			getshopinfo(e) {
				let _this = this;
				if(e == 0){
					_this.shoppage = 0
				}
				if(e == 1){
					_this.infobox = false
				}
				let params = {
					pageIndex: _this.shoppage,
					pageSize: _this.pageSize,
					telephone: _this.shoptel,
					shopname: _this.shopname,
					checkstate: '',
					shopstate: '',
					shoptypename: ''
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				cjxx('shop/getTShopPageList', params).then(res => {
					console.log(res, '厂家');
					_this.shopList = res.resultData.content;
					_this.shoptotalpage = res.resultData.total;
					_this.shopnowpage = res.resultData.pageIndex;
					setTimeout(() => {
						loading.close();
					}, 500);
				})
			},
			//统计
			gettongprice() {
				let _this = this;
				let timeArr = _this.createTime;
				let Timearr
				if (timeArr == '') {
					let sTime = ''
					let endTime = ''
					Timearr = '';

				} else {
					let sTime = changeTime(timeArr[0]);
					let endTime = changeTime(timeArr[1]);
					Timearr = sTime + ',' + endTime;

				}
				let params = {
					shopid: _this.shopid,
					createTime: Timearr
				}
				getCaiwuprice('order/selectTShopAcctdetailTotal', params).then(res => {
					console.log(res, '统计')
					_this.amountTotalOne = res.resultData.amountTotalOne;
					_this.amountTotalTwo = res.resultData.amountTotalTwo;
				})
			},
			getmingxiListpage(e) {
				let _this = this;
				if (e == 0) {
					_this.page = 0
				}
				if (e == 1) {
					_this.infobox = false
				}
				let timeArr = _this.createTime;
				let Timearr
				if (timeArr == '') {
					let sTime = ''
					let endTime = ''
					Timearr = '';

				} else {
					let sTime = changeTime(timeArr[0]);
					let endTime = changeTime(timeArr[1]);
					Timearr = sTime + ',' + endTime;


				}
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize,
					shopid: _this.shopid,
					createTime: Timearr

				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getCaiwuList('order/selectTShopAcctdetailPageList', params).then(res => {
					console.log(res);
					_this.caiwuList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;

					setTimeout(() => {
						loading.close();
					}, 500);

					_this.gettongprice()
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
			}
		},
		mounted() {
			this.getmingxiListpage();
			this.getshopinfo();

		}

	}
</script>
<style scoped="scoped" lang='less'>
	/* .el-main {
		height: 784px;
		padding: 0;
	} */

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

	.zongji {
		width: 100%;

		span {
			font-size: 16px;
			line-height: 32px;
			color: #333333;
		}
	}
</style>
