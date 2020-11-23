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
							<span class="fenl1">区域列表</span>
							<div class="yoou">
								<div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1">
								<img src="../../assets/img/Excel.png" alt="" class="imgone1">
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="tableData1" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="name" label="区域名称"  @row-click="lookinfo">
								</el-table-column>
								<el-table-column prop="date" label="区域编号"  >
									
								</el-table-column>
								<el-table-column prop="name" label="区域类型">
								</el-table-column>
								<el-table-column prop="name" label="备注">
								</el-table-column>
								
								<el-table-column label="操作" width="280">
									<template slot-scope="scope">
										<div class="setbox">
											<!-- <div @click="infobox = true">查看</div> -->
											<div @click="infobox = true">修改</div>
											<div size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</div>
											<div size="mini" @click="handleEdit(scope.$index, scope)">添加下级分类</div>
										</div>
									</template>
								</el-table-column>
							</el-table>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
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
				<div class="title">新建一级区域</div>
				<div class="title" v-if="false">新建二级区域</div>
				<div class="title" v-if="false">新建三级区域</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						
						<tr>
							<td class="text nobefor">上级区域:</td>
							<td><el-input placeholder="陕西省"></el-input></td>
							<td class="text">区域名称:</td>
							<td>
								<el-input placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">区域编码:</td>
							<td>
								<el-input placeholder="请输入内容"></el-input>
							</td>
							<td class="text">区域类型:</td>
							<td>
								<el-select size="medium" placeholder="区域类型">
									<el-option key="1" value="1" label="国家"></el-option>
									<el-option key="0" value="0" label="省份、直辖市"></el-option>
									<el-option key="2" value="2" label="区县"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="text nobefor" >备注信息:</td>
							<td colspan="3">
								<div class="value">
									<el-input show-word-limit type="textarea" placeholder="请输入内容" v-model="textarea1" :autosize="{ minRows: 5, maxRows: 6}">
									</el-input>
								</div>
							</td>
					
							<!-- <td>xxxxxxxxxx13</td>
							<td>xxxxxxxxxx14</td> -->
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary">确定</el-button>
					<el-button type="info" @click="addbox = false">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask"></div>
			<div class="addwrap">
				<div class="title">修改一级区域</div>
				<div class="title" v-if="false">修改二级区域</div>
				<div class="title" v-if="false">修改三级区域</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						
						<tr>
							<td class="text nobefor">上级区域:</td>
							<td><el-input placeholder="陕西省"></el-input></td>
							<td class="text">区域名称:</td>
							<td>
								<el-input placeholder="请输入内容"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">区域编码:</td>
							<td>
								<el-input placeholder="请输入内容"></el-input>
							</td>
							<td class="text">区域类型:</td>
							<td>
								<el-select size="medium" placeholder="区域类型">
									<el-option key="1" value="1" label="国家"></el-option>
									<el-option key="0" value="0" label="省份、直辖市"></el-option>
									<el-option key="2" value="2" label="区县"></el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="text nobefor" >备注信息:</td>
							<td colspan="3">
								<div class="value">
									<el-input show-word-limit type="textarea" placeholder="请输入内容" v-model="textarea1" :autosize="{ minRows: 5, maxRows: 6}">
									</el-input>
								</div>
							</td>
					
							<!-- <td>xxxxxxxxxx13</td>
							<td>xxxxxxxxxx14</td> -->
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary">确定</el-button>
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
				tableData1: [{
					id: 1,
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄',
					img:'../../assets/logo.png'
				}, {
					id: 2,
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					id: 3,
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄',
					children: [{
						id: 31,
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}, {
						id: 32,
						date: '2016-05-01',
						name: '王小虎',
						address: '上海市普陀区金沙江路 1519 弄'
					}]
				}, {
					id: 4,
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
			
		},
		methods: {
			lookinfo(){
				console.log("111")
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
			

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
