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
ecample: const routes = [{
    path: '/',
    name: 'login',
    component: ()=>import('../views/login.vue')
  }]

this.$router.push('/url') //Jump view in the script

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