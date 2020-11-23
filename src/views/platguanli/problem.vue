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
							<span class="fenl1">常见问题解答</span>
							<div class="yoou">
								<div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="" >
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="quest" placeholder="问题" size="medium" @change="getproblemListpage(0)"></el-input>
								
								<el-select v-model="state" size="medium" placeholder="状态" @change="getproblemListpage(0)">
									<el-option key="0" value="0" label="显示"></el-option>
									<el-option key="1" value="1" label="不显示"></el-option>
								</el-select>
								
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @click="getproblemListpage">
								<div class="shuax" @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="problemList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column  label="问题" >
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItemInfo(scope.row,0)">{{scope.row.quest}}</div>
											
										</div>
									</template>
								</el-table-column>
								<el-table-column label="解答详情链接" width="700" >
									<template slot-scope="scope">
										<a :href="scope.row.url">{{scope.row.url}}</a>
									</template>
								</el-table-column>
								<el-table-column  label="状态" width="100">
									<template slot-scope="scope">
										<div v-if="scope.row.state == 1">不显示</div>
										<div v-if="scope.row.state == 0">显示</div>	
									</template>
								</el-table-column>
								
								<el-table-column prop="strAdtime" sortable label="创建时间">
								</el-table-column>
								<el-table-column prop="remarks" label="备注信息">
								</el-table-column>
								<el-table-column label="操作">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItemInfo(scope.row,2)">修改</div>
											<div style="color: #ff0000;" type="danger" @click="delIteminfo(scope.row)">删除</div>
											
										</div>
									</template>
								</el-table-column>
								
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								<sapn >总共{{totalpage}}条数据</sapn>
								
							</div>
							<div style="display: flex; align-items: center;">
								<!-- <span>每页显示</span> -->
								<el-pagination layout="prev, pager, next,jumper" :current-page.sync="nowpage" :total="totalpage" @prev-click="prevpage" @next-click="nextpage" @current-change='currentclick'>
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
				<div class="title">新建常见问题</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							
							<td class="text">问题:</td>
							<td>
								<el-input v-model="nquest" placeholder="请输入内容"></el-input>
							</td>
							
						</tr>
						
						<tr>
							<td class="text">状态:</td>
							<td>
								<el-select v-model="nstate" size="mini" placeholder="消息标题" style="width: 200px;">
									<el-option key="1" value="1" label="不显示"></el-option>
									<el-option key="0" value="0" label="显示"></el-option>
								</el-select>
							</td>
							
						</tr>
						<tr>
							<td class="text">解答详情:</td>
							<td colspan="3" style="width: 980px;">
								<div class="" style="height: 500px; width: 900px;"> 
								<!-- value -->
									<!-- <el-input 
									show-word-limit
									 type="textarea"
									  :autosize="{ minRows: 5, maxRows: 6}"
									  ></el-input> -->
									  <quill-editor v-model="nanswer" ref="myQuillEditor" style="height: 400px;word-wrap: break-word; word-break: normal;" :options="editorOption">
									  </quill-editor>
									
									<!-- <textarea name="" id="" cols="30" rows="10" v-model="nanswer" v-html="nanswer"></textarea> -->
								</div>
							</td>
						</tr>
						<tr>
							<td class="text nobefor">备注信息:</td>
							<td colspan="3">
								<div class="">
									<el-input
									show-word-limit
									 type="textarea"
									  placeholder="请输入内容"
									  v-model="nremark"
									  :autosize="{ minRows: 1, maxRows: 2}"
									  >
									</el-input>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="addProblem">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title" v-if="eidtType == 0">查看常见问题</div>
				<div class="title" v-if="eidtType == 2">修改常见问题</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							
							<td class="text nobefor">问题:</td>
							<td>
								<el-input :value="itemInfo.quest" v-if="eidtType == 0"></el-input>
								<el-input v-if="eidtType == 2" v-model="dquest" ></el-input>
							</td>
							
						</tr>
						
						<tr>
							<td class="text nobefor">状态:</td>
							<td>
								<el-input v-if="itemInfo.state == 1 && eidtType == 0" value="显示" ></el-input>
								<el-input v-if="itemInfo.state == 0 && eidtType == 0" value="不显示" ></el-input>
								<el-select v-model="dstate" size="mini" placeholder="状态"  v-if="eidtType == 2" style="width: 200px;">
									<el-option key="1" value="1" label="显示"></el-option>
									<el-option key="0" value="0" label="不显示"></el-option>
								</el-select>
							</td>
							
						</tr>
						<tr>
							<td class="text nobefor">解答详情:</td>
							<td colspan="3" style="width: 700px;">
								<div class="value" v-if="eidtType == 0">
									<el-input 
									show-word-limit
									 type="textarea"
									  placeholder="请输入内容"
									  :value="itemInfo.answer"
									  :autosize="{ minRows: 5, maxRows: 6}"
									  >
									</el-input>
								</div>
								<div class="" style="height: 500px; " v-if="eidtType == 2">
								
									  <quill-editor v-model="danswer" ref="myQuillEditor" style="height: 400px; width: 400px;word-wrap: break-word; word-break: normal;" :options="editorOption">
									  </quill-editor>
									
									
								</div>
							</td>
						</tr>
						<tr>
							<td class="text nobefor">备注信息:</td>
							<td colspan="3">
								<div class="" v-if="eidtType == 0">
									<el-input
									show-word-limit
									 type="textarea"
									  placeholder="请输入内容"
									  :value="itemInfo.remarks"
									  :autosize="{ minRows: 1, maxRows: 2}"
									  >
									</el-input>
								</div>
								<div class="" v-if="eidtType == 2">
									<el-input
									show-word-limit
									 type="textarea"
									  placeholder="请输入内容"
									  v-model="dremark"
									  :autosize="{ minRows: 1, maxRows: 2}"
									  >
									</el-input>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click='xiuIteminfo'>确定</el-button>
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
	//引入富文本
	import {
	    quillEditor
	  } from 'vue-quill-editor'
	  import 'quill/dist/quill.core.css'
	  import 'quill/dist/quill.snow.css'
	  import 'quill/dist/quill.bubble.css'
	
	import {getProblemList , CreatptProblem}  from '../../request/API/request.js'
	export default {
		inject:['reload'],
		components: {
			Header,
			Left,
			Footer,
			Daohang,
			quillEditor
		},
		data() {
			return {
				editorOption:{} , //富文本
				infobox: false,
				addbox: false,
				eidtType:'', //操作type 0查看 1删除 2修改
				page:0,
				pageSize:10,
				totalpage:'',
				//检索
				quest:'',
				state:'',
				//新建
				nquest:'',
				nstate:'',
				nanswer:null,
				nremark:'',
				//删除
				dquest:'',
				dstate:'',
				danswer:'',
				dremark:'',
				
				itemInfo:'',
				itemId:'',
				
				problemList: [],
				nowpage:''
			}

		},
		methods: {
			//修改
			xiuIteminfo(){
				let _this = this;
				if(_this.dstate == '显示'){
					_this.dstate = 0
				}else{
					_this.dstate = 1
				}
				this.$confirm('此操作将修改该信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id:_this.itemId,
						quest:_this.dquest,
						state:_this.dstate,
						answer:_this.danswer,
						remark:_this.dremark
						
					}
					CreatptProblem('platform/editTFaq',params).then(res => {
						console.log(res);
						if(res.isSuccess){
							_this.$message({
								message: "删除成功!",
								type: 'success',
								duration: 500
							});
							_this.infobox = false;
							_this.getproblemListpage()
							
							
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
						message: '已取消删除'
					});
				});
				
			},
			//删除
			delIteminfo(row){
				let _this = this;
				console.log(row)
				
				this.$confirm('此操作将修改该信息, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = {
						id:row.id,
						quest:row.quest,
						state:row.state,
						answer:row.answer,
						remark:_this.dremark,
						delFlag:1
					}
					CreatptProblem('platform/editTFaq',params).then(res => {
						console.log(res);
						if(res.isSuccess){
							_this.$message({
								message: "删除成功!",
								type: 'success',
								duration: 500
							});
							_this.getproblemListpage()
							
							
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
						message: '已取消删除'
					});
				});
				
				
				
			},
			//获取item信息 （修改使用）
			getItemInfo(row,e){ //e 0 查看  1删除   2修改
				let _this = this;
				_this.eidtType = e;
				if(e != 1){
					_this.infobox = true;
				}
				if(row.state == 0){
					_this.dstate = '显示'
				}else{
					_this.dstate = '不显示'
				}
				_this.itemId = row.id 
				_this.dquest = row.quest
				// _this.dstate = row.state
				_this.danswer = row.answer
				_this.dremark = row.remarks
				
				
				// _this.itemInfo = row;
				// _this.itemId = row.id
				// _this.dquest = row.quest
				// _this.dstate = row.state
				// _this.danswer = row.answer
				// _this.dremark = row.remark
				console.log(row)
			},
			//新建问题
			addProblem(){
				let _this = this;
				if(_this.nquest == '' || _this.nstate == ''|| _this.nanswer == ""){
					_this.$message({
						message: '请填写完整的信息',
						type: 'error',
						duration: 1500
					});
					return;
				}
				console.log(_this.nanswer)
				let params = {
					id:'',
					quest:_this.nquest,
					state:_this.nstate,
					answer:_this.nanswer,
					remark:_this.nremark,
					// delFlag:'', 删除标记
				};
				CreatptProblem('platform/editTFaq',params).then(res => {
					console.log(res);
					if(res.isSuccess){
						_this.$message({
							message: "新建成功!",
							type: 'success',
							duration: 500
						});
						_this.addbox = false;
						_this.getproblemListpage()
						
						
					}else{
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 1000
						});
					}
				})
				
				
			},
			resect(){
				this.quest='';
				this.state='';
				this.page = 0;
				this.reload()
				this.getproblemListpage()
			},
			
			currentclick(e){
				let _this = this;
				_this.page = e-1
				_this.getproblemListpage()
			},
			getproblemListpage(e){
				let _this = this;
				if(e == 0){
					_this.page = 0;
					// this.reload()
				}
				let params = {
					pageIndex:_this.page,
					pageSize:_this.pageSize,
					quest:_this.quest,
					state:_this.state,
					id:''
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getProblemList('platform/getTFaqPageList',params).then(res => {
					console.log(res);
					if(res.isSuccess){

						_this.problemList = res.resultData.content;
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
		mounted(){
			this.getproblemListpage()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.nobefor {
		&::before {
			content: '' !important;
		}
	}
	/*包含以下四种的链接*/
	  a {
	      text-decoration: none;
		  color:#0b9cf4 !important;
	  }
	  /*正常的未被访问过的链接*/
	  a:link {
	      text-decoration: none;
		  color:#0b9cf4 !important;
	  }
	  /*已经访问过的链接*/
	 a:visited {
	     text-decoration: none;
		 color:#0b9cf4 !important;
	 }
	 /*鼠标划过(停留)的链接*/
	 a:hover {
	     text-decoration: none;
		 color:#0b9cf4 !important;
	 }
	 /* 正在点击的链接*/
	 a:active {
	     text-decoration: none;
		 color:#0b9cf4 !important;
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
	.tablebox{
		box-sizing: border-box;
		padding: 10px;
		background: #fff;
	}

	.el-table {
		// margin-top: 10px;
		z-index: 10;

		th>.cell {
			color: #333 !important;
			font-size: 16px;
		}
		td{
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
		.btngrap{
			height: 60px;
			width: 200px;
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #0b9cf4;
			cursor: pointer;
			.shuax{
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
				img{
					width: 24px;
					height: 22px;
					margin-right: 10px;
				}
			}
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
