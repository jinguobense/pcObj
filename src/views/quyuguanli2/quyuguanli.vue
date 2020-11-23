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
								<span class="fenl1">区域管理列表</span>
								<div class="yoou">
									<img src="../../assets/img/baijia.png" alt="" class="imgone">
									<span class="span1">新建</span>
									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open()">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1">
									<img src="../../assets/img/Excel.png" alt="" class="imgone1">
								</div>
							</div>
							<div class="hezi">
								<div>
									<el-input v-model="input" placeholder="登录名"></el-input>
									<el-input v-model="input" placeholder="姓名"></el-input>
									<el-select v-model="value" placeholder="管理省份">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									<el-select v-model="value" placeholder="管理市">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									<el-select v-model="value" placeholder="管理区县">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
								<div class="box2">
									<img src="../../assets/img/sousu.png" alt="">
									<div class="box3" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">

								<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
								 @select="deld" @select-all="quanxuan">
									<el-table-column type="selection" width="47">
									</el-table-column>
									<el-table-column prop="name" label="厂家头像" width="80">
										<div class="demo-image__preview" slot-scope="scope">
											<el-image style="width: 40px; height: 40px" :src="scope.row.photo" :preview-src-list="srcList">
											</el-image>
										</div>
									</el-table-column>
									<el-table-column label="登录名" width="120" prop="loginName">
										<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
									</el-table-column>
									<el-table-column prop="name" label="姓名" width="80">
									</el-table-column>
									<el-table-column prop="mobile" label="手机号" width="120">
									</el-table-column>
									<el-table-column prop="provname" label="管理省份" width="120">
									</el-table-column>
									<el-table-column prop="cityname" label="管理市区" width="120">
									</el-table-column>
									<el-table-column prop="townname" label="管理县区" width="120">
									</el-table-column>
									<el-table-column prop="addr" label="详细地址" width="220">
									</el-table-column>
									<el-table-column prop="name" label="是否有权限" width="140">
										<div slot-scope="scope">
											<span v-if="scope.row.loginFlag==1">可登陆</span>
											<span v-if="scope.row.loginFlag==0">不能登陆</span>
										</div>
									</el-table-column>
									<el-table-column prop="strAdtime" label="开始时间" width="190">
									</el-table-column>
									<el-table-column prop="operationName" label="操作人" width="130">
									</el-table-column>
									<el-table-column fixed="right" label="操作" width="120">
										<template slot-scope="scope">
											<el-button @click.native.prevent="deleteRow(scope.row)" type="text" size="small" @click="dialogVisible = true">
												修改
											</el-button>
										</template>

									</el-table-column>
								</el-table>

								<div class="block" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
									<div class="demonstration">
										显示第 {{zong.pageIndex}} 页
									</div>
									<div style="display: flex; align-items: center;">
										<span>每页显示</span>
										<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="zong.total"
										 @current-change="handleCurrentChange">
										</el-pagination>
									</div>
								</div>
							</div>
						</div>
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">
									新建管理员信息
								</div>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="tbale" rowspan="2">
											<span>
												头像:
											</span>
										</td>
										<td class="blle" rowspan="2">
											<div class="kfjbvm">
												<img :src="xiugai.photo" alt="">
												<div>
													<button class="b1">选择</button>
													<button class="b2">清除</button>
												</div>
											</div>
										</td>
										<td class="tbale1">
											<span>
												登录名:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="dlname" placeholder="请输入登录名"></el-input>
										</td>
									</tr>
									<tr>

										<td class="tbale1">
											<span>
												姓名:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="name1" placeholder="请输入姓名"></el-input>
										</td>
									</tr>
									<tr>

										<td class="tbale1">
											<span>
												工号:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="gonghao" placeholder="请输入工号"></el-input>
										</td>
										<td class="tbale1">
											<span>
												密码:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="mima1" placeholder="请输入密码"></el-input>
										</td>
									</tr>
									<tr>

										<td class="tbale1">
											<span>
												手机号:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="phone" placeholder="请输入手机号"></el-input>
										</td>
										<td class="tbale1">
											<span>
												确认密码:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="mima2" placeholder="确认密码"></el-input>
										</td>
									</tr>
									<tr>

										<td class="tbale1">
											<span>
												邮箱:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="youxiang" placeholder="请输入邮箱"></el-input>
										</td>

									</tr>
								</table>
								<!-- <div class="baoguolie">
									<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
										<tr>
											<td class="tbale">
												<span>
													头像:
												</span>
											</td>
											<td class="blle">
												<div class="kfjbvm">
													<img src="../../assets/img/shuaxinb.png" alt="">
													<div>
														<button class="b1">选择</button>
														<button class="b2">清除</button>
													</div>
												</div>
											</td>
										</tr>
										<tr>
											<td class="tbale1">
												<span>
													工号:
												</span>
											</td>
											<td class="blle1">
												<span>
													468746746846
												</span>
											</td>
										</tr>
										<tr>
											<td class="tbale1">
												<span>
													手机号:
												</span>
											</td>
											<td class="blle1">
												<span>
													4564564564
												</span>
											</td>
										</tr>
										<tr>
											<td class="tbale1">
												<span>
													邮箱:
												</span>
											</td>
											<td class="blle1">
												<span>
													456454646546
												</span>
											</td>
										</tr>
									</table>
									<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
										<tr>
											<td class="tbale1">
												<span>
													工号:
												</span>
											</td>
											<td class="blle1">
												<span>
													468746746846
												</span>
											</td>
										</tr>
										<tr>
											<td class="tbale1">
												<span>
													工号:
												</span>
											</td>
											<td class="blle1">
												<span>
													468746746846
												</span>
											</td>
										</tr>
										<tr>
											<td class="tbale1">
												<span>
													手机号:
												</span>
											</td>
											<td class="blle1">
												<span>
													4564564564
												</span>
											</td>
										</tr>
										<tr>
											<td class="tbale1">
												<span>
													邮箱:
												</span>
											</td>
											<td class="blle1">
												<span>
													456454646546
												</span>
											</td>
										</tr>
									</table>
								</div> -->
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="jkl">
											<span>
												区县:
											</span>
										</td>
										<td class="oku">
											<div class="zuori">
												<el-input v-model="input" placeholder="省份"></el-input>
												<el-input v-model="input" placeholder="市区"></el-input>
												<el-input v-model="input" placeholder="县区"></el-input>
											</div>
										</td>
									</tr>
									<tr>
										<td class="jkl">
											<span>
												办公详细地址:
											</span>
										</td>
										<td class="oku">
											<span>
												<el-input v-model="dizhi" placeholder="请输入详细地址"></el-input>
											</span>
										</td>
									</tr>
								</table>
								<div class="ordern">
									<div class="ordern1">
										<span>
											是否允许登录:
										</span>
									</div>
									<div class="ordern2">
										<el-select size="medium" placeholder="选择权限" v-model="quanxian">
											<el-option key="1" value="1" label="允许登录"></el-option>
											<el-option key="0" value="0" label="禁止登录"></el-option>
										</el-select>
									</div>
								</div>
								<div class="bottom">
									<el-button @click="dialogVisible = false">取 消</el-button>
									<el-button type="primary" @click="quding">确 定</el-button>
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
		qygly,
		qygldel
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
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				srcList: [
					'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
					'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				],
				input: '',
				textarea: '',
				dialogVisible: false,
				page: 0,
				pages: 10,
				dnane: '',
				name: '',
				provid: '',
				cityid: '',
				townid: '',
				zong: [],
				goodsidlist: [],
				xiugai: '',
				quanxian: '', //权限选择
				dizhi: '', //地址
				youxiang: '',
				phone: '',
				mima1: '',
				mima2: '',
				gonghao: '',
				name1: '',
				dlname: '',

				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				tableData: [],
				multipleSelection: []
			}
		},
		methods: {
			quding() {
				this.dialogVisible = false
			},
			qygldel() {
				let params = {
					ids: this.goodsidlist.join(",")
				}
				qygldel('platform/deleteSysUser', params).then(res => {
					this.$message({
						type: 'success',
						message: res.resultData
					});
					this.qygly()
				})
				this.goodsidlist = ''
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

			qygly() {
				let params = {
					pageIndex: this.page, //当前页
					pageSize: this.pages, //每页大小
					loginName: this.dnane, //登录名
					name: this.name, //姓名
					provid: this.provid, //省级ID
					cityid: this.cityid, //市级ID
					townid: this.townid, //区县ID
				}
				qygly('platform/selectSysUserPageList', params).then(res => {
					console.log(res.resultData.content)
					this.tableData = res.resultData.content
					this.zong = res.resultData
				})
			},
			deleteRow(e) {
				console.log(e)
				this.xiugai = e
				this.dlname = this.xiugai.loginName
				this.name1 = this.xiugai.name
				this.gonghao = this.xiugai.no
				this.dizhi = this.xiugai.addr
				this.phone = this.xiugai.mobile
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.qygly()
				console.log(`当前页: ${val}`);
			},
			open() {
				this.$confirm('确认要删除该厂家分类记录吗?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.qygldel()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
		mounted() {
			this.qygly()
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
		margin-top: 20px;
		margin-bottom: 20px;
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

	.tbale {
		width: 180px;
		height: 120px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.tbale1 {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.blle1 {
		width: 350px;
		height: 60px;

		.el-input {

			margin-left: 20px;
		}

	}

	.blle {
		width: 350px;
		height: 120px;

		span {

			margin-left: 20px;
		}
	}

	.baoguolie {
		display: flex;
	}

	.kfjbvm {
		margin-left: 20px;
		display: flex;

		img {
			border-radius: 50%;
			width: 90px;
			height: 90px;
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

	.jkl {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.oku {
		width: 878px;
		height: 60px;

		span {

			margin-left: 20px;
		}
	}

	.pslkc {
		width: 350px;
	}

	.ordern {
		display: flex;
		align-items: center;
		border: 1px solid #e4e4e4;
		margin-top: 20px;
		width: 590px;
		margin-left: 5px;
	}

	.ordern1 {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;
		margin-right: 20px;

		span {
			margin-right: 20px;
			line-height: 60px;
		}
	}

	.ordern2 {
		width: 350px;
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
</style>
