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
							<span class="fenl1">申述商品管理</span>
							<div class="yoou">
								<!-- <div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div> -->
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
								<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="userno" placeholder="用户编号" @change="getshenshuListpage(0)" size="medium" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
								<el-input v-model="shopname" placeholder="厂家名称" size="medium" @change="getshenshuListpage(0)"></el-input>
								<!-- <el-select size="medium" placeholder="申述类型">
									<el-option key="1" value="1" label="其他商品问题"></el-option>
									<el-option key="0" value="0" label="产品虚假"></el-option>
								</el-select> -->
								<el-select v-model="state" size="medium" placeholder="状态" @change="getshenshuListpage(0)">
									<el-option key="0" value="0" label="待处理"></el-option>
									<el-option key="1" value="1" label="已处理"></el-option>
								</el-select>
								
							</div>
							<div class="btngrap" @click="resect">
								<img src="../../assets/img/sousu.png" alt="">
								<div class="shuax">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="shensuList" style="width: 100%" row-key="id" border stripe lazy >
								<el-table-column label="用户编号" width="120" @row-click="lookinfo">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItem(scope.row,1)">{{scope.row.userno}}</div>
											
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="shopname" label="厂家名称" width="180" show-overflow-tooltip="shopname">
								</el-table-column>
								<el-table-column prop="goodsname" label="商品名称"  width="400" show-overflow-tooltip="goodsname">
									<template slot-scope="scope">
										<div class="setbox">
											<span>{{scope.row.goodsname}}</span>
											
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="subtype" label="申述类型" width="180">
								</el-table-column>
								<el-table-column prop="title" label="申诉主题" width="180" >
								</el-table-column>
								<el-table-column prop="content" label="申诉内容" width="300" show-overflow-tooltip="content">
									<!-- <template slot-scope="scope">
										<div class="setbox">
											<span>{{scope.row.content}}</span>
											
										</div>
									</template> -->
								</el-table-column>
								<el-table-column  label="状态" width="140">
									<template slot-scope="scope">
										<div class="setbox">
											<div v-if="scope.row.state == 1" style="color: #333;">已处理</div>
											<div v-if="scope.row.state == 0" @click="getItem(scope.row,0)">待处理</div>
										</div>
									</template>
										
										
										
									
								</el-table-column>
								<el-table-column prop="advice" label="处理意见" width="200" show-overflow-tooltip="advice">
								</el-table-column>
								<el-table-column sortable prop="strAdtime" label="创建时间" width="200">
								</el-table-column>
								
							</el-table>
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								
								<sapn>总共{{totalpage}}条记录</sapn>
							</div>
							<div style="display: flex; align-items: center;">
								<!-- <span>每页显示</span> -->
								<el-pagination  layout="prev, pager, next,jumper" :current-page.sync="nowpage" :total="totalpage" @current-change='currentclick'>
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
				<div class="title"  v-if="editType != 1">审核申诉信息</div>
				<div class="title"  v-if="editType == 1">审核信息</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>
							<td class="text">用户编号:</td>
							<td>
								<el-input :value="shensuDetail.userno"></el-input>
							</td>
							<td class="text">厂家名称:</td>
							<td>
								<el-input :value="shensuDetail.shopname"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text">商品名称:</td>
							<td >
								<el-input  :value="shensuDetail.goodsname"></el-input>
							</td>
							<td class="text">申诉类型:</td>
							<td >
								<el-input :value="shensuDetail.subtype"></el-input>
							</td>
							
						</tr>
						<tr>
							<td class="text" >申诉主题:</td>
							<td colspan="3">
								<el-input :value="shensuDetail.title"></el-input>
							</td>
						</tr>
						<tr>
							<td class="text" >申诉内容:</td>
							<td colspan="3" class="value">
								<div style="padding: 5px;">
									<span v-if="shensuDetail.content">{{shensuDetail.content}}</span>
									<span v-if="!shensuDetail.content">该用户未留下申诉内容</span>
								</div>
								
							</td>
						</tr>
						<tr>
							<td class="text" >图片:</td>
							<td colspan="3">
								<div class="img">
									<img :src="shensuDetail.img" alt="">
									<span v-if="!shensuDetail.img">该用户未留下申诉图片</span>
								</div>
							</td>
						</tr>
						<tr v-if="editType != 1">
							<td class="text yesbefor" >处理状态:</td>
							<td colspan="3">
								<el-select  v-model="chulistate" size="medium" placeholder="状态">
									<el-option key="1" value="1" label="已处理"></el-option>
									<!-- <el-option key="0" value="0" label="待处理"></el-option> -->
								</el-select>
							</td>
						</tr>
						<tr >
							<td class="text yesbefor" >处理意见:</td>
							<td colspan="3">
								<el-input v-if="editType != 1" v-model="chuliyijian" placeholder="请输入内容"></el-input>
								<div v-if="editType == 1">{{shensuDetail.advice}}</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="sureshenhe">确定</el-button>
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
	import {
		getShensuList,
		Postshenshu
	} from '../../request/API/request.js';
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
				page:0,
				pageSize:10,
				totalpage:'',
				nowpage:"",
				
				//检索
				state:'',
				id:'',
				userno:'',
				shopname:'',
				
				shensuList: [],
				shensuDetail:'',
				itemId:'', //主键id
				chulistate:'', //审核处理状态
				chuliyijian:'', //处理意见
				editType:'', //1查看 0审核
				
			}

		},
		methods: {
			resect(){
			this.page=''
			this.pageSize=''
			this.state=''
			this.userno=''
			this.shopname=''
			this.page = 0;
			this.reload()
			this.getshenshuListpage()
			},
			//提交审核
			sureshenhe(){
				let _this = this;
				if(_this.chuliyijian == ''){
					_this.$message({
						message: '处理意见不能为空！',
						type: 'error',
						duration: 2000
					});
					return;
				}
				if(_this.chulistate == ''){
					_this.$message({
						message:  '处理状态不能为空！',
						type: 'error',
						duration: 2000
					});
					return;
				}
				let params = {
					id:_this.itemId,
					advice:_this.chuliyijian,
					state:_this.chulistate
				}
				Postshenshu('platform/updateTAppealmsg',params).then(res => {
					console.log(res);
					if(res.isSuccess){
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration: 100
						});
						_this.addbox = false;
						_this.getshenshuListpage();
					}else{
						_this.$message({
							message: res.message,
							type: 'error',
							duration: 2000
						});
					}
				})
				
				
			},
				
			//获取详情
			getItem(row,e){
				let _this = this;
				_this.addbox = true;
				console.log(row)
				_this.itemId = row.id;
				_this.shensuDetail = row;
				_this.editType = e
			},
			
			currentclick(e){
				let _this = this;
				_this.page = e-1
				_this.getshenshuListpage()
			},
			getshenshuListpage(e){
				let _this = this;
				if(e == 0){
					_this.page = 0;
					// this.reload()
				}
				let params={
					pageIndex:_this.page,
					pageSize: _this.pageSize,
					state:_this.state,
					id:'',
					userno:_this.userno,
					shopname:_this.shopname
				};
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				
				getShensuList('platform/getTAppealmsgPageList',params).then(res => {
					console.log(res);
					_this.shensuList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
					setTimeout(() => {
						loading.close();
					}, 1000);
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
			this.getshenshuListpage()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.setbox {
		display: flex;
		cursor: pointer;
	
		div {
			width: 100%;
			margin-right: 20px;
			color: #0b9cf4;
			 // line-height: 24px
		}
	}
	.nobefor {
		&::before {
			content: '' !important;
		}
	}
	.yesbefor {
		&::before {
			content: '*' !important;
			color: red;
		}
	}

	.el-aside,
	.el-header {
		padding: 0px;
	}

	// .el-main {
	// 	height: 818px;
	// 	padding: 0px;
	// 	background: #f6fcff;
	// }

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

	

	.searchbox {
		// height: 80px;
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
						// &::before{
						// 	content: '*';
						// 	color: red;
						// }
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
	.img{
		img{
			width:200px;
			height:200px
		}
	}
</style>
