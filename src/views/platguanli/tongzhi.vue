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
							<span class="fenl1">平台通知（商家，消费者）</span>
							<div class="yoou">
								<div @click="addbox = true">
									<img src="../../assets/img/baijia.png" alt="">
									<span class="span1">新建</span>
								</div>
								<!-- <img src="../../assets/img/shanchu.png" alt="" class="imgone1"> -->
								<img src="../../assets/img/shuaxinbai.png" alt="" @click="resect" class="imgone1">
							</div>
						</div>
						<div class="searchbox">
							<div class="search">
								<el-input v-model="userNo" placeholder="用户昵称" size="medium" @change="getTongzhi(0)"></el-input>
								
								<el-input v-model="userTel" placeholder="用户手机" size="medium" @change="getTongzhi(0)" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
								<el-select v-model="source" size="medium" placeholder="用户来源" @change="getTongzhi(0)">
									<el-option key="0" value="0" label="买来卖"></el-option>
									<el-option key="1" value="1" label="联采"></el-option>
								
								</el-select>
								<!-- <el-select v-model="newsTitle" size="medium" placeholder="消息标题" @change="getTongzhi(0)">
									<el-option key="0" value="0" label="系统通知"></el-option>
									<el-option key="1" value="1" label="订单通知"></el-option>
									<el-option key="2" value="2" label="店铺审核通知"></el-option>
									<el-option key="" value="" label="所有通知"></el-option>

								</el-select> -->
								
								<el-date-picker v-model="time" type="datetimerange" size="medium" range-separator="至" start-placeholder="开始日期"
								 end-placeholder="结束日期" value-format="timestamp" style="margin-left: 20px;" @change="getTongzhi(0)">
								</el-date-picker>
								<!-- <span>{{time}}</span> -->
							</div>
							<div class="btngrap">
								<img src="../../assets/img/sousu.png" alt="" @click="getTongzhi">
								<div class="shuax" @click="resect">
									<img src="../../assets/img/shuaxinb.png" alt="">
									<span>重置</span>
								</div>
							</div>
						</div>
						<div class="tablebox" style="position: relative;">
							<el-table :data="tongzhiList" style="width: 100%" row-key="id" border stripe lazy>
								<el-table-column prop="userNo" label="用户昵称" width="180">
								</el-table-column>
								<el-table-column  label="用户来源" width="180">
									<template slot-scope="scope">
										<span v-if="scope.row.source == 0">买来卖</span>
										<span v-if="scope.row.source == 1">联采</span>
									</template>
								</el-table-column>
								<el-table-column prop="phoneNum" label="用户手机" width="180">
								</el-table-column>
								<el-table-column  label="消息标题" width="180">
									<template slot-scope="scope">
										<div class="setbox">
											<div @click="getItem(scope.row)" v-if="scope.row.title">{{scope.row.title}}</div>
											<div v-if="!scope.row.title" @click="getItem(scope.row)">系统通知</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column prop="content" label="推送内容" width="340" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="strAdtime" label="推送时间" sortable width="240">
								</el-table-column>

							</el-table>

						</div>
						<div class="block">
							<div class="demonstration">
								<!-- <sapn >显示第 1 页</sapn> -->
								<sapn>总共{{totalpage}}条记录</sapn>
							</div>
							<div style="display: flex; align-items: center;">
								<!-- <span>每页显示</span> -->
								<el-pagination layout="prev, pager, next,jumper" :total="totalpage" 
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
		
		<div class="addbox" v-if="addbox">
			<div class="mask" @click="addbox = false"></div>
			<div class="addwrap">
				<div class="title">新建系统消息</div>
				<div class="tablebox">
					<table class="table" align="center" border="1" cellpadding="0px" cellspacing="0px">
						<tr>

							<td class="text">用户类型:</td>
							<td>
								<el-select size="medium" v-model="usertype" placeholder="用户类型" style="width: 200px;">
									<el-option key="1" value="1" label="全部用户"></el-option>
									<el-option key="0" value="0" label="单(多)用户"></el-option>
								</el-select>
							</td>
						</tr>


						<tr>
							<td class="text">推送内容:</td>
							<td colspan="3">
								<div class="value">
									<el-input show-word-limit type="textarea" placeholder="请输入内容" v-model="content" :autosize="{ minRows: 7, maxRows: 10}">
									</el-input>
								</div>
							</td>
						</tr>
						<tr v-if="usertype == 0">
							<td class="text">接收人:</td>
							<td colspan="3">
								<!-- <el-input disable size="medium" clearable>
									<el-button slot="append" @click="infobox = true" type="primary" size="mini" style="width: 100px; color: #0b9cf4; font-size: 18px;border: none;"
									 icon="el-icon-search"></el-button>
									
								</el-input> -->
								<el-button slot="append"  type="primary" @click="openinfobox(1)" style="color: #fff; font-size: 18px;border: none; margin-right: 20px;"
								 icon="el-icon-s-shop">商家</el-button>
								 
								 
								<el-button slot="append" type="primary" @click="openinfobox(0)" style="color: #fff; font-size: 18px;border: none;"
								 icon="el-icon-user-solid">消费者</el-button>
								<!-- <el-button slot="append" v-if="uidList.length!=0" type="primary" @click="openinfobox" style="color: #fff; font-size: 18px;border: none;"
								 icon="el-icon-user">消费者</el-button> -->
								<!-- <el-button slot="append" v-if="uidList.length!=0 && usertype == 1" type="primary" @click="infobox = true" style="color: #fff; font-size: 18px;border: none;"
								   icon="el-icon-user-solid">已选择多用户</el-button> -->
								   
								   

							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<el-button type="primary" @click="createNioce">确定</el-button>
					<el-button type="info" @click="close">取消</el-button>
				</div>
			</div>
		</div>
		<div class="addbox" v-if="detailbox">
			<div class="mask" @click="detailbox = false"></div>
			<div class="addwrap">
				<div class="title">平台通知详情</div>
					<div class="tablebox">
					<div class="contop">
						<div class="titlecc">{{iteminfo.title}}</div>
						<span>推送时间：{{iteminfo.strAdtime}}</span>
					</div>
					<div class="infotext">
						{{iteminfo.content}}
					</div>
				</div>
				<div class="bottom">
					<!-- <el-button type="primary" @click="detailbox=">确定</el-button> -->
					<el-button type="info" @click="detailbox = false">关闭</el-button>
				</div>
			</div>
		</div>
		
		<div class="addbox" v-if="infobox">
			<div class="mask" @click="infobox = false"></div>
			<div class="addwrap">
				<div class="title">选择消费者</div>

				<div class="searchbox">
					<div class="search" style="width: 800px;">

						
						<el-input v-model="muserNo" placeholder="用户编号" size="medium" style="width: 20%;" @change="getmemberListpage(0)"></el-input>
						<el-input v-model="muserTel" placeholder="手机号" size="medium" style="width: 20%;" @change="getmemberListpage(0)"></el-input>
						<div style="width: 160px;">
							<el-select v-model="mstate" size="medium" placeholder="状态" style="width: 100%;" @change="getmemberListpage(0)">
								<el-option key="1" value="0" label="禁用"></el-option>
								<el-option key="0" value="1" label="可用"></el-option>
							</el-select>
						</div>
					</div>
					<div class="btngrap" style="width: 20%;">
						<img src="../../assets/img/sousu.png" @click="getmemberListpage(0)" alt="">
						<div class="shuax" @click="mresect(0)">
							<img src="../../assets/img/shuaxinb.png" alt="">
							<span>重置</span>
						</div>
					</div>
				</div>
				<div class="tablebox">
					<el-table ref="multipleTable" :data="memberList" tooltip-effect="dark" style="width: 100%" border :row-key="getRowKey" @select="danxuan" @select-all="quanxuan" @selection-change="handleSelectionChange">
						
						<el-table-column type="selection" :reserve-selection="true">
						</el-table-column>
						<el-table-column prop="userNo" label="用户编号">
						
						</el-table-column>
						<el-table-column prop="nickName" label="用户昵称">
						</el-table-column>

						<el-table-column prop="phoneNum" label="手机号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="name" label="状态" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="setbox">
									<div v-if="scope.row.state == 1">可用</div>
									<div v-if="scope.row.state == 0">禁用</div>
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="strAdtime" label="添加时间" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="strUptime" label="更新时间" show-overflow-tooltip>
						</el-table-column>
					</el-table>
					<!-- <div style="margin-top: 20px">
						<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
						<el-button @click="toggleSelection()">取消选择</el-button>
					</div> -->

				</div>
				<div class="block">
					<div class="demonstration">
						<sapn>总共{{mtotalpage}}条记录</sapn>
					</div>
					<div style="display: flex; align-items: center;">
						<span>每页显示</span>
						<el-pagination layout="prev, pager, next,jumper" :total="mtotalpage" 
						 :current-page.sync="mnowpage" @current-change='mcurrentclick'>
						</el-pagination>

					</div>
				</div>
				<div class="bottom">

					<el-button type="primary" @click="infobox = false">确定</el-button>
					<el-button type="info" @click="close">取消</el-button>

				</div>

			</div>
		</div>
		
		<!-- 选择厂家 -->
		<div class="addbox" v-if="facinfobox">
			<div class="mask" @click="facinfobox = false"></div>
			<div class="addwrap">
				<div class="title">选择商家</div>
		
				<div class="searchbox">
					<div class="search" style="width: 800px;">
		
						<!-- <div style="width: 160px;">
							<el-select size="medium" placeholder="角色" style="width: 100%;">
								<el-option key="1" value="1" label="财务"></el-option>
								<el-option key="0" value="0" label="市场"></el-option>
								<el-option key="2" value="2" label="区域管理员"></el-option>
							</el-select>
						</div> -->
						<el-input v-model="shopname" placeholder="厂家名称" size="medium" style="width: 20%;" @change="getmemberListpage(1)"></el-input>
						<el-input v-model="muserTel" placeholder="手机号" size="medium" style="width: 20%;" @change="getmemberListpage(1)"></el-input>
						<div style="width: 160px;">
							<el-select v-model="mstate" size="medium" placeholder="状态" style="width: 100%;" @change="getmemberListpage(1)">
								<el-option key="1" value="1" label="停用"></el-option>
								<el-option key="0" value="0" label="可用"></el-option>
							</el-select>
						</div>
					</div>
					<div class="btngrap" style="width: 20%;">
						<img src="../../assets/img/sousu.png" @click="getmemberListpage(1)" alt="">
						<div class="shuax" @click="mresect(1)">
							<img src="../../assets/img/shuaxinb.png" alt="">
							<span>重置</span>
						</div>
					</div>
				</div>
				<div class="tablebox">
					<el-table ref="fmultipleTable" :data="memberList" tooltip-effect="dark" style="width: 100%" border :row-key="getRowKey" @select="danxuan" @select-all="quanxuan" @selection-change="handleSelectionChange">
						<!-- @select="danxuan"
						 @select-all="quanxuan" -->
						<el-table-column type="selection" :reserve-selection="true">
						</el-table-column>
						<el-table-column prop="nickName" label="厂家名称">
							<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
						</el-table-column>
						<el-table-column prop="userIcon" label="营业人">
						</el-table-column>
		
						<el-table-column prop="phoneNum" label="手机号" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="name" label="状态" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="setbox">
									<div v-if="scope.row.state == 1">停用</div>
									<div v-if="scope.row.state == 0">正常</div>
								</div>
							</template>
						</el-table-column>
						<!-- <el-table-column prop="strAdtime" label="添加时间" show-overflow-tooltip>
						</el-table-column> -->
						<el-table-column prop="strUptime" label="更新时间" show-overflow-tooltip>
						</el-table-column>
					</el-table>
					<!-- <div style="margin-top: 20px">
						<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
						<el-button @click="toggleSelection()">取消选择</el-button>
					</div> -->
		
				</div>
				<div class="block">
					<div class="demonstration">
						<sapn>总共{{mtotalpage}}条记录</sapn>
					</div>
					<div style="display: flex; align-items: center;">
						<!-- <span>每页显示</span> -->
						<el-pagination layout="prev, pager, next,jumper" :total="mtotalpage" 
						 :current-page.sync="mnowpage" @current-change='mcurrentclick'>
						</el-pagination>
		
					</div>
				</div>
				<div class="bottom">
		
					<el-button type="primary" @click="facinfobox = false">确定</el-button>
					<el-button type="info" @click="close">取消</el-button>
		
				</div>
		
			</div>
		</div>

	</el-container>
