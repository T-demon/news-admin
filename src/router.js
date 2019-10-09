import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import PostList from "@/views/PostList";
import PostAdd from "@/views/PostAdd";
import PostEdit from "@/views/PostEdit";






Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
       // 登录页
       { path: "/login", component: Login},
       //后台首页
       { path: "/", component: Index,meta:"首页", children: [
        { path: "post_list", component: PostList,meta:"文章列表"},
        { path: "post_add", component: PostAdd,meta:"发布文章"},
        { path: "post_edit/:id", component: PostEdit,meta:"编辑文章"}


      ]}
  ]
})
