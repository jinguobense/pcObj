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
							<span class="fenl1">首页</span>
							<div class="yoou">
								<img src="../assets/img/shuaxinb.png" alt="" class="imgone1">
							</div>
						</div>
						<div class="tablebox700">
							<div class="infowrap">
								<div class="yueitem">
									<div class="top">
										<h2>平台总金额(元)</h2>
										<!-- <span>查看详情></span> -->
									</div>
									<el-popover ref="popover" 
									placement="right"
									title="提示(不包含申请退款中)" width="200" 
									trigger="focus" 
									content="平台总金额=待发货+待收货+待评价+已完成+拼团中=支付未分账合计+平台已分账合计+厂家已分账合计(平台抽成关系到小数点后两位之后,故会有误差)">
									</el-popover>
									<div class="money" v-popover:popover>{{info.amountTotal}}</div>
									<!-- <div class="btn">
										<el-button type="primary" @click='addbox = true'>提现</el-button>
										<el-button plain @click='infobox = true'>充值</el-button>
									</div> -->
								</div>
								<div class="item" style="width: 40%;">
									<div class="top">
										<h2>平台金额（元）</h2>
										<!-- <span>查看详情></span> -->
									</div>
									<div class="price">
										<div class="money">
											<div style="display: flex;">
												<span style="margin-right: 10px;">支付未分账合计</span>
												<el-divider direction="vertical"></el-divider>
											</div>
											<el-popover ref="popover1" placement="right" 
											title="提示" 
											width="200" 
											trigger="focus" 
											content="支付未分账合计=待发货+待收货+待评价+拼团中">
											</el-popover>
											<div class="bule" v-popover:popover1>{{info.isshareNotTotal}}</div>
										</div>
										<div class="money">
											<div style="display: flex;">
												<span style="margin-right: 10px;">平台已分账合计</span>
												<el-divider direction="vertical"></el-divider>
											</div>
											<el-popover ref="popover2" placement="right" 
											title="提示" 
											width="200" 
											trigger="focus" 
											content="平台已分账合计=平台已抽已完成订单金额">
											</el-popover>
											<div class="bule" v-popover:popover2>{{info.pamountTotal}}</div>
										</div>
										<div class="money">

											<span>厂家已分账合计</span>
											<el-popover ref="popover3" placement="right"
											title="提示" 
											width="200" 
											trigger="focus" 
											content="厂家已分账合计=厂家已完成订单总额-平台抽成">
											</el-popover>
											<div class="bule" v-popover:popover3>{{info.samountTotal}}</div>

										</div>
									</div>
								</div>
								<div class="item">
									<div class="top">
										<h2>厂家总余额</h2>
										<!-- <span>查看详情></span> -->
									</div>
									<div class="price">
										<div class="money">
											<div style="display: flex;">
												<span style="margin-right: 10px;">厂家总余额（元）</span>
												<el-divider direction="vertical" style="background-color:#0b9cf4; margin-left: 10px;"></el-divider>
											</div>
											<el-popover ref="popover4" placement="right"
											title="提示" 
											width="200" 
											trigger="focus" 
											content="厂家总余额=厂家已分账合计-提现申请中-已提现">
											</el-popover>
											<div class="bule" v-popover:popover4>{{info.shopmoutTotal}}</div>
										</div>
										<div class="money">
											<span>厂家数量（家）</span>
											<el-popover ref="popover5" placement="right"
											title="提示" 
											width="200" 
											trigger="focus" 
											content="厂家数量=不包括已停用、待审核、已弃审">
											</el-popover>
											<div class="bule" v-popover:popover5>{{info.shopNum}}</div>
										</div>
									</div>
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
	</el-container>
</template>

<script>
	import Left from '../components/Left.vue'
	import Header from '../components/Header.vue'
	import Footer from '../components/Footer.vue'
	import Daohang from '../components/Daohang.vue';
	import {
		getIndexinfo
	} from '../request/API/request.js'
	export default {
		inject: ['reload'],
		components: {
			Header,
			Left,
			Footer,
			Daohang
		},
		data() {
			return {
				info: ''
			}
		},
		methods: {
			getindexInfo() {
				getIndexinfo('order/selectPageProfitDetail').then(res => {
					this.info = res.resultData
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
			},
		},
		mounted() {
			this.getindexInfo()
			// window.location.reload()
		},
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

	.zhu {
		line-height: 30px;
		font-size: 12px;
		// background: #f6fcff;
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

	.tdimg {
		height: 40px;
		width: 40px;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.el-table th.cell {
		color: #333 !important;
		font-size: 16px;
	}

	.infowrap {
		// height: 680px;
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 60px;
		display: flex;
		justify-content: space-between;

		.yueitem {
			width: 20%;
			height: 243px;
			background-color: #ffffff;
			// border: solid 1px #f0f9ff;
			box-sizing: border-box;
			padding: 30px;
			display: flex;
			flex-direction: column;
			// justify-content: space-between;
			box-shadow: -2px 5px 15px 5px #f0f9ff;

			.top {
				width: 100%;
				height: 30px;
				display: flex;
				align-items: center;
				font-size: 18px;
				justify-content: space-between;
				margin-bottom: 25px;

				span {
					color: #0b9cf4;
					cursor: pointer;
				}
			}

			.money {
				font-size: 36px;
				color: #0b9cf4;
				width: 90px;
				cursor: pointer;
			}

			.btn {
				display: flex;

				.el-button {
					width: 100px;
					margin-right: 20px;
					font-size: 20px;
				}
			}
		}

		.item {
			width: 30%;
			height: 243px;
			background-color: #ffffff;
			// border: solid 1px #f0f9ff;
			box-sizing: border-box;
			padding: 30px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			box-shadow: -2px 5px 15px 5px #f0f9ff;

			.top {
				width: 100%;
				height: 30px;
				display: flex;
				font-size: 18px;
				align-items: center;
				justify-content: space-between;

				span {
					color: #0b9cf4;
					cursor: pointer;
				}
			}

			.price {
				display: flex;
				align-items: center;
				width: 100%;

				.money {
					height: 119px;
					width: 50%;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					color: #333;
					font-size: 22px;
					cursor: pointer;

					&:first-of-type {
						// border-right: 1px solid #dae3ec;
					}

					.bule {
						font-size: 36px;
						color: #0b9cf4;
					}
				}
			}
		}
	}










	.setbox {
		display: flex;
		cursor: pointer;

		div {
			margin-right: 20px;
			color: #0b9cf4;
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
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.titlexx {
				width: 100%;
				height: 40px;
				background-color: #fafafa;
				line-height: 40px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
				color: red;
				margin-bottom: 10px;

			}

			.title {
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
				font-size: 18px;

				tr {
					width: 100%;
					border-color: #dae3ec;
					height: 60px;

					td {
						box-sizing: border-box;
						padding: 10px;
					}

					.text {
						width: 180px;
						height: 60px;
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

	.el-divider {
		background-color: #0b9cf4;
	}
</style>
