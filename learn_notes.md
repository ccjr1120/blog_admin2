# Learn notes

## build project by vue-cli3

```
vue creat project-name  #create a project
in next pick, as a beginner I choose the `default` pick.
```

## plugins
```
vue add element-ui
vue add router
vue add vuex
npm install -D less-loader less
npm install mavon-editor --save
npm install echerts --save
npm install --save axios vue-axios
```

## router
```
Go to router/index.js
Build the router path
example: const routes = [{
    path: '/',
    name: 'login',
    component: ()=>import('../views/login.vue')
  }]

this.$router.push('/url') //Jump view in the script
```
## Navigation Guards(in router)
```
Through the navigation guards,the app can judge whether a user can access a page according to the value in vuex or other things.

Example in the this app:
//Import component in Vuex
import store from '../store/index'
//Add the code for the every item in route list.
meta: {requiresAuth: false}
//Add function for router.
router.beforeEach((route, redirect, next) => {
  if (route.matched.some(r => r.meta.requiresAuth) && !store.state.isLogin) {
    next({
      path: '/',
      query: {
        redirect: route.fullPath
      }
    })
  } else {
    next()
  }
})
ps: The navigtion guards hava other functions.In this,the app jsut only use the beforeEach function.

Nested Router
example:  
  {
  path: '/manage',
  name: 'manage',
  component: manage,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '/blogs'
    }
  ]
  }
Using nested router to make nested view more convenient
```

## vuex
```
Go to store/index.js
in the state,add elements
in the mutations, add function to update the element
example: export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    login(state){
      state.isLogin = true;
    },
    logout(state){
      state.isLogin = false;
    }},
  actions: {},
  modules: {}
})

this.$store.state.isLogin //Get the value in state in the script
this.$store.commit("login") //Execute the function in the script to change the value in state.

Refresh will lose data in vuex
```

## mavon-editor
```
 It is a markdown editor.
 Use It:
Go to the main.js in the root directory And add
  import mavonEditor from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  Vue.use(mavonEditor)
Then you can to use it in the views.
Just only add this code in the view:
    <div class="mavonEditor">
      <mavon-editor v-model="value"/>
    </div>
```

## echarts
```
Go to the main.js And add this code for this file.
  import echarts from 'echarts'
  Vue.prototype.$echarts = echarts
Then go to the data visualization view.
Add a simple example for data visualization
The code like this:
<template>
  <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
export default {
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          }
        ]
      });
    }
  }
};
</script>
```