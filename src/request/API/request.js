import {getRequest,postRequest,formatDateTime,formatDateYue}from'@/request/index.js'

// export function login(data){
// 	return postRequest(data).then(res => res)
// }

//时间函数
export function changeTime(data){
	return formatDateTime(data)
}

export function chengeTime(data){
 return formatDateTime(data)
}
export function changeYue(data){
 return formatDateYue(data)
}

//更新retoken
export function upretoken(url,params){
	return getRequest(url,params).then(res => res)
}
//获取消息信息
export function getretokenInfo(url,params){
	return postRequest(url,params).then(res => res)
}

//上传图片
export function upLoadimg(url,params){
	return postRequest(url,params).then(res => res)
}

//获取省级
export function getprovList(url,params){
	return getRequest(url,params).then(res => res)
}
//获取市
export function getcityList(url,params){
	return getRequest(url,params).then(res => res)
}
//获取区
export function gettownList(url,params){
	return getRequest(url,params).then(res => res)
}
//获取首页数据
export function getIndexinfo(url,params){
	return getRequest(url,params).then(res => res)
}


export function login(data){
	return postRequest(data).then(res => res)
}
//获取平台商品分类
export function getptfenlei(url,params){
	return getRequest(url,params).then(res => res)
}
//新建平台商品分类
export function Creatptfenlei(url,params){
	return postRequest(url,params).then(res => res)
}

//获取规格列表
export function getptguigeList(url,params){
	return getRequest(url,params).then(res => res)
}
//新建 + 修改 规格列表
export function Creatptguige(url,params){
	return postRequest(url,params).then(res => res)
}
//删除规格
export function delptguige(url,params){
	return postRequest(url,params).then(res => res)
}

//获取平台系统通知
export function getpttongzhi(url,params){
	return getRequest(url,params).then(res => res)
}
//新建系统通知
export function Creatptnicoe(url,params){
	return postRequest(url,params).then(res => res)
}
//获取会员列表(用户接收人)
export function getMemberList(url,params){
	return getRequest(url,params).then(res => res)
}
//获取厂家列表(厂家接收人)
export function getfacMemberList(url,params){
	return getRequest(url,params).then(res => res)
}

//获取物流
export function getWuliuList(url,params){
	return getRequest(url,params).then(res => res)
}
//获取申述
export function getShensuList(url,params){
	return getRequest(url,params).then(res => res)
}
//提交申述
export function Postshenshu(url,params){
	return postRequest(url,params).then(res => res)
}

//获取商务合作列表
export function getbusinesList(url,params){
	return getRequest(url,params).then(res => res)
}
//删除合作
export function Delbusines(url,params){
	return postRequest(url,params).then(res => res)
}


//获取常见问题列表；
export function getProblemList(url,params){
	return getRequest(url,params).then(res => res)
}
//新建问题 修改 删除
export function CreatptProblem(url,params){
	return postRequest(url,params).then(res => res)
}

//获取版本信息
export function getEditongList(url,params){
	return getRequest(url,params).then(res => res)
}
//新建版本信息 修改 删除
export function CreatptEditiong(url,params){
	return postRequest(url,params).then(res => res)
}

//获取关于我们列表
export function getAboutusList(url,params){
	return getRequest(url,params).then(res => res)
}

//意见反馈列表
export function getideaList(url,params){
	return getRequest(url,params).then(res => res)
}
//区域管理员列表
export function qygly(url,params){
	return getRequest(url,params).then(res=>res)
}
//区域管理新建
export function Creatqyuser(url,params){
	return postRequest(url,params).then(res=>res)
}
//区域管理员删除
export function qygldel(url,params){
	return postRequest(url,params).then(res=>res)
}
//获取入库列表
export function getRukuList(url,params){
	return getRequest(url,params).then(res=>res)
}
//获取入库详情
export function getRkInfo(url,params){
	return getRequest(url,params).then(res=>res)
}
//获取入库轨迹
export function getguijiInfo(url,params){
	return getRequest(url,params).then(res=>res)
}
//确认入库
export function postSureRuku(url,params){
	return postRequest(url,params).then(res=>res)
}

//获取分拣列表
export function getFenjianList(url,params){
	return getRequest(url,params).then(res=>res)
}
//获取分拣列表详情
export function getFenjianInfo(url,params){
	return getRequest(url,params).then(res=>res)
}
//确认配送
export function postSurePeisong(url,params){
	return postRequest(url,params).then(res=>res)
}
//商品清单
export function Hygoodsqd(url,params){
 return getRequest(url,params).then(res=>res)
}

