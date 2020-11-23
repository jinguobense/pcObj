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
							<span class="fenl1">日志查询</span>
							<div class="yoou">
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input placeholder="操作菜单" v-model="title" size="medium" @change="getrizhiList"></el-input>
								<el-input placeholder="操作用户" v-model="userName" size="medium" @change="getrizhiList"></el-input>
								<el-input placeholder="操作者ID" v-model="remoteAddr" size="medium" @change="getrizhiList"></el-input>
								<!-- <el-select size="medium" placeholder="所在部门">
									<el-option key="1" value="1" label="总"></el-option>
									<el-option key="0" value="0" label="财务"></el-option>
									<el-option key="0" value="0" label="市场"></el-option>
								</el-select> -->
								<el-date-picker v-model="createTime" type="datetimerange" size="medium" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期" value-format="timestamp" style="margin-left: 20px; margin-top: -8px;" @change="getrizhiList">
								</el-date-picker>
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @click="getrizhiList">
								<div class="shuax" @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="rizhiList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="title" label="操作菜单" @row-click="lookinfo">
								</el-table-column>
								<el-table-column prop="userName" label="操作用户" >
								</el-table-column>
								<el-table-column prop="remoteAddr" label="操作者ID">
								</el-table-column>
								<el-table-column prop="officeName" label="部门">
								</el-table-column>
								<el-table-column prop="strCreateDate" sortable label="操作时间" width="220">
								</el-table-column>
								<!-- <el-table-column label="操作" width="180">
									<template >
										slot-scope="scope"
										<div class="setbox">
											<div style="color: red;">删除</div>
											
										</div>
									</template>
								</el-table-column> -->
								
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center; ">
							<div class="demonstration">
								数据总条数{{totalpage}}
							</div>
							<div style="display: flex; align-items: center;">
								<span>每页显示</span>
								<el-pagination  :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="totalpage"  @current-change='currentclick'>
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
		
	</el-container>
</template>

<script>
	import Left from '../../components/Left.vue'
	import Header from '../../components/Header.vue'
	import Footer from '../../components/Footer.vue'
	import Daohang from '../../components/Daohang.vue'
	import {getRizhiList,changeTime} from '../../request/API/request.js'
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
				infobox: false,
				addbox: false,
				textarea1:'',
				value1:'',
				tableData1: [],
				page:0,
				pageSize:10,
				nowpage:'',
				totalpage:'',
				//检索字段
				title:'',
				userName:'',
				remoteAddr:'', //操作者IP
				createTime:'', //创建时间
				
				rizhiInfo:'',
				rizhiList:[],
				
			}

		},
		methods: {
			resect(){
				this.title = ''
				this.userName = ''
				this.remoteAddr = '' //操作者IP
				this.createTime = '' //创建时间
				this.page = 0;
				this.reload();
			},
			currentclick(e){
				console.log(e)
				this.page = e-1;
				this.getrizhiList()
			},
			getrizhiList(){
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
				let params = {
					page:_this.page,
					pageSize:_this.pageSize,
					//检索字段
					title:_this.title,
					userName:_this.userName,
					remoteAddr:_this.remoteAddr, //操作者IP
					createTime:Timearr, //创建时间
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getRizhiList('order/selectSysLogPageList',params).then(res => {
					console.log(res);
					_this.rizhiList = res.resultData.content;
					_this.nowpage = res.resultData.pageIndex;
					_this.totalpage = res.resultData.pageTotal
					// _this.rizhiInfo = res.resultData
					setTimeout(() => {
						loading.close();
					}, 500);
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
		mounted() {
			this.getrizhiList()
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
		// cursor: pointer;

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
				// margin: 0px 10px;

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
			width: 1000px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			height: 680px;
			.title {
				width: 1000px;
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
				margin: 20px auto;
				font-size: 18px;

				tr {
					width: 100%;
					border-color: #dae3ec;
					height: 64px;

					td {
						box-sizing: border-box;
						padding: 10px;
					}

					.text {
						width: 183px;
						height: 64px;
						background-color: #fafafa;
						font-size: 18px;
						color: #666666;
						text-align: right;
						box-sizing: border-box;
						padding-right: 20px;

						// &::before {
						// 	content: '*';
						// 	color: red;
						// }
					}

					.value {
						width: 748px;
						height: 178px;
						word-wrap: break-word
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
				left: 0;
				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}
</style>
