import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'reset-css';
import "@/assets/styles/common.less"
import SlideVerify from 'vue-monoplasty-slide-verify';
import toastPlugin from '@/components/Toast'
// 要全局注册这个组件
Vue.use(SlideVerify);

// 全局注册$toast方法
Vue.use(toastPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // render 渲染  ， 渲染函数 传入一个组件，把这个组件渲染到 $mount 到的元素里面
  render: h => h(App)
}).$mount('#app')
