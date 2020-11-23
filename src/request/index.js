
import axios from 'axios';
import router from '../router';
import store from '../store/index';
import QS from 'qs'
import ElementUI from 'element-ui';



// const baseUrlS = 'https://sdzxiangmu.com/'; //正式环境
const baseUrlS = 'https://www.xashudezhao.com/helpsales/'  //测试环境/
// const baseUrlS = 'http://8x9ym7.natappfree.cc/'

//使用create方法创建axios实例
// export const Service = axios.create({
//   timeout: 7000, // 请求超时时间
//   baseURL: baseUrlS,
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8'
//   }
// })

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
	router.replace({
		path: '/',
		query: {
			redirect: router.currentRoute.fullPath
		}
	});
}


//get请求
export function getRequest(url, params) { //get
	
	return new Promise((resolve, reject) => {
		
		axios.get(baseUrlS+url, {
			
			params: params
		}).then(res => {
			resolve(res.data);
			
		}).catch(err => {
			reject(err.data);
		})
	});
}

//post请求
export function postRequest(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(baseUrlS+url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
				
			})
			.catch(err => {
				reject(err.data)
			})
	});
}


// patch 
export function patch(baseUrlS,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(baseUrlS,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

//put请求
export function put(baseUrlS,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(baseUrlS,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}












// var instance = axios.create({
// 	timeout: 1000 * 12
// });

// // 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// instance.interceptors.request.use(
// 	config => {
// 		// 登录流程控制中，根据本地是否存在token判断用户的登录情况        
// 		// 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
// 		// 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
// 		// 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
// 		const token = store.state.token;
// 		token && (config.headers.Authorization = token);
// 		return config;
// 	},
// 	error => Promise.error(error)
// )

// // 响应拦截器
// instance.interceptors.response.use(
// 	// 请求成功
// 	res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
// 	// 请求失败
// 	error => {
// 		const {
// 			response
// 		} = error;
// 		if (response) {
// 			// 请求已发出，但是不在2xx的范围 
// 			//errorHandle(response.status, response.data.message);
// 			return Promise.reject(response);
// 		} else {
// 			// 处理断网的情况
// 			// eg:请求超时或断网时，更新state的network状态
// 			// network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
// 			// 关于断网组件中的刷新重新获取数据，会在断网组件中说明
// 			store.commit('changeNetwork', false);
// 		}
// 	}
// );



//时间函数
export function formatDateTime(inputTime) {
	if (inputTime == '') {
		return '';
	}
	var date = new Date(inputTime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; //(2019-07-30 14:25:22)

	// return y + '-' + m + '-' + d;  (2019-07-30)
}
export function formatDateYue(inputTime) {
	if (inputTime == '') {
		return '';
	}
	var date = new Date(inputTime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	//return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second; //(2019-07-30 14:25:22)

	 return y + '-' + m ;  //(2019-07)
}


 