//系统监控 获取日志查询
export function getRizhiList(url,params){
	return getRequest(url,params).then(res=>res)
}
//获取定时任务
export function getTimeout(url,params){
	return getRequest(url,params).then(res=>res)
}
//新建定时任务
export function CreatTimeout(url,params){
	return postRequest(url,params).then(res=>res)
}
//删除定时任务
export function DelTimeout(url,params){
	return postRequest(url,params).then(res=>res)
}
//启动定时任务
export function postTimeout(url,params){
	return postRequest(url,params).then(res=>res)
}
//暂停定时任务
export function postdownTimeout(url,params){
	return postRequest(url,params).then(res=>res)
}
//启动一次定时任务
export function postTimeoutone(url,params){
	return postRequest(url,params).then(res=>res)
}

//通告管理
export function getCallglList(url,params){
	return getRequest(url,params).then(res=>res)
}
//获取通告管理接受人信息
export function getcallPeopleList(url,params){
	return getRequest(url,params).then(res=>res)
}
//新建通告
export function CreatcallList(url,params){
	return postRequest(url,params).then(res=>res)
}
//会员冻结
export function postmerDong(url,params){
	return postRequest(url,params).then(res=>res)
}
//满减活动设置列表
export function getmanjinaList(url,params){
	return getRequest(url,params).then(res=>res)
}
//厂家提现列表
export function gettixianList(url,params){
	return getRequest(url,params).then(res=>res)
}
//同意提现
export function agreexian(url,params){
	return postRequest(url,params).then(res=>res)
}
//拒绝提现
export function refusexian(url,params){
	return postRequest(url,params).then(res=>res)
}
//通告列表
export function getCallList(url,params){
	return getRequest(url,params).then(res=>res)
}
//财务明细列表
export function getCaiwuList(url,params){
	return getRequest(url,params).then(res=>res)
}

//财务统计上的数据
export function getCaiwuprice(url,params){
	return getRequest(url,params).then(res=>res)
}
//////////////////////////////////

//修改密码
export function xiugaimima(url,params){
 return postRequest(url,params).then(res => res)
}
export function gaitu(url,params){
 return postRequest(url,params).then(res => res)
}



//广告商品获取分类
export function Gggoodsfeilei(url,params){
 return getRequest(url,params).then(res=>res)
}
//商品管理
export function Getshopxinxi(url,params){
	return getRequest(url,params).then(res=>res)
}
//商品审核详情
export function Getshopshenhe(url,params){
	return getRequest(url,params).then(res=>res)
}
//修改商品状态
export function Xgshopzt(url,params){
	return postRequest(url,params).then(res=>res)
}
//商品详情
export function shopxq(url,params){
	return getRequest(url,params).then(res=>res)
}
//删除上商品
export function shopdel(url,params){
	return postRequest(url,params).then(res=>res)
}
//商品评价
export function shopqingjia(url,params){
	return getRequest(url,params).then(res=>res)
}
//删除评价
export function pingjiadel(url,params){
	return postRequest(url,params).then(res=>res)
}
//搜素评价
export function sousupj(url,params){
	return postRequest(url,params).then(res=>res)
}
//厂家商品分类
export function shopfl(url,params){
	return getRequest(url,params).then(res=>res)
}
//厂家商品分类删除
export function cjshopdel(url,params){
	return postRequest(url,params).then(res=>res)
}
//厂家分类
export function cjfeilei(url,params){
	return getRequest(url,params).then(res=>res)
}
//厂家分类新建，修改
export function cjnew(url,params){
	return postRequest(url,params).then(res=>res)
}
//厂家分类删除
export function cjdel(url,params){
	return postRequest(url,params).then(res=>res)
}
//厂家信息
export function cjxx(url,params){
	return getRequest(url,params).then(res=>res)
}
//厂家信息
export function cjxg(url,params){
	return postRequest(url,params).then(res=>res)
}
//订单主页
export function oderxq(url,params){
	return getRequest(url,params).then(res=>res)
}
//订单详情
export function oderonexq(url,params){
	return getRequest(url,params).then(res=>res)
}
//订单统计
export function odertj(url,params){
	return getRequest(url,params).then(res=>res)
}

//广告轮播
export function Gglunbolist(url,params){
	return getRequest(url,params).then(res=>res)
}
//广告厂家列表
export function Ggshoplist(url,params){
	return getRequest(url,params).then(res=>res)
}
//广告商品列表
export function Gggoodslist(url,params){
	return getRequest(url,params).then(res=>res)
}//广告商品修改新增
export function Gggoodsadd(url,params){
	return postRequest(url,params).then(res=>res)
}
//广告商品删除
export function Gggoodsdel(url,params){
	return postRequest(url,params).then(res=>res)
}

//获取统计报表
export function tjbaobiaolist(url,params){
 return getRequest(url,params).then(res => res)
}
//获取统计报表
export function tjddlist(url,params){
 return getRequest(url,params).then(res => res)
}
//登录
export function Denglu(url,params){
 return postRequest(url,params).then(res => res)
}