</template>

<script>
	import Left from '../../components/Left.vue';
	import Header from '../../components/Header.vue';
	import Footer from '../../components/Footer.vue';
	import Daohang from '../../components/Daohang.vue';
	import {
		getpttongzhi,
		changeTime,
		Creatptnicoe,
		getMemberList,
		getfacMemberList
	} from '../../request/API/request.js';
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
				peopleflag:'', // 0消费者 1商家
				infobox: false,
				addbox: false,
				detailbox:false, //详情弹框
				iteminfo:'',
				
				facinfobox:false, //厂家列表
				
				//检索
				userNo: '',
				userTel: '',
				newsTitle: '',
				source:'', //来源
				time: '',
				shopname:'',


				content: '',
				usertype: '',
				page: 0,
				totalpage: '',
				pageSize: 10,
				nowpage: '',
				mnowpage: '',
				tongzhiList: [],

				//接收人(会员)
				memberList: [],
				mpage: 0,
				mtotalpage: '',
				mpageSize: 10,
				muserNo: '',
				muserTel: '',
				mstate: '',
				mtime: '',
				selectList: [], //选中列表
				uidList: [], //选中列表id集合
				
				// //接收人(商家)
				// fmemberList: [],
				// fmpage: 0,
				// ftotalpage: '',
				// fpageSize: 10,
				// fuserNo: '',
				// fuserTel: '',
				// fstate: '',
				// ftime: '',
				// fselectList: [], //选中列表
				// fidList: [], //选中列表id集合


				//测试
				multipleSelection: [],
				fmultipleSelection:[],
				listData :[]

			}

		},
		methods: {
			
			getItem(row){
				let _this = this;
				console.log(row);
				_this.iteminfo = row;
				_this.detailbox = true;
			},
			mresect(e){
				this.mpage = 0
				this.memberList=[];
				this.muserNo = '';
				this.muserTel = '';
				this.mstate = '';
				this.uidList = '';
				this.peopleflag = e;
				this.shopname = ''
				this.getmemberListpage()
			},
			handleSelectionChange(val) {
				console.log(val)
				this.multipleSelection = val;
				// for (var i = 0; i < this.multipleSelection.length; i++) {
				// 	this.multipleSelection[i].containSpace = 1;
				// }
				//console.log(this.multipleSelection)
			},
			danxuan(row) {
				let _this = this;
				console.log('单选');
				console.log(row);
				_this.selectList = row;
				_this.uidList = []
				let uidarr = [];
				for (let i in row) {
					uidarr.push(row[i].id)
					_this.uidList = uidarr
				}
				console.log(_this.uidList);
			},
			fdanxuan(row){
				
			},
			quanxuan(row) {
				let _this = this;
				console.log('全选');
				console.log(row);
				_this.selectList = row;
				_this.uidList = []
				let uidarr = [];
				for (let i in row) {
					uidarr.push(row[i].id)
					_this.uidList = uidarr
				}
			
				console.log(_this.uidList);
			},
			openinfobox(e) {
				this.peopleflag = e  //0 消费者 1厂家
				
				if (this.usertype == '') {
					this.$message({
						message: '请选择用户类型',
						type: 'error',
						duration: 1500
					});
					return
				}
				if (this.content == '') {
					this.$message({
						message: '请填写通知内容',
						type: 'error',
						duration: 1500
					});
					return
				}
				if(e == 0){
					this.infobox = true
				}else{
					this.facinfobox = true
				}
				this.getmemberListpage()

				
			},
			//关闭
			close() {
				this.addbox = false;
				this.infobox = false;
				this.facinfobox =false;
				this.uidList = [];
				this.content = '';
				this.usertype = '';
				this.mpage = 0;
				this.muserNo = ''
				this.muserTel = ''
				this.mstate = ''
				this.shopname = ''
				
				
			},

			//重置
			resect() {
				this.userNo = '';
				this.userTel = '';
				this.newsTitle = '';
				this.time = '';
				this.page = 0;
				this.reload()
				this.getTongzhi();
			},
			//新建通知(接受人为会员)
			createNioce() {
				let _this = this;
				if (_this.usertype == '' || _this.content == '') {
					_this.$message({
						message: '相关信息不能为空!',
						type: 'error',
						duration: 500
					});
					return;
				}
				if (_this.usertype == 0 && _this.uidList.length == 0) {
					_this.$message({
						message: '请选择通知接收人!',
						type: 'error',
						duration: 500
					});
					return;
				}
				let uidListstr = _this.uidList.join(',')
				let params = {
					type: _this.usertype,
					content: _this.content,
					uids: uidListstr
				}
				let userflag = _this.peopleflag // 0消费者 1商家
				if(userflag == 0){ //消费者
					Creatptnicoe('platform/saveSysmsg', params).then(res => {
						console.log(res)
						if (res.isSuccess) {
							_this.$message({
								message: res.resultData,
								type: 'success',
								duration: 500
							});
							_this.addbox = false;
							_this.uidList = [];
							_this.getTongzhi();
						} else {
							_this.$message({
								message: res.resultData,
								type: 'error',
								duration: 500
							});
						}
					})
				}else{ //商家
					Creatptnicoe('platform/saveOaNotify', params).then(res => {
						console.log(res)
						if (res.isSuccess) {
							_this.$message({
								message: res.resultData,
								type: 'success',
								duration: 500
							});
							_this.addbox = false;
							_this.uidList = [];
							_this.getTongzhi();
						} else {
							_this.$message({
								message: res.resultData,
								type: 'error',
								duration: 500
							});
						}
					})
				}
				
				

			},
			getRowKey(row){
				return row.id
			},

			//获取会员列表
			getmemberListpage(e) {
				let _this = this;
				if(e){
					_this.mpage = 0
					_this.peopleflag = e
				}
				let params = {
					pageIndex: _this.mpage,
					pageSize: _this.pageSize,
					userNo: _this.muserNo,
					phoneNum: _this.muserTel,
					nickName: _this.shopname,
					gender: '', //性别 (0:女/1:男)
					state: _this.mstate, //状态(0:禁用/1:可用) 
					createTime: '', //创建时间
					updateTime: '', //更新时间
					flag:_this.peopleflag   //0消费者 1厂家
					

				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				getMemberList('platform/selectTMemberPageList', params).then(res => {
					console.log(res, "会员列表");
					this.multipleSelection=[];
					_this.memberList = res.resultData.content;
					_this.mtotalpage = res.resultData.total;
					_this.mnowpage = res.resultData.pageIndex;
					_this.memberList.forEach((item, i) => {
						this.multipleSelection.forEach((multItem, j) => {
							if (this.tableData[i].id == this.multipleSelection[j].id) {
								this.$refs.multipleTable.toggleRowSelection(this.memberList[i], true); //这步操作是让页面显示选中的数据
							}
						})
					})
					setTimeout(() => {
						loading.close();
					}, 1000);
					// _this.muserNo = ''
					// _this.muserTel = ''
					// _this.mstate = ''
					// _this.shopname = ''
					
				})


			},
			//保存
			
			//检索会员
			// msearch() {
			// 	let _this = this;
			// 	let params = {
			// 		pageIndex: _this.mpage,
			// 		pageSize: _this.mpageSize,
			// 		userNo: _this.muserNo,
			// 		phoneNum: _this.muserTel,
			// 		nickName: '',
			// 		gender: '', //性别 (0:女/1:男)
			// 		state: _this.mstate, //状态(0:禁用/1:可用)
			// 		createTime: '', //创建时间
			// 		updateTime: '', //更新时间

			// 	}
			// 	getMemberList('platform/selectTMemberPageList', params).then(res => {
			// 		console.log(res, "会员列表");
			// 		_this.memberList = res.resultData.content;
			// 		_this.mtotalpage = res.resultData.total;
			// 	})

			// },

			//检索
			// search(){
			// 	let _this = this;
			// 	console.log(_this.time);


			// 	let params = {
			// 		pageIndex:_this.page,
			// 		pageSize:_this.pageSize,
			// 		userNo:_this.userNo,
			// 		phoneNum:_this.userTel,
			// 		titlestate:_this.newsTitle,
			// 		content:'',
			// 		title:'',
			// 		createTime:Timearr
			// 	};
			// 	getpttongzhi('platform/selectTSysmsgPageList',params).then(res => {
			// 		console.log(res);
			// 		_this.tongzhiList=res.resultData.content;
			// 		_this.totalpage = res.resultData.total;
			// 		console.log(_this.totalpage)
			// 	})

			// },

			getTongzhi(e) {
				let _this = this;
				if (e == 0) {
					_this.page = 0;
					// this.reload()
				}
				let timeArr = _this.time;
				let Timearr
				if (timeArr == '') {
					let sTime = ''
					let endTime = ''
					Timearr = '';

				} else {
					let sTime = changeTime(timeArr[0]);
					let endTime = changeTime(timeArr[1]);
					Timearr = sTime + ',' + endTime;


				}
				let params = {
					pageIndex: _this.page,
					pageSize: _this.pageSize,
					userNo: _this.userNo,
					phoneNum: _this.userTel,
					title: '',
					source:_this.source,
					content: '',
					titlestate: _this.newsTitle,
					createTime: Timearr
				};
				// const loading = this.$loading({
				// 	lock: true,
				// 	text: '正在加载中',
				// 	background: 'rgba(255,255, 255, 0.4)'
				// });
				getpttongzhi('platform/selectTSysmsgPageList', params).then(res => {
					console.log(res);
					_this.tongzhiList = res.resultData.content;
					_this.totalpage = res.resultData.total;
					_this.nowpage = res.resultData.pageIndex
					console.log(_this.totalpage);

					// setTimeout(() => {
					// 	loading.close();
					// }, 500);
				})
			},
			// //上一页
			// prevpage(e) {
			// 	console.log('点击上一页');
			// 	let _this = this;
			// 	if (e == 0) {
			// 		_this.page--
			// 		_this.getTongzhi()
			// 	} else if(e == 1){ //消费者
			// 		_this.mpage--
			// 		_this.peopleflag = 0
			// 		_this.getmemberListpage()
			// 	}else if(e == 2){ //厂家
			// 		_this.mpage--
			// 		_this.peopleflag = 1
			// 		_this.getmemberListpage()
			// 	}


			// },
			// //下一页
			// nextpage(e) {
			// 	console.log('点击下一页');
			// 	let _this = this;
			// 	if (e == 0) {
			// 		_this.page++
			// 		_this.getTongzhi()
			// 	} else {
			// 		_this.mpage++
			// 		_this.getmemberListpage()
			// 	}

			// },
			mcurrentclick(e) {
				let _this = this;
				let nowpage = e - 1;
				_this.mpage = e - 1;
				// _this.peopleflag = e
				_this.getmemberListpage()

			},
			currentclick(e) {
				console.log('点击下一页');
				let _this = this;
				console.log(e)
				_this.page = e - 1;
				_this.getTongzhi()
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
			this.getTongzhi();
			this.getmemberListpage();
			this.getfidlist()
		}
	}
</script>

<style scoped="scoped" lang="less">
	.nobefor {
		&::before {
			content: '' !important;
		}
	}
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
	/*包含以下四种的链接*/
	a {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/*正常的未被访问过的链接*/
	a:link {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/*已经访问过的链接*/
	a:visited {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/*鼠标划过(停留)的链接*/
	a:hover {
		text-decoration: none;
		color: #0b9cf4 !important;
	}

	/* 正在点击的链接*/
	a:active {
		text-decoration: none;
		color: #0b9cf4 !important;
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
	.searchboxx {
		height: 100px;
		width: 100%;
		display: flex;
		// align-items: center;
		justify-content: space-between;
		background: #fff;
	
		.search {
			height: 100px;
			width: 100%;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding-left: 10px;
	
			.el-input {
				width: 240px;
				height: 40px;
				margin-right: 10px;
				margin-left: 0;
	
			}
	
			.el-select {
				width: 240px;
				height: 40px;
				margin-right: 10px;
				// margin-left: 0;
	
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
				// margin-right: 10px;

			}

			.el-select {
				width: 240px;
				height: 40px;
				// margin-left: 5px;
			}

			.el-date-picker {
				width: 240px;
				height: 40px;
				padding: 0px !important;
				// margin-left: 20px;

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
			width: 1080px;
			height: 780px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;

			.block {
				height: 50px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				box-sizing: border-box;
				padding: 0px 10px;
				bottom: 75px;
				width: 100%;
				background: #fff;
				z-index: 100000;
			}

			.title {
				height: 52px;
				background-color: #fafafa;
				line-height: 52px;
				font-size: 16px;
				box-sizing: border-box;
				padding-left: 20px;
			}

			.tablebox {
				height: 480px;
				width: 100%;
				overflow: auto;

			}

			.table {
				border-collapse: collapse;
				border-color: #dae3ec;
				border: 1px solid #ccc;
				// margin: 20px auto;
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
						width: 878px;
						height: 178px;
						word-wrap: break-word;
						font-size: 16px;
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
				z-index: 100000;
				background: #fff;

				.el-button {
					width: 90px;
					height: 40px;
					font-size: 16px;
				}
			}
		}

	}
</style>
