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
							<span class="fenl1">平台商品分类</span>
							<div class="yoou">
								<div @click="addbox=true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" @click="getptfenleipage()" class="imgone1">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="tablebox700">
							<el-table :data="tableData1" style="width: 100%" row-key='id' border stripe lazy :load='load' :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="name" label="分类名称" width="180">
								</el-table-column>
								<el-table-column label="图片" width="180">
									<template slot-scope="scope">
										<div class="img" style="height: 40px; width: 40px; overflow: hidden;">
											<img :src="scope.row.img" style="height: 100%; width: 100%;" alt="">
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="sort" label="排序">
								</el-table-column>
								<el-table-column label="状态">
									<template slot-scope="scope">
										<span v-if="scope.row.state == 0">显示</span>
										<span v-if="scope.row.state == 1">不显示</span>
									</template>
								</el-table-column>
								<el-table-column prop="strAdtime" label="创建时间">
								</el-table-column>
								<el-table-column prop="strUptime" label="更新时间">
								</el-table-column>
								<el-table-column label="操作" width="300">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="editInfopage(1,scope)">查看</div>
											<div @click="editInfopage(0, scope)">修改</div>
											<div size="mini" type="danger" @click="delinfo(scope.row)">删除</div>
											<div size="mini" v-if="scope.row.parentId == 0" @click="openxia(scope)">添加下级</div>
											<!-- <div size="mini" v-if="scope.row.id < 2" @click="handleEdit(scope.$index, scope)">添加下级</div> -->
										</div>
									</template>
								</el-table-column>
							</el-table>

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
				<div class="title">新建平台商品一级分类信息</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text" rowspan="2">图片:</td>
							<td rowspan="2" class="touxbox">
								<!-- <div class="touxset">
									<div class="tdimg">
										<img src="../../assets/logo.png" alt="">
									</div>
									<div class="xuanzbox">
										<el-button type="primary">
											选择
											<input type="file" @change="chooseimg" accept="image/*">
										</el-button>
										<el-button @click="deluserimg">清除</el-button>
									</div>
								</div> -->
								<div class="touxset">
									<el-upload action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess"
									 :data="imges">
										<div class="img">
											<img v-if="imgurl" :src="imgurl">
											<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 90px;"></i> -->
										</div>
										<div class="xuanzbox">
											<el-button lot="trigger" size="medium" type="primary">选择</el-button>
											<el-button size="medium" type="infor" @click.stop='quxaiotu'>取消</el-button>
										</div>
									</el-upload>

								</div>
							</td>
							<td class="text">分类名称:</td>
							<td>
								<el-input placeholder="请输入内容" v-model="feiname1"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">序号:</td>
							<td>
								<el-input v-model="feinum1" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text nobefor">上级分类:</td>
							<td>
								无需填写
							</td>
							<td class="text">状态:</td>
							<td>
								<el-select size="medium" v-model="feistate1" placeholder="请选择">
									<el-option key="0" value="0" label="显示"></el-option>
									<el-option key="1" value="1" label="不显示"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="text nobefor">备注信息:</td>
							<td colspan="3" style="width: 878px;">
								<div class="value" style="width: 100%;">
									<el-input style="width: 100%;" show-word-limit type="textarea" placeholder="请输入内容" v-model="feibei1" :autosize="{ minRows: 8, maxRows: 10}">
									</el-input>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="addyifenlei">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="addboxrow">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">新建平台商品二级分类信息</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text" rowspan="2">图片:</td>
							<td rowspan="2" class="touxbox">
								<div class="touxset">
									<el-upload action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess"
									 :data="imges">
										<div class="img">
											<img v-if="imgurl" :src="imgurl">
											<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 90px;"></i> -->
										</div>
										<div class="xuanzbox">
											<el-button lot="trigger" size="medium" type="primary">选择</el-button>
											<el-button size="medium" type="infor" @click.stop='quxaiotu'>取消</el-button>
										</div>
									</el-upload>

								</div>
							</td>
							<td class="text">分类名称:</td>
							<td>
								<el-input placeholder="请输入内容" v-model="feiname2"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">序号:</td>
							<td>
								<el-input v-model="feinum2" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">上级分类:</td>
							<td>
								<el-input :value="feiyiname" disabled></el-input>
							</td>
							<td class="text">状态:</td>
							<td>
								<el-select size="medium" v-model="feistate2" placeholder="请选择">
									<el-option key="0" value="0" label="显示"></el-option>
									<el-option key="1" value="1" label="不显示"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="text nobefor">备注信息:</td>
							<td colspan="3" style="width: 878px;">
								<div class="value" style="width: 100%;">
									<el-input style="width: 100%;" show-word-limit type="textarea" placeholder="请输入内容" v-model="feibei2" :autosize="{ minRows: 8, maxRows: 10}">
									</el-input>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="addrefenlei">确定</el-button>
					<el-button type="info" @click="colse">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title" v-if="editType == 1">查看平台商品分类</div>
				<div class="title" v-if="editType == 0">修改平台商品分类</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">分类名称:</td>
							<td>
								<span v-if="editType == 1">{{editInfo.name}}</span>
								<el-input v-if="editType == 0" placeholder="请输入内容" v-model="editname"></el-input>
							</td>
							<td class="text">图片:</td>
							<td class="touxbox">
								<div class="touxset" v-if="editType == 0">
									<el-upload action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess"
									 :data="imges">
										<div class="img">
											<img v-if="imgurl" :src="imgurl">
											<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 90px;"></i> -->
										</div>
										<div class="xuanzbox">
											<el-button lot="trigger" size="medium" type="primary">选择</el-button>
											<el-button size="medium" type="infor" @click.stop='quxaiotu'>取消</el-button>
										</div>
									</el-upload>

								</div>
								<div v-if="editType == 1" class="touxset">
									<div class="img">
										<img v-if="imgurl" :src="imgurl">
										<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 90px;"></i> -->
									</div>
								</div>
							</td>

						</tr>
						<tr>
							<td class="text nobefor">上级分类</td>
							<td style="width: 350px;">
								<span v-if="editType == 1 && editInfo.parentId != 0">{{editInfo.superiorName}}</span>
								<span v-if="editInfo.parentId == 0">无</span>
								<!-- <el-input v-if="editType == 0 && editInfo.parentId != 0" placeholder="请输入内容" ></el-input> -->
							</td>
							<td class="text">序号:</td>
							<td style="width: 350px;">
								<span v-if="editType == 1">{{editInfo.sort}}</span>
								<el-input v-if="editType == 0" placeholder="请输入内容" v-model="editnum" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">状态:</td>
							<td>
								<span v-if="editType == 1 && editInfo.state == 0">显示</span>
								<span v-if="editType == 1 && editInfo.state == 1">不显示</span>

								<el-select size="medium" v-model="editstate" placeholder="请选择" v-if="editType == 0">
									<el-option key="0" value="0" label="显示"></el-option>
									<el-option key="1" value="1" label="不显示"></el-option>
								</el-select>

							</td>
							<td class="text nobefor">备注信息:</td>
							<td colspan="3" style="width: 878px;">
								<div class="value" style="width: 100%;">
									<!-- <span v-if="editType == 1">{{editInfo.remarks}}</span> -->
									<el-input style="width: 100%;" show-word-limit type="textarea" v-if="editType == 1" disabled :value="editInfo.remarks"
									 :autosize="{ minRows: 5, maxRows: 10}">
									</el-input>
									<el-input style="width: 100%;" show-word-limit type="textarea" v-if="editType == 0"  placeholder="请输入内容"
									 v-model="editbei" :autosize="{ minRows: 5, maxRows: 10}">
									</el-input>
								</div>
							</td>

						</tr>

					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" v-if="editType == 0" @click='sureEdit'>确定</el-button>
					<el-button type="info" @click="colse">取消</el-button>
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
		getptfenlei,
		Creatptfenlei,
		upLoadimg
	} from '../../request/API/request.js';
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
				addbox: false, //一级新建
				addboxrow: false, //二级
				feiname1: '', //1级新建信息
				feinum1: '',
				feistate1: '',
				feibei1: '',

				feiname2: '', //2级新建信息
				feinum2: '',
				feistate2: '',
				feibei2: '',
				feiyiname: '',
				yiid: '', //一级id

				editname: '',
				imgurl: '',
				editnum: '',
				editstate: '',
				editbei: '',
				editType: '', //编辑状态 0修改  1查看
				editInfo: '', //编辑主信息
				id: '', //当前id
				editremarks: '',



				textarea1: '', //查看

				tableData1: [],
				children: [],
				imges: {
					path: '/platformChildren'
				},
			}

		},
		methods: {
			colse() {
				this.imgurl = ''
				this.feiname1 = ''
				this.imgurl = ''
				this.feinum1 = ''
				this.feistate1 = ''
				this.feibei1
				this.infobox = false;
				this.addboxrow = false

			},
			//图片选择
			handleAvatarSuccess(res, file) {
				this.imgurl = res.resultData;
				console.log(this.imgurl)
			},
			quxaiotu() {
				this.imgurl = ''
			},

			getptfenleipage(id) {
				let _this = this;
				console.log(id);

				if (id == undefined) {
					let params = {
						parentId: 0 //一级
					}
					const loading = this.$loading({
						lock: true,
						text: '正在加载中',
						background: 'rgba(255,255, 255, 0.4)'
					});
					getptfenlei('platform/getChildren', params).then(res => {
						console.log(res);
						for (var i in res.resultData) {
							res.resultData[i].hasChildren = true;
						}
						_this.tableData1 = res.resultData;


						setTimeout(() => {
							loading.close();
						}, 1000);

					})
				} else {
					this.children=[]
					let params = {
						parentId: id
					}
					const loading = this.$loading({
						lock: true,
						text: '正在加载中',
						background: 'rgba(255,255, 255, 0.4)'
					});
					getptfenlei('/platform/getChildren', params).then(res => {
						console.log(res);

						if (res.resultData.length == 0) {
							_this.$message({
								message: '此分类暂无二级分类，如若需要请新建',
								type: 'warning',
								duration: 3000
							});
							_this.children = res.resultData;

						} else {
							_this.children = res.resultData
						}
						setTimeout(() => {
							loading.close();
						}, 1000);
					})
				}

			},
			addyifenlei() { //新建一级
				var _this = this;
				let params = {
					id: '',
					parentId: 0,
					name: _this.feiname1,
					img: _this.imgurl,
					sort: _this.feinum1,
					state: _this.feistate1,
					remarks: _this.feibei1
				}

				Creatptfenlei('platform/editTPfgType', params).then(res => {
					console.log(res)
					if (res.isSuccess) {
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration: 500
						});
						_this.addbox = false
						_this.getptfenleipage()
						_this.feiname1 = ''
						_this.imgurl = ''
						_this.feinum1 = ''
						_this.feistate1 = ''
						_this.feibei1 = ''
					} else {
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 500
						});
					}
				})
			},
			openxia(row) {
				let _this = this;
				console.log(row)
				this.addboxrow = true;
				_this.yiid = row.row.id;
				_this.feiyiname = row.row.name;


			},
			addrefenlei() { //新建二级
				var _this = this;
				let params = {
					id: '',
					parentId: _this.yiid,
					name: _this.feiname2,
					img: _this.imgurl,
					sort: _this.feinum2,
					state: _this.feistate2,
					remarks: _this.feibei2
				}

				Creatptfenlei('platform/editTPfgType', params).then(res => {
					console.log(res)
					if (res.isSuccess) {
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration: 500
						});
						_this.addboxrow = false;
						this.reload();
						this.load()
						// _this.yiid = ''
						_this.feiname2 = ''
						_this.imgurl = ''
						_this.feinum2 = ''
						_this.feistate2 = ''
						_this.feibei2 = ''
					} else {
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 500
						});
					}
				})
			},
			editInfopage(e, row) { //e 0修改 1 查看
				let _this = this;
				_this.infobox = true;
				_this.editType = e;
				console.log(row)

				_this.yiid = row.row.parentId;
				_this.id = row.row.id;
				_this.editInfo = row.row;
				if (row.row.state == 0) {
					_this.editstate = '显示'
				} else {
					_this.editstate = '不显示'
				}
				// _this.editstate = row.row.state;
				_this.editbei = row.row.remarks;
				_this.imgurl = row.row.img;
				_this.editname = row.row.name;
				_this.editnum = row.row.sort;
				// _this.editremarks = row.row.


			},
			sureEdit() { //确定修改
				let _this = this;
				
				if (_this.editstate == '显示') {
					_this.editstate = 0
				} else if(_this.editstate == '不显示') {
					_this.editstate = 1
				}
				console.log(_this.editstate)
				if(_this.editname==''){
					_this.$message({
						message: "分类名不能为空",
						type: 'error',
						duration: 500
					});
					return
				}else if(_this.imgurl==''){
					_this.$message({
						message: "图片不能为空",
						type: 'error',
						duration: 500
					});
					return
				}else if(_this.editnum==""){
					_this.$message({
						message: "序号不能为空",
						type: 'error',
						duration: 500
					});
					return
				}//else if(_this.editstate==''){
				// 	_this.$message({
				// 		message: "状态不能为空",
				// 		type: 'error',
				// 		duration: 500
				// 	});
				// 	return
				// }
				let params = {
					id: _this.id,
					parentId: _this.yiid,
					name: _this.editname,
					img: _this.imgurl,
					sort: _this.editnum,
					state: _this.editstate,
					remarks: _this.editbei,
					// delFlag:'',

				};
				Creatptfenlei('platform/editTPfgType', params).then(res => {
					console.log(res)
					if (res.isSuccess) {
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration: 500
						});
						_this.infobox = false
						_this.editbei = '';
						this.reload();
						_this.getptfenleipage()

					} else {
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 500
						});
					}
				})
			},
			delinfo(e) { //删除
				let _this = this;
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// console.log(e)
					let del = e;
					del.delFlag = 1;
					let params = del;
					console.log(del)
					Creatptfenlei('platform/editTPfgType', params).then(res => {
						console.log(res)
						if (res.isSuccess) {
							_this.$message({
								message: "删除成功!",
								type: 'success',
								duration: 500
							});
							// _this.infobox = false
							// _this.editbei = '';
							_this.getptfenleipage();
							this.reload()

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

			deluserimg() {
				console.log("清除图片")
			},

			load(tree, treeNode, resolve) {
				
				var _this = this;
				console.log(tree, treeNode, resolve)
				// console.log(tree.id)
				_this.getptfenleipage(tree.id)
				resolve(_this.children)
				setTimeout(() => {
					// _this.getptfenleipage(tree.id)
					resolve(_this.children)
				}, 1000)
			},

			addrowfenlei(index, row) {
				console.log(index, row);
				// const loading = this.$loading({
				// 	lock: true,
				// 	text: '正在加载中',
				// 	background: 'rgba(255,255, 255, 0.4)'
				// });
				// setTimeout(() => {
				// 	loading.close();
				// }, 2000);
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!',
						duration: 500
					});
					console.log(index, row);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}


		},



		mounted() {
			this.getptfenleipage()
		},
		created() {
			// console.log(this.$route);
			// let path = this.$route.matched[0].path;
			// let title = this.$route.matched[0].meta.title;
			// let arr = JSON.parse(sessionStorage.getItem("tabList"))
			// console.log(arr)
			// console.log(path,title)
			// let obj = {
			// 	path:path,
			// 	title:title
			// }
			// arr.push(obj)
			// console.log(arr)

			// sessionStorage.setItem('tabList',JSON.stringify(arr))
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
		height: 680px;
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
			font-size: 16px;
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
							border: 1px dashed #efefef;

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
