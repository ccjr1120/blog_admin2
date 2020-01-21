import Vue from 'vue'
import store from '../store/index'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const login = () => import('../views/login.vue');
const manage = () => import('../views/manage.vue')
const blogs = () => import('../views/blogs.vue')
const comments = () => import('../views/comments.vue')
const editBlog = () => import("../views/editBlog.vue")
const dataVisual = () => import('../views/dataVisualization.vue')

const routes = [{
  path: ('/'),
  name: 'index',
  component: login,
  meta: {
    requiresAuth: false
  }
},
{
  path: '/login',
  name: 'login',
  component: login,
  meta: {
    requiresAuth: false
  }
},
{
  path: '/manage',
  name: 'manage',
  component: manage,
  meta: {
    requiresAuth: true
  },
  children: [
    {
      path: '/manage',
      component: dataVisual
    },
    {
      path: '/blogs',
      component: blogs,
    },
    {
      path: '/blogs/category/:name',
      component: blogs
    },
    {
      path: '/comments',
      component: comments
    },
    {
      path: '/newBlog',
      component: editBlog
    }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

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

export default router