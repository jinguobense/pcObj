<template>
	<div class="header">
		<div class="d1">
			<div class="yuan">
				<img src="../assets/img/logo.png" alt="">
			</div>
			<span class="s1">数得着总后台服务系统</span>
		</div>
		<div>
			<audio id="audioding" preload="auto">
				<source src="../assets/dingdou.wav" />
			</audio>
		</div>
		<div class="tu">

			<div class="tongzhi" @click="openmsg">
				<i class="el-icon-message-solid"></i>
				<span class="dolt" v-if="readnum >= 1"></span>
			</div>
			<!-- <i class="el-icon-s-finance"></i> -->
			<div class="tuichu" @click="tuichu">
				<!-- <i class="el-icon-s-home"></i> -->
				<img src="../assets/img/tuichuicon.png" alt="">
				<span class="s2">退出</span>
			</div>
		</div>
		<div class="addbox" v-if="infobox">
			<div class="mask" @click="close"></div>
			<div class="kefuwrap">
				<div class="kefuLeft">
					<div class="title">
						<span>客服</span>
						<!-- <i class="el-icon-refresh-right"></i> -->
						<div class="setbox">
							<!-- <input type="text" v-model="keyWord"> -->
							<el-input v-model="keyWord" clearable @clear='clearList' @change='search'></el-input>
							<img src="../assets/img/kefusearch.png" alt="" @click="search">
						</div>
					</div>
					<div class="userbox">
						<div v-for="(item,index) in leftlist" :key='index' @click="changeleft(index)">
							<div :class="['item',{'active':leftindex == index}]">
								<div class="img">
									<el-image :src=item.img alt=""></el-image>
									<!-- <span>12</span> -->
								</div>
								<div class="name">{{item.name}}</div>
								<span class="dolt" v-if="item.unreadCount>0 && itemflag==true">{{item.unreadCount}}</span>

								<span class="userbq" v-if="item.source == '买来卖'">用户</span>
								<span class="userbqs" v-if="item.source == '联采'">厂家</span>
								<!-- <i class="el-icon-delete" @click.stop="delmsg(item.userid)"></i> -->
								<i class="el-icon-delete" @click.stop="delmsg(index)"></i>
							</div>
						</div>
					</div>
				</div>
				<div class="kefuRight">
					<div class="title">
						<span v-if="!nameflag">{{leftlist[0].name}}</span>
						<span v-if="nameflag">{{touserName}}</span>

						<div class="setbox">
							<img src="../assets/img/colsex.png" @click="close" alt="">
						</div>
					</div>
					<div class="textcont">
						<div class="mancont" id="rightcon">
							<div v-for="(item,index) in msglist" :key='index'>
								<div class="leftpeople" v-if="item.flow == 'in'">
									<div class="time">{{gettime(item.time)}}</div>
									<div class="item">
										<div class="img">
											<el-image :src="leftlist[leftindex].img" alt=""></el-image>
										</div>
										<div class="text" v-if="item.type =='TIMTextElem'">
											<div v-for="(items,i) in item.payload.text" :key='i'>
												<span v-if="item.type =='TIMTextElem' && items.name == 'text'">{{items.text}}</span>
												<img class="bq" :src="items.src" v-if="items.name == 'img' && item.type =='TIMTextElem'" />

											</div>
										</div>
										<div class="text" v-if="item.type == 'TIMImageElem'">
											<img class="img" :src="item.payload.imageInfoArray[0].imageUrl" />
										</div>
										<div class="text" v-if="item.type =='TIMFileElem'">
											<div>
												<span>{{item.payload.fileName}}</span>
											</div>
											<a :href="item.payload.fileUrl">点击下载文件</a>
										</div>
										<div class="text" v-if="item.type =='TIMSoundElem' || item.type =='TIMVideoFileElem'">
											<div>
												<audio id="audio" autoplay :src="item.payload.url + '.mp3'" controls="controls" type="mp3" v-if="item.type =='TIMSoundElem' "></audio>

												<video style="height: 200px; width: 300px;" id="myVideo" controls preload="auto" v-if="item.type =='TIMVideoFileElem' ">
													<source type="video/mp4" :src="item.payload.videoUrl">
												</video>
											</div>
										</div>
									</div>
								</div>
								<div class="rightpeople" v-if="item.flow == 'out'">
									<div class="time">{{gettime(item.time)}}</div>
									<div class="item">
										<div class="text" v-if="item.type =='TIMTextElem'">
											<div v-for="(items,i) in item.payload.text" :key='i'>
												<span v-if="item.type =='TIMTextElem' && items.name == 'text'">{{items.text}}</span>
												<img class="bq" :src="items.src" v-if="items.name == 'img' && item.type =='TIMTextElem'" />
											</div>
										</div>
										<div class="text" v-if="item.type =='TIMFaceElem'">
											<img class="bq" :src="item.payload.text" />
										</div>

										<div class="text" v-if="item.type == 'TIMImageElem'">
											<img class="img" :src="item.payload.imageInfoArray[0].imageUrl" />
										</div>
										<div class="text" v-if="item.type =='TIMFileElem'">
											<div>
												<span>{{item.payload.fileName}}</span>
												<a :href="item.payload.fileUrl">点击下载文件</a>

											</div>
										</div>
										<div class="text" v-if="item.type =='TIMSoundElem' || item.type =='TIMVideoFileElem'">
											<div>

												<audio id="audio" autoplay :src="item.payload.url" controls="controls" v-if="item.type =='TIMSoundElem' "></audio>

												<video style="height: 200px; width: 300px;" id="myVideo" controls preload="auto" v-if="item.type =='TIMVideoFileElem' ">
													<source type="video/mp4" :src="item.payload.videoUrl">
												</video>
											</div>
										</div>
										<div class="img">
											<img src="../assets/img/logo.png" alt="" style="width: 30px; height: 30px;">
										</div>
									</div>
								</div>

							</div>


							<!-- <div v-for="(item,index) in msglist" :key='index'  >
								<div class="rightpeople" v-if="item.flow == 'out'">
									<div class="time">{{gettime(item.time)}}</div>
									<div class="item" >
										<div v-if="item.type =='TIMTextElem'">
											<div class="text" v-for="(items,i) in item.payload.text" :key='i' >
												<span v-if="item.type =='TIMTextElem' && items.name == 'text'">{{items.text}}</span>
												
											</div>
										</div>
										<div class="text">
											<img class="bq" :src="item.payload.text"  v-if="item.type =='TIMFaceElem'"  />
										</div>
										<div class="img">
											<img src="../assets/img/logo.png" alt="">
										</div>
									</div>
								</div>

							</div> -->

						</div>

					</div>
					<div class="sendbox">
						<!-- <div class="titlexx">
							<div class="img">
								<img src="../assets/img/face.png" alt="" @click="inputType = 1">
								<img src="../assets/img/kefupoto.png" alt="">
								<img src="../assets/img/wenjian.png" alt="">
							</div>
							<el-button type='primary'>发送</el-button>
						</div> -->
						<div class="inputbox">
							<div class="img">
								<el-popover placement="top" width="600" v-model="visible">
									<div class="facebox">
										<img :src="item.img" v-for="(item,i) in bqqlist" :key='i' class="bqimg" @click="subbq(i)" />
									</div>
									<el-button slot="reference"><img src="../assets/img/face.png" class="biaoqing" /></el-button>
								</el-popover>
								<div class="upload">
									<img src="../assets/img/kefupoto.png" class="img" />
									<input type="file" @change="imgChange" accept="image/*" id="imagePicker" />
								</div>
								<!-- <el-upload class="upload-demo" style="margin: 0px 10px;" action="https://jsonplaceholder.typicode.com/posts/"
								 :on-change="imgChange">
									<el-button size="small">
										<img src="../assets/img/kefupoto.png" class="img" />
									</el-button>

								</el-upload> -->
								<div class="upload">
									<img src="../assets/img/wenjian.png" alt="">
									<input type="file" @change="fileChange" id="filePicker" />
								</div>
								<!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
									<el-button size="small">
										<img src="../assets/img/wenjian.png" alt="">
									</el-button>

								</el-upload> -->
							</div>

							<el-button size="medium" type="primary" @click='subtext' title='ctrl+enter'>发送</el-button>

						</div>
						<!-- <textarea name="" rows="" cols="" v-model="submsg" autofocus="autofocus">
							
						</textarea> -->
						<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 2}" class="textarea" maxlength="200" placeholder="请输入内容"
						 show-word-limit v-model="submsg" @keyup='keyEnter'>
						</el-input>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TIM from 'tim-js-sdk';
	import COS from "cos-js-sdk-v5";

	import videojs from 'video.js'
	import {
		upretoken,
		getretokenInfo
	} from '../request/API/request.js'
	export default {
		inject: ['reload'],
		data() {
			return {
				rectoken: "",
				readnum: localStorage.getItem('readnum'),
				conversationList: [], //会话列表
				reddot: false, //红点
				keyWord: "", //搜索关键字
				userinfo: '',
				msgid: "",
				itemflag: true, //列表红点
				leftlist: '',
				leftindex: '',
				jiantingobj: '', //消息监听
				infobox: false,
				inputType: 0,
				visible: false,
				msgname: "", //发送人
				submsg: "", //文字
				msglist: [], //消息列表
				touserName: "",
				nameflag: false,
				isbegin: false,
				friendId: "",

				timerflag: null, //定时器
				isPlaying: false,
				bqqlist: [{
						img: require('../assets/img/emoji/zy.png'),
						text: '[龇牙]'
					},
					{
						img: require('../assets/img/emoji/tp.png'),
						text: '[调皮]'
					},
					{
						img: require('../assets/img/emoji/lh.png'),
						text: '[流汗]'
					},
					{
						img: require('../assets/img/emoji/tx.png'),
						text: '[偷笑]'
					},
					{
						img: require('../assets/img/emoji/zj2.png'),
						text: '[再见]'
					},
					{
						img: require('../assets/img/emoji/qd.png'),
						text: '[敲打]'
					},
					{
						img: require('../assets/img/emoji/ch.png'),
						text: '[擦汗]'
					},
					{
						img: require('../assets/img/emoji/zt.png'),
						text: '[猪头]'
					},
					{
						img: require('../assets/img/emoji/mg.png'),
						text: '[玫瑰]'
					},
					{
						img: require('../assets/img/emoji/ll.png'),
						text: '[流泪]'
					},
					{
						img: require('../assets/img/emoji/dk.png'),
						text: '[大哭]'
					},
					{
						img: require('../assets/img/emoji/x.png'),
						text: '[嘘]'
					},
					{
						img: require('../assets/img/emoji/k.png'),
						text: '[酷]'
					},
					{
						img: require('../assets/img/emoji/zk.png'),
						text: '[抓狂]'
					},
					{
						img: require('../assets/img/emoji/wq.png'),
						text: '[委屈]'
					},
					{
						img: require('../assets/img/emoji/bb.png'),
						text: '[便便]'
					},
					{
						img: require('../assets/img/emoji/zd.png'),
						text: '[炸弹]'
					},
					{
						img: require('../assets/img/emoji/cd1.png'),
						text: '[菜刀]'
					},
					{
						img: require('../assets/img/emoji/ka.png'),
						text: '[可爱]'
					},
					{
						img: require('../assets/img/emoji/s1.png'),
						text: '[色]'
					},
					{
						img: require('../assets/img/emoji/hx.png'),
						text: '[害羞]'
					},
					{
						img: require('../assets/img/emoji/dy.png'),
						text: '[得意]'
					},
					{
						img: require('../assets/img/emoji/t.png'),
						text: '[吐]'
					},
					{
						img: require('../assets/img/emoji/wx.png'),
						text: '[微笑]'
					},
					{
						img: require('../assets/img/emoji/n.png'),
						text: '[怒]'
					},
					{
						img: require('../assets/img/emoji/gg.png'),
						text: '[尴尬]'
					},
					{
						img: require('../assets/img/emoji/jk.png'),
						text: '[惊恐]'
					},
					{
						img: require('../assets/img/emoji/lh1.png'),
						text: '[冷汗]'
					},
					{
						img: require('../assets/img/emoji/ax.png'),
						text: '[爱心]'
					},
					{
						img: require('../assets/img/emoji/sa.png'),
						text: '[示爱]'
					},
					{
						img: require('../assets/img/emoji/by.png'),
						text: '[白眼]'
					},
					{
						img: require('../assets/img/emoji/am.png'),
						text: '[傲慢]'
					},
					{
						img: require('../assets/img/emoji/ng.png'),
						text: '[难过]'
					},
					{
						img: require('../assets/img/emoji/jy.png'),
						text: '[惊讶]'
					},
					{
						img: require('../assets/img/emoji/yw.png'),
						text: '[疑问]'
					},
					{
						img: require('../assets/img/emoji/k1.png'),
						text: '[困]'
					},
					{
						img: require('../assets/img/emoji/mmd.png'),
						text: '[么么哒]'
					},
					{
						img: require('../assets/img/emoji/hx1.png'),
						text: '[憨笑]'
					},
					{
						img: require('../assets/img/emoji/aq.png'),
						text: '[爱情]'
					},
					{
						img: require('../assets/img/emoji/s.png'),
						text: '[衰]'
					},
					{
						img: require('../assets/img/emoji/pz.png'),
						text: '[撇嘴]'
					},
					{
						img: require('../assets/img/emoji/yx.png'),
						text: '[阴险]'
					},
					{
						img: require('../assets/img/emoji/fd2.png'),
						text: '[奋斗]'
					},
					{
						img: require('../assets/img/emoji/fd.png'),
						text: '[发呆]'
					},
					{
						img: require('../assets/img/emoji/yhh.png'),
						text: '[右哼哼]'
					},
					{
						img: require('../assets/img/emoji/bb.png'),
						text: '[抱抱]'
					},
					{
						img: require('../assets/img/emoji/hx2.png'),
						text: '[坏笑]'
					},
					{
						img: require('../assets/img/emoji/fw.png'),
						text: '[飞吻]'
					},
					{
						img: require('../assets/img/emoji/bs.png'),
						text: '[鄙视]'
					},
					{
						img: require('../assets/img/emoji/y.png'),
						text: '[晕]'
					},
					{
						img: require('../assets/img/emoji/db.png'),
						text: '[大兵]'
					},
					{
						img: require('../assets/img/emoji/kl.png'),
						text: '[可怜]'
					},
					{
						img: require('../assets/img/emoji/q.png'),
						text: '[强]'
					},
					{
						img: require('../assets/img/emoji/r.png'),
						text: '[弱]'
					},
					{
						img: require('../assets/img/emoji/ws.png'),
						text: '[握手]'
					},
					{
						img: require('../assets/img/emoji/sl.png'),
						text: '[胜利]'
					},
					{
						img: require('../assets/img/emoji/bq.png'),
						text: '[抱拳]'
					},
					{
						img: require('../assets/img/emoji/dl.png'),
						text: '[凋谢]'
					},
					{
						img: require('../assets/img/emoji/mf.png'),
						text: '[米饭]'
					},
					{
						img: require('../assets/img/emoji/dg.png'),
						text: '[蛋糕]'
					},
					{
						img: require('../assets/img/emoji/xg.png'),
						text: '[西瓜]'
					},
					{
						img: require('../assets/img/emoji/pj.png'),
						text: '[啤酒]'
					},
					{
						img: require('../assets/img/emoji/pc.png'),
						text: '[瓢虫]'
					},
					{
						img: require('../assets/img/emoji/gy.png'),
						text: '[勾引]'
					},
					{
						img: require('../assets/img/emoji/[OK]@2x.png'),
						text: '[OK]'
					},
					{
						img: require('../assets/img/emoji/an.png'),
						text: '[爱你]'
					},
					{
						img: require('../assets/img/emoji/kf.png'),
						text: '[咖啡]'
					},
					{
						img: require('../assets/img/emoji/yl.png'),
						text: '[月亮]'
					},
					{
						img: require('../assets/img/emoji/d.png'),
						text: '[刀]'
					},
					{
						img: require('../assets/img/emoji/fd1.png'),
						text: '[发抖]'
					},
					{
						img: require('../assets/img/emoji/cj.png'),
						text: '[差劲]'
					},
					{
						img: require('../assets/img/emoji/qt.png'),
						text: '[拳头]'
					},
					{
						img: require('../assets/img/emoji/xsl.png'),
						text: '[心碎了]'
					},
					{
						img: require('../assets/img/emoji/ty.png'),
						text: '[太阳]'
					},
					{
						img: require('../assets/img/emoji/lw.png'),
						text: '[礼物]'
					},
					{
						img: require('../assets/img/emoji/pq.png'),
						text: '[皮球]'
					},
					{
						img: require('../assets/img/emoji/kl1.png'),
						text: '[骷髅]'
					},
					{
						img: require('../assets/img/emoji/hs.png'),
						text: '[挥手]'
					},
					{
						img: require('../assets/img/emoji/sd.png'),
						text: '[闪电]'
					},
					{
						img: require('../assets/img/emoji/je.png'),
						text: '[饥饿]'
					},
					{
						img: require('../assets/img/emoji/zm.png'),
						text: '[咒骂]'
					},
					{
						img: require('../assets/img/emoji/zm1.png'),
						text: '[折磨]'
					},
					{
						img: require('../assets/img/emoji/kb.png'),
						text: '[抠鼻]'
					},
					{
						img: require('../assets/img/emoji/gz.png'),
						text: '[鼓掌]'
					},
					{
						img: require('../assets/img/emoji/qdl.png'),
						text: '[糗大了]'
					},
					{
						img: require('../assets/img/emoji/zhh.png'),
						text: '[左哼哼]'
					},
					{
						img: require('../assets/img/emoji/dhq.png'),
						text: '[打哈欠]'
					},
					{
						img: require('../assets/img/emoji/kkl.png'),
						text: '[快哭了]'
					},
					{
						img: require('../assets/img/emoji/x1.png'),
						text: '[吓]'
					},
					{
						img: require('../assets/img/emoji/lq.png'),
						text: '[篮球]'
					},
					{
						img: require('../assets/img/emoji/pp.png'),
						text: '[乒乓]'
					},
					{
						img: require('../assets/img/emoji/[NO]@2x.png'),
						text: '[NO]'
					},
					{
						img: require('../assets/img/emoji/tt.png'),
						text: '[跳跳]'
					},
					{
						img: require('../assets/img/emoji/oh.png'),
						text: '[怄火]'
					},
					{
						img: require('../assets/img/emoji/zq.png'),
						text: '[转圈]'
					},
					{
						img: require('../assets/img/emoji/kt.png'),
						text: '[磕头]'
					},
					{
						img: require('../assets/img/emoji/ht.png'),
						text: '[回头]'
					},
					{
						img: require('../assets/img/emoji/ts.png'),
						text: '[跳绳]'
					},
					{
						img: require('../assets/img/emoji/jd.png'),
						text: '[激动]'
					},
					{
						img: require('../assets/img/emoji/jw.png'),
						text: '[街舞]'
					},
					{
						img: require('../assets/img/emoji/xw.png'),
						text: '[献吻]'
					},
					{
						img: require('../assets/img/emoji/ztj.png'),
						text: '[左太极]'
					},
					{
						img: require('../assets/img/emoji/ytj.png'),
						text: '[右太极]'
					},
					{
						img: require('../assets/img/emoji/bz.png'),
						text: '[闭嘴]'
					},
					{
						img: require('../assets/img/emoji/mm.png'),
						text: '[猫咪]'
					},
					{
						img: require('../assets/img/emoji/hsx.png'),
						text: '[红双喜]'
					},
					{
						img: require('../assets/img/emoji/bp.png'),
						text: '[鞭炮]'
					},
					{
						img: require('../assets/img/emoji/hdl.png'),
						text: '[红灯笼]'
					},
					{
						img: require('../assets/img/emoji/mj.png'),
						text: '[麻将]'
					},
					{
						img: require('../assets/img/emoji/mkf.png'),
						text: '[麦克风]'
					},
					{
						img: require('../assets/img/emoji/lpd.png'),
						text: '[礼物袋]'
					},
					{
						img: require('../assets/img/emoji/xf.png'),
						text: '[信封]'
					},
					{
						img: require('../assets/img/emoji/xq.png'),
						text: '[象棋]'
					},
					{
						img: require('../assets/img/emoji/cd.png'),
						text: '[彩带]'
					},
					{
						img: require('../assets/img/emoji/lz.png'),
						text: '[蜡烛]'
					},
					{
						img: require('../assets/img/emoji/bj.png'),
						text: '[爆筋]'
					},
					{

						img: require('../assets/img/emoji/bbt.png'),
						text: '[棒棒糖]'
					},
					{
						img: require('../assets/img/emoji/np.png'),
						text: '[奶瓶]'
					},
					{
						img: require('../assets/img/emoji/mt.png'),
						text: '[面条]'
					},
					{
						img: require('../assets/img/emoji/xj.png'),
						text: '[香蕉]'
					},
					{
						img: require('../assets/img/emoji/fj.png'),
						text: '[飞机]'
					},
					{
						img: require('../assets/img/emoji/zct.png'),
						text: '[左车头]'
					},
					{
						img: require('../assets/img/emoji/cx.png'),
						text: '[车厢]'
					},
					{
						img: require('../assets/img/emoji/yct.png'),
						text: '[右车头]'
					},
					{
						img: require('../assets/img/emoji/dy1.png'),
						text: '[多云]'
					},
					{
						img: require('../assets/img/emoji/xy.png'),
						text: '[下雨]'
					},
					{
						img: require('../assets/img/emoji/cp.png'),
						text: '[钞票]'
					},
					{
						img: require('../assets/img/emoji/xm.png'),
						text: '[熊猫]'
					},
					{
						img: require('../assets/img/emoji/dp.png'),
						text: '[灯泡]'
					},
					{
						img: require('../assets/img/emoji/fc.png'),
						text: '[风车]'
					},
					{
						img: require('../assets/img/emoji/nz.png'),
						text: '[闹钟]'
					},
					{
						img: require('../assets/img/emoji/ys.png'),
						text: '[雨伞]'
					},
					{
						img: require('../assets/img/emoji/cq.png'),
						text: '[彩球]'
					},
					{
						img: require('../assets/img/emoji/zj.png'),
						text: '[钻戒]'
					},
					{
						img: require('../assets/img/emoji/sf.png'),
						text: '[沙发]'
					},
					{
						img: require('../assets/img/emoji/zj1.png'),
						text: '[纸巾]'
					},
					{
						img: require('../assets/img/emoji/sq.png'),
						text: '[手枪]'
					},
					{
						img: require('../assets/img/emoji/qw.png'),
						text: '[青蛙]'
					},

				],
				bqlist: {
					'[龇牙]': require('../assets/img/emoji/zy.png'),
					'[调皮]': require('../assets/img/emoji/tp.png'),
					'[流汗]': require('../assets/img/emoji/lh.png'),
					'[偷笑]': require('../assets/img/emoji/tx.png'),
					'[再见]': require('../assets/img/emoji/zj2.png'),
					'[敲打]': require('../assets/img/emoji/qd.png'),
					'[擦汗]': require('../assets/img/emoji/ch.png'),
					'[猪头]': require('../assets/img/emoji/zt.png'),
					'[玫瑰]': require('../assets/img/emoji/mg.png'),
					'[流泪]': require('../assets/img/emoji/ll.png'),
					'[大哭]': require('../assets/img/emoji/dk.png'),
					'[嘘]': require('../assets/img/emoji/x.png'),
					'[酷]': require('../assets/img/emoji/k.png'),
					'[抓狂]': require('../assets/img/emoji/zk.png'),
					'[委屈]': require('../assets/img/emoji/wq.png'),
					'[便便]': require('../assets/img/emoji/bb.png'),
					'[炸弹]': require('../assets/img/emoji/zd.png'),
					'[菜刀]': require('../assets/img/emoji/cd1.png'),
					'[可爱]': require('../assets/img/emoji/ka.png'),
					'[色]': require('../assets/img/emoji/s1.png'),
					'[害羞]': require('../assets/img/emoji/hx.png'),
					'[得意]': require('../assets/img/emoji/dy.png'),
					'[吐]': require('../assets/img/emoji/t.png'),
					'[微笑]': require('../assets/img/emoji/wx.png'),
					'[怒]': require('../assets/img/emoji/n.png'),
					'[尴尬]': require('../assets/img/emoji/gg.png'),
					'[惊恐]': require('../assets/img/emoji/jk.png'),
					'[冷汗]': require('../assets/img/emoji/lh1.png'),
					'[爱心]': require('../assets/img/emoji/ax.png'),
					'[示爱]': require('../assets/img/emoji/sa.png'),
					'[白眼]': require('../assets/img/emoji/by.png'),
					'[傲慢]': require('../assets/img/emoji/am.png'),
					'[难过]': require('../assets/img/emoji/ng.png'),
					'[惊讶]': require('../assets/img/emoji/jy.png'),
					'[疑问]': require('../assets/img/emoji/yw.png'),
					'[困]': require('../assets/img/emoji/k1.png'),
					'[么么哒]': require('../assets/img/emoji/mmd.png'),
					'[憨笑]': require('../assets/img/emoji/hx1.png'),
					'[爱情]': require('../assets/img/emoji/aq.png'),
					'[衰]': require('../assets/img/emoji/s.png'),
					'[撇嘴]': require('../assets/img/emoji/pz.png'),
					'[阴险]': require('../assets/img/emoji/yx.png'),
					'[奋斗]': require('../assets/img/emoji/fd2.png'),
					'[发呆]': require('../assets/img/emoji/fd.png'),
					'[右哼哼]': require('../assets/img/emoji/yhh.png'),
					'[抱抱]': require('../assets/img/emoji/bb.png'),
					'[坏笑]': require('../assets/img/emoji/hx2.png'),
					'[飞吻]': require('../assets/img/emoji/fw.png'),
					'[鄙视]': require('../assets/img/emoji/bs.png'),
					'[晕]': require('../assets/img/emoji/y.png'),
					'[大兵]': require('../assets/img/emoji/db.png'),
					'[可怜]': require('../assets/img/emoji/kl.png'),
					'[强]': require('../assets/img/emoji/q.png'),
					'[弱]': require('../assets/img/emoji/r.png'),
					'[握手]': require('../assets/img/emoji/ws.png'),
					'[胜利]': require('../assets/img/emoji/sl.png'),
					'[抱拳]': require('../assets/img/emoji/bq.png'),
					'[凋谢]': require('../assets/img/emoji/dl.png'),
					'[米饭]': require('../assets/img/emoji/mf.png'),
					'[蛋糕]': require('../assets/img/emoji/dg.png'),
					'[西瓜]': require('../assets/img/emoji/xg.png'),
					'[啤酒]': require('../assets/img/emoji/pj.png'),
					'[瓢虫]': require('../assets/img/emoji/pc.png'),
					'[勾引]': require('../assets/img/emoji/gy.png'),
					'[OK]': require('../assets/img/emoji/[OK]@2x.png'),
					'[爱你]': require('../assets/img/emoji/an.png'),
					'[咖啡]': require('../assets/img/emoji/kf.png'),
					'[月亮]': require('../assets/img/emoji/yl.png'),
					'[刀]': require('../assets/img/emoji/d.png'),
					'[发抖]': require('../assets/img/emoji/fd1.png'),
					'[差劲]': require('../assets/img/emoji/cj.png'),
					'[拳头]': require('../assets/img/emoji/qt.png'),
					'[心碎了]': require('../assets/img/emoji/xsl.png'),
					'[太阳]': require('../assets/img/emoji/ty.png'),
					'[礼物]': require('../assets/img/emoji/lw.png'),
					'[皮球]': require('../assets/img/emoji/pq.png'),
					'[骷髅]': require('../assets/img/emoji/kl1.png'),
					'[挥手]': require('../assets/img/emoji/hs.png'),
					'[闪电]': require('../assets/img/emoji/sd.png'),
					'[饥饿]': require('../assets/img/emoji/je.png'),
					'[咒骂]': require('../assets/img/emoji/zm.png'),
					'[折磨]': require('../assets/img/emoji/zm1.png'),
					'[抠鼻]': require('../assets/img/emoji/kb.png'),
					'[鼓掌]': require('../assets/img/emoji/gz.png'),
					'[糗大了]': require('../assets/img/emoji/qdl.png'),
					'[左哼哼]': require('../assets/img/emoji/zhh.png'),
					'[打哈欠]': require('../assets/img/emoji/dhq.png'),
					'[快哭了]': require('../assets/img/emoji/kkl.png'),
					'[吓]': require('../assets/img/emoji/x1.png'),
					'[篮球]': require('../assets/img/emoji/lq.png'),
					'[乒乓]': require('../assets/img/emoji/pp.png'),
					'[NO]': require('../assets/img/emoji/[NO]@2x.png'),
					'[跳跳]': require('../assets/img/emoji/tt.png'),
					'[怄火]': require('../assets/img/emoji/oh.png'),
					'[转圈]': require('../assets/img/emoji/zq.png'),
					'[磕头]': require('../assets/img/emoji/kt.png'),
					'[回头]': require('../assets/img/emoji/ht.png'),
					'[跳绳]': require('../assets/img/emoji/ts.png'),
					'[激动]': require('../assets/img/emoji/jd.png'),
					'[街舞]': require('../assets/img/emoji/jw.png'),
					'[献吻]': require('../assets/img/emoji/xw.png'),
					'[左太极]': require('../assets/img/emoji/ztj.png'),
					'[右太极]': require('../assets/img/emoji/ytj.png'),
					'[闭嘴]': require('../assets/img/emoji/bz.png'),
					'[猫咪]': require('../assets/img/emoji/mm.png'),
					'[红双喜]': require('../assets/img/emoji/hsx.png'),
					'[鞭炮]': require('../assets/img/emoji/bp.png'),
					'[红灯笼]': require('../assets/img/emoji/hdl.png'),
					'[麻将]': require('../assets/img/emoji/mj.png'),
					'[麦克风]': require('../assets/img/emoji/mkf.png'),
					'[礼物袋]': require('../assets/img/emoji/lpd.png'),
					'[信封]': require('../assets/img/emoji/xf.png'),
					'[象棋]': require('../assets/img/emoji/xq.png'),
					'[彩带]': require('../assets/img/emoji/cd.png'),
					'[蜡烛]': require('../assets/img/emoji/lz.png'),
					'[爆筋]': require('../assets/img/emoji/bj.png'),
					'[棒棒糖]': require('../assets/img/emoji/bbt.png'),
					'[奶瓶]': require('../assets/img/emoji/np.png'),
					'[面条]': require('../assets/img/emoji/mt.png'),
					'[香蕉]': require('../assets/img/emoji/xj.png'),
					'[飞机]': require('../assets/img/emoji/fj.png'),
					'[左车头]': require('../assets/img/emoji/zct.png'),
					'[车厢]': require('../assets/img/emoji/cx.png'),
					'[右车头]': require('../assets/img/emoji/yct.png'),
					'[多云]': require('../assets/img/emoji/dy1.png'),
					'[下雨]': require('../assets/img/emoji/xy.png'),
					'[钞票]': require('../assets/img/emoji/cp.png'),
					'[熊猫]': require('../assets/img/emoji/xm.png'),
					'[灯泡]': require('../assets/img/emoji/dp.png'),
					'[风车]': require('../assets/img/emoji/fc.png'),
					'[闹钟]': require('../assets/img/emoji/nz.png'),
					'[雨伞]': require('../assets/img/emoji/ys.png'),
					'[彩球]': require('../assets/img/emoji/cq.png'),
					'[钻戒]': require('../assets/img/emoji/zj.png'),
					'[沙发]': require('../assets/img/emoji/sf.png'),
					'[纸巾]': require('../assets/img/emoji/zj1.png'),
					'[手枪]': require('../assets/img/emoji/sq.png'),
					'[青蛙]': require('../assets/img/emoji/qw.png'),
				}
			}
		},
		watch: {
			// leftlist: {
			// 	handler(newVal, oldVal) {
			// 		console.log(newVal.length)
			// 		console.log(oldVal.length)
			// 		if (newVal.length != oldVal.length) {
			// 		    console.log('数据变化')
			// 			clearInterval(this.timerflag)
			// 		}
			// 		// console.log('数据变化')
			// 		// this.timer()
			// 		// clearInterval(this.timerflag)
			// 		// this.timerflag = null
			// 	},
			// 	deep: true
			// },
			readnum: {
				handler(newVal, oldVal) {
					console.log(newVal)
					console.log(oldVal)
					if (newVal != oldVal) {
						console.log('数据变化readnum')
						this.playding()
						clearInterval(this.timerflag)
					}

				},
				deep: true
			}


		},
		destroyed() {
			clearInterval(this.timerflag)
		},

		methods: {
			handleChange(e) {

			},
			playding() {

				let audio = document.querySelector('#audioding')
				audio.play()
				this.isPlaying = !this.isPlaying
				console.log('消息提示叮咚开启')
				// let timeOut = setTimeout(() => {
				// 	this.stop(timeOut)
				// }, 1500)


			},
			// stop(timeOut) {
			// 	let audio = document.querySelector('#audioding')
			// 		if (this.isPlaying) {

			// 			audio.pause()
			// 			this.isPlaying = !this.isPlaying
			// 		}


			// },
			close() {
				this.infobox = false
				this.timer()
			},
			timer() {
				// this.timerflag = setInterval(() => {
				// 	this.getmsglist()
				// 	console.log('定时任务')
				// }, 5000)

			},
			clearList() {
				this.leftlist = [];
				this.getmsglist()
			},
			search() {
				let _this = this;
				let list = _this.leftlist;
				let keyWord = _this.keyWord;
				let arr = [];
				for (let i = 0; i < list.length; i++) {
					// console.log(list[i])

					if (list[i].name.indexOf(keyWord) >= 0) {
						arr.push(list[i]);
					}
				}
				_this.leftlist = arr

				console.log(this.leftlist)

			},
			tuichu() {
				var _this = this;
				sessionStorage.removeItem('dengluxinxi');

				this.$router.push({ //核心语句
					path: '/', //跳转的路径

				})
				this.reload();
				window.location.reload()

			},
			timlogin() {
				var _this = this
				let promise = this.tim.login({
					userID: _this.userinfo.id,
					userSig: _this.rectoken
				});
				this.tim.registerPlugin({
					'cos-wx-sdk': COS
				});
				this.tim.setLogLevel(1);
				promise.then(function(imResponse) {
					console.log(imResponse.data); // 登录成功
					console.log('tim登陆成功'); // 登录成功
					if (imResponse.data.repeatLogin === true) {
						// 标识账号已登录，本次登录操作为重复登录。v2.5.1 起支持
						console.log(imResponse.data.errorInfo);
					}
					setTimeout(function() {
						_this.getmsglist();
					}, 800)
				}).catch(function(imError) {
					console.warn('login error:', imError); // 登录失败的相关信息
					// console.log('tim登陆失败');
					let paramstoken = {
						userId: 1
					}
					upretoken("sys/", paramstoken).then(ress => {
						// console.log(ress, '更新retoken')
						if (ress.result == 0) {
							_this.rectoken = ress.resultData.rectoken
							localStorage.setItem('rectoken', ress.resultData.rectoken)
						}
					})
				});
				setTimeout(function() {
					this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(event) {
						console.log(event.data, '收到推送的私聊、群聊、群提示、群系统通知的新消息')
						_this.getmsglist();
						// 收到推送的私聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
						// event.name - TIM.EVENT.MESSAGE_RECEIVED
						// event.data - 存储 Message 对象的数组 - [Message]
					});
				}, 400)
				let onMessageReceived = function(event) {
					// event.data - 存储 Message 对象的数组 - [Message]
					console.log('运行')
					console.log(event)
					if (_this.isbegin == true && event.data[0].from == _this.msgid) {
						var msglist = _this.msglist;
						event.data[0] = _this.msgjiexi(event.data[0]);
						msglist.push(event.data[0])


						_this.msglist = msglist

						setTimeout(function() {
							_this.tobottom();
							_this.getmsgcon();
						}, 500)
					}

				};
				this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived);
				this.jiantingobj = onMessageReceived



			},
			//删除会话
			delmsg(i) {

				console.log(id)
				let id = this.leftlist[i].userid
				let _this = this
				this.$confirm('确定删除此会话？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let promise = this.tim.deleteConversation('C2C' + id);
					promise.then(function(imResponse) {

						console.log(imResponse.data, '删除成功')
						_this.$message({
							type: 'success',
							message: '删除成功!',
							duration: 1000
						});
						_this.nameflag = false
						_this.getmsglist()

					}).catch(function(imError) {
						_this.$message({
							type: 'error',
							message: '网络错误,请刷新重试!',
							duration: 1000
						});
						console.warn('deleteConversation error:', imError); // 删除会话失败的相关信息
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			openmsg() {
				// if (this.conversationList.length == 0) {
				// 	this.$message({
				// 		type: 'warning',
				// 		message: '暂无聊天消息,请确认只有一人登录该帐号！',
				// 		duration: 1000
				// 	});

				// } else {
				this.infobox = true;
				this.getmsglist();
				this.msgtype = true;
				clearInterval(this.timerflag)
				this.timerflag = null
				// }
				this.infobox = true;
				this.reddot = false;

			},
			//已读上报
			readpostMsg(id) {
				// 将某会话下所有未读消息已读上报
				// console.log(id)
				let _this = this
				let promise = this.tim.setMessageRead({
					conversationID: 'C2C' + id,
				});
				promise.then(function(imResponse) {
					// 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
					console.log(imResponse, '已读上报数据')
					_this.getmsgcon()
					// _this.reddot = false
				}).catch(function(imError) {
					// 已读上报失败
					console.warn('setMessageRead error:', imError);
				});
			},
			getmsglist() {
				// 拉取会话列表
				console.log('111')
				var _this = this;
				let promise = this.tim.getConversationList();
				promise.then(function(imResponse) {
					var conversationList = imResponse.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					// console.log(conversationList);
					console.log('getmsglist会话列表更新')
					_this.conversationList = conversationList
					//解析聊天头像和数据
					let leftlist = [];
					var numarr = []
					// for(var i in conversationList){
					// 	numarr.push(conversationList[i].unreadCount)

					// 	console.log(numarr)
					// 		_this.axios({
					// 			method: "post",
					// 			url: ' https://sdzxiangmu.com/sys/getRectokenInfo',
					// 			params: {
					// 				userId: conversationList[i].userProfile.userID //普通用户ID (flag为0时必传)
					// 			}
					// 		}).then(res => {
					// 			// console.log(res.data,'联系人信息');
					// 			leftlist.push({
					// 				img: res.data.beans[0].photo,
					// 				id: res.data.beans[0].rectoken,
					// 				name: res.data.beans[0].nickName,
					// 				time: conversationList[i].lastMessage.lastTime,
					// 				msg: conversationList[i].lastMessage.messageForShow,
					// 				userid: conversationList[i].userProfile.userID,
					// 				unreadCount: conversationList[i].unreadCount
					// 			})
					// 		})
					// }
					// let num = numarr.reduce(function(a,b){
					// 	return a+b
					// },0)
					// console.log(num)
					// if(num != _this.readnum){
					// 	_this.reddot = !_this.reddot
					// 	_this.readnum = num
					// 	localStorage.setItem('readnum',num)
					// }
					conversationList.map(function(item) {
						numarr.push(item.unreadCount)
						// console.log(numarr)
						// if (item.unreadCount > 0) {
						// 	_this.reddot = true
						// 	console.log(_this.reddot,item.unreadCount)

						// }else{
						// 	_this.reddot = false
						// }

						_this.axios({
							method: "post",
							url: ' https://www.xashudezhao.com/helpsales/sys/getRectokenInfo',
							params: {
								userId: item.userProfile.userID, //普通用户ID (flag为0时必传)
								shopId: '',
								rectoken: '',
								flag: 0

							}
						}).then(res => {
							console.log(res.data,'联系人信息');
							leftlist.push({
								img: res.data.beans[0].photo,
								id: res.data.beans[0].rectoken,
								name: res.data.beans[0].nickName,
								time: item.lastMessage.lastTime,
								msg: item.lastMessage.messageForShow,
								userid: item.userProfile.userID,
								unreadCount: item.unreadCount,
							})
						})

					})
					let num = numarr.reduce(function(a, b) {
						return a + b
					}, 0)
					console.log(num)
					if (num != _this.readnum) {
						_this.reddot = true
						_this.readnum = num
						localStorage.setItem('readnum', num)
					}
					setTimeout(function() {
						_this.leftlist = leftlist;

						if (leftlist.length > 0) {
							_this.msgid = leftlist[_this.leftindex].id
							// console.log(leftlist)
							_this.getmsgcon()

						}

					}, 500)
					//排序
					// console.log(_this.leftlist);
					let arrlist = _this.leftlist
					for (let i = 0; i < arrlist.length; i++) {
						for (let j = 0; j < arrlist.length - i - 1; j++) {
							if (arrlist[j].time > arrlist[j + 1].time) {
								[arrlist[j], arrlist[j + 1]] = [arrlist[j + 1], arrlist[j]];
							}
						}
						
					}
					// console.log(arrlist)
					_this.leftlist = arrlist;
					// console.log(_this.leftlist)


				}).catch(function(imError) {
					console.warn('getConversationList error:', imError); // 获取会话列表失败的相关信息
				});
			},

			//获取会话详情
			getmsgcon() {
				var _this = this;
				_this.msglist = []
				var leftlist = this.leftlist;
				var id = leftlist[_this.leftindex].userid;
				// console.log(id)
				_this.msgname = leftlist[_this.leftindex].name;
				var promise = this.tim.getMessageList({
					conversationID: 'C2C' + id,

				});

				// _this.loading = _this.$loading({
				// 	lock: true,
				// 	target: document.getElementById('msgbox'),
				// 	text: '正在加载消息',
				// 	background: 'rgba(255,255, 255, 0.7)'
				// });

				promise.then(function(imResponse) {
					// console.log(imResponse)
					var list = []
					var messageList = imResponse.data.messageList; // 消息列表。
					console.log(messageList,'消息列表')
					var nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
					var isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。

					messageList.map(function(item) {
						_this.msgjiexi(item);
					})
					list = messageList;
					_this.msglist = list;
					_this.isbegin = true
					// console.log(_this.msglist)
					setTimeout(function() {
						_this.tobottom();

						// _this.loading.close();


					}, 700)


				});
			},
			//提交视频
			fileChange(files) {
				var _this = this;
				var leftlist = this.leftlist;
				var id = leftlist[_this.leftindex].userid;
				// 1. 获取视频：传入 DOM 节点
				// 2. 创建消息实例
				const message = this.tim.createFileMessage({
					to: id,
					conversationType: TIM.TYPES.CONV_C2C,
					payload: {
						file: document.getElementById('filePicker') // 或者用event.target
					},
					onProgress: function(event) {
						console.log('file uploading:', event)
					}
				});
				// 3. 发送消息
				let promise = this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					console.log(imResponse);
					_this.msglist.push(_this.msgjiexi(imResponse.data.message))
					setTimeout(function() {
						files.target.value = ''
						_this.tobottom()
					}, 300)
				}).catch(function(imError) {
					// 发送失败
					console.warn('sendMessage error:', imError);
				});
			},
			//提交图片
			imgChange(files) {
				var _this = this;
				var leftlist = this.leftlist;
				var id = leftlist[_this.leftindex].userid;
				let message = this.tim.createImageMessage({
					to: id,
					conversationType: TIM.TYPES.CONV_C2C,
					payload: {
						file: document.getElementById('imagePicker'),
					},
					onProgress: function(event) {
						console.log('file uploading:', event)
					}
				});
				// 2. 发送消息
				let promise = this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					console.log(imResponse);
					_this.msglist.push(_this.msgjiexi(imResponse.data.message))
					setTimeout(function() {
						files.target.value = ''
						_this.tobottom()
					}, 300)
				}).catch(function(imError) {
					// 发送失败
					console.warn('sendMessage error:', imError);
				});
			},
			// toEnd() { //滚动到底部
			// 	this.$nextTick(() => {
			// 		let middle = this.$refs["middle"];
			// 		middle.scrollTop = middle.scrollHeight;
			// 	})
			// },
			changeleft(i) {
				// console.log(this.leftlist)
				var _this = this;
				this.leftindex = i;
				console.log(i)
				this.msglist = [];
				this.msgid = this.leftlist[_this.leftindex].userid
				this.touserName = this.leftlist[_this.leftindex].name
				this.nameflag = true
				let id = this.msgid
				this.getmsgcon();
				this.readpostMsg(id);
				this.leftlist[i].unreadCount = 0
				// _this.tobottom()
				// localStorage.setItem('readnum', 0)

			},
			//提交表情
			subbq(i) {
				var _this = this;
				var leftlist = this.leftlist;
				var id = leftlist[_this.leftindex].id;
				_this.submsg = _this.bqqlist[i].text + _this.submsg
				_this.visible = false;
				// let message = this.tim.createTextMessage({
				// 	to: id,
				// 	conversationType: TIM.TYPES.CONV_C2C,
				// 	payload: {
				// 		index: i, // Number 表情索引，用户自定义
				// 		data: _this.bqqlist[i].text ,// String 额外数据
				// 		img:_this.bqqlist[i].img
				// 	}
				// });
				// // 2. 发送消息
				// let promise = this.tim.sendMessage(message);
				// promise.then(function(imResponse) {
				// 	// 发送成功
				// 	console.log(imResponse);
				// 	_this.msglist.push(_this.msgjiexi(imResponse.data.message))
				// 	setTimeout(function() {
				// 		_this.tobottom()
				// 		_this.visible = false;
				// 	}, 300)
				// }).catch(function(imError) {
				// 	// 发送失败
				// 	console.warn('sendMessage error:', imError);
				// });
			},
			tobottom() {
				// var top = document.getElementById('rightcon').scrollTop
				document.getElementById('rightcon').scrollTop = document.getElementById('rightcon').scrollHeight + 50;
				// console.log(top)
			},
			//按键ctrl + enter 发送消息
			keyEnter(e) {
				if (e.keyCode == 13 && e.ctrlKey) {
					this.subtext();
				}
			},
			//提交文字消息
			subtext() {
				var _this = this;
				var leftlist = this.leftlist;
				var id = leftlist[_this.leftindex].userid;

				let message = this.tim.createTextMessage({
					to: id,
					conversationType: TIM.TYPES.CONV_C2C,
					payload: {
						text: _this.submsg
					}
				});
				// 2. 发送消息
				let promise = this.tim.sendMessage(message);
				promise.then(function(imResponse) {
					// 发送成功
					console.log(imResponse);
					_this.msglist.push(_this.msgjiexi(imResponse.data.message))
					setTimeout(function() {
						_this.tobottom()
						_this.submsg = ''
					}, 300)
				}).catch(function(imError) {
					// 发送失败
					console.warn('sendMessage error:', imError);
				});
			},
			//解析左侧展示消息
			msgjiexi(msg) {
				var _this = this;
				if (!msg.ischange) {
					if (msg.type == "TIMTextElem") {
						let renderDom = [];
						let temp = msg.payload.text
						let left = -1
						let right = -1
						var bqlist = _this.bqlist;
						while (temp !== '') {
							left = temp.indexOf('[')
							right = temp.indexOf(']')
							switch (left) {
								case 0:
									if (right === -1) {
										renderDom.push({
											name: 'text',
											text: temp
										})
										temp = ''
									} else {
										let _emoji = temp.slice(0, right + 1)
										if (_this.bqlist[_emoji]) { // 如果您需要渲染表情包，需要进行匹配您对应[呲牙]的表情包地址
											renderDom.push({
												name: 'img',
												src: _this.bqlist[_emoji]
											})
											temp = temp.substring(right + 1)
										} else {
											renderDom.push({
												name: 'text',
												text: '['
											})
											temp = temp.slice(1)
										}
									}
									break
								case -1:
									renderDom.push({
										name: 'text',
										text: temp
									})
									temp = ''
									break
								default:
									renderDom.push({
										name: 'text',
										text: temp.slice(0, left)
									})
									temp = temp.substring(left)
									break
							}
						}
						msg.payload.text = renderDom
					}

					if (msg.type == "TIMFaceElem") {
						msg.payload.text = _this.bqlist[msg.payload.data]
					}
					msg.ischange = true;
					return msg;
				} else {

					return msg;
				}



			},
			//解析时间
			gettime(msg) {
				var msgTime = msg; //得到当前消息发送的时间
				//得到当天凌晨的时间戳
				var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
				var thisdate;
				var d = new Date(msgTime * 1000); //根据时间戳生成的时间对象
				var min = d.getMinutes();
				var hour = d.getHours();
				//得到时和分，分小于10时，只返回一位数
				if (min < 10) {
					min = "0" + min;
				}
				//得到月份和天  月份一般是从0开始，所以展示出来要+1
				var month = d.getMonth();

				var day = d.getDate();
				//得到时间   当天时间应该只显示时分  当天以前显示日期+时间
				if (timeStamp > msgTime) {
					thisdate = month + 1 + "-" + day + " " + hour + ":" + min;
				} else {
					thisdate = hour + ":" + min;
				}
				return thisdate;
			},
		},

		mounted() {
			var _this = this;
			this.timer()

			this.userinfo = JSON.parse(localStorage.getItem('userinfo'));
			this.rectoken = localStorage.getItem('rectoken');
			console.log(this.userinfo)
			let options = {
				SDKAppID: '1400437598' // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
			};
			// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
			this.tim = TIM.create(options); // SDK 实例通常用 tim 表示

			// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
			this.tim.setLogLevel(1); // 普通级别，日志量较多，接入时建议使用
			// tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用

			// 注册 COS SDK 插件
			this.tim.registerPlugin({
				'cos-js-sdk': COS
			});
			setTimeout(function() {
				_this.timlogin();
			}, 500)
			_this.getmsglist()
			_this.changeleft(0)
			this.getnoread()
			videojs('my-video', {
				bigPlayButton: true,
				textTrackDisplay: false,
				posterImage: true,
				errorDisplay: false,
				controlBar: true
			}, function() {
				this.play()
			})

		},
		created() {
			// this.changeleft(0)
			this.readnum = localStorage.getItem('readnum')
			document.addEventListener("keydown", this.keyEnter, false);

		}
	}
