<template>

	<div class="home">
		<el-container>
			<el-header>
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
								<span class="fenl1">区域管理员信息列表</span>
								<div class="yoou">
									<div @click="addbox = true">
										<img src="../../assets/img/baijia.png" alt="">
										<span class="span1">新建</span>
									</div>
									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1" @click="resect">

								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-input v-model="loginname" placeholder="登录名" size="medium" @change="qygly"></el-input>
									<el-input v-model="name" placeholder="姓名" size="medium" @change="qygly"></el-input>
									<el-select size="medium" placeholder="省份" v-model="provid" @change="qygly">
										<el-option v-for="item in provList" :label="item.name" :key="item.id" :value="item.id"></el-option>
									</el-select>
									<el-select size="medium" placeholder="市区" v-model="cityid" @focus="getcityList" @change="qygly">
										<el-option v-for="item in cityList" :label="item.name" :key="item.id" :value="item.id"></el-option>
									</el-select>
									<el-select size="medium" placeholder="县区" v-model="townid" @focus="gettownList" @change="qygly">
										<el-option v-for="item in townList" :label="item.name" :key="item.id" :value="item.id"></el-option>
									</el-select>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="qygly">
									<div class="shuax" @click="resect">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">

								<el-table ref="multipleTable" :data="tableData" border stripe tooltip-effect="dark" style="width: 100%" @select="deld"
								 @select-all="quanxuan">
									<el-table-column type="selection" width="47" :selectable='selectInit'>
									</el-table-column>
									<el-table-column prop="name" label="厂家头像" width="100">
										<div class="demo-image__preview" slot-scope="scope">
											<el-image style="width: 40px; height: 40px" :src="scope.row.photo">
											</el-image>
										</div>
									</el-table-column>
									<el-table-column label="登录名" prop="loginName" width="150">
										<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
									</el-table-column>
									<el-table-column prop="name" label="姓名" width="150">
									</el-table-column>
									<el-table-column prop="mobile" label="手机号" width="150">
									</el-table-column>
									<el-table-column prop="provname" label="管理省份" width="150">
									</el-table-column>
									<el-table-column prop="cityname" label="管理市区" width="150">
									</el-table-column>
									<el-table-column prop="townname" label="管理县区" width="150">
									</el-table-column>
									<el-table-column prop="addr" label="详细地址" width="280">
									</el-table-column>
									<el-table-column prop="name" label="是否有权限" width="150">
										<div slot-scope="scope">
											<span v-if="scope.row.loginFlag==1">允许登陆</span>
											<span v-if="scope.row.loginFlag==0">禁止登陆</span>
										</div>
									</el-table-column>
									<el-table-column prop="strAdtime" label="开始时间" width="220">
									</el-table-column>
									<el-table-column prop="operationName" label="操作人" width="150">
									</el-table-column>
									<el-table-column label="操作" fixed="right" width="100">
										<template slot-scope="scope">
											<div class="setbox">
												<div @click="getRow(scope.row)">
													修改
												</div>
											</div>
										</template>

									</el-table-column>
								</el-table>
							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center;">
								<div class="demonstration">
									总共{{zong.total}}条数据
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10]" layout="sizes,prev, pager, next,jumper" :total="zong.total" @current-change="handleCurrentChange">
									</el-pagination>
								</div>
							</div>
						</div>
						<div class="addbox" v-if="addbox">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">
									新建管理员信息
								</div>
								<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
									<tr>
										<td class="text" rowspan="2">
											<span>
												头像:
											</span>
										</td>
										<td class="blle" rowspan="2">
											<div class="touxset">
												<el-upload class="touxset" action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false"
												 :on-success="handleAvatarSuccess" :data="imges">
													<div class="img">
														<img v-if="imageUrl" :src="imageUrl">
														<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 100px;"></i> -->
													</div>
													<div class="xuanzbox">
														<el-button lot="trigger" size="small" type="primary">选择</el-button>
														<el-button size="small" type="infor" @click.stop='quxaiotu'>取消</el-button>
													</div>

												</el-upload>
											</div>
										</td>
										<td class="text">
											<span>
												登录名:
											</span>
										</td>
										<td>
											<el-input v-model="nloginname" size="medium" placeholder="请输入登录名" @input="dengluming" ></el-input>
										</td>
									</tr>
									<tr>

										<td class="text">
											<span>
												姓名:
											</span>
										</td>
										<td>
											<el-input v-model="nname" size="medium" placeholder="请输入姓名"></el-input>
										</td>
									</tr>
									<tr>
										<td class="text">
											<span>
												工号:
											</span>
										</td>
										<td>
											<el-input v-model="ngongnum" size="medium" placeholder="请输入工号"  @input="gonghao"></el-input>
										</td>
										<td class="text yesbefor">
											<span>
												密码:
											</span>
										</td>
										<td>
											<el-input v-model="npsd" size="medium" type="password" placeholder="请输入密码"></el-input>
										</td>
									</tr>
									<tr>
										<td class="text">
											<span>
												手机号:
											</span>
										</td>
										<td>
											<el-input v-model="ntel" size="medium" placeholder="请输入手机号" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
										</td>
										<td class="text yesbefor">
											<span>
												确认密码:
											</span>
										</td>
										<td>
											<el-input v-model="nrepsd" size="medium" type="password" placeholder="确认密码"></el-input>
										</td>
									</tr>
									<tr>
										<td class="text nobefor">
											<span>
												邮箱:
											</span>
										</td>
										<td class="oku" colspan="3">
											<el-input v-model="nemail" size="medium" placeholder="请输入邮箱" @input="youxiang"></el-input>
										</td>
									</tr>
								</table>

								<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
									<tr>
										<td class="text">
											区县:
										</td>
										<td class="oku">
											<div class="zuori" style="display: flex;">
												<el-select size="medium" placeholder="省份" v-model="provid" style="width: 33%;">
													<el-option v-for="item in provList" :label="item.name" :key="item.id" :value="item.id"></el-option>
												</el-select>
												<el-select size="medium" placeholder="市区" v-model="cityid" style="width: 33%;" @focus="getcityList">
													<el-option v-for="item in cityList" :label="item.name" :key="item.id" :value="item.id"></el-option>
												</el-select>
												<el-select size="medium" placeholder="县区" v-model="townid" style="width: 33%;" @focus="gettownList">
													<el-option v-for="item in townList" :label="item.name" :key="item.id" :value="item.id"></el-option>
												</el-select>

											</div>
										</td>
									</tr>
									<tr>
										<td class="text">
											办公详细地址:
										</td>
										<td>
											<el-input v-model="naddr" size="medium" placeholder="请输入详细地址" style="width: 100%;"></el-input>

										</td>
									</tr>
								</table>
								<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">

									<tr>
										<td class="text">
											<span>
												是否允许登录:
											</span>
										</td>
										<td class="oku">
											<el-select size="medium" placeholder="选择权限" v-model="loginFlag">
												<el-option key="1" value="1" label="允许登录"></el-option>
												<el-option key="0" value="0" label="禁止登录"></el-option>
											</el-select>
										</td>
									</tr>
								</table>

								<div class="bottom">
									<el-button type="primary" @click="upnewUser(0)">确 定</el-button>
									<el-button @click="addbox = false">取 消</el-button>
								</div>
							</div>
						</div>
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">
									修改管理员信息
								</div>
								<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
									<tr>
										<td class="text" rowspan="2">
											<span>
												头像:
											</span>
										</td>
										<td class="blle" rowspan="2">
											<div class="touxset">
												<el-upload class="touxset" action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false"
												 :on-success="handleAvatarSuccess" :data="imges">
													<div class="img">
														<img v-if="imageUrl" :src="imageUrl">
														<!-- <i v-else class="el-icon-plus avatar-uploader-icon" style="line-height: 100px;"></i> -->
													</div>
													<div class="xuanzbox">
														<el-button lot="trigger" size="small" type="primary">选择</el-button>
														<el-button size="small" type="infor" @click.stop='quxaiotu'>取消</el-button>
													</div>
											
												</el-upload>
											</div>
											
										</td>
										<td class="text">
											<span>
												登录名:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="nloginname" disabled size="medium" placeholder="请输入登录名"  ></el-input>
										</td>
									</tr>
									<tr>

										<td class="text">
											<span>
												姓名:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="nname" size="medium" placeholder="请输入姓名"></el-input>
										</td>
									</tr>
									<tr>

										<td class="text">
											<span>
												工号:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="ngongnum" size="medium" placeholder="请输入工号"></el-input>
										</td>
										<td class="text nobefor">
											<span>
												密码:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="npsd" size="medium" disabled placeholder="请输入密码"></el-input>
										</td>
									</tr>
									<tr>

										<td class="text">
											<span>
												手机号:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="ntel" size="medium"  placeholder="请输入手机号"></el-input>
										</td>
										<td class="text nobefor">
											
											<span>
												确认密码:
											</span>
										</td>
										<td class="blle1">
											<el-input v-model="nrepsd" size="medium" disabled placeholder="确认密码"></el-input>
										</td>
									</tr>
									<tr>

										<td class="text nobefor">
											<span>
												邮箱:
											</span>
										</td>
										<td class="blle1" colspan="3">
											<el-input v-model="nemail" size="medium" placeholder="请输入邮箱"></el-input>
										</td>

									</tr>
								</table>

								<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
									<tr>
										<td class="text">
											区县:
										</td>
										<td class="oku">
											<div class="zuori" style="display: flex;">
												<el-input :value='provname' size="medium" placeholder="省份" disabled style="width: 33%;"></el-input>
												<el-input :value='cityname' size="medium" placeholder="市区" disabled style="width: 33%;"></el-input>
												<el-input :value='townname' size="medium" placeholder="县区" disabled style="width: 33%;"></el-input>

											</div>
										</td>
									</tr>
									<tr>
										<td class="text">
											办公详细地址:
										</td>
										<td>
											<el-input v-model="naddr" size="medium" placeholder="请输入详细地址" style="width: 100%;"></el-input>

										</td>
									</tr>
								</table>
								<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">

									<tr>
										<td class="text">
											<span>
												是否允许登录:
											</span>
										</td>
										<td class="oku">
											<el-select size="medium" v-model="loginFlag" placeholder="选择权限">
												<el-option key="1" value="1" label="允许登录"></el-option>
												<el-option key="0" value="0" label="禁止登录"></el-option>
											</el-select>
										</td>
									</tr>
								</table>

								<div class="bottom">
									<el-button type="primary" @click="upnewUser(1)">确 定</el-button>
									<el-button @click="quxiao">取 消</el-button>
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
	</div>
