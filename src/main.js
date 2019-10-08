import Vue from 'vue'
import App from './App.vue'
import router from './router'



// 组件的引用
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios"

Vue.config.productionTip = false

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios;
// 设置基准路径
axios.defaults.baseURL = "http://localhost:3000";



// 注册element插件
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
