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
							<span class="fenl1">平台物流</span>
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
								<el-input v-model="cityname" @change="getwuliuListpage" placeholder="城市" size="medium"></el-input>
								<el-input v-model="name"  @change="getwuliuListpage" placeholder="联系人" size="medium"></el-input>
								<el-input v-model="phone"  @change="getwuliuListpage" placeholder="手机号" size="medium" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
								<el-select v-model="state"  @change="getwuliuListpage" size="medium" placeholder="状态">
									<el-option key="0" value="0" label="已发货"></el-option>
									<el-option key="1" value="1" label="在途中"></el-option>
									<el-option key="2" value="2" label="已签收"></el-option>
									<el-option key="3" value="3" label="已完成"></el-option>
								</el-select>
								
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt=""  @click='getwuliuListpage'>
								<div class="shuax" @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="wuliuList" style="width: 100%" row-key="id" border stripe lazy>
								<el-table-column prop="cityname" label="城市名称" width="180" >
								</el-table-column>
								<el-table-column prop="name" label="联系人" width="180">
								</el-table-column>
								<el-table-column prop="phone" label="手机号">
								</el-table-column>
								<el-table-column prop="addr" label="收货地址" width="350">
								</el-table-column>
								<el-table-column label="状态">
									<template slot-scope="scope">
										<div class="setbox">
											<div v-if="scope.row.state == 0">已发货</div>
											<div v-if="scope.row.state == 1">在途中</div>
											<div v-if="scope.row.state == 2">已签收</div>
											<div v-if="scope.row.state == 3">已完成</div>
										</div>
										
									</template>
								</el-table-column>
								<el-table-column prop="strAdtime" sortable label="创建时间">
								</el-table-column>
								<el-table-column prop="strUptime" sortable label="更新时间">
								</el-table-column>
								<el-table-column prop="remarks" label="备注信息">
								</el-table-column>
								
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								<sapn>总共{{totalpage}}条记录</sapn>
								<!-- <sapn v-if='page != 0'>显示第 {{page}} 页</sapn> -->
							</div>
							<div style="display: flex; align-items: center;">
								<!-- <span>每页显示</span> -->
								<el-pagination  layout="prev,pager,next,jumper" :total="totalpage" @current-change='currentclick'>
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
	import {
		getWuliuList
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
				
				//检索
				cityname:'',
				name:'',
				phone:'',
				state:'',
				nowpage:'',
				wuliuList: []
			}

		},
		methods: {
			resect(){
				this.cityname='';
				this.name='';
				this.phone='';
				this.state='';
				this.page = 0;
				this.reload()
				this.getwuliuListpage()
			},
			// prevpage(){
			// 	let _this = this;
			// 	_this.page--
			// 	// let nowpage = _this.page;
			// 	_this.getwuliuListpage()
			// },
			// nextpage(){
			// 	let _this = this;
			// 	_this.page++
			// 	// let nowpage = _this.page;
			// 	_this.getwuliuListpage()
			// },
			currentclick(e){
				let _this = this;
				_this.page = e-1
				_this.getwuliuListpage()
			},
			//获取物流列表
			getwuliuListpage(){
				let _this = this;
				let params={
					pageIndex:_this.page,
					pageSize:_this.pageSize,
					cityname:_this.cityname,
					name:_this.name,
					phone:_this.phone,
					state:_this.state
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getWuliuList('platform/getTPflogiPageList', params).then(res => {
					console.log(res);
					_this.wuliuList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
					setTimeout(() => {
						loading.close();
					}, 2000);
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
			this.getwuliuListpage()
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
		// height: 818px;
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
		width: 100%;
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
