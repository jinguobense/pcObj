<template>

	<div class="home">
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

								<span class="fenl1">满送商品列表</span>
								<div class="yoou">

									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">

								</div>

							</div>
							<div class="searchbox">
								<div class="search">
									<el-input placeholder="商品名称" size="medium" v-model="namegoods" @change="sousu"></el-input>
									<el-input placeholder="厂家名称" size="medium" v-model="shopname" @change="sousu"></el-input>

									<el-input placeholder="厂家商品分类" size="medium" v-model="typename" @change="sousu"></el-input>
									<el-select size="medium" v-model="stet" placeholder="商品状态" @change="sousu">
										<el-option key="1" value="1" label="下架"></el-option>
										<el-option key="0" value="0" label="上架"></el-option>
									</el-select>
									<el-select size="medium" v-model="cckstat" placeholder="审核状态" @change="sousu">
										<el-option key="0" value="0" label="审核中"></el-option>
										<el-option key="1" value="1" label="已通过"></el-option>
										<el-option key="2" value="2" label="已弃审"></el-option>

									</el-select>

									<el-date-picker v-model="creteome" type="daterange" size="medium" range-separator="至" start-placeholder="开始时间"
									 end-placeholder="结束时间" @change="sousu">
									</el-date-picker>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" @click="sousu" alt="">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span>重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox620">
								<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%"
								 @selection-change="handleSelectionChange" @select="deld" @select-all="quanxuan" stripe>
									<el-table-column type="selection" width="50" :selectable='selectInit'>
									</el-table-column>
									<el-table-column label="商品名称" width="500">
										<template slot-scope="scope">
											<span @click="cliick(scope.row.id)" style="color: #41a8f9;display: block;height: 20px; line-height: 20px; cursor: pointer;">
												{{ scope.row.name }}
											</span>

										</template>
									</el-table-column>
									<el-table-column label="商品封面图片" width="120">
										<template slot-scope="scope">
											<div style="height: 40px; width: 40px; overflow: hidden;">
												<img :src="scope.row.img" style="height: 100%; width: 100%;" alt="">
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="shopName" label="厂家名称" width="180">
									</el-table-column>
									<el-table-column prop="typeName" label="商品分类" width="95">
									</el-table-column>
									<el-table-column prop="pratio" label="平台提成比例" width="120">
									</el-table-column>
									<el-table-column prop="seq" label="序号" width="60">
									</el-table-column>
									<el-table-column prop="sales" label="销量" width="60">
									</el-table-column>
									<el-table-column prop="strAdtime" selectable label="创建时间" width="230">
									</el-table-column>
									<el-table-column prop="remarks" label="备注信息" width="150">
									</el-table-column>
									<!-- <el-table-column prop="checkName" label="操作人" width="100">
									</el-table-column> -->
									<el-table-column label="状态" width="120" fixed="right">
										<template slot-scope="scope">
											<div>
												<span class="topjia" v-if="scope.row.state==0" @click="addjia(scope.row.id)" style="font-size: 16px; cursor: pointer;">上架</span>
												<span class="topjia" v-if="scope.row.state==1" @click="addjia(scope.row.id)" style="font-size: 16px; cursor: pointer;">下架</span>
												<el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small" v-if="scope.row.state==0"
												 @click="downjia(scope.row.id)" style="color: #0b9cf4; font-size: 16px; cursor: pointer;">
													下架
												</el-button>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="checkName" label="审核人" width="120">
									</el-table-column>
									<el-table-column fixed="right" label="审核状态" width="120">
										<template slot-scope="scope">
											<div class="setbox">
												<div v-if="scope.row.checkstate==1" style="color: black;">已通过</div>
												<div @click="xiugaidome(scope.row.id)" v-if="scope.row.checkstate==0">审核中</div>
												<div v-if="scope.row.checkstate==2" style="color: black;">已弃审</div>
											</div>
										</template>
									</el-table-column>
								</el-table>

							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									总共{{shangpinye.total}}条数据
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="shangpinye.total"
									 @current-change="handleCurrentChange" :current-page.sync="shangpinye.pageIndex">
									</el-pagination>
								</div>
							</div>
						</div>


						<!-- <el-dialog title="满送商品详情" :visible.sync="dialogVisible" width="1200px" height="840px" :before-close="handleClose"> -->
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">商品详情</div>
								<div class="yetou">
									<span @click="fenggeadd=1" :class="fenggeadd==1?'fnc1':'fnc2'">基本信息</span>
									<span @click="fenggeadd=2" :class="fenggeadd==2?'fnc1':'fnc2'">商品参数</span>
									<span @click="fenggeadd=3" :class="fenggeadd==3?'fnc1':'fnc2'">商品轮播图</span>
									<span @click="fenggeadd=4" :class="fenggeadd==4?'fnc1':'fnc2'">商品描述</span>
								</div>
								<div class="tablebox">
									<div v-if="fenggeadd==1">
										<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
											<tr>
												<td rowspan="2" class="td1">
													<span>商品封面图片:</span>
												</td>
												<td rowspan="2" class="td2">
													<img :src="xqshops.img" alt="">
												</td>
												<td class="td3">
													<span>厂家名称:</span>
												</td>
												<td class="td4">
													<span>{{xqshops.shopName}}</span>
												</td>
											</tr>
											<tr>

												<td class="td3">
													<span>商品分类:</span>
												</td>
												<td class="td4">
													<span>{{xqshops.typeName}}</span>
												</td>
											</tr>
											<tr>
												<td class="td3">
													<span>商品名称:</span>
												</td>
												<td colspan="3" class="td4">
													<span>{{xqshops.name}}</span>
												</td>

											</tr>
											<tr>
												<td class="td3">
													<span>销售范围:</span>
												</td>
												<td colspan="3" class="td4">
													<span>{{xqshops.townsName}}</span>
												</td>

											</tr>
										</table>
										<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">


											<tr>
												<td class="td3"><span>
														商品单位:
													</span></td>
												<td class="td4">
													<span>
														{{xqshops.unitName}}
													</span>
												</td>
												<td class="td3"><span>
														起步运费:
													</span></td>
												<td class="td4">
													<span>
														{{xqshops.startFreight}}
													</span>
												</td>
											</tr>
											<tr>
												<td class="td3"><span>
														起步量:
													</span></td>
												<td class="td4">
													<span>
														{{xqshops.minbuynum}}
													</span>
												</td>
												<td class="td3"><span>
														单位续件运费:
													</span></td>
												<td class="td4">
													<span>
														{{xqshops.incFreight}}
													</span>
												</td>
											</tr>

											<tr>
												<td class="td3"><span>
														满多少件商品（件）:
													</span></td>
												<td class="td4">
													<span>
														{{xqshops.fullNum}}
													</span>
												</td>
												<td class="td3"><span>
														送多少件商品（件）:
													</span></td>
												<td class="td4">
													<span>
														{{xqshops.freeNum}}
													</span>
												</td>

											</tr>
										</table>

									</div>
									<div v-if="fenggeadd==2">
										<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
											<tr class="oneli">
												<td class="touone">商品所属平台分类</td>
												<td class="toutow"><span>{{xqshops.pfgtypeidName}}</span></td>
											</tr>
											<tr class="oneli">
												<td class="touone">商品所属二级平台分类</td>
												<td class="toutow"><span>{{xqshops.pfgtypeid2Name}}</span></td>
											</tr>
										</table>
										<div class="posiu">
											<span>规格属性</span>
										</div>
										<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
											<tr class="shuxin">
												<td class="shuxin1">规格</td>

												<td class="shuxin1">单价</td>
												<td class="shuxin1">库存</td>
												<td class="shuxin1">规格图</td>

											</tr>
											<tr class="" v-for="(item,index) in xqshops.tGoodsSku" :key="index">
												<td class="shuxin2">{{item.value1}} </td>

												<td class="shuxin2">{{item.curprice}}</td>
												<td class="shuxin2">{{item.num}}</td>
												<td class="shuxin2">
													<div class="tuzhaoc">
														<img :src="item.goodsimg" alt="" class="sspl">
													</div>

												</td>
											</tr>

										</table>
									</div>
									<div v-if="fenggeadd==3">
										<div class="lunbotu">
											<div v-for="(item,index) in xqshops.tGoodsImgBo" :key="index">
												<img :src="item.img" alt="">
											</div>


										</div>
									</div>
									<div v-if="fenggeadd==4">
										<div class="xqtu">
											<el-image style="width: 100px; height: 200px; margin-left: 20px;" :src="xqshops.url" :preview-src-list="[xqshops.url]">
											</el-image>
										</div>
									</div>
								</div>

								<div class="bottom">
									<el-button @click="dialogVisible = false">取 消</el-button>
									<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
								</div>
							</div>

						</div>

						<!-- </el-dialog> -->
						<div class="addbox" v-if="shenhe">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">审核商品信息</div>
								<div class="tablebox">
									<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
										<tr>
											<td rowspan="2" class="td1">
												<span>商品封面图片:</span>
											</td>
											<td rowspan="2" class="td2">
												<img :src="shenheye.img" alt="">
											</td>
											<td class="td3">
												<span>厂家名称:</span>
											</td>
											<td class="td4">
												<span>{{shenheye.shopName}}</span>
											</td>
										</tr>
										<tr>

											<td class="td3">
												<span>商品分类:</span>
											</td>
											<td class="td4">
												<span>{{shenheye.typeName}}</span>
											</td>
										</tr>
										<tr>
											<td class="td3 ">
												<span>商品名称:</span>
											</td>
											<td colspan="3" class="td4">
												<span>{{shenheye.name}}</span>
											</td>

										</tr>

									</table>

									<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
										<tr class="shuxin">
											<td class="shuxin3">规格</td>
											<td class="shuxin3">单价</td>
											<!-- <td class="shuxin3">原价</td>  -->


										</tr>
										<tr class="" v-for="(item,index) in shenheye.tGoodsSku" :key="index">
											<td class="shuxin4">{{item.value1}} </td>
											<td class="shuxin4">{{item.curprice}}</td>
											<!-- <td class="shuxin4">{{item.origprice}}</td> -->
										</tr>

									</table>
									<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
										<tr>
											<td rowspan="4" class="xi1">
												<span>详情页:</span>
											</td>
											<td rowspan="4" class="xi2">
												<el-image style="width: 100px; height: 200px; margin-left: 20px;" :src="shenheye.url" :preview-src-list="[shenheye.url]">
												</el-image>
											</td>
											<td class="ac1 yesbefor">
												<span>平台提成比例:</span>
											</td>
											<td class="ac2">
												<div>
													<el-input v-model="tichenbili" oninput="value=value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')"
													 placeholder="请输入内容" @blur='starBlur'></el-input>
												</div>
											</td>
										</tr>
										<tr>

											<td class="ac1">
												<span>序号:</span>
											</td>
											<td class="ac2">
												<div>
													<el-input v-model="xuhao" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
												</div>
											</td>
										</tr>
										<tr>

											<td class="ac1 yesbefor">
												<span>审核状态:</span>
											</td>
											<td class="ac2">
												<div>
													<el-select size="medium" placeholder="审核状态" v-model="zhuantai">

														<el-option key="0" value="1" label="已通过"></el-option>
														<el-option key="0" value="2" label="已弃审"></el-option>
													</el-select>

												</div>
											</td>
										</tr>
										<tr>


										</tr>
									</table>
								</div>

								<div class="bottom">
									<el-button type="primary" @click="tijiao(shenheye.id)">确 定</el-button>
									<el-button @click="shenhe = false">关 闭</el-button>
								</div>

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
		Getshopxinxi,
		Getshopshenhe,
		Xgshopzt,
		shopxq,
		shopdel,
		chengeTime
	} from '../../request/API/request.js';
	export default {

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
				fenggeadd: 1,
				shenhe: false,
				dialogVisible: false,
				tableData: [],
				shangpinye: [],
				tichenbili: '', //提成比例	
				xuhao: '', //商品序号
				shopid: "",
				zhuantai: '', //审核状态
				shenheye: [],
				ztm: '',
				addjiazt: '',
				xqshops: [],
				goodsidlist: [],
				page: 0,
				namegoods: '',
				shopname: '',
				typename: '',
				cckstat: '',
				stet: '',
				creteome: '',
				chuanjs: '',
				options: [{
					value: '1',
					label: '已通过'
				}, {
					value: '2',
					label: '已弃审'
				}, ],

				multipleSelection: []

			}
		},
		methods: {
			starBlur(item) {
				console.log(this.tichenbili)
				if (this.tichenbili > 1 || this.tichenbili < 0) {
					this.$message({
						type: 'error',
						message: '提成范围在0~1之间,请重新输入！',
						duration: 2000
					});
					// this.tichenbili = ''
					return;
				}
			},
			sousu() {
				this.page = 0
				let arrtime = this.creteome
				let ktime
				let jtime
				let ztime
				if (arrtime == '') {
					ktime = ''
					jtime = ''
					ztime = ''
				} else {
					ktime = chengeTime(arrtime[0])
					jtime = chengeTime(arrtime[1])
					ztime = ktime + ',' + jtime
				}
				this.chuanjs = ztime
				this.Getshopxinxi()


			},
			chongzhi() {
				this.namegoods = ''
				this.shopname = ''
				this.typename = ''
				this.cckstat = ''
				this.stet = ''
				this.creteome = ''
				this.chuanjs = ''
				this.page = 0
				this.Getshopxinxi()
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
			shuxinym() {
				this.Getshopxinxi()
			},
			selectInit(row) {
				console.log(row)
				if (row.state == 0 || row.checkstate == 0) {
					return false;
				} else {
					return true;
				}
			},
			shopxq(e) {
				let _this = this
				// console.log(e,"454")
				let params = {
					id: e
				}
				shopxq('shop/getTGoodsDetail', params).then(res => {
					_this.xqshops = res.resultData
					// console.log(_this.xqshops)
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
				// console.log(this.goodsidlist)
			},
			Getshopxinxi() {
				let params = {
					wssubtype: 5,
					pageIndex: this.page,
					pageSize: 10,
					name: this.namegoods,
					shopName: this.shopname,
					typeName: this.typename,
					checkstate: this.cckstat,
					state: this.stet,
					createTime: this.chuanjs
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});

				Getshopxinxi('shop/getTGoodsPageList', params).then(res => {
					// console.log(res.resultData.content, "777")
					this.tableData = res.resultData.content
					// console.log(res.resultData, "777")
					this.shangpinye = res.resultData;
					setTimeout(() => {
						loading.close();
					}, 1000);
				})
			},
			Getshopshenhe() {
				let params = {
					id: this.shopid
				}
				Getshopshenhe('shop/getTGoodsChechDetail', params).then(res => {
					console.log(res.resultData, "787")
					this.shenheye = res.resultData
					this.tichenbili = res.resultData.pratio
					this.xuhao = res.resultData.seq
				})
			},
			tijiao(e) {
				this.shopid = e;
				let _this = this
				if (_this.tichenbili == '') {
					this.$message({
						type: 'error',
						message: '平台提成不能为空'
					});
					return;
				}
				if (_this.tichenbili < 0 || _this.tichenbili > 1) {
					_this.$message({
						type: 'error',
						message: '提成范围在0~1之间',
						duration: 1000
					});
					return;
				}
				if (this.zhuantai == '') {
					this.$message({
						type: 'error',
						message: '审核状态不能为空'
					});
					return;
				}


				this.Xgshopzt()
			},
			Xgshopzt() {
				let _this = this

				let params = {
					id: _this.shopid,
					checkstate: _this.zhuantai,
					state: _this.addjiazt,
					seq: _this.xuhao,
					pratio: _this.tichenbili
				}
				Xgshopzt('shop/editTGoods', params).then(res => {
					console.log(res, '5555')
					if (res.isSuccess) {
						this.$message({
							type: 'success',
							message: res.message,
							duration: 1000
						});
						this.shenhe = false
						this.Getshopxinxi()
					} else {
						this.$message({
							type: 'error',
							message: res.message,
							duration: 1000
						});

					}

				})
				_this.xuhao = ''
				_this.tichenbili = ''
			},
			cliick(row) {
				this.fenggeadd = 1
				let id = ''
				this.dialogVisible = true
				// console.log(row,"7777")
				id = row
				this.shopxq(id)
			},
			// addjia(e) {
			// 	this.shopid = e
			// 	this.addjiazt = 1
			// 	this.Xgshopzt()
			// },
			downjia(e) {

				this.$confirm('确认要下架该厂家商品记录吗?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.shopid = e
					this.addjiazt = 1
					this.Xgshopzt()

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			deleteRow() {

			},
			shopdel() {

				console.log(this.goodsidlist)
				let params = {
					ids: this.goodsidlist.join(",")
				}
				shopdel('shop/deleteGoodsInfo', params).then(res => {
					this.$message({
						type: 'success',
						message: res.resultData
					});
					this.Getshopxinxi()
				})
			},
			xiugaidome(e) {
				this.shenhe = true
				this.shopid = e
				console.log(e)
				this.Getshopshenhe()
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.Getshopxinxi()
				console.log(`当前页: ${val}`);
			},
			open() {
				if (this.goodsidlist == '') {
					return
				} else {
					this.$confirm('确认要删除该厂家商品记录吗?', '系统提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.shopdel()

					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
			}
		},
		mounted() {
			this.Getshopxinxi()
		}



	}
</script>
<style scoped="scoped" lang='less'>
	.searchbox {
		height: 100px;
		width: 100%;
		display: flex;
		// align-items: center;
		justify-content: space-between;
		background: #fff;

		/* margin: 10px; */
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

			}

			.el-select {
				width: 240px;
				height: 40px;
				margin-right: 10px;

			}

			.el-date-picker {
				width: 240px;
				height: 40px;
				margin-right: 10px;
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
		width: 274px;
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
		font-size: 16px;

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
		width: 1060px;

		tr {
			/* width: 1060px; */
			height: 60px;
		}
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
		margin-left: 10px;

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
		width: 1000px;
		margin-left: 10px;
		height: 300px;
		border: 1px solid #e4e4e4;
		padding-top: 20px;
		padding-left: 20px;
		box-sizing: border-box;
		margin-bottom: 200px;
		display: flex;

		img {
			width: 150px;
			height: 150px;
			margin-right: 20px;
		}
	}

	.xqtu {
		width: 1000px;
		margin-left: 10px;
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
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.cllss2 {
		width: 400px;
		height: 250px;

		img {
			width: 120px;
			height: 206px;
			margin-left: 20px;
		}
	}

	.cllss3 {
		width: 190px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.cllss4 {
		width: 400px;
		height: 60;

		.cllss5 {
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

	.shuxin3 {
		line-height: 60px;
		width: 400px;
		padding-left: 50px;
		box-sizing: border-box;
		background-color: #fafafa;
	}

	.shuxin4 {
		line-height: 60px;
		width: 400px;
		padding-left: 50px;
		box-sizing: border-box;

	}

	.td1 {
		width: 180px;
		height: 120px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.td2 {
		width: 350px;

		img {
			width: 70px;
			height: 70px;
			margin-left: 20px;
		}
	}

	.td3 {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
			display: block
		}
	}

	.td4 {
		span {
			margin-left: 20px;
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

	.xi1 {
		width: 180px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.xi2 {
		width: 350px;

		img {
			width: 100px;
			height: 200px;
			margin-left: 20px;
		}

	}

	.ac1 {
		width: 180px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.ac2 {
		width: 350px;

		.el-input {
			font-size: 16px;
			margin-left: 20px;
		}

		.el-select {
			font-size: 16px;
			margin-left: 20px;
		}

		.el-input__inner {
			font-size: 16px;
		}
	}

	.el-range-editor--medium.el-input__inner {
		margin-left: 10px;
	}

	.fnc2 {}

	.fnc1 {
		color: #ffffff;
		background-color: #41a8f9;
	}
</style>
