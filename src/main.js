import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty'
import axios from './js/axios'
Vue.use(vueBeauty)
Vue.config.productionTip = false


// 设置Axios响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert("账户已过期,请重新登录")
      window.location.href = '/'; // 更改路径到登录页面
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')
