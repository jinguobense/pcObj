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
						<div class="tablebox" style="padding: 40px;">
							<div class="userinfobox">
								<div class="userinfowrap">
									<div class="touimg">
										<div class="img">
											<el-upload style="" class="avatar-uploader" action="https://www.xashudezhao.com/helpsales/platform/uploadImg"
											 :show-file-list="false" :on-success="handleAvatarSuccess" :data="imges" :before-upload="beforeAvatarUpload">
												
													<img v-if="imageUrl" :src="imageUrl">
													<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 100px;"></i> -->
												
												<el-button size="medium" type="primary" lot="trigger" style="position:absolute; top:350px;left: 70px;">修改头像<i
													 class="el-icon-upload el-icon--right"></i>
												</el-button>
												<!-- <div style="position:absolute;right: -80px;top: 20px;display: flex;flex-direction:column">
													<el-button lot="trigger" size="small" type="primary" style="margin-bottom: 10px;">选择</el-button>
													
												</div> -->
											</el-upload>
										</div>

									</div>
									<table class="table" align="left" border="1" cellpadding="0px" cellspacing="0px">
										<tr>
											<td style="width: 127px;">用户名</td>
											<td>
												<div class="set">
													<span>{{denglu.loginName}}</span>
													<div @click="addbox = true">修改密码</div>
												</div>
											</td>
										</tr>
										<tr>
											<td>角色</td>
											<td style="width: 480px;">{{denglu.roleName}}</td>
										</tr>
										<tr>
											<td>姓名</td>
											<td>{{denglu.name}}</td>
										</tr>
										<tr>
											<td>邮箱</td>
											<td>{{denglu.email}}</td>
										</tr>
										<tr>
											<td>手机</td>
											<td>{{denglu.phone}}</td>
										</tr>
										<tr>
											<td>部门</td>
											<td>{{denglu.roleName}}</td>
										</tr>
									</table>
								</div>
								<div class="text">上次登录 IP: {{denglu.loginIp}} 时间： {{denglu.strLoginDate}}</div>
								<div class="bottomxx">
									<el-button type="primary" @click="gairu">确定修改</el-button>
									<el-button type="info" @click="addbox = false">取消</el-button>
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
				<div class="title">修改密码</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>

							<td class="text">旧密码:</td>
							<td>
								<el-input show-password placeholder="请输入旧密码" v-model="lpassword"></el-input>
							</td>
						</tr>

						<tr>
							<td class="text">新密码:</td>
							<td>
								<el-input show-password placeholder="新密码" v-model="newpassword"></el-input>
							</td>

						</tr>
						<tr>
							<td class="text">确认新密码:</td>
							<td colspan="3" style="width: 780px;">
								<el-input show-password placeholder="确认新密码" v-model="newpassword1"></el-input>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="gaimi">确定</el-button>
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
		xiugaimima
		,gaitu
	} from '../../request/API/request.js'
	import {
		Base64
	} from 'js-base64';
	export default {
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
				denglu: [],
				imageUrl: '',
				lpassword: '',
				newpassword: '',
				newpassword1: '',
				shouid: '',
				imges: {
					path: '/photo'
				},
				tableData1: []
			}
		},
		methods: {
			gairu(){
				this.gaitu()
			},
			gaitu(){
				let params={
					id:this.shouid,
					photo:this.imageUrl
				}
				gaitu('sys/editImageUpload',params).then(res=>{
					this.denglu.photo=this.imageUrl
					sessionStorage.setItem("dengluxinxi",JSON.stringify(this.denglu));
					this.$message({
						type: 'info',
						message: res.message
					});
				})
			},
			handleAvatarSuccess(res, file) {
			        this.imageUrl = res.resultData;
					console.log(res)
			      },
			gaimi() {
				if (this.lpassword == '') {
					this.$message({
						type: 'info',
						message: '请输入旧密码'
					});
					return
				}
				if (this.newpassword == '') {
					this.$message({
						type: 'info',
						message: '请输入新密码'
					});
					return
				}
				if (this.newpassword1 == '') {
					this.$message({
						type: 'info',
						message: '请确认新密码'
					});
					return
				}
				if (this.newpassword1 != this.newpassword1) {
					this.$message({
						type: 'info',
						message: '两次密码不一致'
					});
					return
				}
				this.xiugaimima()
			},
			xiugaimima() {
				this.lpassword = Base64.encode(this.lpassword)
				this.newpassword = Base64.encode(this.newpassword)
				let params = {
					id: this.shouid,
					oldPassword: this.lpassword,
					newPassword: this.newpassword
				}
				xiugaimima('sys/editPassword', params).then(res => {
					this.lpassword = ''
					this.newpassword = ''
					this.newpassword1 = ''
					if (res.isSuccess == false) {
						this.$message({
							type: 'info',
							message: res.message
						});
					} else {
						this.$message({
							type: 'info',
							message: res.message
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
		mounted() {
			console.log(sessionStorage.getItem("dengluxinxi"))
			this.denglu=JSON.parse(sessionStorage.getItem("dengluxinxi"))
			// this.denglu = this.$store.state.dengluxinxi
			this.imageUrl = this.denglu.photo
			this.shouid = this.denglu.id
			console.log(this.imageUrl)
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
		height: 718px;
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

		td {
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

	.userinfobox {
		 height: 500px;
		display: flex;
		flex-direction: column;

		.userinfowrap {
			display: flex;
			margin-bottom: 40px;
			// flex-direction: column;
			// align-items: center;
			.touimg {
				height: 300px;
				width: 240px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				margin-right: 30px;

				.img {
					width: 200px;
					height: 200px;
					overflow: hidden;
					text-align: center;
					border: 1px solid #f2f2f2;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						height: 100px;
						width: 100px;
					}

				}

				.el-button {
					width: 200px;
				}

			}

			.table {
				border-collapse: collapse;
				border-color: #dae3ec;
				border: 1px solid #e6e6e6;
				// margin: 20px auto;
				font-size: 16px;

				tr {
					width: 100%;
					border-color: #dae3ec;
					height: 50px;

					&:nth-child(2n) {
						background: #f2f2f2;
					}

					td {
						box-sizing: border-box;
						padding: 10px;

						&:nth-child(2n-1) {
							font-weight: bold;
						}

						.set {
							width: 480px;
							display: flex;
							align-items: center;
							justify-content: space-between;

							div {
								width: 150px;
								color: #0b9cf4;
								font-size: 20px;
								cursor: pointer;
								text-align: right;
							}
						}
					}


				}
			}

		}

		.text {
			font-size: 20px;
		}

		.bottomxx {
			height: 200px;
			width: 920px;
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

		.btngrap {
			height: 60px;
			width: 200px;
			display: flex;
			align-items: center;
			font-size: 16px;
			color: #0b9cf4;
			cursor: pointer;

			.shuax {
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

				img {
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
