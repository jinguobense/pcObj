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
							<span class="fenl1">意见反馈</span>
							<div class="yoou">
								<!-- <div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div> -->
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">
								
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="nickName" placeholder="用户名" size="medium" @change="getideaListpage(0)"></el-input>
								<el-input v-model="phoneNum" placeholder="手机号" size="medium" @change="getideaListpage(0)" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
								<el-select v-model="source" size="medium" placeholder="反馈来源" @change="getideaListpage(0)">
									<el-option key="0" value="0" label="买来卖"></el-option>
									<el-option key="1" value="1" label="联采"></el-option>
								
								</el-select>
								<el-input v-model="quest" placeholder="反馈主题" size="medium" @change="getideaListpage(0)"></el-input>
								<el-input v-model="detail" placeholder="反馈内容" size="medium" @change="getideaListpage(0)"></el-input>
								
								
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @click="getideaListpage(0)">
								<div class="shuax" @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox">
							<el-table :data="ideaList" style="width: 100%" row-key="id" border stripe lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
								<el-table-column prop="nickName" label="用户名"  @row-click="lookinfo">
								</el-table-column>
								<el-table-column prop="phoneNum" label="手机号" >
								</el-table-column>
								<el-table-column prop="source" label="反馈来源" >
								</el-table-column>
								<el-table-column  label="反馈主题" width="300" show-overflow-tooltip>
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItem(scope.row)">{{scope.row.quest}}</div>
											
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="detail" label="反馈内容" width="480" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="" label="图片" >
									<template slot-scope="scope">
										<div class="imgbox">
											<div class="demo-image__preview" v-for="(i,index) in scope.row.remarks" :key='index' style="height: 40px; margin-right: 10px;">
												<el-image :src="i" style="height: 40px; width: 40px;" :preview-src-list="[i]" ></el-image>
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="strAdtime" sortable label="创建时间">
								</el-table-column>
								
							</el-table>
							
						</div>
						<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
							<div class="demonstration">
								总共{{totalpage}}条记录
							</div>
							<div style="display: flex; align-items: center;">
								
								<el-pagination  layout=" prev, pager, next,jumper" :current-page.sync="nowpage" :total="totalpage" @current-change='currentclick'>
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
		<div class="addbox" v-if="detailbox">
			<div class="mask" @click="detailbox = false"></div>
			<div class="addwrap">
				<div class="title">意见反馈详情</div>
					<div class="tablebox">
					<div class="contop">
						<div class="titlecc">{{iteminfo.quest}}</div>
						<span>反馈时间：{{iteminfo.strAdtime}}</span>
					</div>
					<div class="infotext">
						{{iteminfo.detail}}
					</div>
					<div class="infoimg">
						<el-image :src="i"  v-for="(i,index) in iteminfo.remarks" :key='index' :preview-src-list="[i]" ></el-image>
					</div>
				</div>
				<div class="bottom">
					<!-- <el-button type="primary" @click="detailbox=">确定</el-button> -->
					<el-button type="info" @click="detailbox = false">关闭</el-button>
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
	import{getideaList} from '../../request/API/request.js'
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
				detailbox:false, //详情弹框
				iteminfo:'',//详情信息
				
				page:0,
				pageSize:10,
				ideaList:[],
				totalpage:'',
				nowpage:'',
				imglist:'',
				
				tableData1: [],
				//检索字段
				phoneNum:'',
				quest:'',
				detail:'',
				nickName:'',
				source:''
				
				
			}

		},
		methods: {
			resect(){
				this.phoneNum=''
				this.quest=''
				this.detail=''
				this.nickName=''
				this.page=0
				
				this.getideaListpage();
				this.reload()
			},
			currentclick(e){
				let _this = this;
				_this.page = e-1;
				this.getideaListpage()
			},
			//获取信息
			getItem(row){
				let _this = this;
				console.log(row);
				_this.iteminfo = row;
				_this.detailbox = true;
			},
			//获取意见反馈列表
			getideaListpage(e){
				let _this = this;
				if(e == 0){ //检索
					_this.page = 0;
					// this.reload()
				}
				let params = {
					pageSize:_this.pageSize,
					pageIndex:_this.page,
					phoneNum:_this.phoneNum,
					quest:_this.quest, 
					source:_this.source,
					detail:_this.detail, //意见描述
					nickName:_this.nickName
				}
				// const loading = this.$loading({
				// 	lock: true,
				// 	text: '正在加载中',
				// 	background: 'rgba(255,255, 255, 0.4)'
				// });
				getideaList('platform/getTFeedbackPageList',params).then(res => {
					console.log(res);
					let list = res.resultData.content
					
					
					
					for(let i in list){
						if(list[i].remarks){
							let arrlist = list[i].remarks.split(';')
							let arr = arrlist.splice(-1,1)
							console.log(arrlist)
							list[i].remarks = arrlist
						}
					}
					console.log(list)
					_this.ideaList = list;
					console.log(_this.ideaList,'反馈列表')
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex;
					
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
			this.getideaListpage()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.contop{
		height:70px;
		display: flex;
		align-items: baseline;
		flex-direction: column;
		box-sizing: border-box;
		width: 1047px;
		margin: 10px auto;
		border-bottom: 1px solid #dcdcdc;
		padding-left: 30px;
		.titlecc{
			font-family: SourceHanSansCN-Medium;
			font-size: 28px;
			font-weight: normal;
			font-stretch: normal;
			letter-spacing: 0px;
			color: #333333;
			margin-right: 20px;
		}
		span{
			color: #777;
			font-size: 16px;
			
		}
		
	}
	.infotext{
		width: 1047px;
		line-height: 40px;
		letter-spacing: 4px;
		color: #666666;
		font-size: 20px;
		margin: 10px auto;
		// height: 600px;
		box-sizing: border-box;
		padding-left: 30px;
		text-indent: 20px;
	}
	.infoimg{
		width: 100%;
		display: flex;
		margin-top: 20px;
		box-sizing: border-box;
		padding: 10px;
		.el-image{
			width: 150px;
			height: 150px;
			
		}
	}
	.tablebox{
		height: 590px;
	}
	.imgbox{
		// width: 100px;
		display: flex;
		flex-wrap: wrap;
	}
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
			// width: 1000px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

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

						&::before {
							content: '*';
							color: red;
						}
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

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}
</style>
