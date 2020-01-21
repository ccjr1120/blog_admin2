import Vue from 'vue'
import Vuex from 'vuex'
import createVuexAlong from 'vuex-along'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //为了直接跳转到正在编写的界面，把登录默认值设置为true
    isLogin: false,
    //根据分组名获取博客列表时的博客名
    category: null,
  },
  mutations: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    },
    alterCategory(state, categoryName){
      state.category = categoryName;
    }
  },
  plugins:[createVuexAlong()]
})

export default store