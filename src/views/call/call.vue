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
							<span class="fenl1">通告</span>
							<div class="yoou">
								<!-- <div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div> -->
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="sousu">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="tablebox650">
							<el-table :data="callList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column label="标题"  >
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItem(scope.row)">{{scope.row.title}}</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="name" label="类型">
									<template slot-scope="scope">
										<div class="setbox">
											<span v-if="scope.row.type == 1">会议通告</span>
											<span v-if="scope.row.type == 2">奖惩通告</span>
											<span v-if="scope.row.type == 3">活动公告</span>
										</div>
									</template>
								</el-table-column>
								
								<el-table-column prop="content" label="内容">
									<template slot-scope="scope">
										<div class="setbox">
											<span>{{scope.row.content}}</span>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="name" label="查阅状态" >
									<template slot-scope="scope">
										<div class="setbox">
											<span v-if="scope.row.readFlag == 0">未读</span>
											<span v-if="scope.row.readFlag == 1">已读</span>
										</div>
									</template>
								</el-table-column>
								
								<el-table-column prop="strCreateDate" sortable label="发布时间" >
								</el-table-column>
								<!-- <el-table-column label="操作" width="220">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="handleEdit(scope.$index, scope.row)" style="color: red;">删除</div>
											
										</div>
									</template>
								</el-table-column> -->
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								总共{{totalpage}}条记录
							</div>
							<div style="display: flex; align-items: center;">
								<span>每页显示</span>
								<el-pagination  :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="totalpage" 
						 :current-page.sync="nowpage" @current-change='currentclick'>
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
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">查看详情</div>
				<div class="content">
					<div class="ctitle">{{itemInfo.title}}</div>
					<span>发布时间{{itemInfo.strCreateDate}}</span>
					<div class="ctext">
						{{itemInfo.content}}
					</div>
				</div>
				
				<div class="bottom">
					<!-- <el-button type="primary">确定</el-button> -->
					<el-button type="info" @click="infobox = false">关闭</el-button>
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
	
	import {getCallList} from '../../request/API/request.js'
	export default {
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
				textarea1:'',
				routerList:[],
				tableData1: [],
				page:0,
				pageSize:10,
				totalpage:'',  
				nowpage:'',
				callList:[],
				itemInfo:''
			}
			
		},
		methods: {
			getItem(row){
				this.itemInfo = row;
				this.infobox = true
			},
			currentclick(e){
				console.log('点击下一页');
				let _this = this;
				console.log(e)
				_this.page = e - 1;
				_this.getCallListpage()
			},
			getCallListpage(e){
				let _this = this;
				if(e == 0){
					_this.page = 0
				}
				let params = {
					userId:'',
					pageIndex:_this.page,
					pageSize:_this.pageSize
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getCallList('order/selectOaNotifyRecordPageList',params).then(res => {
					console.log(res);
					_this.callList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
					setTimeout(() => {
						loading.close();
					}, 500);
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
			},
			sousu(){
				this.page=0
				this.getCallListpage()
			},
			

		},
		mounted() {
			this.getCallListpage()
			
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
			font-size: 16px;
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
			width: 1000px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			height: 680px;
			.title{
				width: 1000px;
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
			}
			.content{
				font-size: 18px;
				.ctitle{
					font-size: 20px;
					font-weight: bold;
					margin-bottom: 10px;
				}
				span{
					font-size: 16px;
					color: #666;
					margin-left: 20px;
				}
				.ctext{
					margin-top: 30px;
					margin-left: 20px;
					text-indent: 36px;
				}
			}
			.table{
				// border-collapse: collapse;
				// border-color: #dae3ec;
				// border: 1px solid #ccc;
				margin: 20px auto;
				font-size: 18px;
				tr{
					width: 100%;
					border-color: #dae3ec;
					height: 64px;
					
					td{
						box-sizing: border-box;
						padding: 10px;
					}
					.text{
						width: 183px;
						height: 64px;
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
						width: 748px;
						height: 178px;
						word-wrap: break-word
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
