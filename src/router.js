import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
       // 登录页
       { path: "/login", component: Login},

  ]
})
