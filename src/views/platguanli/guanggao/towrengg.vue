<template>

	<div class="home">
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
								<span class="fenl1">两人团轮播广告列表</span>
								<div class="yoou">
									<div @click="xinjian">
										<img src="../../assets/img/baijia.png" alt=""  >
										<span class="span1">新建</span>
									</div>
									<img src="../../assets/img/shanchu.png" alt="" class="imgone1" @click="open()">
									<img src="../../assets/img/shuaxinbai.png" alt="" class="imgone1"  @click="sousu">
									<!-- <img src="../../assets/img/Excel.png" alt="" class="imgone1"> -->
								</div>
							</div>
							<div class="searchbox">
								<div class="search">
									<el-select size="medium" v-model="urltype" placeholder="链接类型"  @change="sousu">
										
										<el-option key="1" value="1" label="厂家"></el-option>
										<el-option key="2" value="2" label="商品"></el-option>
										
									</el-select>
									<el-select size="medium" v-model="state" placeholder="链接状态"  @change="sousu">
										<el-option key="0" value="0" label="显示"></el-option>
										<el-option key="1" value="1" label="不显示"></el-option>
									</el-select>
								</div>
								<div class="btngrap">
									<img src="../../assets/img/sousu.png" alt="" @click="sousu">
									<div class="shuax" @click="chongzhi">
										<img src="../../assets/img/shuaxinb.png" alt="">
										<span class="">重置</span>
									</div>
								</div>
							</div>
							<div class="tablebox">
								<el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
								 @select="deld" @select-all="quanxuan" stripe >
									<el-table-column type="selection" width="47" :selectable='selectInit'>
									</el-table-column>
									<el-table-column prop="name" label="广告图片">
										<div class="demo-image__preview" slot-scope="scope">
											<el-image style="width: 154px; height: 56px" :src="scope.row.img" >
											</el-image>
										</div>
									</el-table-column>
									<el-table-column label="序号" prop="seq">
										<!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
									</el-table-column>
									<el-table-column prop="urltype" label="连接类型">
										<div slot-scope="scope">
											<span v-if="scope.row.urltype==0">富文本</span>
											<span v-if="scope.row.urltype==1">厂家</span>
											<span v-if="scope.row.urltype==2">商品</span>
											<span v-if="scope.row.urltype==3">平台商品二级分类</span>
											<span v-if="scope.row.urltype==5">满减活动商品池</span>
											<span v-if="scope.row.urltype==6">满送活动商品池</span>
											<span v-if="scope.row.urltype==7">限时折扣活动商品池</span>
											<span v-if="scope.row.urltype==8">目标量团购活动商品池</span>
											<span v-if="scope.row.urltype==9">两个人拼团商品池</span>
										</div>
									</el-table-column>
									<el-table-column prop="goodsname" label="商品名称">
									</el-table-column>
									<el-table-column prop="shopname" label="厂家名称">
									</el-table-column>
									<el-table-column label="状态">
										<div slot-scope="scope">
											<span v-if="scope.row.state==0">显示</span>
											<span v-if="scope.row.state==1">不显示</span>
										</div>
									</el-table-column>
									<el-table-column prop="strAdtime" label="创建时间">
									</el-table-column>
									<!-- <el-table-column prop="name" label="操作人" width="150">
									</el-table-column> -->
								
									<el-table-column fixed="right" label="操作">
										<template slot-scope="scope">
											<div class="setbox">
												<div @click="deleteRow(scope.row)">修改</div>
											</div>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<div class="block" style="display: flex; justify-content: space-between; align-items: center; ">
								<div class="demonstration">
									总共{{zong.total}}条数据
								</div>
								<div style="display: flex; align-items: center;">
									<span>每页显示</span>
									<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="zong.total" @current-change="handleCurrentChange" :current-page.sync="zong.pageIndex">
									</el-pagination>
								</div>
							</div>
						</div>
						<!-- <el-dialog title="审核店铺信息" :visible.sync="dialogVisible" width="1200px" :before-close="handleClose"> -->
						<div class="addbox" v-if="dialogVisible">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title" v-if="yetou==1">修改广告轮播</div>
								<div class="title" v-if="yetou==0">新建广告轮播</div>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="ggtu">
											<span>广告图片：</span>
										</td>
										<td class="ggtu1">
											<div class="kfjbvm">
												<el-upload 
												 class="avatar-uploader" action="https://www.xashudezhao.com/helpsales/platform/uploadImg" :show-file-list="false"
												 :on-success="handleAvatarSuccess" :data="imges" :before-upload="beforeAvatarUpload">
													<div style="width: 200px;height: 100px;margin-right: 20px;border: 1px solid #E4E4E4;">
														<img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100%;height: 100%;">
														
													</div>
													<div style="display: flex;flex-direction:column">
														<el-button lot="trigger" size="small" type="primary" style="margin-bottom: 10px;">选择</el-button>
														<el-button size="small" type="primary" style="margin: 0; background-color: #E4E4E4;border: 1px solid #E4E4E4;color: black;"
														 @click.stop='quxaiotu'>取消</el-button>
													</div>
												</el-upload>
											</div>
										</td>
										<td class="ggtu">
											<span>序号：</span>
										</td>
										<td class="ggtu1">
											<div style="margin-left: 20px;">
												<el-input v-model="xuhaol" oninput="value=value.replace(/[^\d]/g,'')" placeholder="输入序号" ></el-input>
											</div>
										</td>
									</tr>
								</table>
								<table align="center" border="1" cellpadding="0px" cellspacing="0px" class="biaoge">
									<tr>
										<td class="xuanzechang">
											<span>
												链接类型:
											</span>
										</td>
										<td class="changxuanze">
											<div class="xuanzechang2">
												<el-select size="medium" v-model="ljlx" placeholder="链接类型 " @focus="xigai1=2">
													<el-option key="2" value="2" label="商品"></el-option>
													<el-option key="1" value="1" label="厂家"></el-option>
												</el-select>
											</div>
										</td>
										<td class="xuanzechang">
											<span>
												状态:
											</span>
										</td>
										<td class="changxuanze">
											<div class="xuanzechang2">
												<el-select size="medium" v-model="spzt" placeholder="状态">
													<el-option key="0" value="0" label="显示"></el-option>
													<el-option key="1" value="1" label="不显示"></el-option>
												</el-select>
											</div>
										</td>
									</tr>
									<tr v-if="ljlx==1||xigai1==1" >
										<td class="xuanzechang">
											<span>
												选择厂家:
											</span>
										</td>
										<td class="changxuanze1" colspan="3">
											<div class="xuanzechang2">
												<el-input v-model="shopnamel" placeholder="选择" @focus="dakai"></el-input>
											</div>
										</td>
									</tr>
									<tr v-if="ljlx==2||xigai1==0">
										<td class="xuanzechang">
											<span>
												选择商品:
											</span>
										</td>
										<td class="changxuanze1" colspan="3">
											<div class="xuanzechang2">
												<el-input v-model="goodnamel" placeholder="选择" @focus="dakai"></el-input>
											</div>
										</td>
									</tr>
								</table>
								<div class="bottom">
									<el-button type="primary" @click="tijiao">确 定</el-button>
									<el-button @click="quxiao">取 消</el-button>
								</div>

							</div>
						</div>

						<!-- </el-dialog> -->

						<div class="addbox" v-if="chanjiaxz">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">选择厂家</div>
								<div class="hezi">
									<div>
										<el-input v-model="ssssname" placeholder="厂家名称"></el-input>
										<el-input v-model="goodphone" placeholder="联系电话"></el-input>
										<el-input v-model="creditcode" placeholder="唯一社会信用代码"></el-input>
									</div>
									<div class="box2">
										<img src="../../assets/img/sousu.png" alt="" @click="shopsouso">
										<div class="box3" @click="shopchongzhi">
											<img src="../../assets/img/shuaxinb.png" alt="">
											<span class="">重置</span>
										</div>
									</div>
								</div>
								<div class="biaoge1">
									<el-table ref="multipleTable" :data="shoplist" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
									 @select="danxuan" stripe border>
										<el-table-column type="selection" width="60">
										</el-table-column>
										<el-table-column prop="shopname" label="厂家名称" width="220">

										</el-table-column>
										<el-table-column label="分类名称" width="120" prop="shoptypename">
											<!-- <template slot-scope="scope">
												<el-image style="width: 54px; height: 56px" :src="scope.row.img" >
												</el-image>
											</template> -->
										</el-table-column>
										<el-table-column prop="provname" label="省份" width="80">
										</el-table-column>
										<el-table-column prop="cityname" label="城市" width="80">
										</el-table-column>
										<el-table-column prop="townname" label="区县" width="80">
										</el-table-column>
										<el-table-column prop="detailaddr" label="详细地址" width="170">
										</el-table-column>
										<el-table-column prop="telephone" label="手机号" width="140">
										</el-table-column>
										<el-table-column prop="creditcode" label="唯一社会信用代码" width="235">
										</el-table-column>
									</el-table>
									<div class="block" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
										<div class="demonstration">
											显示第 {{shoplistzong.pageIndex}} 页
										</div>
										<div style="display: flex; align-items: center;">
											<span>每页显示</span>
											<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="shoplistzong.total"
											 @current-change="handleCurrentChange1">
											</el-pagination>
										</div>
									</div>
								</div>
								<div class="bottom">
									<el-button type="primary" @click="chanjiaxz = false">确 定</el-button>
									<el-button @click="chanjiaxz = false">取 消</el-button>
								</div>
							</div>
						</div>
						<div class="addbox" v-if="shopxz">
							<div class="mask"></div>
							<div class="addwrap">
								<div class="title">选择商品</div>
								<div class="hezi">
									<div>
										<el-input v-model="changjianame" placeholder="厂家名称"></el-input>
										<el-input v-model="shopname6" placeholder="商品名称"></el-input>

									</div>
									<div class="box2">
										<img src="../../assets/img/sousu.png" alt="" @click="goodsouso">
										<div class="box3" @click="goodchongzhi">
											<img src="../../assets/img/shuaxinb.png" alt="">
											<span class="">重置</span>
										</div>
									</div>
								</div>
								<div class="biaoge1">
									<el-table ref="multipleTable" :data="goodlist" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"
									 @select="danxuan1" stripe border>
										<el-table-column type="selection" width="50">
										</el-table-column>
										<el-table-column prop="name" label="商品名称" width="220">
										</el-table-column>
										<el-table-column label="商品封面图片" width="140">
											<template slot-scope="scope">
												<el-image style="width: 54px; height: 56px" :src="scope.row.img" >
												</el-image>
											</template>
										</el-table-column>
										<el-table-column prop="shopName" label="厂家名称" width="263">
										</el-table-column>
										<el-table-column prop="typeName" label="商品类别" width="200">
										</el-table-column>
										<el-table-column prop="pratio" label="平台提成比例" width="220">
										</el-table-column>
									</el-table>
									<div class="block" style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
										<div class="demonstration">
											显示第 {{goodlistzong.pageIndex}} 页
										</div>
										<div style="display: flex; align-items: center;">
											<span>每页显示</span>
											<el-pagination :page-sizes="[10]" layout="sizes, prev, pager, next,jumper" :total="goodlistzong.total"
											 @current-change="handleCurrentChange2">
											</el-pagination>
										</div>
									</div>
								</div>
								<div class="bottom">
									<el-button type="primary" @click="shopxz = false">确 定</el-button>
									<el-button @click="shopxz = false">取 消</el-button>
								</div>
							</div>
						</div>



					</el-main>
					<el-footer height='42px'>
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
		Gglunbolist,
		Ggshoplist,
		Gggoodslist,
		Gggoodsadd,
		Gggoodsdel
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
				srcList: [
					'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
					'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
				],
				input: '',
				textarea: '',
				dialogVisible: false,
				zong: [],
				chanjiaxz: false,
				shopxz: false,
				dantiao: [],
				xuhaol: '',
				ljlx: '',
				spzt: '',
				shoplist: [],
				shoplistzong: [],
				ssssname: '',
				goodphone: '',
				creditcode: '',
				goodsidlist: [],
				goodlist: [],
				goodlistzong: [],
				changjianame: '',
				shopname6: '',
				page: 0,
				page1: 0,
				page2: 0,
				shopnamel: '',
				id: '',
				goodnamel: '',
				urltype: '',
				state: '',
				value: '',
				tableData: [],
				yetou:0,
				imageUrl: '',
				imges: {
					path: '/tAdImage'
				},
				multipleSelection: []
			}
		},
		methods: {
			selectInit(row){
				
				if (row.state == 0) {
					return false;
				} else {
					return true;
				}
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = res.resultData;
				console.log(this.imageUrl)
			},
			quxaiotu() {
				this.imageUrl = ''
			},
			sousu(){
				this.page=0
				this.Gglunbolist()
				
			},
			chongzhi(){
				this.urltype=''
				this.state=''
				this.page = 0
				this.Gglunbolist()
			},
			deld(selection, row) {
				// this.goodsidlist = []
				// console.log(selection,"4454")
				let arr = []

				for (let i in selection) {
					arr.push(selection[i].id)
				}
				this.goodsidlist = arr
				// this.goodsidlist.push(row.id)
				console.log(this.goodsidlist)
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
			Gggoodsdel() {
				let params = {
					ids: this.goodsidlist.join(",")
				}
				Gggoodsdel('platform/deleteTAd', params).then(res => {
					console.log(res)
					if (res.isSuccess == true) {
						this.$message({
							type: 'success',
							message: '删除成功!',
						});
						this.Gglunbolist()

					} else {
						this.$message({
							type: 'error',
							message: '删除失败!',
						});
					}
				})
			},
			quxiao() {
				this.dialogVisible = false
				this.ljlx = ''
				this.zhuid = ''
				this.id = ''
				this.spzt = ''
				this.img = ''
				this.xuhaol = ''
				this.imageUrl=''
			},
			tijiao() {
				if(this.imageUrl==''){
					this.$message({
						type: 'error',
						message: '广告图片不能为空'
					});
					return
				}else if(this.spzt==''){
					this.$message({
						type: 'error',
						message: '广告状态不能为空'
					});
					return
				}else if(this.id==''){
					this.$message({
						type: 'error',
						message: '请选择广告类型'
					});
					return
				}else if(this.xuhaol==''){
					this.$message({
						type: 'error',
						message: '序号不能为空'
					});
					return
				}
				this.Gggoodsadd()
				this.dialogVisible = false
				this.ljlx = ''
				this.zhuid = ''
				this.id = ''
				this.spzt = ''
				this.img = ''
				this.xuhaol = ''
				this.imageUrl=''
			},
			Gggoodsadd() {
				if(this.ljlx=="商品"){
					this.ljlx=2
				}else if(this.ljlx=="厂家"){
					this.ljlx=1
				}
				if(this.spzt=="显示"){
					this.spzt=0
				}else if(this.spzt=="不显示"){
					this.spzt=1
				}
				let params = {
					type: 6,
					urltype: this.ljlx,
					img: this.imageUrl,
					state: this.spzt,
					url: this.id,
					id: this.zhuid,
					seq: this.xuhaol
				}
				Gggoodsadd('platform/saveTAdGoodsType', params).then(res => {
					this.shopnamel=""
					this.goodsnamel=""
					console.log(res)
					this.Gglunbolist()
				})
			},
			danxuan(selection, row) {
				// 清除所有选中
				this.$refs.multipleTable.clearSelection()
				if (selection.length === 0) return
				// 将当前点击项选中
				this.$refs.multipleTable.toggleRowSelection(row, true)
				console.log(row)
				this.shopnamel = row.shopname
				this.id = row.id

			},
			danxuan1(selection, row) {
				// 清除所有选中
				this.$refs.multipleTable.clearSelection()
				if (selection.length === 0) return
				// 将当前点击项选中
				this.$refs.multipleTable.toggleRowSelection(row, true)
				console.log(row)
				this.goodnamel = row.name
				this.id = row.id

			},

			dakai() {
				let e
				e = this.ljlx
				if (e == 2||e=="商品") {
					this.shopxz = true
					this.Gggoodslist()
					//商品弹框
				} else {
					this.chanjiaxz = true
					this.Ggshoplist()
					//厂家弹框
				}
			},
			//商品列表请求
			Gggoodslist() {
				let params = {
					wssubtype: 8,
					// name:this.shopname6,
					// shopName:this.changjianame,
					pageIndex: this.page2,
					pageSize: 10,
					name: this.shopname6,
					shopName: this.changjianame,
				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				Gggoodslist('shop/getAdTGoodsPageList', params).then(res => {
					console.log(res)
					this.goodlist = res.resultData.content
					this.goodlistzong = res.resultData;
					setTimeout(() => {
						loading.close();
					}, 1000);
				})
			},
			//商铺列表请求
			Ggshoplist() {

				let params = {
					wssubtype: 8,

					pageIndex: this.page1,
					pageSize: 10,
					telephone: this.goodphone,
					creditcode: this.creditcode,
					shopname: this.ssssname
				}
				Ggshoplist('shop/getAdTShopPageList', params).then(res => {
					this.shoplist = res.resultData.content
					this.shoplistzong = res.resultData
				})
			},
			Gglunbolist() {
				let params = {
					type: 6,
					urltype: this.urltype,
					state: this.state,
					pageIndex: this.page,
					pageSize: 10

				}
				const loading = this.$loading({
					lock: true,
					text: '正在加载中',
					background: 'rgba(255,255, 255, 0.4)'
				});
				Gglunbolist('platform/getTAdPageList', params).then(res => {
					console.log(res)
					this.tableData = res.resultData.content
					this.zong = res.resultData
					setTimeout(() => {
						loading.close();
					}, 1000);
				})
			},
			//商品列表搜索
			shopsouso() {
				this.Ggshoplist()
			}, //商品列表重置
			shopchongzhi() {
				this.goodphone = ''
				this.creditcode = ''
				this.ssssname = ''
				this.Ggshoplist()
			},
			goodsouso() {
				this.Gggoodslist()
			},
			goodchongzhi() {
				this.shopname6 = ''
				this.changjianame = ''
				
				this.Gggoodslist()
			},
			deleteRow(e) {
				this.yetou=1
				this.dantiao = e
				this.zhuid = this.dantiao.id
				this.dialogVisible=true
				this.imageUrl=e.img
				this.xuhaol=e.seq
				this.id=e.url
				this.goodnamel = e.goodsname
				this.shopnamel= e.shopname
				if (e.urltype == 2) {
					this.xigai1 = 0
				} else {
					this.xigai1 = 1
				}
				let zts
				zts=e.urltype
				if(zts==2){
					this.ljlx="商品"
				}else{
					this.ljlx="厂家"
				}
				let ljzt
				ljzt=e.state
				if(ljzt==0){
					this.spzt="显示"
				}else{
					this.spzt="不显示"
				}
			},
			xinjian(){
				this.xigai1 = 2
				this.yetou=0
				this.dialogVisible = true
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.page = val - 1
				this.Gglunbolist()
				console.log(`当前页: ${val}`);
			},
			handleCurrentChange2(val) {
				this.page2 = val - 1
				this.Gggoodslist()
			},
			handleCurrentChange1(val) {
				this.page1 = val - 1
				this.Ggshoplist()
			},
			open() {
				if(this.goodsidlist==""){
					return
				}else{
					this.$confirm('确认要删除该厂家分类记录吗?', '系统提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.Gggoodsdel()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				}
				
			},

		},
		mounted() {
			this.Gglunbolist()
		}
	}
</script>
<style scoped="scoped" lang='less'>
	
	.jia {
		width: 13px;
		height: 11px;
		background-color: #ffffff;
		color: #0b9cf4;
		margin: auto;
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
		margin-left: 20px;
	}

	.el-input {
		width: 250px;
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
		border: 1px solid #e4e4e4;
		margin-top: 10px;
		font-size: 18px;
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

		span {

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
			width: 200px;
			height: 100px;
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

	.ggtu {
		width: 180px;
		height: 120px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
			&::before {
				content: '*';
				color: red;
			}
		}
	}

	.ggtu1 {
		width: 350px;
		height: 120px;

	}

	.xuanzechang {
		width: 180px;
		height: 60px;
		background-color: #fafafa;
		text-align: right;

		span {
			margin-right: 20px;
			&::before {
				content: '*';
				color: red;
			}
		}
	}

	.changxuanze {
		width: 350px;
		height: 60px;
	}

	.changxuanze1 {
		width: 878px;
		height: 60px;

	}

	.xuanzechang2 {
		margin-left: 20px;

		.el-input {
			width: 855px;
			background-color: #fafafa;
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

	.biaoge1 {
		width: 1080px;
		height: 550px;
		overflow-y: auto;
		overflow-x: auto;
	}
</style>
