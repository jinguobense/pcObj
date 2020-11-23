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
							<span class="fenl1">规格管理</span>
							<div class="yoou">
								<div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" @click="getguigeListpage" class="imgone1">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="tablebox700">
							<el-table :data="geigeList" style="width: 100%" border stripe row-key="id" sort-by='sort' :default-sort="{prop:'sort',order:'descending'}" >
								<el-table-column prop="sort" sortable label="序号">
								</el-table-column>
								<el-table-column prop="value" sortable  label="键值" >
								</el-table-column>
								<el-table-column prop="name" label="规格单位" >
									<template slot-scope="scope">
										<div class="setbox">
											<div>{{scope.row.label}}</div>
											
										</div>
									</template>
								</el-table-column>
								
								
								<el-table-column label="操作" >
									<template slot-scope="scope">
										<div class="setbox">
											<!-- <div @click="infobox = true">查看</div> -->
											<div @click="editItem(scope.row)">修改</div>
											<!-- <div size="mini" type="danger" @click="delItem(scope.row)">删除</div> -->
										</div>
									</template>
								</el-table-column>
								
							</el-table>
							<!-- <div class="block" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
								<div class="demonstration">
									显示第 1 页
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination  :page-sizes="[10, 20, 300, 400]" layout="sizes, prev, pager, next,jumper" :total="1000">
									</el-pagination>
								</div>
							</div> -->
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
				<div class="title">新建规格</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							
							<td class="text">单位名称:</td>
							<td style="width: 748px;">
								<el-input v-model="name" placeholder="单位"></el-input>
							</td>
						</tr>
						
						<tr>
							<td class="text">序号:</td>
							<td style="width: 900px;">
								<el-input v-model="num"  placeholder="请输入数字序号" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
							</td>
							
						</tr>
						<tr>
							
							<td class="text">键值:</td>
							<td style="width: 1000px;">
								<el-input v-model="valuekey"  placeholder="数字键值" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
							</td>
						</tr>
						
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="addguigeItem">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">修改规格</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							
							<td class="text">单位名称:</td>
							<td >
								<el-input v-model="editname" placeholder="单位"></el-input>
							</td>
						</tr>
						
						<tr>
							<td class="text">序号:</td>
							<td >
								<el-input v-model="editnum" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
							</td>
							
						</tr>
						<tr>
							
							<td class="text">键值:</td>
							<td style="width: 1000px;">
								<el-input v-model="editvaluekey"  placeholder="数字键值" oninput="value=value.replace(/[^\d]/g,'')" :disabled="true"></el-input>
							</td>
						</tr>
						
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="sureeditItem">确定</el-button>
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
	import {
		getptguigeList,Creatptguige,delptguige
	} from '../../request/API/request.js';
	export default {
		inject: ['reload'],
		components: {
			Header,
			Left,
			Footer,
			Daohang
		},
		data() {0
			return {
				addbox: false,
				infobox:false,
				faterId:'14349feddafd46c992dd40abbf9c9e62' , //写死的值
				name:'', 
				valuekey:'',
				num:'',
				
				geigeList:'',
				itemInfo:'',
				
				editname:'',
				editvaluekey:'',
				editnum:'',
				editId:'',
			}

		},
		methods: {
			getguigeListpage(){
				let _this = this;
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				let params = {
					dictTypeId:_this.faterId
				}
				getptguigeList('platform/getDictValue',params).then(res => {
					console.log(res);
					if(res.isSuccess){
						_this.geigeList = res.resultData;
						for(let i = 0;i<_this.geigeList.length;i++){
							_this.geigeList[i].sort = _this.geigeList[i].sort*1;
							_this.geigeList[i].value = _this.geigeList[i].value *1
						}
						loading.close();
					}else{
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 500
						});
					}
					
				
				})
				
			},
			addguigeItem(){
				let _this = this;
				let params = {
					dictTypeId:'14349feddafd46c992dd40abbf9c9e62',
					label:_this.name,
					value:_this.valuekey,
					sort:_this.num,
				}
				Creatptguige('platform/saveDictValue',params).then(res => {
					console.log(res);
					if(res.isSuccess && res.resultData == '操作成功'){
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration:1000
						});
						_this.addbox = false;
						_this.getguigeListpage();
					}else{
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 1000
						});
					}
				})
			},
			editItem(e){
				console.log(e)
				let _this = this
				_this.itemInfo = e
				_this.infobox = true;
				
				_this.editname = e.label;
				_this.editnum = e.sort;
				_this.editvaluekey = e.value;
				_this.editId = e.id;
			},
			//确认修改
			sureeditItem(){ 
				let _this = this;
				if(_this.editname==''){
					_this.$message({
						message: '单位名称不能为空',
						type: 'error',
						duration: 2000
					});
					return
				}else if(_this.editvaluekey==''){
					_this.$message({
						message: '健值不能为空',
						type: 'error',
						duration: 2000
					});
					return
				}else if(_this.editnum==''){
					_this.$message({
						message: '序号不能为空',
						type: 'error',
						duration: 2000
					});
					return
				
				}
				let params = {
					label: _this.editname,
					value: _this.editvaluekey,
					sort: _this.editnum,
					id:_this.editId,
					dictTypeId:_this.faterId
				}
				console.log(params);
				Creatptguige('platform/saveDictValue',params).then(res => {
					console.log(res);
					if(res.isSuccess){
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration: 2000
						});
						_this.infobox = false;
						_this.getguigeListpage();
					}else{
						_this.$message({
							message: res.resultData,
							type: 'error',
							duration: 500
						});
					}
				})
				
			},
			//删除
			delItem(e){
				console.log(e);
				let _this = this;
				
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// console.log(e)
					let delid = e.id;
					let params = {
						ids:delid
					}
					delptguige('platform/deleteDictValue', params).then(res => {
						console.log(res)
						if (res.isSuccess) {
							_this.$message({
								message: "删除成功!",
								type: 'success',
								duration: 500
							});
							
							_this.getguigeListpage()
					
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
			lookinfo() {
				console.log("111")
			},
			// handleEdit(index, row) {
			// 	console.log(index, row);
			// },
			// handleDelete(index, row) {
			// 	console.log(index, row);
			// }


		},
		mounted() {
			this.getguigeListpage()
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
