import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	 token:'' ,
	 visitedRoutes:[],
	 noticeList:[{title:'首页'}],
	 url:''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
