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
							<span class="fenl1">版本管理</span>
							<div class="yoou">
								<div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="editongList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column label="软件名称" width="100" @row-click="lookinfo">
									<template slot-scope="scope">
										<div class="setbox">
											<div>{{scope.row.vname}}</div>
											
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="vnum" label="软件版本号" width="100">
								</el-table-column>
								<el-table-column label="上传软件" width="600">
									<template slot-scope="scope">
										<div class="setbox">
											<a :href="scope.row.upaddr">{{scope.row.upaddr}}</a>
											<!-- <div>{{scope.row.upaddr}}</div> -->
											
										</div>
									</template>
								</el-table-column>
								<el-table-column label="软件更新描述" >
									<template slot-scope="scope">
										<div class="miaobox">
											<div>{{scope.row.address}}</div>
											
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="strAdtime" label="创建时间" width="100">
								</el-table-column>
								<el-table-column prop="strUptime" label="更新时间" width="100">
								</el-table-column>
								<el-table-column prop="remarks" label="备注信息">
								</el-table-column>
								<el-table-column label="操作" >
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItem(scope.row)">修改</div>
											<div style="color: #ff0000;" type="danger" @click="delEditong(scope.row)">删除</div>
											
										</div>
									</template>
								</el-table-column>
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								
								<sapn >总共{{totalpage}}条记录</sapn>
							</div>
							<div style="display: flex; align-items: center;">
								<!-- <span>每页显示</span> -->
								<el-pagination  layout="prev, pager, next,jumper" :total="totalpage" @current-change='currentclick'>
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
				<div class="title">新建版本</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">软件名称:</td>
							<td>
								<el-input v-model="nname" placeholder="请输入内容"></el-input>
							</td>
							<td class="text">软件版本号:</td>
							<td>
								<el-input v-model="nnum" placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">上传软件:</td>
							<td colspan="3">
								<div  style="height: 100px;">
									<div class="img" style="height: 40px;">
										<a :href="imgurl">{{imgurl}}</a>
										<span v-if="!imgurl">无</span>
									</div>
									<el-dialog :visible.sync="dialogVisible">
									 <a :href="imgurl">{{imgurl}}</a>
									</el-dialog>
									<el-upload
									 action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false"
									 :on-success="handleAvatarSuccess" :data="imges" >
										<div class="xuanzbox">
											<el-button lot="trigger" size="medium" type="primary" >选择</el-button>
											<el-button size="medium" type="infor" @click.stop='quxaiotu'>取消</el-button>
										</div>
									</el-upload>
								</div>
							</td>
							
							
						</tr>
						<tr>
							<td class="text" >软件更新描述:</td>
							<td colspan="3" style="height: 150px;">
								<el-input style="height: 100px;"
								show-word-limit
								 type="textarea"
								  placeholder="请输入内容"
								  v-model="nupdesc"
								  :autosize="{ minRows: 4, maxRows: 4}"
								  >
								</el-input>
							</td>
						</tr>
						<tr>
							<td class="text nobefor" >备注信息:</td>
							<td colspan="3" style="width: 878px;">
								<el-input
								  type="textarea"
								  placeholder="请输入内容"
								  v-model="nremarks"
								  maxlength="50"
								  :autosize="{ minRows: 1, maxRows: 1}">
								</el-input>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="addEditong">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">修改版本</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">软件名称:</td>
							<td>
								<el-input v-model="dname" placeholder="请输入内容"></el-input>
							</td>
							<td class="text">软件版本号:</td>
							<td>
								<el-input v-model="dnum" placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">上传软件:</td>
							<td colspan="3">
								<div class="ranjian" style="height: 100px;">
									<div>{{dmfile}}</div>
									<div class="xuanzbox">
										<el-button type="primary">
											选择
											<input type="file" @change="chooseimg" accept="image/*,.ipa,.apk">
										</el-button>
										<el-button @click="deluserimg">清除</el-button>
									</div>
								</div>
							</td>
							
							
						</tr>
						<tr>
							<td class="text" >软件更新描述:</td>
							<td colspan="3" width="748px">
								<el-input style="height: 100px;"
								show-word-limit
								 type="textarea"
								  placeholder="请输入内容"
								  v-model="dupdesc"
								  :autosize="{ minRows: 5, maxRows: 6}"
								  >
								</el-input>
							</td>
						</tr>
						<tr>
							<td class="text nobefor" >备注信息:</td>
							<td colspan="3" style="width: 878px;">
								<el-input
								  type="textarea"
								  placeholder="请输入内容"
								  v-model="dremarks"
								  maxlength="50"
								  :autosize="{ minRows: 1, maxRows: 1}">
								</el-input>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="xiuEditong">确定</el-button>
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
	
	import {getEditongList , CreatptEditiong} from '../../request/API/request.js'
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
				infobox:false,
				addbox:false,
				page:0,
				pageSize:10,
				textarea1:'',
				tableData1: [],
				editongList:[],
				totalpage:'',
				//新建
				ntype:'',
				nname:'',
				nnum:'',
				nmfile:'', //文件apk
				nremarks:'', //备注
				nupdesc:'', //描述
				id:'',//主键id(修改/删除必传)
				
				itemInfo:'', //单个信息
				//修改
				dtype:'',
				dname:'',
				dnum:'',
				dmfile:'', //文件apk
				dremarks:'', //备注
				dupdesc:'', //描述
				nowpage:'',
				imges:{
					path:'/version'
				},
				imgurl:'',
				dialogVisible:false
				
			}
			
		},
		methods: {
			resect(){
				this.page = 0;
				this.geteditongListpage();
				this.reload()
				
			},
			//图片选择
			handleAvatarSuccess(res, file) {
				console.log(this.imgurl)
				const loading = this.$loading({
					lock: true,
					text: '正在上传中，请稍等',
					background: 'rgba(255,255, 255, 0.4)'
				});
				if(res.isSuccess){
					this.imgurl = res.resultData;
					loading.close();
					// this.dialogVisible = true;
				}
				
				
			},
			quxaiotu() {
				this.imgurl = ''
			},
			chooseimg(files){
				var _this = this;
				console.log(files)
				// let file = files.target.files[0]
				// let reader = new FileReader();
				// reader.readAsDataURL(file)
				// reader.onload = e => {
				// 	console.log(e)
				// 	if(e.loaded > 1024 * 1024) {
				// 		_this.$message({
				// 			type: 'warning',
				// 			message: '图片过大，请重新上传！',
				// 			 duration: 500
				// 		});
				// 	} else {
				// 		var urlstr = e.target.result;
				// 		var i = urlstr.indexOf(',')
				// 		urlstr = urlstr.substring(i + 1);
				// 		console.log(urlstr)
						
				// 		_this.axios({
				// 			method: 'post',
				// 			url:_this.$store.state.myurl,
				// 			data: Qs.stringify({
				// 				'cmd': 'uploadImg',
				// 				imgFile: urlstr
				// 			})
				// 		}).then(res =>{
				// 			console.log(res.data)
				// 			_this.xiuuser.photo = res.data.imgUrl
				// 			console.log(_this.xiuuser.photo)
				// 		})
				// 	}
				// }
				
				
			},
			//删除
			delEditong(row){
				let _this = this;
				console.log(row)
				// _this.id = row.id
				// _this.dtype=row.type
				// _this.dname=row.vname
				// _this.dnum=row.vnum
				// _this.dmfile=row.upaddr//文件apk下载地址
				// _this.dremarks=row.remarks //备注
				// _this.dupdesc=row. //描述
				this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						type:row.type,
						vname:row.vname,
						vnum:row.vnum,
						mfile:row.upaddr,
						updesc:row.updesc,
						remarks:row.remarks,
						id:row.id,
						delFlag:1 //删除时必传 值为1
					}
					CreatptEditiong('platform/editTVersion',params).then(res => {
						console.log(res)
						if(res.isSuccess){
							_this.$message({
								message: "删除成功!",
								type: 'success',
								duration: 500
							});
							_this.geteditongListpage()
							
						}else{
							_this.$message({
								message: res.resultData,
								type: 'error',
								duration: 1000
							});
						}
						
					})
					
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除',
						duration: 1000
					});
				});
				
				
				
			},
			//修改
			xiuEditong(){
				let _this = this;
				let params = {
					type:_this.dtype,
					vname:_this.dname,
					vnum:_this.nnum,
					mfile:_this.dmfile,
					updesc:_this.nupdesc,
					remarks:_this.nremarks,
					id:_this.id,
					// delFlag:1 //删除时必传 值为1
				}
				
				CreatptEditiong('platform/editTVersion',params).then(res => {
					console.log(res)
					if(res.isSuccess){
						_this.$message({
							message: "删除成功!",
							type: 'success',
							duration: 500
						});
						_this.geteditongListpage()
						
					}else{
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 1000
						});
					}
				})
			},
			//获取信息
			getItem(row){
				let _this = this;
				console.log(row);
				_this.infobox = true;
				_this.itemInfo = row;
				_this.id = row.id
				_this.dtype=row.type
				_this.dname=row.vname
				_this.dnum=row.vnum
				_this.dmfile=row.upaddr//文件apk下载地址
				_this.dremarks=row.remarks //备注
				// _this.dupdesc=row. //描述
			},
			//新建
			addEditong(){
				let _this = this;
				let params = {
					type:'', //类型
					vname:_this.nname,
					vnum:_this.nnum, //版本号
					mfile:_this.imgurl,
					updesc:_this.nupdesc,
					remarks:_this.nremarks,
					id:'', //主键id(修改/删除必传)
					//delFlag:1 //删除时必传 值为1
				}
				CreatptEditiong('platform/editTVersion',params).then(res => {
					console.log(res)
					if(res.isSuccess){
						_this.$message({
							message: "删除成功!",
							type: 'success',
							duration: 500
						});
						_this.geteditongListpage()
						
					}else{
						_this.$message({
							message: res.message,
							type: 'error',
							duration: 1000
						});
					}
				})
			},
			// prevpage(){
			// 	let _this = this;
			// 	_this.page--
			// 	// let nowpage = _this.page;
			// 	_this.geteditongListpage()
			// },
			// nextpage(){
			// 	let _this = this;
			// 	_this.page++
			// 	// let nowpage = _this.page;
			// 	_this.geteditongListpage()
			// },
			currentclick(e){
				let _this = this;
				_this.page = e-1
				_this.geteditongListpage()
			},
			
			//获取版本列表
			geteditongListpage(){
				let _this = this;
				let params = {
					pageIndex:_this.page,
					pageSize:_this.pageSize,
					type:'', //类型暂时没定 对接的时候定类型(客户端)
					vname:'',
					vnum:'',
					updesc:'' //更新描述
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getEditongList('platform/getTVersionPageList',params).then(res => {
					console.log(res);
					if(res.isSuccess){
					
						_this.editongList = res.resultData.content;
						_this.totalpage = res.resultData.total;
						_this.nowpage = res.resultData.pageIndex
						
						setTimeout(() => {
							loading.close();
						}, 2000);
						
						
					}else{
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 1000
						});
					}
				})
					
			},
			lookinfo(){
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
			this.geteditongListpage()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.nobefor{
		&::before{
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
		box-sizing: border-box;
		padding: 10px;
	}
	

	.el-table {
		margin-top: 10px;
		z-index: 10;
		th>.cell {
			color: #333 !important;
			font-size: 18px !important;
		}
	}
	.tdimg{
		height: 40px;
		width: 40px;
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
		}
	}
	.ranjian{
		display: flex;
		flex-direction: column;
	}
	.el-table th.cell {
		color: #333 !important;
		font-size: 16px;
	}
	.setbox{
		display: flex;
		cursor: pointer;
		div{
			margin-right: 20px;
			color: #0b9cf4;
		}
	}
	.miaobox{
		line-height: 20px;
		// font-size: 16px;
		word-wrap: break-word;
		width: 350px;
	}
	.xuanzbox {
		width: 100px;
		display: flex;
		// flex-direction: column;
		align-items: center;
		position: relative;
	
		.el-button {
			width: 80px;
			height: 36px;
			font-size: 16px;
			margin-top: 20px;
			margin-right: 10px;
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
			// width: 1080px;
			// height: 780px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			.title{
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
			}
			.table{
				border-collapse: collapse;
				border-color: #dae3ec;
				border: 1px solid #ccc;
				// margin: 20px auto;
				font-size: 18px;
				tr{
					width: 100%;
					border-color: #dae3ec;
					height: 60px;
					
					td{
						box-sizing: border-box;
						padding: 10px;
					}
					.text{
						width: 180px;
						height: 60px;
						background-color: #fafafa;
						font-size: 18px;
						color: #666666;
						text-align: right;
						box-sizing: border-box;
						padding-right: 20px;
						&::before{
							content: '*';
							color: red;
						}
					}
					
					.value{
						width: 878px;
						height: 178px;
						word-wrap: break-word;
						font-size: 16px;
					}
					.touxset{
						height: 146px;
						width: 220px;
						margin: 0px auto;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.img{
							height: 90px;
							width: 90px;
							border-radius: 50%;
							overflow: hidden;
							img{
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
							input{
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
			.bottom{
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
