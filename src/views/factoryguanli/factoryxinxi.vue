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
								<span class="fenl1">厂家信息列表</span>
								<div class="yoou">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="chongzhi">
								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-input placeholder="厂家名称" size="medium" v-model="name" @change="cjxx(0)"></el-input>
									<el-input placeholder="联系电话" size="medium" v-model="phone" @change="cjxx(0)" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
									<el-input placeholder="主营项目" size="medium" v-model="shoptypename" @change="cjxx(0)"></el-input>
									<el-select size="medium" placeholder="厂家状态" v-model="shopstate" @change="cjxx(0)">
										<el-option key="1" value="0" label="正常"></el-option>
										<el-option key="0" value="1" label="停用"></el-option>
									</el-select>
									<el-select size="medium" placeholder="审核状态" v-model="stat" @change="cjxx(0)">
										<el-option key="1" value="0" label="审核中"></el-option>
										<el-option key="0" value="1" label="已通过"></el-option>
										<el-option key="0" value="2" label="已弃审"></el-option>
									</el-select>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="cjxx(0)">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span>重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">
								<el-table :data="tableData" border stripe style="width: 100%">
									<el-table-column prop="name" label="厂家logo" width="100">
										<div class="demo-image__preview" slot-scope="scope">
											<el-image style="width: 40px; height: 40px" :src="scope.row.shoplogo1" :preview-src-list="scope.row.shoplogo1">
											</el-image>
										</div>
									</el-table-column>
									<el-table-column label="厂家名称" show-overflow-tooltip="shopname">
										<template slot-scope="scope">
											<div class="setbox">
												<div @click="getItem(scope.row,2)" >
													{{scope.row.shopname}}
												</div>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="realname" label="经营者" width="80px">
									</el-table-column>
									<el-table-column prop="telephone" label="联系电话">
									</el-table-column>
									<el-table-column  label="详细住址" width="400" >
										<template slot-scope="scope">
										<span  style="display: block;height: 20px; line-height: 20px;">
											{{ scope.row.detailaddr }}
										</span>
										</template>
									</el-table-column>
									<el-table-column prop="balance" sortable label="账户余额">
									</el-table-column>
									<el-table-column prop="shoptypename" label="主营项目">
									</el-table-column>
									<!-- <el-table-column prop="checkmgnid" label="厂家ID">
									</el-table-column> -->
									<el-table-column prop="name" label="厂家状态">
										<template slot-scope="scope">
											<div>
												<span v-if="scope.row.shopstate==0">
													正常
												</span>
												<span v-if="scope.row.shopstate==1">
													停用
												</span>
											</div>
										</template>
									</el-table-column>
									<el-table-column prop="name" label="审核状态">
										<template slot-scope="scope">
											<div>
												<span v-if="scope.row.checkstate==0">
													审核中
												</span>
												<span v-if="scope.row.checkstate==1">
													已通过
												</span>
												<span v-if="scope.row.checkstate==2">
													已弃审
												</span>
											</div>
										</template>
									</el-table-column>
									<!-- <el-table-column prop="name" label="操作人">
									</el-table-column> -->
									<el-table-column label="操作">
										<template slot-scope="scope">

											<div class="setbox">
												<div @click="getItem(scope.row,0)" v-if="scope.row.checkstate==0">
													审核
												</div>
												<div @click="getItem(scope.row,1)" v-if="scope.row.checkstate==1" style="color: red;">
													修改
												</div>
												<div v-if="scope.row.checkstate==2" style="color: #333;">
													已弃审
												</div>
											</div>
										</template>

									</el-table-column>
								</el-table>

							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									总共{{zong.total}}条记录
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10,]" :current-page.sync="zong.pageIndex" layout="sizes, prev, pager, next,jumper"
									 :total="zong.total" @current-change="handleCurrentChange">
									</el-pagination>
								</div>
							</div>
						</div>



						<!-- <el-dialog title="审核店铺信息" :visible.sync="dialogVisible" width="1200px" :before-close="handleClose"> -->
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title" v-if="xiugaizt == 0">审核厂家信息</div>
								<div class="title" v-if="xiugaizt == 1">修改厂家信息</div>
								<div class="title" v-if="xiugaizt == 2" >厂家信息</div>
								<div class="tablebox">
									<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
										<tr>
											<td rowspan="2" class="text">
												<span>厂家logo:</span>
											</td>
											<td rowspan="2" class="touxbox">
												<div>
													<div class="touxset" v-if="xiugaizt == 2">
														<div class="img">
															<img :src="daotiao.shoplogo1" class="avatar">
														</div>
													</div>
													<el-upload class="touxset" v-if="xiugaizt != 2" action="https://www.xashudezhao.com/helpsales/platform/uploadImg"
													 :show-file-list="false" :on-success="handleAvatarSuccess" :data="imges">
														<div class="img">
															<img v-if="imageUrl" :src="imageUrl" class="avatar">
															<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 100px;"></i> -->
														</div>
														<div class="xuanzbox">
															<el-button lot="trigger" size="small" type="primary">选择</el-button>
															<el-button size="small" type="infor" @click.stop='quxaiotu'>取消</el-button>
														</div>
													</el-upload>

												</div>
											</td>
											<td class="text">
												<span>厂家名称:</span>
											</td>
											<td class="">
												<span>{{daotiao.shopname}}</span>
											</td>
										</tr>
										<tr>

											<td class="text">
												<span>主营项目:</span>
											</td>
											<td class="">
												<span>{{daotiao.shoptypename}}</span>
											</td>
										</tr>
										<tr>
											<td class="text">
												<span>真实姓名:</span>
											</td>
											<td class="">
												<span>{{daotiao.realname}}</span>
											</td>
											<td class="text">
												<span>身份证:</span>
											</td>
											<td class="">
												<span>{{daotiao.idcardnum}}</span>
											</td>
										</tr>

										<tr>
											<td class="text">
												<span>手机号:</span>
											</td>
											<td class="">
												<span>{{daotiao.telephone}}</span>
											</td>
											<td class="text">
												<span>唯一社会信用代码</span>
											</td>
											<td class="">
												<span>{{daotiao.creditcode}}</span>
											</td>
										</tr>
										<tr>
											<td class="text">
												<span>区县:</span>
											</td>
											<td colspan="3" class="value">
												<el-input :value="daotiao.provname" size="medium" disabled style="width: 30%;"></el-input>
												<el-input :value="daotiao.cityname" size="medium" disabled style="width: 30%;"></el-input>
												<el-input :value="daotiao.townname" size="medium" disabled style="width: 30%;"></el-input>
												<!-- <span>{{daotiao.provname}}</span><span>{{daotiao.cityname}}</span><span>{{daotiao.townname}}</span> -->

											</td>

										</tr>
										<tr>
											<td class="text">
												<span>详细地址:</span>
											</td>
											<td colspan="3" class="">
												<span>{{daotiao.detailaddr}}</span>
											</td>

										</tr>
										<tr>
											<td class="text">
												<span>营业执照:</span>
											</td>
											<td class="atr4">
												<div class="atr5">
													<!-- <img :src="daotiao.licenseImg" alt="" class=""> -->
													<el-image :src="daotiao.licenseImg" :preview-src-list="[daotiao.licenseImg]">
													</el-image>
													<!-- <el-image srcList='daotiao.licenseImg'></el-image> -->
												</div>

											</td>
											<td class="text">
												<span>身份证:</span>
											</td>
											<td class="">
												<div class="atr5">
													<div v-for="(item,index) in daotiao.idCardimgs" :key="index" style="display: flex;">
														<!-- <img :src="item" alt=""
														 class=""> -->
														 <el-image :src="item" :preview-src-list="[item]"></el-image>
													</div>
												</div>
											</td>
										</tr>
										<tr v-if="xiugaizt==0">
											<td class="text">
												<span>审核状态:</span>
											</td>
											<td colspan="3">
												<div class="atr5">
													<el-select size="medium" placeholder="状态" v-model="chord">
														<el-option key="1" value="1" label="已通过"></el-option>
														<el-option key="2" value="2" label="已弃审"></el-option>
														
													</el-select>
												</div>
											</td>
										</tr>
										<tr v-if="xiugaizt==1">
											<td class="text yesbefor">
												<span>厂家状态:</span>
											</td>
											<td colspan="3">

												<div class="atr5">
													<el-select size="medium" placeholder="状态" v-model="shopd">
														<el-option key="0" value="0" label="正常"></el-option>
														<el-option key="1" value="1" label="停用"></el-option>
													</el-select>
												</div>
											</td>

										</tr>
										<tr>
											<td class="text ">
												<span>备注信息:</span>
											</td>

											<td colspan="3" class="atr4">
												<div class="atr5" v-if="xiugaizt == 2">
													<span>{{daotiao.remarks}}</span>
												</div>
												<div class="atr5" v-if="xiugaizt != 2">
													<el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="remarks">
													</el-input>
												</div>
											</td>
										</tr>
									</table>
								</div>
								<div class="bottom">
									<el-button type="primary" v-if="xiugaizt != 2" @click="cjxg">确 定</el-button>
									<el-button @click="quxiao">取 消</el-button>
								</div>

							</div>
						</div>
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
	import {
		cjxx,
		cjxg
	} from '../../request/API/request.js'
	export default {
		// inject: ['reload'],
		components: {
			Header,
			Footer,
			Daohang,
			Left
		},
		data() {
			return {
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				srcList: [
					// 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
					// 'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				],
				input: '',
				textarea: '',
				dialogVisible: false,
				page: 0,
				pages: 10,
				shopid: '',
				phone: '',
				name: '',
				stat: '',
				shopstate: '',
				zong: [],
				daotiao: [],
				xiugaizt: '',
				chord: '',
				shopd: '',

				remarks: '',
				shoptypename: '',
				imageUrl: '',
				imges: {
					path: '/tAdImage'
				},
				id: '', //审核使用
				checkstate: '', //0审核 1修改 2查看

				value: '',

				multipleSelection: []
			}
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = res.resultData;
				console.log(this.imageUrl)
			},
			quxaiotu() {
				this.imageUrl = ''
			},
			quxiao() {
				this.dialogVisible = false
				this.shopid = ''
				this.chord = ''
				this.shopd = ''
				this.imageUrl = ''
				this.remarks = ''
			},
			sousou() {
				this.cjxx()
			},
			chongzhi() {
				this.phone = ''
				this.name = ''
				this.stat = ''
				this.shopstate = ''
				this.shoptypename = ''
				this.page = 0
				this.cjxx()
				this.reload()
				// this.handleCurrentChange()
			},
			getItem(row, e) {
				console.log(row)
				this.daotiao = row;
				this.shopid = row.id;
				this.dialogVisible = true;
				this.xiugaizt = e;
				
				if (row.shopstate == 1) {
					this.shopd = '停用'
				} else {
					this.shopd = '正常'
				}
				// this.shopd = row.shopstate
				this.checkstate = row.checkstate;
				this.remarks = row.remarks
				this.imageUrl = row.shoplogo1
			},
			// deleteRow(e) {
			// 	console.log(e)
			// 	this.daotiao = e
			// 	this.xiugaizt = 0 
			// 	this.shopid = e.id;
			// 	this.imageUrl = e.shoplogo1;
			// },
			// deleteRow1(e) {
			// 	this.xiugaizt = 1
			// 	this.daotiao = e
			// 	this.shopid = e.id
			// 	this.checkstate = e.checkstate
			// 	this.imageUrl = e.shoplogo1
			// },
			cjxg() {
				if (this.shopd == '停用') {
					this.shopd = 1
				} else if(this.shopd == '正常'){
					this.shopd = 0
				}
				// this.chord
				if(this.chord==1){
					this.shopd=0
				}
				let params = {
					id: this.shopid,
					checkstate: this.chord,
					shopstate: this.shopd,
					shoplogo1: this.imageUrl,
					remarks: this.remarks
				}
				cjxg('shop/editTShop', params).then(res => {
					console.log(res)
					this.cjxx()
				})
				this.dialogVisible = false
				this.shopid = ''
				this.chord = ''
				this.shopd = ''
				this.imageUrl = ''
				this.remarks = ''
			},
			cjxx(e) {
				if (e == 0) {
					this.page = 0
				}
				let params = {
					pageIndex: this.page,
					pageSize: this.pages,
					telephone: this.phone,
					shopname: this.name,
					checkstate: this.stat,
					shopstate: this.shopstate,
					shoptypename: this.shoptypename
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				cjxx('shop/getTShopPageList', params).then(res => {
					console.log(res)
					console.log(res.isSuccess)
					if (res.isSuccess) {
						setTimeout(() => {
							loading.close();
						}, 1000);
					}
					this.tableData = res.resultData.content;
					if (res.resultData.content) {
						for (let i = 0; i < this.tableData.length; i++) {
							this.tableData[i].balance = this.tableData[i].balance * 1
						}
					} else {
						setTimeout(() => {
							loading.close();
						}, 1000);
					}

					this.zong = res.resultData;
					// if(this.tableData == null){

					// }


				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.cjxx()
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
						type: 'error',
						message: '已取消删除'
					});
				});
			}
		},
		mounted() {
			this.cjxx()
		}
	}
</script>
<style scoped="scoped" lang='less'>
	.tablebox{
		height: 590px;
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
		margin-top: 20px;
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



	.demo-image__preview {
		img {
			width: 60px;
			height: 60px;
		}

	}

	.dox1 {
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
			text-align: right;

			span {
				margin-right: 20px;
			}
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

	.atr1 {
		width: 180px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.atr2 {
		width: 350px;

		span {
			margin-left: 20px;
		}
	}

	.atr4 {
		height: 120px;
		margin-right: 10px;
	}

	.atr5 {
		display: flex;

		.el-image {
			width: 150px;
			height: 100px;
			margin-left: 10px;
		}

		margin-left: 10px;
	}

	.atr6 {
		display: flex;
		margin-left: 20px;

		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin-top: 10px;
		}

		button {
			border: none;
			outline: none;
			cursor: pointer;
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

			.table {
				border-collapse: collapse;
				border-color: #dae3ec;
				border: 1px solid #ccc;
				/* margin: 20px auto; */
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

						/* &::before {
							content: '*';
							color: red;
						} */  
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
