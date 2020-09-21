import Vue from 'vue';

import '@/util/rem';
import App from './App.vue';
// 路由
import router from '@/router';
// 服务
import service from '@/service';

// 初始化svg组件
import './icons';
// 样式
import '@/assets/scss/index.scss';
// 工具方法
import util from '@/util';

Vue.config.productionTip = false;
Vue.prototype.$util = util;
Vue.prototype.$service = service;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