</script>

<style scoped="scoped" lang="less">
	.el-button {
		border: none;
	}


	.addbox {
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
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

		.kefuwrap {
			height: 780px;
			margin-bottom: 20px;
			width: 1080px;
			position: relative;
			z-index: 200;
			background: #fff;
			box-sizing: border-box;
			padding-bottom: 20px;
			display: flex;
			z-index: 200;
			margin-right: 80px;

			.title {
				width: 100%;
				height: 52px;
				background-color: #fff;
				line-height: 52px;
				font-size: 22px;
				box-sizing: border-box;
				padding-left: 20px;
				padding-right: 10px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #efefef;
				position: relative;

				.setbox {
					display: flex;
					align-items: center;

					.el-input {
						// border: none;
						// outline: none;
						width: 210px;
						// height: 24px;
						// border-radius: 12px;
						// background: #FAFAFA;
						margin-right: 15px;
						// text-indent: 16px;
					}

					i {
						font-size: 18px;
						color: #000;
						position: absolute;
						right: 50px;
						top: 50%;
						margin-top: -9px;
					}
				}
			}

			.kefuLeft {
				width: 360px;
				height: 100%;
				background-color: #fff;

				.userbox {
					height: 720px;
					overflow-y: auto;
					width: 100%;
					box-sizing: border-box;
					padding-bottom: 20px;

					.item {
						height: 72px;
						width: 100%;
						box-sizing: border-box;
						padding: 10px 20px;
						display: flex;
						align-items: center;
						font-size: 18px;
						// margin-top: 10px;
						background: #fff;
						border-bottom: 1px solid #EFEFEF;
						cursor: pointer;
						position: relative;

						&.active {
							background: #efefef;
						}

						i {
							font-size: 20px;
							color: #000;
							margin: 0px;
							position: absolute;
							right: 10px;
							top: 50%;
							// margin-top: -10px;

							&:hover {
								color: #0b9cf4;
							}
						}

						.userbqs {
							width: 60px;
							height: 24px;
							background-color: #ffa200;
							border-radius: 0px 0px 0px 24px;
							font-size: 16px;
							color: #ffffff;
							line-height: 24px;
							text-align: center;
							position: absolute;
							right: 0px;
							top: 10px;
							margin-top: -10px;
						}

						.userbq {
							width: 60px;
							height: 24px;
							background-color: #38c600;
							border-radius: 0px 0px 0px 24px;
							font-size: 16px;
							color: #ffffff;
							line-height: 24px;
							text-align: center;
							position: absolute;
							right: 0px;
							top: 10px;
							margin-top: -10px;

						}

						.dolt {
							width: 20px;
							height: 20px;
							background: red;
							border-radius: 50%;
							position: absolute;
							color: #fff;
							text-align: center;
							line-height: 20px;
							top: 5px;
							font-size: 16px;
							left: 55px;

						}

						.img {
							height: 48px;
							width: 48px;
							border-radius: 50%;
							margin-right: 20px;
							position: relative;

							span {
								position: absolute;
								// width: 100%;
								height: 16px;
								background: #ff0000;
								border-radius: 5px;
								font-size: 12px;
								text-align: center;
								line-height: 16px;
								padding: 0px 2px;
								top: -6px;
								right: -8px;
								color: #fff;
							}

							.el-image {
								height: 100%;
								width: 100%;
							}
						}

					}
				}
			}

			.kefuRight {
				width: 720px;
				display: flex;
				flex-direction: column;

				.sendbox {
					height: 220px;
					box-sizing: border-box;
					padding: 10px 10px;

					.inputbox {
						width: 100%;
						// box-sizing: border-box;
						// padding: 10px;
						display: flex;
						margin-bottom: 10px;
						align-items: center;
						justify-content: space-between;

						.img {
							display: flex;
							align-items: center;
							// justify-content: space-between;
							height: 20px;

							.upload {
								width: 50px;
								height: 20px;
								cursor: pointer;
								position: relative;
								margin-left: 20px;

								img {
									width: 25px;
									height: 20px;
									position: absolute;
									z-index: 1;
									top: 0;
									left: 0;
									cursor: pointer;
								}

								input {
									position: absolute;
									outline: none;
									border: none;
									background: none;
									z-index: 1000;
									top: 0;
									left: 0;
									opacity: 0;
									width: 30px;
									height: 30px;
									cursor: pointer;
								}
							}
						}

					}

					.textarea {
						width: 100%;
						// height: 100%;
						font-size: 18px;
						color: #333;
						border: none;
						overflow-y: visible;
						// letter-spacing:3px;
						text-indent: 18px;

						&::-webkit-scrollbar {
							width: 0 !important
						}

					}

					textarea {
						width: 100%;
						// height: 100%;
						font-size: 18px;
						color: #333;
						border: none;
						overflow-y: visible;
						letter-spacing: 3px;
						text-indent: 18px;

						&::-webkit-scrollbar {
							width: 0 !important
						}

					}


				}

				.textcont {
					// height: 100%;
					display: flex;

					.el-image {
						height: 48px;
						width: 48px;
					}

					.mancont {
						height: 520px;
						width: 100%;
						box-sizing: border-box;
						padding: 20px;
						overflow-y: auto;
						// display: flex;
						// justify-content: space-between;
						background-color: #efefef;

						.leftpeople {
							display: flex;
							align-items: center;
							flex-direction: column;
							margin-bottom: 30px;
							.time {
								height: 20px;
								padding: 5px;
								background: rgba(0, 0, 0, 0.3);
								color: #ffff;
								font-size: 12px;
								border-radius: 5px;

							}

							.item {
								display: flex;
								// height: 90px;
								width: 100%;
								cursor: pointer;

								box-sizing: border-box;
								align-items: center;
								margin-top: 20px;

								.text {
									color: #999;
									font-size: 18px;
									// width: 60%;
									border-radius: 12px;
									background: #fff;
									margin-left: 10px;
									line-height: 20px;
									box-sizing: border-box;
									padding: 10px;
									white-space: normal;
									display: flex;
									align-items: center;

									img {
										height: 30px;
										width: 30px;
									}

									.img {
										height: 150px;
										width: 150px;

									}

								}
							}
						}

						.rightpeople {
							// height: 1000px;
							// width: 50%;

							display: flex;
							align-items: center;
							flex-direction: column;
							margin: 20px 0px;

							.time {
								height: 20px;
								padding: 5px;
								background: rgba(0, 0, 0, 0.3);
								color: #ffff;
								font-size: 12px;
								border-radius: 5px;

							}

							.item {
								display: flex;
								width: 100%;
								// height: 90px;
								cursor: pointer;
								box-sizing: border-box;
								align-items: center;
								margin-top: 20px;

								justify-content: flex-end;

								.text {
									color: #999;
									font-size: 18px;
									// width: 60%;
									border-radius: 12px;
									background: #fff;
									margin-right: 10px;
									line-height: 20px;
									box-sizing: border-box;
									padding: 10px;
									white-space: normal;
									display: flex;
									align-items: center;

									img {
										height: 30px;
										width: 30px;
									}

									.img {
										height: 30px;
										width: 30px;

									}
								}
							}

						}

					}

				}

			}


		}
	}

	i {
		font-size: 30px;
		cursor: pointer;
		color: #41a8f9;
	}

	.header {
		/* position: fixed; */
		top: 0;
		left: 0;
		width: 100%;
		// height: 40px;
		background-color: #ffffff;
		padding-left: 23px;
		padding-right: 53px;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
	}

	.yuan {
		width: 34px;
		height: 34px;
		// background-color: #0b9cf4;
		border-radius: 50%;
		margin-right: 15px;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.s1 {
		font-size: 22px;
		line-height: 56px;
		color: #0b9cf4;
		letter-spacing: 0px;

	}

	.tuichu {
		display: flex;
		align-items: center;
		cursor: pointer;

		img {
			width: 26px;
			height: 27px;
			margin-right: 10px;
		}
	}

	.s2 {
		font-size: 24px;
		line-height: 56px;
		letter-spacing: 0px;
		color: black;
	}

	.tu {
		display: flex;
		justify-content: space-between;
		width: 221px;
		align-items: center;

		.tongzhi {
			position: relative;

			.dolt {
				width: 8px;
				height: 8px;
				background: red;
				border-radius: 50%;
				position: absolute;
				top: 0;
				right: 4px;
			}
		}
	}

	.d1 {
		display: flex;
		align-items: center;
	}
</style>
