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
							<span class="fenl1">关于我们</span>
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
							<el-table :data="aboutList" style="width: 100%" row-key="id" border stripe lazy >
								<el-table-column prop="type" label="类型" width="100" @row-click="lookinfo">
								</el-table-column>
								<el-table-column label="链接内容" width="700" >
									<template slot-scope="scope">
										<div class="setbox">
											<!-- <div>{{scope.row.url}}</div> -->
											<a :href="scope.row.url">{{scope.row.url}}</a>
											<!-- <div @click="handleEdit(scope.$index, scope.row)">修改</div>
											<div size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</div>
											<div size="mini" v-if="scope.row.id < 2"  @click="handleEdit(scope.$index, scope)">添加下级</div> -->
										</div>
									</template>
								</el-table-column>
								
								<el-table-column prop="strAdtime" label="创建时间" width="200">
								</el-table-column>
								<el-table-column prop="strUptime" label="更新时间" width="200">
								</el-table-column>
								<el-table-column prop="mgnLoginName" label="备注信息">
								</el-table-column>
								<el-table-column label="操作" width="180" fixed="right">
									<template slot-scope="scope">
										<div class="setbox">
											<div v-if="scope.row.id " @click="getItem(scope.row)">修改</div>
											<!-- <div @click="handleEdit(scope.$index, scope.row)">修改</div>
											<div size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</div>
											<div size="mini" v-if="scope.row.id < 2"  @click="handleEdit(scope.$index, scope)">添加下级</div> -->
										</div>
									</template>
								</el-table-column>
								
							</el-table>
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								显示第 1 页
							</div>
							<div style="display: flex; align-items: center;">
								<span>每页显示</span>
								<el-pagination  :page-sizes="[10, 20, 300, 400]" layout="sizes, prev, pager, next,jumper" :total="1000">
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
				<div class="title">修改协议</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							
							<td class="text">类型:</td>
							<td>
								<el-input placeholder="用户注册协议"></el-input>
							</td>
						</tr>
						<tr>
							
							<td class="text">内容详情:</td>
							<td style=" width: 748px; height: 150px;">
								<el-input style="height: 100px;"
								show-word-limit
								 type="textarea"
								  placeholder="请输入内容"
								  v-model="textarea1"
								  :autosize="{ minRows: 5, maxRows: 6}"
								  >
								</el-input>
							</td>
						</tr>
						<tr>
							<td class="text nobefor" >备注信息:</td>
							<td >
								<el-input
								show-word-limit
								 type="textarea"
								  placeholder="请输入内容"
								  v-model="textarea1"
								  :autosize="{ minRows: 1, maxRows: 2}"
								  maxlength="80"
								  >
								</el-input>
							</td>
					
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
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
	import {getAboutusList} from '../../request/API/request.js'
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
				type:'',
				textarea1:'',
				page:"",
				
				aboutList:[],
				id:'',
				xremarks:'',
				xxq:'',
			}
			
		},
		methods: {
			resect(){
				this.page = 0
				this.getaboutList()
				this.reload()
			},
			//获取单个列表
			getItem(row){
				let _this = this;
				console.log(row);
				_this.addbox = true;
				_this.id = row.id;
			},
			//获取关于我们列表
			getaboutList(){
				let _this = this;
				let params = {
					type:''
				};
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getAboutusList('platform/getTAboutusPageList',params).then(res => {
					console.log(res);
					_this.aboutList = res.resultData.content;
					setTimeout(() => {
						loading.close();
					}, 2000);
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
			this.getaboutList()
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
			.table{
				border-collapse: collapse;
				border-color: #dae3ec;
				border: 1px solid #ccc;
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
						// &::before{
						// 	content: '*';
						// 	color: red;
						// }
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
				position: absolute;
				bottom: 20px;
				left: 0;
				align-items: center;
				justify-content: flex-end;
				padding-top: 100px;
				// margin-top: 150px;
				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}
		
	}
</style>
