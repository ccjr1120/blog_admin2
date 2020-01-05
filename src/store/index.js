import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //为了直接跳转到正在编写的界面，把登录默认值设置为true
    isLogin: true
  },
  mutations: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store