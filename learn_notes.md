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
```