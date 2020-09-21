import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export const constantRouterMap = [
  // 移动端wap页面
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home/index',
    name: 'Home',
    component: () => import('@/views/home/Home')
  }
];

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