</template>
<script>
	// @ is an alias to /src
	import Header from '../../components/Header'
	import Footer from '../../components/Footer'
	import Daohang from '../../components/Daohang'
	import Left from '../../components/Left'
	import {
		qygly,
		qygldel,
		getprovList,
		getcityList,
		gettownList,
		Creatqyuser,
		upLoadimg
	} from '../../request/API/request.js'
	export default {

		components: {
			Header,
			Footer,
			Daohang,
			Left
		},
		data() {
			return {
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
				// srcList: [
				// 	'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
				// 	'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				// ],
				addbox: false,
				input: '',
				textarea: '',
				dialogVisible: false,
				page: 0,
				pages: 10,


				zong: [],
				goodsidlist: [],
				imageUrl: '',
				imges: {
					path: '/platformChildren'
				},
				// 新建
				npotourl: '',
				nloginname: '',
				nname: '',
				npsd: '',
				nrepsd: '',
				ngongnum: '', //工号
				ntel: '',
				nemail: '',
				naddr: '',
				loginFlag: '',
				provid: '',
				cityid: '',
				townid: '',
				id: '',

				// 修改地区
				provname: '',
				cityname: '',
				townname: '',

				//检索
				loginname: '',
				name: '',






				value: '',
				tableData: [],
				multipleSelection: [],

				provList: [],
				cityList: [],
				townList: [],

				//上传图片
				file: '',
				formData: ''

			}
		},

		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = res.resultData;
				console.log(this.imageUrl)
			},
			quxaiotu() {
				this.imageUrl = ''
			},
			selectInit(row) {
				console.log(row)
				if (row.loginFlag == 1) { //可登陆不可选
					return false;
				} else {
					return true;
				}
			},
			chooseimg(files) {
				let inputDOM = this.$refs.inputer;
				console.log(inputDOM)
				this.file = inputDOM.files[0]; // 通过DOM取文件数据
				let size = Math.floor(this.file.size / 1024); //计算文件的大小　
				this.formData = new FormData(); //new一个formData事件
				this.formData.append("file", this.file); //将file属性添加到formData里
				console.log(this.formData)
				//此时formData就是我们要向后台传的参数了
				let params = {
					mpfile: JSON.stringify(this.formData),
					path: '/regional'
				}
				upLoadimg('platform/uploadImg', params).then(res => {
					console.log(res);
				})
			},
			//重置
			resect() {
				this.loginname = '' //登录名
				this.name = '' //姓名
				this.provid = '' //省级ID
				this.cityid = '' //市级ID
				this.townid = '' //区县ID
				this.page = 0
				this.qygly()
			},

			//新建管理员信息 修改
			upnewUser(e) { //0新建 1修改
				let _this = this;
				if (_this.nloginname == '') {
					_this.$message({
						message: '请输入登录名！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				if (_this.ngongnum == "") {
					_this.$message({
						message: '请输入工号！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				if (_this.nname == "") {
					_this.$message({
						message: '请输入姓名！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				// if (_this.npsd == "") {
				// 	_this.$message({
				// 		message: '请输入密码！',
				// 		type: 'warning',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				if (_this.ntel == "") {
					_this.$message({
						message: '请输入手机号！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				if (_this.ntel.length != 11) {
					_this.$message({
						message: '请核对您的手机号码！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				// if (_this.nrepsd == "") {
				// 	_this.$message({
				// 		message: '请输入确认密码！',
				// 		type: 'warning',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				// if (_this.nemail == "") {
				// 	_this.$message({
				// 		message: '请输入邮箱！',
				// 		type: 'warning',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				if (_this.naddr == "") {
					_this.$message({
						message: '请输入详细地址！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				if (_this.loginFlag == "") {
					_this.$message({
						message: '请选择登录状态！',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				// if(){

				// },
				// if(_this.provid == ""){
				// 	_this.$message({
				// 		message: '请输入省份信息！',
				// 		type: 'warning',
				// 		duration: 1000
				// 	});
				// 	return;
				// }

				// if (_this.nloginname == '' ||
				// 	_this.ngongnum == "" ||
				// 	_this.nname == "" ||
				// 	_this.npsd == "" ||
				// 	_this.ntel == '' ||
				// 	_this.nrepsd == "" ||
				// 	_this.nemail == "" ||
				// 	_this.naddr == "" ||
				// 	_this.loginFlag == "" ||
				// 	_this.provid == ""
				// 	) {
				// 	_this.$message({
				// 		message: '请完善提交信息！',
				// 		type: 'warning',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				let id
				if (e == 0) {
					id = ''
				} else {
					id = _this.id
				}

				let params = {
					id: id,
					photo: _this.imageUrl,
					loginName: _this.nloginname,
					no: _this.ngongnum, //工号
					name: _this.nname,
					mobile: _this.ntel, //手机号
					password: _this.npsd,
					tpassword: _this.nrepsd,
					email: _this.nemail,
					addr: _this.naddr, //详细地址
					loginFlag: _this.loginFlag, //(0:不能登陆/1:可登陆)
					provid: _this.provid,
					cityid: _this.cityid,
					townid: _this.townid,
				}
				Creatqyuser('platform/saveSysUser', params).then(res => {
					console.log(res);
					if (res.isSuccess) {
						_this.$message({
							message: res.resultData,
							type: 'success',
							duration: 500
						});
						if (e == 0) {
							_this.addbox = false;

						} else {
							_this.dialogVisible = false;
						}
						_this.nloginname = ""
						_this.ngongnum = ""
						_this.nname = ""
						_this.npsd = ""
						_this.ntel = ''
						_this.nrepsd = ""
						_this.nemail = ""
						_this.naddr = ""
						_this.loginFlag = ""
						_this.provid = ""
						_this.cityid = ""
						_this.townid = ""
						_this.imageUrl = ''
						_this.qygly();
					} else {
						_this.$message({
							message: res.message,
							type: 'error',
							duration: 500
						});
					}
				})


			},
			quxiao() {
				this.dialogVisible = false
				this.nloginname = ""
				this.ngongnum = ""
				this.nname = ""
				this.npsd = ""
				this.ntel = ''
				this.nrepsd = ""
				this.nemail = ""
				this.naddr = ""
				this.loginFlag = ""
				this.provid = ""
				this.cityid = ""
				this.townid = ""
				this.imageUrl = ''
			},
			qygly() { //区域管理页
				let params = {
					pageIndex: this.page, //当前页
					pageSize: this.pages, //每页大小
					loginName: this.loginname, //登录名
					name: this.name, //姓名
					provid: this.provid, //省级ID
					cityid: this.cityid, //市级ID
					townid: this.townid, //区县ID
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				qygly('platform/selectSysUserPageList', params).then(res => {
					console.log(res.resultData.content)
					this.tableData = res.resultData.content;
					this.zong = res.resultData;
					setTimeout(() => {
						loading.close();
					}, 2000);
				})
			},
			//获取单个管理员信息
			getRow(e) {
			
				let _this = this;
				console.log(e)

				_this.id = e.id;
				_this.dialogVisible = true;
				_this.imageUrl = e.photo;
				_this.nloginname = e.loginName;
				_this.ngongnum = e.no;
				_this.nname = e.name;
				_this.npsd = ''
				_this.ntel = e.mobile;
				_this.nrepsd = '';
				_this.nemail = e.email;
				_this.naddr = e.addr;
				_this.loginFlag = e.loginFlag;
				
				_this.provname = e.provname
				_this.cityname = e.cityname
				_this.townname = e.townname
				_this.provid=e.provid
				_this.cityid=e.cityid
				_this.townid=e.townid
			},
			//获取省
			getprovList() {
				getprovList('platform/getTAddressProvinceList').then(res => {
					console.log(res);
					this.provList = res.resultData
				})

			},
			//获取市
			getcityList() {
				let _this = this;
				if (_this.provid == '') {
					_this.$message({
						message: '请先选择省级',
						type: 'error',
						duration: 500
					});
					return;
				} else {
					let params = {
						provid: _this.provid
					}
					getcityList('platform/getTAddressCityList', params).then(res => {
						console.log(res);
						_this.cityList = res.resultData
					})
				}

			},
			//获取区县
			gettownList() {
				let _this = this
				if (_this.cityid == '') {
					_this.$message({
						message: '请先选择市级',
						type: 'error',
						duration: 500
					});
					return;
				}
				let params = {
					cityid: _this.cityid
				}
				gettownList('platform/getTAddressTownList', params).then(res => {
					_this.townList = res.resultData
				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.qygly()
				console.log(`当前页: ${val}`);
			},
			open() {
				this.$confirm('确认要删除所选信息吗?', '系统提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.qygldel()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			qygldel() { //选择删除
				let params = {
					ids: this.goodsidlist.join(",")
				}
				qygldel('platform/deleteSysUser', params).then(res => {
					this.$message({
						type: 'success',
						message: res.resultData
					});
					this.qygly()
				})
				this.goodsidlist = ''
			},

			deld(selection, row) {
				let arr = []
				for (let i in selection) {
					arr.push(selection[i].id)
				}
				console.log(arr)
				this.goodsidlist = arr
			},
			quanxuan(selection) {
				this.goodsidlist = []
				let arr = []
				// console.log(selection)
				// console.log(selection)
				for (let i in selection) {
					arr.push(selection[i].id)
				}
				this.goodsidlist = arr
			},
			dengluming(val){
			 let codeReg = new RegExp("[A-Za-z0-9]+"), //正则 英文+数字；
			     len=val.length,
			     str='';
			    for(var i=0;i<len;i++){
			     if(codeReg.test(val[i])){
			      str+=val[i];
			     }
			    }
				this.nloginname=str;
			 },
			 gonghao(val){
				 let codeReg = new RegExp("[A-Za-z0-9]+"), //正则 英文+数字；
				     len=val.length,
				     str='';
				    for(var i=0;i<len;i++){
				     if(codeReg.test(val[i])){
				      str+=val[i];
				     }
				    }
				 				this.ngongnum=str;
			 },
			 youxiang(val){
				 
				 let codeReg = new RegExp("[A-Za-z0-9@.]+"), //正则 英文+数字；
				     len=val.length,
				     str='';
				    for(var i=0;i<len;i++){
				     if(codeReg.test(val[i])){
				      str+=val[i];
				     }
				    }
				 this.nemail=str;
			 }
			 

		},
		mounted() {
			this.qygly();
			//获取省
			this.getprovList()

		}

	}
</script>
<style scoped="scoped" lang='less'>
	/* .el-main {
		height: 784px;
		padding: 0;
	} */

	.jia {
		width: 13px;
		height: 11px;
		background-color: #ffffff;
		color: #0b9cf4;
		margin: auto;
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

						img {
							width: 100px;
							height: 100px;
						}

						.img {
							height: 90px;
							width: 90px;
							border-radius: 50%;
							overflow: hidden;

							img {
								height: 100px;
								width: 100px;
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

	.titlebar {

		height: 46px;
		background-color: #0b9cf4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 21px;
		padding-right: 21px;

		.yoou {

			display: flex;
			align-items: center;

			.span1 {
				font-size: 22px;
				color: #FFFFFF;
				margin-right: 22px;
			}

			.imgone {
				width: 22px;
				height: 22px;
				margin-right: 22px;
			}

			.imgone1 {
				width: 26px;
				height: 22px;
				margin-right: 22px;
			}
		}

		.fenl1 {
			font-size: 22px;
			color: #ffffff;
		}
	}


	.fenye {
		height: 81px;
		line-height: 81px;

	}

	.hezi {
		display: flex;

		align-items: center;
		justify-content: space-between;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.el-input {
		width: 280px;
		height: 40px;
		border-radius: 20px;
		margin-right: 10px;
	}

	.el-select {
		width: 280px;
		height: 40px;
		margin-right: 10px;
	}

	.box2 {
		width: 174px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-right: 40px;

	}

	.box3 {
		width: 120px;
		height: 40px;
		border: 1px solid #0B9CF4;
		border-radius: 20px;
		display: flex;
		align-items: center;
		padding-left: 30px;
		padding-right: 30px;
		justify-content: space-between;
		box-sizing: border-box;
	}


	.demo-image__preview {
		img {
			width: 60px;
			height: 60px;
		}

	}

	.dox1 {
		display: flex;
		width: 100%;
	}

	.dox2 {
		width: 50%;

	}

	.dox3 {
		display: flex;
		border: 1px solid #e4e4e4;
		height: 120px;
	}

	.xox1 {
		width: 30%;
		background-color: #fafafa;
		height: 100%;

		span {
			font-size: 18px;
			color: #333333;
			line-height: 120px;
			margin-left: 20px;
		}
	}

	.b1 {
		display: block;
		margin-bottom: 10px;
		margin-left: 23px;
		background-color: #0b9cf4;
		border: 1px solid #e4e4e4;
		border-radius: 3px;

		width: 80px;
		height: 36px;
	}

	.b2 {
		background-color: #fafafa;
		margin-bottom: 10px;
		margin-left: 23px;
		border: 1px solid #e4e4e4;
		width: 80px;
		height: 36px;
	}

	.xox2 {
		display: flex;
		align-items: center;

		img {
			width: 50px;
			height: 50px;
			border-radius: 50%;
			margin-left: 20px;
		}
	}

	.dox4 {
		display: flex;
		height: 60px;
		border: 1px solid #e4e4e4;

		.a1 {
			width: 30%;
			height: 60px;
			background-color: #fafafa;
			line-height: 60px;
		}

		.a2 {

			height: 60px;
			margin-left: 20px;
			line-height: 60px;
		}
	}

	.quxian {
		display: flex;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;

		.quxian1 {
			width: 15%;
			height: 60px;
			background-color: #fafafa;
			line-height: 60px;

			span {
				float: right;
				margin-right: 20px;

			}
		}

		.quxian2 {
			line-height: 60px;
			display: flex;
			width: 75%;
			align-items: center;

			span {
				width: 17%;
				height: 36px;
				background-color: #fafafa;
				margin-left: 20px;
				line-height: 36px;
				padding-left: 3%;
			}
		}
	}

	.dizhi {
		display: flex;
		border: 1px solid #e4e4e4;

		.dizhi1 {
			width: 15%;
			height: 60px;
			background-color: #fafafa;
			line-height: 60px;

			span {
				float: right;
				margin-right: 20PX;
			}
		}

		.dizhi2 {
			line-height: 60px;
			display: flex;
			width: 75%;
			align-items: center;

			span {

				margin-left: 20px;
			}
		}
	}

	.zhaopian {
		display: flex;
		width: 100%;

		.yingye {
			display: flex;
			width: 50%;
			border-left: 1px solid #e4e4e4;
			border-right: 1px solid #e4e4e4;

			.yingye1 {
				width: 30%;
				height: 150px;
				background-color: #fafafa;
				line-height: 150px;

				span {
					float: right;
					margin-right: 20px;
				}
			}

			.yingye2 {
				img {
					width: 160px;
					height: 100px;
					margin-left: 20px;
					margin-top: 22px;
					background-color: #e4e4e4;
				}
			}
		}

		.shenfen {
			display: flex;
			width: 50%;

			border-right: 1px solid #e4e4e4;

			.shenfen1 {
				width: 30%;
				height: 150px;
				background-color: #fafafa;
				line-height: 150px;

				span {
					float: right;
					margin-right: 20px;
				}
			}

			.shenfen2 {
				display: flex;

				img {
					width: 160px;
					height: 100px;
					margin-left: 20px;
					margin-top: 22px;
					background-color: #e4e4e4;
				}
			}
		}

	}

	.zhuantai {
		margin: auto;
	}

	.beizhu {
		display: flex;
		width: 100%;
		border-left: 1px solid #e4e4e4;
		border-right: 1px solid #e4e4e4;
		border-bottom: 1px solid #e4e4e4;

		.beizhu1 {
			width: 15%;
			height: 120px;
			background-color: #fafafa;
			line-height: 120px;

			span {
				float: right;
				margin-right: 20px;
			}

		}

		.beizhu2 {
			width: 80%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

	}

	.biaoge {
		border-collapse: collapse;
		border-color: #dae3ec;
		border: 1px solid #ccc;
		margin-top: 10px;
		font-size: 18px;
		width: 1060px;

		tr {
			/* width: 1060px; */
			height: 60px;
		}
	}

	.tbale {
		width: 180px;
		height: 120px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.tbale1 {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.blle1 {
		width: 350px;
		height: 60px;

		.el-input {

			margin-left: 20px;
		}

	}

	.blle {
		width: 350px;
		height: 120px;

		span {

			margin-left: 20px;
		}
	}

	.baoguolie {
		display: flex;
	}

	.kfjbvm {
		margin-left: 20px;
		display: flex;

		img {
			border-radius: 50%;
			width: 90px;
			height: 90px;
		}
	}

	.b1 {
		display: block;
		margin-bottom: 10px;
		margin-left: 23px;
		background-color: #0b9cf4;
		border: 1px solid #e4e4e4;
		border-radius: 3px;

		width: 80px;
		height: 36px;
	}

	.b2 {
		background-color: #fafafa;
		margin-bottom: 10px;
		margin-left: 23px;
		border: 1px solid #e4e4e4;
		width: 80px;
		height: 36px;
	}

	.jkl {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
		}
	}

	.oku {
		width: 878px;
		height: 60px;

		span {

			margin-left: 20px;
		}
	}

	.pslkc {
		width: 350px;
	}

	.ordern {
		display: flex;
		align-items: center;
		border: 1px solid #e4e4e4;
		margin-top: 20px;
		width: 590px;
		margin-left: 5px;
	}

	.ordern1 {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;
		margin-right: 20px;

		span {
			margin-right: 20px;
			line-height: 60px;
		}
	}

	.ordern2 {
		width: 350px;
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
			height: 780px;
			margin-bottom: 20px;
			width: 1080px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.title {
				width: 100%;
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
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
				left: 0;
				bottom: 20px;

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}
	}
</style>
