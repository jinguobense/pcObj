import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Video from 'video.js'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = Video


// import audio from 'vue-mobile-audio'
// Vue.use(audio)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import { Base64 } from 'js-base64';

// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

//映入vue菜单组件
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
Vue.use(VueSidebarMenu)


import 'lib-flexible';
import'./utils/flexible'

Vue.config.productionTip = false;


import axios from 'axios';
Vue.prototype.axios = axios;



Vue.use(ElementUI, {
  size: 'small',
  zIndex: 3000
})

//弹出框禁止滑动
Vue.prototype.noScroll = function () {
  var mo = function (e) { e.preventDefault() }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false)// 禁止页面滑动
}
 
//弹出框可以滑动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = ''// 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}

//使用页面
//禁止主页面滑动
 //this.noScroll()
 
  //主页面可滑动
 // this.canScroll()
 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
 
 router.beforeEach((to,form,next)=>{
	 let denglu=JSON.parse(sessionStorage.getItem("dengluxinxi"))
	 if(to.path=='/'){
		 next()
	 }else if(!denglu){
		 next('/')
	 }else{
		 next()
	 }
 });